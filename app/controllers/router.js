
const express = require('express');
const path = require('path');
const UsersRouter = require('../routes/users');
const adminUsersRouter = require('../routes/adminUsers');

const router = express.Router();
const mongoose = require('mongoose');

let mongoConnection = "mongodb+srv://admin:admin1@myapp.jvumsxh.mongodb.net/ProyectoFinalDW";
let db= mongoose.connection;
db.on('conecting', ()=>{
    console.log('Conectando...');
    console.log(mongoose.connection.readyState);
});
db.on('connected', ()=>{
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnection);

let userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    ScoreTable:{
        type: Array,
        required: true
    },
    Wins:{
        type: Number,
        required: true
    },
    Losses:{
        type: Number,
        required: true
    },
    Matches:{
        type: Number,
        required: true
    },
    Score:{
        type: Number,
        required: true
    },
});

const User = mongoose.model('users', userSchema);

router.get('/users', UsersRouter);
router.use('/api/users', UsersRouter);
router.use('/admin/api/users', validateAdmin ,adminUsersRouter);

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/Gato', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Gato.html")));
router.get('/Conecta4', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Conecta4.html")));
router.get('/Snake', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Snake.html")));
router.get('/Stats', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Stats.html")));


function validateAdmin (req, res, next){
    let auth = req.get('x-auth');
    if(auth === "admin"){ 
        console.log("Accediendo");
        next();
    }
    else{
        console.log("Acceso no autorizado, no se cuenta con privilegios de administrado");
        res.sendStatus(403);
    }

};

module.exports = router;