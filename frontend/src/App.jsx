import { useRef, useState, useCallback } from "react";

import Films from "./components/Films.jsx";
import Modal from "./components/Modal.jsx";
import DeleteData from "./components/Delete.jsx";
import logoImg from "./assets/logoweb.png";
import ListFilms from "./components/ListFilms.jsx";
import { updateFilms } from "./http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedFilm = useRef();

  const [listFilms, setlistFilms] = useState([]);
  const [errorUpdatinglistFilms, setErrorUpdatinglistFilms] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemoveFilm(film) {
    setModalIsOpen(true);
    selectedFilm.current = film;
  }

  function handleStopRemoveFilm() {
    setModalIsOpen(false);
  }

  async function handleSelectFilm(selectedFilm) {
    setlistFilms((prevPickedFilms) => {
      if (!prevPickedFilms) {
        prevPickedFilms = [];
      }
      if (prevPickedFilms.some((film) => film.id === selectedFilm.id)) {
        return prevPickedFilms;
      }
      return [selectedFilm, ...prevPickedFilms];
    });

    try {
      await updateFilms([...listFilms, selectedFilm]);
    } catch (err) {
      setlistFilms(listFilms);
      setErrorUpdatinglistFilms({
        message: err.message || "ada error waktu update user places",
      });
    }
  }

  const handleRemoveFilm = useCallback(async function handleRemoveFilm() {
    setlistFilms((prevPickedFilms) =>
      prevPickedFilms.filter((film) => film.id !== selectedFilm.current.id)
    );

    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatinglistFilms(null);
  }

  return (
    <>
      <Modal open={errorUpdatinglistFilms} onClose={handleError}>
        {errorUpdatinglistFilms && (
          <Error
            title="Ada error pas update user films"
            message={errorUpdatinglistFilms.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemoveFilm}>
        <DeleteData
          onCancel={handleStopRemoveFilm}
          onConfirm={handleRemoveFilm}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>Film Disney</h1>
        <p>
          Make a list of Disney films that you like and choose according to your
          wishes.
        </p>
      </header>
      <main>
        <Films
          title="Choose according to your wishes ..."
          fallbackText="Select the films you would like to visit below."
          films={listFilms}
          onSelectFilm={handleStartRemoveFilm}
        />

        <ListFilms onSelectFilm={handleSelectFilm} />
      </main>
    </>
  );
}

export default App;
