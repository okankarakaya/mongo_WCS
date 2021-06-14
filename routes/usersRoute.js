import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";
const router = express.Router();
// @route   GET/users/test
// @desc    Registe a user
// @access  Public
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.send("user already exist");
    }
    const newUser = new UserModel({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      user: { id: newUser.id },
    };
    jwt.sign(payload, "WCS123", (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//this is most private route
router.get("/test", auth, (req, res) => {
  res.send("hello");
});
export default router;
