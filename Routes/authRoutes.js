// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Model/User'); // Assuming User model exists for authentication
const router = express.Router();

// Admin login route
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password (assuming bcryptjs is used)
        const isMatch = await user.comparePassword(password); // Assuming comparePassword method on the User model
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the user has admin role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, you are not an admin' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY || 'your_secret_key', { expiresIn: '1h' });

        // Send back the token
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

module.exports = router;
