const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const secret = process.env.JWT_Secret;

module.exports = {
  verifyUser: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Token not provided" });
      }
  
      const token = authHeader.split(" ")[1];
  
      const payload = jwt.verify(token, secret);
  
      const user = await User.findByPk(payload.id);
      if (!user) {
        return res.status(401).send({ message: "User not exists" });
      }
  
      res.locals.userId = payload.id;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Access token expired" });
      }
      return res.status(401).send({ message: "Invalid token" });
    }
  },
  
  verifySameUser: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Token not provided." });
      }
  
      const token = authHeader.split(" ")[1];
  
      const payload = jwt.verify(token, secret);
  
      const user = await User.findByPk(payload.id);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      if (!req.params.userId || payload.id !== parseInt(req.params.userId, 10)) {
        return res
          .status(403)
          .send({ message: "You don't have authorization." });
      }
  
      res.locals.userId = payload.id;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Invalid or Expired Token." });
      }
      console.error("Erro no verifySameUser:", error);
      res.status(500).send({ message: "Something went wrong", details: error.message });
    }
  },  

  SignToken: async (userId) => {
    const payload = { id: userId };
  
    const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
  
    const refreshToken = jwt.sign(payload, secret, { expiresIn: "7d" });
  
    return { accessToken, refreshToken };
  },
};
