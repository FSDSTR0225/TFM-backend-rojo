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

// Configurar URLs permitidas para CORS - Incluir específicamente Netlify
const allowedOrigins = [
    "https://codepply.netlify.app", // Frontend en Netlify (PRODUCCIÓN)
    process.env.SOCKET_URL, // Variable de entorno
    "http://localhost:3000", // React development
    "http://localhost:5173", // Vite development
    "http://localhost:4173", // Vite preview
    "http://127.0.0.1:5173", // Vite alternativo
].filter(Boolean); // Filtra valores undefined/null

console.log('🌐 Orígenes CORS permitidos:', allowedOrigins);

// Configuración CORS para Netlify y Render
app.use(cors({
    origin: function (origin, callback) {
        console.log('🔍 Request origin:', origin);
        
        // Permite requests sin origin (aplicaciones móviles, Postman, etc.)
        if (!origin) {
            console.log('✅ Permitiendo request sin origin');
            return callback(null, true);
        }
        
        if (allowedOrigins.includes(origin)) {
            console.log('✅ Origen permitido:', origin);
            callback(null, true);
        } else {
            console.log('🚫 Origen bloqueado por CORS:', origin);
            console.log('📋 Orígenes permitidos:', allowedOrigins);
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type", 
        "Authorization", 
        "x-access-token",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials"
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false
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

// Endpoint de diagnóstico CORS
app.get('/cors-test', (req, res) => {
    res.json({
        message: '✅ CORS funcionando correctamente',
        origin: req.headers.origin,
        socketUrl: process.env.SOCKET_URL,
        allowedOrigins: allowedOrigins,
        timestamp: new Date().toISOString(),
        userAgent: req.headers['user-agent']
    });
});

// Endpoint de salud del servidor
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

server.listen(port, () => {
  console.log(`🚀 Servidor iniciado en puerto ${port}`);
  console.log(`🌍 Orígenes CORS permitidos: ${allowedOrigins.join(', ')}`);
  console.log(`🔑 SOCKET_URL configurada: ${process.env.SOCKET_URL}`);
});
