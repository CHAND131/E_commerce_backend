const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");

// Connection with db
mongoose.connect(db_config.db_url);
// ordering to connect
const db = mongoose.connection;

// throw two event error event for error and open event for successfully connected

db.on("error", () => {
  console.log("error while connecting to database");
});

db.once("open", () => {
  console.log("connected to db");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });
    if (user) {
      console.log("Admin already Present");
    }
  } catch (err) {
    console.log("Error while reading the data", err);
  }
  try {
    const user = await user_model.create({
      name: "Chand",
      email: "chandsahu@gmail.com",
      userId: "admin",
      userType: "Admin",
      password: bcrypt.hashSync("Helloworld", 8),
    });
    console.log("ADMIN CREATED", user);
  } catch (err) {
    console.log("Error while creating admin", err);
  }
}
app.listen(server_config.PORT, () => {
  console.log("Server startd at ", server_config.PORT);
});
