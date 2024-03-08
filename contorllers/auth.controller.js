/**
 * 1.Read the request body
 * 2.insert the data into the database collection
 * 3.Return reponse to user
 */
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");

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
