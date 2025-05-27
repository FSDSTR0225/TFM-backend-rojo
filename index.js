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

//Configuraciones
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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

app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});