export async function updateFilms(films) {
  const response = await fetch("http://localhost:5000/add-listFilms", {
    method: "PUT",
    body: JSON.stringify({ films }),
    headers: {
      "content-type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.message;
}
