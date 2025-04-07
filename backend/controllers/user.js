const { User } = require("../models/userModel");

// Get all users
async function handleGetAllUser(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new user (POST)
async function handlePost(req, res) {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist){
      return res.status(400).json({ message: "User already exist" });
  }

    const newUser = await User.create({
      name, email, password,
    });
    

    res.status(201).json({ message: "User registered Successfully" ,
      token:await newUser.generateToken(),
      userId:newUser._id.toString(),
    });
  }

  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function handleLogin(req,res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email})

    if(!user){
    return  res.status(400).json({message:"User not found"})
    }
    const valid =await user.isPasswordValid(password);
    if(!valid){
      return res.status(401).json({message:"Invlaid Email or Password"});
    }

    res.status(200).json({mes:user,
      token:await user.generateToken(),
      userId:user._id.toString(),
  })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a user (PUT - Replaces entire document)
async function handlePut(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Partial Update a user (PATCH - Updates only specified fields)
async function handlePatch(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a user
async function handleDelete(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  handleGetAllUser,
  handlePost,
  handlePut,
  handlePatch,
  handleDelete,
  handleLogin
};
