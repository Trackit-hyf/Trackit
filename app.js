const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv').config()
const port = 5000; 
 

const mongoose = require('mongoose')
const userRoutes = require('./routes/user-routes')
const assetsRoutes = require('./routes/assets-routes');
const checkAuth = require('./middleware/checkAuth');


app.use(bodyParser.json())


app.use('/api/users', userRoutes)
app.use(checkAuth)
app.use('/api/assets', assetsRoutes)


mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    `mongodb+srv://HYF-Ammar:HYF_ammar_HYF1234@cluster0-ptw2q.azure.mongodb.net/trackit?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('connected')
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
