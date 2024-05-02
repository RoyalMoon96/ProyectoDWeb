
const express = require('express');
const path = require('path');
const UsersRouter = require('../routes/users');

const router = express.Router();

router.get('/users', UsersRouter);
router.use('/api/users', UsersRouter);

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