const express = require('express');
const cors = require('cors');
const { connectMongo } = require('./db/connect');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Api para traer numero de factura 
app.get('/numFact', async (req, res) => {
  try {
    const db = await connectMongo();
    const collection = db.collection('factura');
    // Conectar a la base de datos
    const factura = await collection.find().sort({ numFact: -1 }).limit(1).toArray();  // Obtener todos los documentos
    res.status(200).json(factura);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error en el servidor');
  }
});

// Api para traer todos los clientes
app.get('/cliente', async (req, res) => {
    try {
      const db = await connectMongo();
      const collection = db.collection('cliente');
      // Conectar a la base de datos
      const cliente = await collection.find().toArray();  // Obtener todos los documentos
      res.status(200).json(cliente);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).send('Error en el servidor');
    }
  });

// Api para traer cliente por NitDoc
app.get('/cliente/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const db = await connectMongo();
      const collection = db.collection('cliente');
      // Conectar a la base de datos
      const cliente = await collection.find({NitDoc: id}).toArray();  // Obtener todos los documentos
      res.status(200).json(cliente);
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      res.status(500).send('Error en el servidor');
    }
  });  
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });