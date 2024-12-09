const { User } = require("../models/index");
const { compareHash, createHash } = require("../middleware/bcrypt");
const { SignToken } = require("../middleware/jwt");
const nodeMailer = require("nodemailer");
require("dotenv").config();
const fs = require('fs');

exports.refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ message: "Refresh token is required" });
    }

    const payload = jwt.verify(refreshToken, secret);

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).send({ message: "User does not exist" });
    }

    const tokens = await SignToken(payload.id);

    res.status(200).send(tokens);
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired refresh token" });
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
    const emailTemplate = fs.readFileSync('./html/welcome.html', 'utf8');

    // Generate the reset URL
    const loginUrl = `http://localhost:5173/login`;

    // Replace the placeholder {{resetUrl}} with the actual reset URL in the email template
    const emailBody = emailTemplate.replace('{{loginUrl}}', loginUrl);  

    // Configure email options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: req.body.email,
        subject: "Password Reset Request",
        html: emailBody,
    };

    // Send the email
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

    const token = await SignToken(user.user_id);
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user_id: user.user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};