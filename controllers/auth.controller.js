const { User } = require("../Models/index");
const { compareHash } = require("../Middleware/bcrypt");
const { SignToken } = require("../Middleware/jwt");

//Done
exports.register = async (req, res) => {
  const { nif, name, email, password } = req.body;

  try {
    if (!nif || !name || !email || !password) {
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

    if (await User.findByPk(nif)) {
      return res
        .status(400)
        .json({ error: "Already have an account with this nif!" });
    }

    const newUser = await User.create({
      nif: nif,
      name: name,
      email: email,
      password: password,
    });

    return res.status(200).json({ success: "User created", user: newUser });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Plese try again later",
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
          "Missing fields. Email and Password must be sended in the body request!",
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

    const token = await SignToken(user);
    return res
      .status(200)
      .json({ success: "Login successful", token: token, user_id: user.nif });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Plese try again later",
      details: error,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica se o e-mail existe
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Gera um token de redefinição de senha (JWT pode ser usado aqui)
    const resetToken = await SignToken(user);

    // Link para redefinição de senha (exemplo)
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Envia o e-mail com o link de redefinição de senha
    const emailBody = `Hello, ${user.name}. You requested a password reset. Click the following link to reset your password: ${resetLink}`;

    await sendEmail(user.email, "Password Reset Request", emailBody);

    return res.status(200).json({ success: "Password reset email sent" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};

//Miss reset password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({
        error: "Token and new password must be provided",
      });
    }

    // Verificar se o token é válido
    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Buscar o usuário através do NIF (que está no payload do token)
    const user = await User.findByPk(decoded.nif);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hashear a nova senha
    const hashedPassword = await hashPassword(newPassword);

    // Atualizar a senha do usuário
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};