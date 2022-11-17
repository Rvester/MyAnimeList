const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.get("/info", userCtrl.info);
router.delete("/clear", userCtrl.clear);
router.get("/all", userCtrl.allUsers);
router.put("/favorites", userCtrl.setFavorite);
router.delete("/removeFavorites", userCtrl.deleteFavorite);

module.exports = router;
