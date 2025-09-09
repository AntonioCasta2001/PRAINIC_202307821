const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conexión a MySQL exitosa");
    connection.release();
  }
});

module.exports = db;