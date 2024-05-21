import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//Declaring the App
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//mongoose
try {
  mongoose.connect("mongodb://127.0.0.1:27017/userReg");
  console.log("Connected to Database");
} catch (error) {
  console.log("Error", error);
}

// Create User Schema
const UserSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

//user Model
const UserModel = mongoose.model("users", UserSchema);

//ROUTES

//creating users
app.post("/users", async (req, res) => {
  try {
    const newUser = UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//getting users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//getinbg a user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//updating user by ID
app.put("/users/:id", async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User Not Found" });
      m;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//deleting a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findOneAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//delete all Users
app.delete("/users", async (req, res) => {
  try {
    const deletedUsers = await UserModel.deleteMany();
    res.status(200).json(deletedUsers);
  } catch (error) {
    res.status(500).json({ message: "All Users Deleted Succesfully" });
  }
});

//listening Port
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Listening on port number 8080");
});
