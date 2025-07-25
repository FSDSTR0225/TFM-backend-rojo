const express = require("express");
const router = express.Router();
const devController = require("../controllers/devController");
const isAuthenticated = require("../middlewares/auth/isAutenticated");

//Searchbar
router.get("/search", devController.searchDevelopers);

router.get("/", devController.getDevs);
router.get("/:id", devController.getDevById);
router.put("/profile", isAuthenticated, devController.updateDevProfile);

router.put("/onboarding", isAuthenticated, devController.onboardingdev);

module.exports = router;
