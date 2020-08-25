const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000; 
 

const mongoose = require('mongoose')
const userRoutes = require('./routes/user-routes')
const assetsRoutes = require('./routes/assets-routes')


app.use(bodyParser.json())


app.use('/api/users', userRoutes)
app.use('/api/assets', assetsRoutes)

//connect to database 
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
