const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pd_id: { type: String, required: true, unique: true },
  pd_code: { type: String, required: true, unique: true },
  pd_ct_id: { type: String, required: true },
  pd_name: { type: String, required: true },
  pd_price: { type: Number, required: true },
  pd_description: { type: String, required: true },
  pd_image: { type: String, required: true },
  pd_quantity: { type: Number, required: true, default: 0 },
  pd_created_at: { type: Date, default: Date.now },
  pd_updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

