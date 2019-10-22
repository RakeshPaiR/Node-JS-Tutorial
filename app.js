const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const expressValid = require('express-validator');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser);
app.use(expressValid());
app.use("/", postRoutes);
app.use("/", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Node JS API at: ${8080}`);
});
