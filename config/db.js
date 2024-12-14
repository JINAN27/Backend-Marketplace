const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout setelah 5 detik
    });
    console.log('MongoDB Atlas terhubung...');
  } catch (err) {
    console.error('Kesalahan koneksi MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

