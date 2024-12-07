const { Utilizador } = require("../models/index");
const { createHash, compareHash } = require("../middleware/bcrypt");

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Utilizador.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User found", result: user });
  } catch (error) {
    console.error("Error getting user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong...", details: error.message });
  }
}

exports.editUser = async (req, res) => {
  const { userId } = req.params;
  const { nome, email, password } = req.body;

  try {
    if (!nome || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const userExists = await Utilizador.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await createHash(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const updatedUser = await userExists.update({
      nome,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User updated", result: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong...", details: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const userExists = await Utilizador.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userExists.destroy();
    res.status(201).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong...", details: error.message });
  }
};