const authController = require("../contorllers/auth.controller");
const authmw = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecom/api/v1/auth/signup",
    [authmw.verifySignUpBody],
    authController.signup
  );

  //route for sign in post:/ecom/api/v1/auth/signin
  app.post("/ecom/api/v1/auth/signin", authController.signIn);
};

// go to server.js and stich or connect to app this route
