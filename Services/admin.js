const jwt = require('jsonwebtoken');
const Admin = require('../Model/admin');

exports.loginAdmin = async (email, password) => {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, 'yourSecretKey', { expiresIn: '1h' });
    return token;
};

exports.registerAdmin = async ( password, email) => {
    const newAdmin = new Admin({ password, email });
    await newAdmin.save();
    return newAdmin;
};
