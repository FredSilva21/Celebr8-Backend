const { User } = require("../models/index");
const { compareHash, createHash } = require("../middleware/bcrypt");
const { SignToken } = require("../middleware/jwt");
const nodeMailer = require("nodemailer");
require("dotenv").config();

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

    if (await User.findOne({ where: { email: email } })) {
      return res
        .status(400)
        .json({ error: "Already have an account with this email!" });
    }

    const hash = await createHash(password);
    const user = await User.create({
      name: name,
      email: email,
      password: hash,
    });

    //Send email
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Celebr8!",
      text: `Hello ${name}, welcome to our app!`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
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