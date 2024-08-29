const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

const registerUser = async (req, res, next) => {
  const { email, name, password, pic } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Enter all the Fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userType = email.endsWith("@alphaware.com") ? "admin" : "user";

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send({ msg: "Error Occurred" });
      }
      const user = new User({ name, email, password: hash, pic, userType });
      await user.save();
      if (user) {
        return res.status(201).json({
          message: "Registration successful",
        });
      } else {
        return res.status(400).json({ message: "Failed to create the user" });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          pic: user.pic,
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {}
};

module.exports = { registerUser, authUser };
