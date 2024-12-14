const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { us_name, us_email, us_password, us_phone_number, us_address } = req.body;
    let user = await User.findOne({ us_email });
    if (user) {
      return res.status(400).json({ msg: 'User sudah ada' });
    }
    user = new User({
      us_id: 'US' + Date.now(),
      us_name,
      us_email,
      us_password,
      us_phone_number,
      us_address
    });
    const salt = await bcrypt.genSalt(10);
    user.us_password = await bcrypt.hash(us_password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.us_id
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { us_email, us_password } = req.body;

  try {
    let user = await User.findOne({ us_email });
    if (!user) {
      return res.status(400).json({ msg: 'Kredensial tidak valid' });
    }

    const isMatch = await bcrypt.compare(us_password, user.us_password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Kredensial tidak valid' });
    }

    const payload = {
      user: {
        id: user.us_id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-us_password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { us_name, us_email, us_phone_number, us_address } = req.body;
    const user = await User.findOneAndUpdate(
      { us_id: req.params.id },
      { 
        us_name, 
        us_email, 
        us_phone_number, 
        us_address,
        us_updated_at: Date.now()
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ us_id: req.params.id });
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }
    res.json({ msg: 'User dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

