import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/films", async (req, res) => {
  const fileContent = await fs.readFile("./data/films.json");

  const filmsData = JSON.parse(fileContent);

  res.status(200).json({ films: filmsData });
});

app.get("/list-films", async (req, res) => {
  const fileContent = await fs.readFile("./data/list-films.json");

  const films = JSON.parse(fileContent);

  res.status(200).json({ films });
});

app.put("/list-films", async (req, res) => {
  const films = req.body.films;

  await fs.writeFile("./data/list-films.json", JSON.stringify(films));

  res.status(200).json({ message: "List Film Updated!" });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
