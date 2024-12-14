# Backend Project

## Deskripsi
Backend ini merupakan API untuk aplikasi Backend-Marketplace. Dibangun menggunakan Node.js dan Express.

## Fitur
- CRUD produk
- Autentikasi JWT
- Upload file menggunakan Multer

## Teknologi
- Node.js
- Express.js
- MongoDB

## Cara Instalasi
1. Clone repository:
   ```bash
   git clone https://github.com/JINAN27/Backend-Marketplace.git
   cd repository/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Konfigurasi file `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=27017
   DB_USER=your_username
   DB_PASS=your_password
   ```
4. Jalankan server:
   ```bash
   npm start
   ```

## Endpoint Utama
- **GET /api/products**: Mendapatkan daftar produk
- **POST /api/products**: Menambah produk baru
- **PUT /api/products/:id**: Mengupdate produk
- **DELETE /api/products/:id**: Menghapus produk

## Kontributor
- Muhammad Miftahul Jinan
