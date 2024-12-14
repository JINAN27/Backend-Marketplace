const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  ct_id: { type: String, required: true, unique: true },
  ct_code: { type: String, required: true, unique: true },
  ct_name: { type: String, required: true },
  ct_created_at: { type: Date, default: Date.now },
  ct_updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);

