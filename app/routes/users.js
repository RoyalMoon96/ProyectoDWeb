const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
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
    router.get('/', (req, res) => {
        console.log('Consultando Usuarios');
        let password = req.query.pass
        if (password==undefined||password==null){
            users = User.find({
                correo:req.query.correo
            }).then((users) => {try{res.send(users[0].nombre)}catch{res.send("Not Found")};
            })
        }else{
            users = User.find({
                correo:req.query.correo, 
                pass:req.query.pass, 
            }).then((users) => {try{res.send(users)}catch{res.send("Not Found")};})
        }        
    })
 */

router.get('/', (req, res) => {
    console.log('Consultando Usuarios');
    let password = req.query.pass;
    if (password === undefined || password === null) {
        users = User.find({
            correo: req.query.correo
        }).then((users) => {
            try {
                res.send(users[0].nombre);
            } catch {
                res.send("Not Found");
            }
        });
    } else {
        users = User.find({
            correo: req.query.correo
        }).then((users) => {
            if (users.length === 0) {
                res.send("Not Found");
            } else {
                const user = users[0];
                //console.log("Password correcto?: "+ bcrypt.compareSync(password,user.pass))
                bcrypt.compare(password, user.pass, (err, result) => {
                    if (err) {
                        console.error('Error al comparar las contraseñas:', err);
                        res.status(500).send('Error al comparar las contraseñas');
                    } else if (result) {
                        res.send(users);
                    } else {
                        res.send("Not Found");
                    }
                });
            }
        }).catch((err) => {
            console.error('Error al buscar el usuario:', err);
            res.status(500).send('Error al buscar el usuario');
        });
    }
});
/* 
    let newUser = {nombre:"User2",correo:"usuario1@usuarios.com",pass:"pass1"
};
    let user = new User (newUser);
    user.save().then((doc) => console.log("User creado: "+doc));

 */
    module.exports = router;
