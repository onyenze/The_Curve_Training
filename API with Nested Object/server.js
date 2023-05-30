const express = require("express");
const mongoose = require("mongoose");
PORT = 5090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/dataDB"
//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

// create schema for database list
const databaseSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  course: { type: String, required: [true,"course is required"] },
  designation: { type: String, required: [true,"designation is required"] },
  score : {
    html :{type:Number, required: [true,"html is required"]},
    css :{type:Number, required: [true,"css is required"]},
    Javascript :{type:Number, required: [true,"javascript is required"]},
    node :{type:Number, required: [true,"node is required"]},
  }
});

// todo model
const databaseModel = mongoose.model("database", databaseSchema);

// created a new entry
app.post("/database", async (req, res) => {
  try {
    const entry = await databaseModel.create(req.body);
    if (!entry) {
      res.status(400).json({
        message: "error creating entry",
      });
    } else {
      res.status(201).json({
        message: "entry created",
        data: entry,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// getting all tasks
app.get("/database", async (req, res) => {
  try {
    const entry = await databaseModel.find();
    if (!entry) {
      res.status(404).json({
        message: "entry database not found",
      });
    } else if (entry.length == 0) {
      res.status(200).json({
        message: "no entry on the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: entry,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting entry based on ID
app.get("/database/:id", async (req, res) => {
  try {
    const entryId = req.params.id;
    const entry = await databaseModel.findById(entryId);
    if (!entry) {
      res.status(404).json({
        message: "entry not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: entry,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating entry based on ID
app.put("/database/:id", async (req, res) => {
  try {
    const entryId = req.params.id;
    const updatedEntry = await databaseModel.findByIdAndUpdate(entryId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEntry) {
      res.status(404).json({
        message: "entry not found",
      });
    } else {
      res.status(200).json({
        message: "entry updated",
        data: updatedEntry,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting task
app.delete("/databse/:id", async (req, res) => {
  try {
    const entryId = req.params.id;
    const deletedEntry = await databaseModel.findByIdAndDelete(entryId);
    if (!deletedEntry) {
      res.status(404).json({
        message: "entry not found",
      });
    } else {
      res.status(200).json({
        message: "entry deleted",
        data: deletedEntry,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is on ", PORT);
});
