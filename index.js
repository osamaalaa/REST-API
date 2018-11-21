const express = require('express');
const app = express();

const routes = require('./routes/api');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use((err, req, res, next)=>{
  // console.log(err);
  res.status(422).send({error: err.message});


});

app.use('/api', routes);





app.listen(process.env.port || 4000, function(){
  console.log('listening .... ');



});
