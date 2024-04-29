export default function Films({
  title,
  films,
  isLoading,
  loadingText,
  fallbackText,
  onSelectFilm,
}) {
  console.log(films);
  return (
    <section className="places-category">
      <h2>{title}</h2>

      {isLoading && <p className="fallback-text">{loadingText}</p>}

      {!isLoading && films.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!isLoading && films.length > 0 && (
        <ul className="places">
          {films.map((film) => (
            <li key={film.id} className="place-item">
              <button onClick={() => onSelectFilm(film)}>
                <img
                  src={`http://localhost:5000/${film.image.src}`}
                  alt={film.image.alt}
                />
                <h3>{film.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
