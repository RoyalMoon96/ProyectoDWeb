const express = require('express');

const router = require('./app/controllers/router.js');

const app = express()
const port = 3000;

app.use(express.static('app'));
app.use('/views',express.static('views'));


app.use(express.json());
app.use('',router);
app.listen(port, ()=>{
    console.log("Aplicación de ejemplo corriendo en puerto ",port);
});
