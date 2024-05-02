const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
router.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
router.use(express.json());

let mongoConnection = "mongodb+srv://admin:admin1@myapp.jvumsxh.mongodb.net/ProyectoFinalDW";
let User;
mongoose.connect(mongoConnection).then(function(){
    User = mongoose.models['users']
});

    router.get('/', (req, res) => {
        console.log('Consultando Usuarios');
        users = User.find({
            correo:req.query.correo, 
            pass:req.query.pass, 
        }).then((users) => {res.send(users);})
        //console.table(products);
        
    })

/* 
    let newUser = {nombre:"User2",correo:"usuario1@usuarios.com",pass:"pass1"
};
    let user = new User (newUser);
    user.save().then((doc) => console.log("User creado: "+doc));

 */
    module.exports = router;
