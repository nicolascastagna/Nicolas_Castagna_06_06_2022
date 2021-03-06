// Schéma de données Mongoose importé
const Sauce = require("../models/sauce");
// module pour modifier / supprimer des fichiers
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  // JSON.parse() pour obtenir un objet utilisable
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    // spread ... est utilisé pour faire une copie de tous les éléments de req.body
    ...sauceObject,
    // reconstruit l'URL complète du fichier enregistré
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  sauce
    // Enregistre à la base de donnée
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!req.file) {
      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    }
  });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new error("Sauce non trouvée !"),
      });
    }
    // Compare userId avec le propriétaire de la sauce pour supprimer
    if (sauce.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new error("Requête non autorisée !"),
      });
    }
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Suppression de l'image dans le dossier images
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

// méthode findOne pour trouver le même _id que le paramètre de la requête
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// méthode find afin de renvoyer un tableau contenant tous les Sauces de la base de données
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// méthode pour Like et Disliked

exports.getLike = (req, res, next) => {
  const like = req.body.like;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      console.log(sauce);
      // Si userId n'est pas inclus dans usersLiked et ajoute like +1
      if (!sauce.usersLiked.includes(req.body.userId) && like === 1) {
        // mise à jour MongoDB
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "Like +1 !" }))
          .catch((error) => res.status(400).json({ error }));
        //  // Si userId n'est pas inclus dans usersDisliked et ajoute like -1
      } else if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        like === -1
      ) {
        // mise à jour MongoDB
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "Dislike +1" }))
          .catch((error) => res.status(400).json({ error }));

        // passe le like à 0, si l'utilisateur est inclus en usersLiked
      } else if (like === 0 && sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "Like -1" }))
          .catch((error) => res.status(400).json({ error }));

        // passe disliked à 0
      } else if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "Dislikes -1" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(400).json({ error });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
