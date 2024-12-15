const User = require("../models").User;
const Refresh_Token = require("../models").Refresh_Token;
const { compareHash, createHash } = require("../middleware/bcrypt");
const { SignToken } = require("../middleware/jwt");
const nodeMailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ message: "Refresh token is required" });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, secret);
    } catch (error) {
      return res
        .status(401)
        .send({ message: "Invalid or expired refresh token" });
    }

    const storedToken = await Refresh_Token.findOne({
      where: { user_id: payload.id },
    });

    if (!storedToken) {
      return res.status(401).send({ message: "Refresh token not found" });
    }

    const tokenIsValid = await compareHash(storedToken.token, refreshToken);
    if (!tokenIsValid) {
      return res
        .status(401)
        .send({ message: "Invalid or expired refresh token" });
    }

    const accessToken = jwt.sign({ id: payload.id }, secret, {
      expiresIn: "15m",
    });

    return res.status(200).send({
      accessToken,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

/* The `exports.register` function is responsible for handling the registration process for a user.
Here is a breakdown of what the function does: */
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

    /* The code snippet you provided is responsible for sending an email to the user after successfully
    registering. Here is a breakdown of what it does: */
    const emailTemplate = fs.readFileSync("./html/welcome.html", "utf8");

    // Generate the reset URL
    const loginUrl = `http://localhost:5173/login`;

    // Replace the placeholder {{resetUrl}} with the actual reset URL in the email template
    const emailBody = emailTemplate.replace("{{loginUrl}}", loginUrl);

    // Configure email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: req.body.email,
      subject: "Welcome to Celebr8",
      html: emailBody,
    };

    // Send the email
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    const retrievedUser = await User.findByPk(user.user_id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(201).json({
      message: "User created successfully",
      result: retrievedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};

/* The `exports.login` function is responsible for handling the login process for a user. Here is a
breakdown of what the function does: */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error:
          "Missing fields. Email and Password must be sent in the body request!",
      });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordIsValid = await compareHash(user.password, password);
    if (!passwordIsValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const tokens = await SignToken(user.user_id);

    const hashedRefreshToken = await createHash(tokens.refreshToken);
    await Refresh_Token.create({
      user_id: user.user_id,
      token: hashedRefreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      message: "User logged in successfully",
      result: {
        user_id: user.user_id,
        refreshToken: tokens.refreshToken,
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res.status(400).send({ message: "Refresh token is required" });
    }

    const payload = jwt.verify(refreshToken, secret);
    const storedToken = await Refresh_Token.findOne({
      where: { user_id: payload.id },
    });

    if (!storedToken) {
      return res.status(404).send({ message: "Refresh token not found" });
    }

    await Refresh_Token.destroy({ where: { user_id: payload.id } });

    return res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user.user_id }, secret, { expiresIn: "1h" });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailTemplate = fs.readFileSync("./html/forgot.html", "utf8");

    const resetUrl = `http://localhost:5173/reset-password/${token}`;

    const emailBody = emailTemplate.replace("{{resetUrl}}", resetUrl);

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: req.body.email,
      subject: "Reset your password",
      html: emailBody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};