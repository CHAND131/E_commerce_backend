const user_model = require("../models/user.model");

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

module.exports = {
  verifySignUpBody: verifySignUpBody,
};
