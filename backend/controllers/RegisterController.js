const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const prisma = require("../prisma/client");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
        success: true,
        message: "User successfully created",
        data: user});
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { register };
