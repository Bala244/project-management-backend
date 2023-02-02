require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");

mongoose.set("strictQuery", false);
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log("error", error);
});

database.on("connected", () => {
  console.log("Database connected");
});

const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/project", todoRoutes);
app.use("/api/user", userRoutes);

app.use(express.json());

app.listen(3000, () => {
  console.log("server is started at ${3000}");
});
