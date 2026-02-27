// REPOSITORY
// https://github.com/gitsaso-projects/ismael_vasco/tree/features/upload

// ================= IMPORTACIONES =================
const express = require('express');
const multer = require('multer');
const { parse } = require('csv-parse');
const { Pool } = require('pg');
const fs = require('fs');

// ================= CONFIG =========================
const app = express();
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()

// =================  CONEXION POOL ================= 
const pool = new Pool({
  user: process.env.USER_PSQL,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
// console.log(pool);

// ================= CREAR TABLAS =================
async function createTables() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cargo (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(45)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS empleado (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      apellido VARCHAR(100),
      cargo_id INT REFERENCES cargo(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cliente (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      apellido VARCHAR(100),
      email VARCHAR(45)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS categoria (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(55)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS editorial (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(55)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS autor (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS libro (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(100),
      autor_id INT REFERENCES autor(id),
      categoria_id INT REFERENCES categoria(id),
      editorial_id INT REFERENCES editorial(id),
      anio_publicacion INTEGER,
      precio DOUBLE PRECISION
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS prestamo (
      id SERIAL PRIMARY KEY,
      fecha_prestamo DATE,
      fecha_devolucion DATE,
      cliente_id INT REFERENCES cliente(id),
      empleado_id INT REFERENCES empleado(id),
      libro_id INT REFERENCES libro(id)
    );
  `);

//   console.log("Tablas creadas correctamente");
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
            const values = rows.map(r => {
              return `(${columns.map(col => `'${r[col]}'`).join(',')})`;
            }).join(',');

            await pool.query(
              `INSERT INTO ${table} (${columns.join(',')}) VALUES ${values}`
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

// EDITORIALES
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
