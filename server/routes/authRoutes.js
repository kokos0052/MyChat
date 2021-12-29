const express = require("express");
const { registration, login } = require("../controlers/authControler");
const router = express.Router();
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Не может быть пустым").notEmpty(),
    check("password", "Вы ввели невалидный пароль").isLength({
      min: 8,
      max: 50,
    }),
  ],
  registration
);

module.exports = router;

