const User = require('../Models/userModels');
const bcrypt = require('bcryptjs');


const signUp = async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, password } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password length and complexity
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit" });
        }

        // Validate request body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

       
        

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });

        // Save new user to the database
        await newUser.save();

        // Return success response with user ID
        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        // Return error response
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        // Extract data from request body
        const { email, password } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Return success response with user ID
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        // Return error response
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    signUp,
    login,
    getUserDetails
}
