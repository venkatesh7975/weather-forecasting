const express = require("express"); //to create server and routes and middleware
const mongoose = require("mongoose"); //db operations
const cors = require("cors"); // frontend and backend communication
const bcrypt = require("bcrypt"); //encryption
const dotenv = require("dotenv"); //env variables

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

//middleware
app.use(cors());
app.use(express.json());

const Schema = mongoose.Schema;
const loginSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const LoginDetails = mongoose.model("LoginDetails", loginSchema);

//connection

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to Mongodb");
    app.listen(PORT, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.log("mongodb connection error");
    process.exit(1);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }
  try {
    const existingUser = await LoginDetails.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new LoginDetails({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }
  try {
    const user = await LoginDetails.findOne({ username });
    if (!user) {
      return res.status(401).json({ erros: "invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "password wrong" });
    }
    res.status(200).json({ message: "login succesful" });
  } catch (error) {
    res.status(500).json({ error: "login failed" });
  }
});
