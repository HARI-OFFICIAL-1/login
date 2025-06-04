const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./userModel');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hariharan3002112:HARI7094@cluster0.nb5mjxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User Registered");
  } catch (e) {
    res.status(400).send("Error registering user");
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid Credentials");
  }
  res.send("Login Success");
});

app.get('/', (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
