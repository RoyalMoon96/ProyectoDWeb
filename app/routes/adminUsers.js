const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
router.use(express.json());

let mongoConnection = "mongodb+srv://admin:admin1@myapp.jvumsxh.mongodb.net/ProyectoFinalDW";
let User;
mongoose.connect(mongoConnection).then(function(){
    User = mongoose.models['users']
});

/*
router.post('/', (req, res) => {
    console.log("Guardando usuario...");
    // Información que va a tener nuestro nuevo registro
    let newUser = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        pass: req.body.pass,
        img: req.body.img,
        Wins: 0,
        Losses:0,
        Matches: 0,
        Score: 0,
        ScoreTable: [["Ronda", "Winer", "Looser"]]
    };
    // A partir de la información y el modelo, hacemos un usuario
    let user = User(newUser);
    // Guardamos el usuario en la BD (OJO, es asíncrono)
    user.save().then((doc) => {
        console.log("Usuario creado: " + doc);
        res.send('Usuario creado exitosamente: ' + doc);
    });
});
*/
router.post('/', (req, res) => {
    console.log("Guardando usuario...");

    // Encriptar la contraseña con 10 iteraciones
    bcrypt.hash(req.body.pass, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).send('Error al encriptar la contraseña');
        }

        // Información que va a tener nuestro nuevo registro
        let newUser = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            pass: hashedPassword, // Guardar la contraseña encriptada
            img: req.body.img,
            Wins: 0,
            Losses: 0,
            Matches: 0,
            Score: 0,
            ScoreTable: [["Ronda", "Winer", "Looser"]]
        };

        // A partir de la información y el modelo, hacemos un usuario
        let user = User(newUser);

        // Guardamos el usuario en la BD (OJO, es asíncrono)
        user.save().then((doc) => {
            console.log("Usuario creado: " + doc);
            res.send('Usuario creado exitosamente: ' + doc);
        });
    });
});

/*
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
*/


router.put('/', (req, res) => {
    console.log("Actualizando información...");
    let id = req.body._id;
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let pass = req.body.pass;
    let img = req.body.img;
    let ScoreTable = req.body.ScoreTable;
    let Wins = req.body.Wins;
    let Losses = req.body.Losses;
    let Matches = req.body.Matches;
    let Score = req.body.Score;

    let object_to_update = {};
    let flag_updated = false;
    users = User.find({
        correo: req.body.correo
    }).then((users) => {
        try {
            users[0].nombre;
            console.log("nombre: "+users[0].nombre);
        } catch {
            console.log("Not Found");
            res.send("Not Found");
        }
    // Encriptar la nueva contraseña con 10 iteraciones
    console.log("Encriptar? "+ !bcrypt.compareSync(pass,users[0].pass))
    if (pass!=users[0].pass) {
        let hashedPassword=bcrypt.hashSync(pass, 10)
        if (nombre !== undefined && correo !== undefined && hashedPassword !== undefined &&
            img !== undefined && ScoreTable !== undefined && Wins !== undefined &&
            Losses !== undefined && Matches !== undefined && Score !== undefined) {
            object_to_update.nombre = nombre;
            object_to_update.correo = correo;
            object_to_update.pass = hashedPassword; // Guardar la contraseña encriptada
            object_to_update.img = img;
            object_to_update.ScoreTable = ScoreTable;
            object_to_update.Wins = Wins;
            object_to_update.Losses = Losses;
            object_to_update.Matches = Matches;
            object_to_update.Score = Score;
            flag_updated = true;
        }
     }else {
        object_to_update.nombre = users[0].nombre;
        object_to_update.correo = users[0].correo;
        object_to_update.pass = users[0].pass; // Guardar la contraseña encriptada
        object_to_update.img = users[0].img;
        object_to_update.ScoreTable = ScoreTable;
        object_to_update.Wins = Wins;
        object_to_update.Losses = Losses;
        object_to_update.Matches = Matches;
        object_to_update.Score = Score;
        flag_updated = true;
    } 

    console.log("ID: "+id);
    if (flag_updated) {
        console.log(object_to_update)
        User.findByIdAndUpdate(id, object_to_update, { new: true }).then((doc) => {
            console.log("Usuario actualizado:");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    } else {
        res.send("No se ha actualizado");
    }
});
});


router.delete('/', (req, res) => {
    console.log("Eliminando registro...");
    let id = req.body.id;
    User.findByIdAndDelete(id).then((doc) => {
        console.log("Usuario eliminado:");
        console.log(doc);
        res.send(doc);
    }).catch((err) => console.log(err));
});


module.exports = router;
