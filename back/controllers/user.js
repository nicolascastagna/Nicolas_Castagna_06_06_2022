// import bcrypt pour hasher le mot de passe
const bcrypt = require("bcrypt");
// import jsonwebtoken pour définir un token user
const jwt = require("jsonwebtoken");
// import schéma User
const User = require("../models/User");

// Création utilisateur et mot de passe hash avec bcrypt
exports.signup = (req, res, next) => {
  bcrypt
    // "saler" le mot de passe 10 fois avec la méthode hash de bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        // Enregistre l'utilisateur en base de données
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// Login utilisateur
exports.login = (req, res, next) => {
  // Recherche l'utilisateur existant par l'adresse mail
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // Compare les mots de passe avec celui "écrit" et enregistré en base de donnée
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error: "Erreur !" }));
    })
    .catch((error) => res.status(500).json({ error: "Erreur !" }));
};
