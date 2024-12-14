const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { or_pd_id, or_amount } = req.body;
    const order = new Order({
      or_id: 'OR' + Date.now(),
      or_pd_id,
      or_amount
    });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { or_pd_id, or_amount } = req.body;
    const order = await Order.findOneAndUpdate(
      { or_id: req.params.id },
      { 
        or_pd_id, 
        or_amount,
        or_updated_at: Date.now()
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ msg: 'Pesanan tidak ditemukan' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndRemove({ or_id: req.params.id });
    if (!order) {
      return res.status(404).json({ msg: 'Pesanan tidak ditemukan' });
    }
    res.json({ msg: 'Pesanan dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

