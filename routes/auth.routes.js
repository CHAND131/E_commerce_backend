const authController = require("../contorllers/auth.controller");

module.exports = (app) => {
  app.post("/ecom/api/v1/auth/sighup", authController.signup);
};

// go to server.js and stich or connect to app this route
