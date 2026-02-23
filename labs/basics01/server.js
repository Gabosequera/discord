const express = require("express");
const app = express();

//Importa el HTML y lo usa
app.use(express.static("public"));
//Deja que express use JSON
app.use(express.json());
//-------------------------------------------------------------------------------------//
  


//Creo una lista con JSON adentro. Uso una .get con value (que puede cambiar) y si la request tiene como parametro algun valor que este en el JSON de users. Devuelve el objeto en el que se encuentra 
let users = [
    { id: 0, nombre: "gabriel", apellido: "bonilla" },
    { id: 1, nombre: "wendy", apellido: "sequera" }
];
app.get("/users/:value", (req, res) => {
    const { value } = req.params;
    const user = users.find(u => String(u.id) === value || u.nombre === value);
    
    if (!user) {
        return res.status(400).json({error: "User name not found"});
    }
    
    res.json(user);
});

//Anade a USERS, con el nombre enviado en el JSON usando post. ID + 1
app.post("/users", (req, res) => {
    const { nombre, apellido } = req.body;

    const newUser = {
        id: users.length,
        nombre,
        apellido
    };

    users.push(newUser);

    res.status(201).json(newUser);
    console.log(users);
});

//Anadir post que modifique valores por id. Cambiar nombre de id 0.

app.post("/")


//Mostrar users como lista HTML. Elejir con checkbox cual quieres cambiar. Input text para cambiar//Anadir post que modifique valores por id. Cambiar nombre de id 0.


//Borra users por id (borra todo el elemento con ese id)
app.delete("/users/:id", (req, res) => {
    //Filter crea un nuevo array SOLO, con los elementos que pasen la condicion
    userDeleted = () => users.id != req.params.id;
    console.log(userDeleted)
    users = users.filter(userDeleted);
    res.status(200).json("User deleted");
});

//Listar todos los users
app.get("/userslist/allUsers", (req, res) => {
    console.log(users);
    res.json(users);
});

//Espera una consulta en /ruta con dos parametros mas (category, id), request con req.params y los almacena en una const. Luego los envia como json
app.get("/product/:category/:id", (req, res) => {
    const { category, id } = req.params;

    res.json({
        category,
        id
    });
});

//Envio un json, con 3 clausulas
app.get("/api", (req, res) => {
    res.json({
        nombre: "gabriel",
        apellido: "tuputamadre",
        edad: 16
    });
});


//Este .get usar querry params y devuelve buscando + q (vale lo que sea que pongas en el input --> ver HTML)
app.get("/search", (req, res) => {
    const q = req.query.q;
    res.send("Buscando " + q);
});

//-------------------------------------------------------------------------------------//
app.listen(3000, () => {
    console.log("Server running on http://3000");
});
