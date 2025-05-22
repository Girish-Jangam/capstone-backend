const express = require('express');
const { loginAdmin, registerAdmin } = require('../Services/admin');
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const token = await loginAdmin(email, password);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Register an admin (Use with caution)
router.post('/register', async (req, res) => {
    
    const {  password, email } = req.body;
    try {
        const admin = await registerAdmin( password, email);
        res.json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
