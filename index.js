const express = require("express");
const app = express();
const PORT = 5000;
const connectDB = require("./config/db");
const url = require("./models/url");
const ejs = require("ejs");

// Connect to Databse
connectDB();

app.set("view engine", "ejs");
app.set("views", "./views");

// To tell our server that We are using url parameter
app.use(express.urlencoded({ extended: true }));

// It Allows us to accept JSON Data into our api
app.use(express.json({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.listen(PORT, (err) => {
  console.log(err ? err : `Server running on port ${PORT}`);
});
