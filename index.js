const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


//Routers Main
const userRouter = require('./routes/userRouter');


//Configuraciones
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log('✅ Conectado a MongoDB Atlas');
  })
  .catch((error)=>{
    console.error('❌ Error conectando a MongoDB:', error);
  })

  app.use('/user',userRouter);

  app.listen(port,()=>{
    console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
  });