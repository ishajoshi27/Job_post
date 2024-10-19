const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newCompany = new Company({ name, email, password });
        await newCompany.save();
        res.status(201).json({ message: 'Company registered. Please verify your email.' });
        // Implement OTP and email sending here
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });
        if (!company) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const transporter = require('../config/nodemailer');

exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
    } catch (err) {
        console.error(err);
    }
};
