const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const infoRouter = require('./routes/info');
const dailyController = require('./controllers/dailyController');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;


const cors = require('cors')
app.use(cors());

//hande parsing requrest body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')))

//define rounte handlers
app.use('/', infoRouter);

//allow for delete in forms
app.use(methodOverride('_method'))

//catch-all rounte handler for request to an unknow route
app.use((req, res) => res.status(404).send('This is not the page you are looking for...'));

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//open a connection to database
const source = process.env.DATABASE_URL
mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('DB connected');
})

//start server 
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
})

module.exports = app;