import { useRef, useState, useCallback } from "react";

import Films from "./components/Films.jsx";
import Modal from "./components/Modal.jsx";
import Delete from "./components/Delete.jsx";
import logo from "./assets/logoweb.png";
import ListFilms from "./components/ListFilms.jsx";
import { updateFilms } from "./http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedListFilm = useRef();

  const [listFilms, setListFilms] = useState([]);
  const [errorUpdatingListFilms, setErrorUpdatingListFilms] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemoveListFilms(film) {
    setModalIsOpen(true);
    selectedListFilm.current = film;
  }

  function handleStopRemoveListFilms() {
    setModalIsOpen(false);
  }

  async function handleSelectFilm(selectedListFilm) {
    setListFilms((prevFilms) => {
      if (!prevFilms) {
        prevFilms = [];
      }
      if (prevFilms.some((film) => film.id === selectedListFilm.id)) {
        return prevFilms;
      }
      return [selectedListFilm, ...prevFilms];
    });

    try {
      await updateFilms([...listFilms, selectedListFilm]);
    } catch (err) {
      setListFilms(listFilms);
      setErrorUpdatingListFilms({
        message: err.message || "ada error waktu update list film",
      });
    }
  }

  const handleRemoveFilm = useCallback(async function handleRemoveFilm() {
    setListFilms((prevFilms) =>
      prevFilms.filter((film) => film.id !== selectedListFilm.current.id)
    );

    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatingListFilms(null);
  }

  return (
    <>
      <Modal open={errorUpdatingListFilms} onClose={handleError}>
        {errorUpdatingListFilms && (
          <Error
            title="Ada error pas update user places"
            message={errorUpdatingListFilms.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemoveListFilms}>
        <DeleteConfirmation
          onCancel={handleStopRemoveListFilms}
          onConfirm={handleRemoveFilm}
        />
      </Modal>

      <header>
        <img src={logo} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Films
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          films={listFilms}
          onSelectFilm={handleStartRemoveListFilms}
        />

        <ListFilms onSelectFilm={handleSelectFilm} />
      </main>
    </>
  );
}

export default App;
