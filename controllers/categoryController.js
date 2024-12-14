const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { ct_code, ct_name } = req.body;
    const category = new Category({
      ct_id: 'CT' + Date.now(),
      ct_code,
      ct_name
    });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { ct_code, ct_name } = req.body;
    const category = await Category.findOneAndUpdate(
      { ct_id: req.params.id },
      { 
        ct_code, 
        ct_name,
        ct_updated_at: Date.now()
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ msg: 'Kategori tidak ditemukan' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({ ct_id: req.params.id });
    if (!category) {
      return res.status(404).json({ msg: 'Kategori tidak ditemukan' });
    }
    res.json({ msg: 'Kategori dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

