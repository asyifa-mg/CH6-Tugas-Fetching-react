export async function updateFilms(films) {
  const response = await fetch("http://localhost:3000/list-films", {
    method: "PUT",
    body: JSON.stringify({ films }),
    headers: {
      "content-type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update films data");
  }

  return resData.message;
}
