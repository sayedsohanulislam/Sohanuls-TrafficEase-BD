const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mockDb = require('../data/mockDatabase');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Self-healing Database Fallback
    if (mongoose.connection.readyState !== 1) {
      const userExists = mockDb.users.find(u => u.email === email);
      if (userExists) return res.status(400).json({ message: 'User already exists (Simulated Mode)' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: 'mock-user-' + (mockDb.users.length + 1),
        name,
        email,
        phone,
        password: hashedPassword,
        role: role || 'Commuter',
        createdAt: new Date().toISOString()
      };
      mockDb.users.push(newUser);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id)
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, phone, password, role: role || 'Commuter' });

    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Self-healing Database Fallback
    if (mongoose.connection.readyState !== 1) {
      const user = mockDb.users.find(u => u.email === email);
      if (user && await bcrypt.compare(password, user.password)) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials (Simulated Mode)' });
      }
    }

    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      res.json({
        _id: user._id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
