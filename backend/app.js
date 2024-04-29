import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";
import Films from "../src/components/Films";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/listfilms", async (req, res) => {
  const fileContent = await fs.readFile("./data/films.json");

  const filmData = JSON.parse(fileContent);

  res.status(200).json({ films: filmData });
});

app.get("/add-listFilm", async (req, res) => {
  const fileContent = await fs.readFile("./data/add-listFilm.json");

  const films = JSON.parse(fileContent);

  res.status(200).json({ films });
});

app.put("/add-listFilm", async (req, res) => {
  const films = req.body.places;

  await fs.writeFile("./data/add-listFilm.json", JSON.stringify(films));

  res.status(200).json({ message: "List Film Updated!" });
});

//404;
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(5000, () => console.log("Server up and running..."));
