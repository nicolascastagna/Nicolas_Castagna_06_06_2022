// import Express
const express = require("express");
// import Mongoose pour gérer la base de données MongoDB
const mongoose = require("mongoose");
// plugin pour les images
const path = require("path");
// import routes API
const saucesRoutes = require("./routes/sauce");
// import routes signup / login
const userRoutes = require("./routes/user");

// sécurité sur l'en-tête HTTP
const helmet = require("helmet");

// API connecté à la base de données
mongoose
  .connect(
    "mongodb+srv://new_user:265766@cluster0.ve3za.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// création application Express
const app = express();
// extrait le corps JSON
app.use(express.json());

app.use((req, res, next) => {
  // accéder à l'API depuis n'importe quelle origine et envoies requêtes avec les méthodes get...
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// traite les requêtes vers /images, en rendant statique le dossier
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
