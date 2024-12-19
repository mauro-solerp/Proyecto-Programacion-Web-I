// Import required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  User  = require('../models/User');

// JWT secret key
const JWT_SECRET = 'cwork-secrt-123';

// Register a new user
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(username, hashedPassword);
        const newUser = await User.create({ username, password: hashedPassword, role });
        const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: '3h' });
        res.status(201).json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Log in an existing user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id,username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
