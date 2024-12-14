const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  or_id: { type: String, required: true, unique: true },
  or_pd_id: { type: String, required: true },
  or_amount: { type: Number, required: true },
  or_created_at: { type: Date, default: Date.now },
  or_updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

