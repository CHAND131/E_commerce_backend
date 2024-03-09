/**
 * 1.Read the request body
 * 2.insert the data into the database collection
 * 3.Return reponse to user
 */
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");

// 1.Read the request body

exports.signup = async (req, res) => {
  const request_body = req.body;

  const userobj = {
    name: request_body.name,
    email: request_body.email,
    userId: request_body.userId,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8),
  };

  // 2.insert the data into the database collection
  try {
    const user_created = await user_model.create(userobj);
    res.status(201).send(user_created);
  } catch (err) {
    console.log("error while registering", err);
    res.status(501).send({
      messege: "some error happend  while registering",
    });
  }
  //   3.Return reponse to user
};

exports.signIn = async (req, res) => {
  const user = await user_model.findOne({ userId: req.body.userId });

  if (user == null) {
    return res
      .status(401)
      .send({ message: "userId and password are not valid" });
  }

  //password is correct
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send({
      message: "wrong password passed",
    });
  }

  // usig jwt we will create access token with a ttl and return
  const token = jwt.sign({ id: user.userId }, "my xyz secret", {
    expiresIn: 120,
  });

  res.status(201).send({
    name: user.name,
    email: user.email,
    userType: user.userType,
    accesstoken: token,
    userId: user.userId,
  });
};
