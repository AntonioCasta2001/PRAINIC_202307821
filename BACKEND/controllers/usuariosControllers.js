const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = (req, res) => {
  const { nombre, correo, contrasena, registro_academico } = req.body;
  const hash = bcrypt.hashSync(contrasena, 10);

  db.query(
    'INSERT INTO usuarios (nombre, correo, contrasena, registro_academico) VALUES (?, ?, ?, ?)',
    [nombre, correo, hash, registro_academico],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Usuario registrado' });
    }
  );
};

exports.login = (req, res) => {
  const { correo, contrasena } = req.body;

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

    const usuario = results[0];
    const valido = bcrypt.compareSync(contrasena, usuario.contrasena);
    if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};