const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
router.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
router.use(express.json());


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
    userName: {
        type: String,
        required: true
    }
});
/* 
router.get('/api/users',(req, res) => {
    let nombre = "User1"
    User.find({
        nombre: {$regex: nombre},
        sexo:"H"
    }).then(function (docs){
        res.send(docs);
        console.log(docs);
    }).catch((err) => console.log(err));
    })
    
 */
    let User = mongoose.model('users', userSchema);

    router.get('/api/users', (req, res) => {
        console.log('Consultando Usuarios');
        users = User.find({
            nombre: "User2"
        }).then((users) => {res.send(users);})
        //console.table(products);
        
    })


    let newUser = {userName:"User2"};
    let user = new User (newUser);
    user.save().then((doc) => console.log("User creado: "+doc));


    module.exports = router;
