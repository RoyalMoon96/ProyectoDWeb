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
