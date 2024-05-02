const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');

router.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
router.use(express.json());

let mongoConnection = "mongodb+srv://admin:admin1@myapp.jvumsxh.mongodb.net/ProyectoFinalDW";
let User;
mongoose.connect(mongoConnection).then(function(){
    User = mongoose.models['users']
});



router.put('/', (req, res) => {
    console.log("Actualizando información...");
    let id = req.body._id
    let nombre = req.body.nombre
    let correo = req.body.correo
    let pass = req.body.pass
    let img = req.body.img
    let ScoreTable = req.body.ScoreTable
    let Wins = req.body.Wins
    let Losses = req.body.Losses
    let Matches = req.body.Matches
    let Score = req.body.Score

    let object_to_update = {}
    let flag_updated = false;
    
    if(nombre != undefined && correo != undefined && pass != undefined && 
       img != undefined && ScoreTable != undefined && Wins != undefined && 
       Losses != undefined && Matches != undefined && Score != undefined ){
        
        object_to_update.nombre = nombre
        object_to_update.correo = correo
        object_to_update.pass = pass
        object_to_update.img = img
        object_to_update.ScoreTable = ScoreTable
        object_to_update.Wins = Wins
        object_to_update.Losses = Losses
        object_to_update.Matches = Matches
        object_to_update.Score = Score
        flag_updated = true;
    }

    console.log(id);
    if(flag_updated){
        User.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
            console.log("Usuario actualizado:");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    }
    else{
        res.send("No se ha actualizado");
    }
});


module.exports = router;
