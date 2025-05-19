
const mongoose = require("mongoose");
require("dotenv").config();

//Routers Main

//Configuraciones
const app = require('./app')
const port = process.env.PORT;


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
  });


app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});