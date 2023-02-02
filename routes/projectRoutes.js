const { query } = require("express");
const express = require("express");
const router = express.Router();
const Model = require("../models/project");

//Post Method
router.post("/add", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    created_date: new Date(),
    updated_date: new Date(),
  });

  try {
    if (
      typeof req.body.name != "undefined" &&
      typeof req.body.description != "undefined"
    ) {
      if (req.body.name != "" && req.body.description != "") {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
      } else {
        res.status(500).json({ msg: "Missing Required fields" });
      }
    } else {
      res.status(500).json({ msg: "Missing Required fields" });
    }
  } catch {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.post("/all", async (req, res) => {
  try {
    var searchQuery = {
      name: new RegExp(req.body.searchQuery, "i"),
    };

    const data = await Model.find(searchQuery, null, {
      sort: { created_date: -1 },
    });
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
router.post("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      updated_date: new Date(),
    };
    const options = { new: true };
    if (
      typeof req.body.name != "undefined" &&
      typeof req.body.description != "undefined"
    ) {
      if (req.body.name != "" && req.body.description != "") {
        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.send(result);
      } else {
        res.status(500).json({ msg: "Missing Required fields" });
      }
    } else {
      res.status(500).json({ msg: "Missing Required fields" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
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
