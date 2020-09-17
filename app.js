const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();

const mongoose = require('./db/mongodb');
const userRoutes = require('./routes/user-routes');
const assetsRoutes = require('./routes/assets-routes');
const checkAuth = require('./middleware/checkAuth');
const updateAssetHourly = require('./utils/external-api');

updateAssetHourly();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use(checkAuth);
app.use('/api/assets', assetsRoutes);

app.listen(process.env.port);
