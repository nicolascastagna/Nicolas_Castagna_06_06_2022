const mongoose = require("mongoose");
// package mongoose qui vérifie un email "unique"
const uniqueValidator = require("mongoose-unique-validator");

// Schéma utilisateurs mongoose pour la base de données MongoDb
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Evite la duplication d'adresse mail
userSchema.plugin(uniqueValidator);

// Export le schéma User en tant que modèle mongoose
module.exports = mongoose.model("User", userSchema);
