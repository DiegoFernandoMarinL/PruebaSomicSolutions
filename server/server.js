const express = require('express');
const { connectMongo } = require('./db/connect');

const app = express();
const port = 5000;

app.use(express.json());
app.get('/', async (req, res) => {
    try {
      const db = await connectMongo();
      const collection = db.collection('cliente');
      // Conectar a la base de datos
      const cliente = await collection.find().toArray();  // Obtener todos los documentos
      res.status(200).json(cliente);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error en el servidor');
    }
  });

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });