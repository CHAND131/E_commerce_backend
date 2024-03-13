// for category model
const category_model = require("../models/category.model");
exports.createNewCategory = async (req, res) => {
  //read the request body
  req_body = req.body;
  //create the catergory object
  const categoryobj = {
    name: req_body.name,
    description: req_body.description,
  };
  //insert into the database
  try {
    const category = await category_model.create(categoryobj);
    return res.status(201).send(category);
  } catch (err) {
    console.log("unable to create category,error while creating", err);
    return res.status(500).send({
      message: "error while creating category",
    });
  }
  //return the response
};
