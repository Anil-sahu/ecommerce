const express = require('express');
const { getAllProduct } = require('./controller/product.controller');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const product = require("./routes/product.route");
app.use("/api/v1", product);

const user = require("./routes/user.route");
app.use("/api/v1", user);
app.use(errorMiddleware);
module.exports = app;
