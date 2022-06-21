const express = require("express");
// méthode pour créer des routes séparé à partir des routes principales
const router = express.Router();

const auth = require("../middleware/auth");
const sauceCtrl = require("../controllers/sauce");
const multer = require("../middleware/multer-config");

// Routes de l'API dont les middlewares d'authentification

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);

router.post("/:id/like", auth, sauceCtrl.getLike);

module.exports = router;
