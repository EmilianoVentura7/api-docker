const express = require('express');
const cors = require('cors');  
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(cors());  // Habilita CORS para todas las rutas

app.use(express.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: '52.1.24.57',
  user: 'admin', // Usuario de la BD
  password: 'ventura571', // Contraseña de la BD
  database: 'dockerdb',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Guardar el intento de inicio de sesión en la base de datos
  const query = 'INSERT INTO logins (usuarios, contrasena, ingreso) VALUES (?, ?, NOW())';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error al registrar el login:', err);
      res.status(500).json({ message: 'Error al registrar el login' });
    } else {
      res.status(200).json({ message: 'Inicio de sesión registrado con éxito' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});