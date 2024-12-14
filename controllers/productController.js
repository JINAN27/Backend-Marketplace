const Product = require('../models/Product');
const path = require('path');
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
  try {
    const { pd_code, pd_ct_id, pd_name, pd_price, pd_description, pd_quantity } = req.body;
    const product = new Product({
      pd_id: 'PD' + Date.now(),
      pd_code,
      pd_ct_id,
      pd_name,
      pd_price,
      pd_description,
      pd_quantity,
      pd_image: req.file ? '/uploads/' + path.basename(req.file.path) : ''
    });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { pd_code, pd_ct_id, pd_name, pd_price, pd_description, pd_quantity } = req.body;
    let product;

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      product = await Product.findByIdAndUpdate(
        req.params.id,
        { 
          pd_code, 
          pd_ct_id, 
          pd_name, 
          pd_price,
          pd_description,
          pd_quantity,
          pd_image: req.file ? '/uploads/' + path.basename(req.file.path) : req.body.pd_image,
          pd_updated_at: Date.now()
        },
        { new: true }
      );
    } else {
      product = await Product.findOneAndUpdate(
        { pd_id: req.params.id },
        { 
          pd_code, 
          pd_ct_id, 
          pd_name, 
          pd_price,
          pd_description,
          pd_quantity,
          pd_image: req.file ? '/uploads/' + path.basename(req.file.path) : req.body.pd_image,
          pd_updated_at: Date.now()
        },
        { new: true }
      );
    }

    if (!product) {
      return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product;

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      product = await Product.findByIdAndDelete(req.params.id);
    } else {
      product = await Product.findOneAndDelete({ pd_id: req.params.id });
    }

    if (!product) {
      return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    }
    res.json({ msg: 'Produk dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

