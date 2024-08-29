const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); //  to accept json data
app.use(cors());
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`listening on port : ${PORT}`));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});


