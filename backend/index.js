const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();

const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json());

app.listen(PORT, console.log(`listening on port : ${PORT}`));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
