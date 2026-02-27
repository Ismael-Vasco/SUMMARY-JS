// REPOSITORY
// https://github.com/gitsaso-projects/ismael_vasco/tree/features/upload

// ================= IMPORTACIONES =================
const express = require('express');
const multer = require('multer');
const { parse } = require('csv-parse');
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

// ================= CONFIG =========================
const app = express();
const upload = multer({ dest: 'uploads/' });

// =================  CONEXION POOL =================
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ================= CREAR TABLAS =================
async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS cargo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(45)
    );`,
    `CREATE TABLE IF NOT EXISTS empleado (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100),
      apellido VARCHAR(100),
      cargo_id INT,
      FOREIGN KEY (cargo_id) REFERENCES cargo(id)
    );`,
    `CREATE TABLE IF NOT EXISTS cliente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100),
      apellido VARCHAR(100),
      email VARCHAR(45)
    );`,
    `CREATE TABLE IF NOT EXISTS categoria (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(55)
    );`,
    `CREATE TABLE IF NOT EXISTS editorial (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(55)
    );`,
    `CREATE TABLE IF NOT EXISTS autor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100)
    );`,
    `CREATE TABLE IF NOT EXISTS libro (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(100),
      autor_id INT,
      categoria_id INT,
      editorial_id INT,
      anio_publicacion INT,
      precio DOUBLE,
      FOREIGN KEY (autor_id) REFERENCES autor(id),
      FOREIGN KEY (categoria_id) REFERENCES categoria(id),
      FOREIGN KEY (editorial_id) REFERENCES editorial(id)
    );`,
    `CREATE TABLE IF NOT EXISTS prestamo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fecha_prestamo DATE,
      fecha_devolucion DATE,
      cliente_id INT,
      empleado_id INT,
      libro_id INT,
      FOREIGN KEY (cliente_id) REFERENCES cliente(id),
      FOREIGN KEY (empleado_id) REFERENCES empleado(id),
      FOREIGN KEY (libro_id) REFERENCES libro(id)
    );`
  ];

  for (const query of queries) {
    await pool.query(query);
  }

  console.log("Tablas creadas correctamente");
}

createTables();

// ================= FUNCION GENERICA PARA UPLOAD =================
function uploadCSV(table, columns) {
  return async (req, res) => {
    const rows = [];

    fs.createReadStream(req.file.path)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', row => rows.push(row))
      .on('end', async () => {
        try {
          if (rows.length) {
            const placeholders = rows.map(() => `(${columns.map(() => '?').join(',')})`).join(',');
            const values = rows.flatMap(row => columns.map(col => row[col]));
            
            await pool.query(
              `INSERT INTO ${table} (${columns.join(',')}) VALUES ${placeholders}`,
              values
            );
          }

          res.json({ ok: true, total: rows.length });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error insertando datos' });
        }
      });
  };
}

// ================= ENDPOINTS =================

// CLIENTES
app.post('/api/upload/clientes',
  upload.single('archivo'),
  uploadCSV('cliente', ['nombre','apellido','email'])
);

// CARGOS
app.post('/api/upload/cargos',
  upload.single('archivo'),
  uploadCSV('cargo', ['nombre'])
);

// EMPLEADOS
app.post('/api/upload/empleados',
  upload.single('archivo'),
  uploadCSV('empleado', ['nombre','apellido','cargo_id'])
);

// CATEGORIAS
app.post('/api/upload/categorias',
  upload.single('archivo'),
  uploadCSV('categoria', ['nombre'])
);

// EDITORIALES
app.post('/api/upload/editoriales',
  upload.single('archivo'),
  uploadCSV('editorial', ['nombre'])
);

// AUTORES
app.post('/api/upload/autores',
  upload.single('archivo'),
  uploadCSV('autor', ['nombre'])
);

// LIBROS
app.post('/api/upload/libros',
  upload.single('archivo'),
  uploadCSV('libro', [
    'titulo',
    'autor_id',
    'categoria_id',
    'editorial_id',
    'anio_publicacion',
    'precio'
  ])
);

// PRESTAMOS
app.post('/api/upload/prestamos',
  upload.single('archivo'),
  uploadCSV('prestamo', [
    'fecha_prestamo',
    'fecha_devolucion',
    'cliente_id',
    'empleado_id',
    'libro_id'
  ])
);

// ================= SERVER =================
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
