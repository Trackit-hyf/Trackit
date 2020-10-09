const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

const mongoose = require('./db/mongodb');
const userRoutes = require('./routes/user-routes');
const assetsRoutes = require('./routes/assets-routes');
const checkAuth = require('./middleware/checkAuth');
const updateAssetHourly = require('./utils/external-api');


app.use(bodyParser.json());

updateAssetHourly();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use('/api/users', userRoutes);

app.use(checkAuth);

app.use('/api/assets', assetsRoutes);

app.listen(PORT, () => {
  console.log('app is listening to' + PORT);
});
