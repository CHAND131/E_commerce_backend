const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");

const verifySignUpBody = async (req, res, next) => {
  try {
    //Check for the name
    if (!req.body.name) {
      res.status(400).send({
        message: "Name field is required",
      });
    }
    //Check for the email
    if (!req.body.email) {
      res.status(400).send({
        message: "email field is required",
      });
    }
    //Check for the password
    if (!req.body.password) {
      res.status(400).send({
        message: "password field is required",
      });
    }
    //Check for the userId
    if (!req.body.userId) {
      res.status(400).send({
        message: "userID field is required",
      });
    }

    //Check if the user with the same userId is already present
    const userId = await user_model.findOne({ userId: req.body.userId });
    if (userId) {
      res.status(400).send({
        message: "UserId already exist",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      message: "Error while validating the request body",
    });
    console.log("Error while validating the request object", error);
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userId is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password is not provided",
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  // 1.check if the token is present in the header
  const token = req.headers["x-acces-token"];
  if (!token) {
    return res.status(403).send({
      message: "no token found,unauthorised",
    });
  }

  // if it's a valid token
  //use same secret key which is used to create acces token
  jwt.verify(token, "my xyz secret", async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "unauthorised",
      });
    }

    const user = await user_model.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "unauthorised,this user for this token does'nt exist",
      });
    }
    req.user = user;
    // then move tp the next
    next();
  });
};

const adminCheck = (req, res, next) => {
  const user = req.user;
  if (user && userType == "Admin") {
    next();
  } else {
    return res.status(403).send({
      message: "only admin user is allowed to acces this endpoint",
    });
  }
};
module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  verifyToken: verifyToken,
  adminCheck: adminCheck,
};
