const express = require("express");

require("dotenv").config();

//Routers Main
const userRouter = require("./routes/userRouter");
const offerRouter = require("./routes/offerRouter");
const projectRouter = require("./routes/projectRouter");
const recruiterRouter = require("./routes/recruiterRouter");
const devRouter = require("./routes/devRouter");

//Configuraciones
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});



app.use("/users", userRouter);
app.use("/offers", offerRouter);
app.use("/projects", projectRouter);
app.use("/recruiters", recruiterRouter);
app.use("/devs", devRouter);

module.exports=app