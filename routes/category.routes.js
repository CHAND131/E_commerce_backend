const categoryController = require("../contorllers/category.controller");
const authmw = require("../middlewares/auth.mw");

//post call on /ecom/api/v1/categories

module.exports = (app) => {
  app.post(
    "/ecom/api/v1/categories",
    [authmw.verifyToken, authmw.adminCheck],
    categoryController.createNewCategory
  );
};
