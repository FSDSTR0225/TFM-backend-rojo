const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Routers Main
const userRouter = require("./routes/userRouter");
const offerRouter = require("./routes/offerRouter");
const projectRouter = require("./routes/projectRouter");
const recruiterRouter = require("./routes/recruiterRouter");
const devRouter = require("./routes/devRouter");
const experienceRouter = require("./routes/experienceRouter");
const studyRouter = require("./routes/studyRouter");
const messageRouter = require('./routes/messageRouter');
const settingsRouter = require("./routes/settingsRouter");
const uploadRouter = require('./routes/uploadRouter');
//Configuraciones del servidor 
const { app,server }= require("./utils/socket"); // Importa la instancia de Express desde socket.js
const port = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
// const server = app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
}));

app.options("*", cors({
  origin: CLIENT_URL, 
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
  });

app.use("/users", userRouter);
app.use("/offers", offerRouter);
app.use("/projects", projectRouter);
app.use("/recruiters", recruiterRouter);
app.use("/devs", devRouter);
app.use("/experiences", experienceRouter);
app.use("/studies", studyRouter);
app.use("/messages",messageRouter);
app.use("/settings", settingsRouter);

//upload images
app.use('/', uploadRouter);

server.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});
