const bcrypt = require("bcrypt");
const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // 5. Send response
    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT
    const accessToken = jwt.sign(
     { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "15m" }
     );

    const refreshToken = jwt.sign(
    { userId: user._id },
     process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
    );

    //5. Send response
    res.status(200).json({
     success: true,
     accessToken,
     refreshToken,
   });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};


module.exports = { signup,login };
