import { useEffect, useState } from "react";
import Films from "./Films.jsx";
import Error from "./Error.jsx";

export default function ListFilms({ onSelectFilm }) {
  const [isFetching, setIsFetching] = useState(false);
  const [listFilms, setListFilms] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:5000/films");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to Fetch Data");
        }

        setListFilms(resData.films);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch data, please try again later !",
        });
      }

      setIsFetching(false);
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Films
      title="List Films"
      films={listFilms}
      isLoading={isFetching}
      loadingText="Data is fetching. . ."
      fallbackText="No films list."
      onSelectFilm={onSelectFilm}
    />
  );
}
