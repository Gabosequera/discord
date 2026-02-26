const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());

app.get("/get", (req, res) => {
    console.log("app.get funciona bien");
    res.status(200).send("funciona");
});


io.on("connection", (socket) => { //Se crea la coneccion io.on
    console.log("User connected: " + socket.id);

    //Cliente envia el evento --> servidor escucha
    //El socke responde on "saludo", y devuelve la data
    socket.on("saludo", (data) => {
        console.log("Recibi: " + data); //Por ahora solo la imprime
        
    });


    //Servidor responde solo al que envio
    socket.on("ping", () => {
        socket.emit("pong", "Tu respuesta privada"); //Solo a socket.emit(usuario)
    });

    //Envia mensajes a todo
    socket.on("messaje", (msg) => {
        io.emit("nuevoMensaje", msg);
    });

    //Envia objeto
    socket.on("objeto", (objeto) => {
        console.log(objeto.nombre);
        console.log(objeto.apellido);
    });


    //Al desconectarse, lo imprime
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});


server.listen(3000, () => {
    console.log("Server running on http://3000");
});

