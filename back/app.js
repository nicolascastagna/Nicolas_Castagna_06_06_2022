const express = require("express");
const mongoose = require("mongoose");
const app = express();

// API connecté à la base de données
mongoose
  .connect(
    "mongodb+srv://new_user:265766@cluster0.ve3za.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// enregistre « Requête reçue ! » dans la console et passe l'exécution
app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});
// ajoute un code d'état 201 à la réponse et passe l'exécution
app.use((req, res, next) => {
  res.status(201);
  next();
});
// troisième envoie la réponse JSON et passe l'exécution
app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue" });
  next();
});
// enregistre « Réponse envoyée avec succès ! » dans la console
app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app;
