const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const RegisterController = require("../controllers/RegisterController");
const LoginController = require("../controllers/LoginController");
const MakananController = require("../controllers/MakananController");
const {
  validateRegister,
  validateLogin,
  validateMakanan,
} = require("../utils/validators/auth");

router.post("/register", validateRegister, RegisterController.register);
router.post("/login", validateLogin, LoginController.login);
router.get("/makan", MakananController.findAll);
router.get("/makan/:id", MakananController.findById);
router.get("/admin/makanan", verifyToken, MakananController.findAll);
router.post(
  "/admin/makanan",
  verifyToken,
  validateMakanan,
  MakananController.create
);
router.get("/admin/makanan/:id", verifyToken, MakananController.findById);
router.put(
  "/admin/makanan/:id",
  verifyToken,
  validateMakanan,
  MakananController.update
);
router.delete("/admin/makanan/:id", verifyToken, MakananController.deleteById);

module.exports = router;
