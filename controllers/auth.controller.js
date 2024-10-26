const { Utilizador } = require("../Models/index");
const { compareHash, createHash } = require("../Middleware/bcrypt");
const { SignToken } = require("../Middleware/jwt");

//Done
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        error:
          "Missing fields. Nif, Name, Email and Password must be sended in the body request!",
      });
    }

    if (await Utilizador.findOne({ where: { email: email } })) {
      return res
        .status(400)
        .json({ error: "Already have an account with this email!" });
    }

    const hash = await createHash(password);
    const user = await Utilizador.create({
      nome: name,
      email: email,
      password: hash,
    });

    return res.status(201).json({
      message: "User created successfully",
      result: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};

//Done
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error:
          "Missing fields. Email and Password must be sent in the body request!",
      });
    }

    const user = await Utilizador.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordIsValid = await compareHash(user.password, password);

    if (!passwordIsValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = await SignToken(user.id_utilizador);
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user_id: user.id_utilizador,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};
