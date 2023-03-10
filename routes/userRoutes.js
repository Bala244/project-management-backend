const express = require("express");
const router = express.Router();
const Model = require("../models/user");

//Post Method
router.post("/add", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    image: req.body.image,
    password: req.body.password,
    status: req.body.status,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/all", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.task} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete-all", async (req, res) => {
  try {
    const data = await Model.remove();
    res.send(`All Data Deleted In This Document..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
