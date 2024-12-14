const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  us_id: { type: String, required: true, unique: true },
  us_name: { type: String, required: true },
  us_password: { type: String, required: true },
  us_email: { type: String, required: true, unique: true },
  us_phone_number: { type: String },
  us_address: { type: String },
  us_created_at: { type: Date, default: Date.now },
  us_updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

