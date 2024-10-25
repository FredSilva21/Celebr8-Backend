const jwt = require("jsonwebtoken");
const { User } = require("../Models/index");
const secret = process.env.JWT_Secret;

module.exports = {
  verifyUser: async (req, res, next) => {
    //Get Token
    let bearer;
    try {
      bearer = req.headers.authorization.split(" ")[1];
      jwt.verify(bearer, secret);
    } catch (error) {
      console.log(error)
      res.status(401).send({ message: "Token failed verification" });
      return;
    }

    try {
      const payload = jwt.decode(bearer, secret);

      

      const user = await User.findByPk(payload.id);

      if (user != null) {
        res.locals.userId = payload.id;
        next();
      } else {
        res.status(401).send({ message: "User does not exist" });
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: "Something went wrong...", details: error });
    }
  },
  verifySameUser: async (req, res, next) => {
    //Get Token
    let bearer;
    try {
      bearer = req.headers.authorization.split(" ")[1];
      jwt.verify(bearer, secret);
    } catch (error) {
      res.status(401).send({ message: "Token failed verification" });
      return;
    }

    try {
      const payload = jwt.decode(bearer, secret);

      

      const user = await User.findByPk(payload.id);
      
      if (req.params.userId && payload.id == req.params.userId) {
        res.locals.userId = payload.id;
        next();
      } else {
        res.status(403).send({ message: "User does not have permissons to execute this action" });
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: "Something went wrong...", details: error });
    }
  },
  verifyAdmin: async (req, res, next) => {
    //Get Token

    let bearer;

    try {
      bearer = req.headers.authorization.split(" ")[1];

      jwt.verify(bearer, secret);
    } catch (error) {
      res.send({ message: "Token failed verification" }).status(401);
      return;
    }

    try {
      const payload = jwt.decode(bearer, secret);

     

      const user = await User.findByPk(payload.id);

      if (user != null) {
        if (user.type == true) {
          res.locals.userId = payload.id;
          next();
        } else {
          res.status(403).send({ message: "User is not an admin" });
          return;
        }
      } else {
        res.status(401).send({ message: "User does not exist" });
        return;
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: "Something went wrong...", details: error });
    }
  },

  SignToken: async (userId) => {
    const payload = { id: userId };

    const token = jwt.sign(payload, secret);

    jwt.decode(token);

    return token;
  },
};