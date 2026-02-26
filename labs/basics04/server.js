const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());

let messages = [];

function formatMessage(text, socketID) {
    return newMessge = {
        id: socketID,
        text: text
    };
};

io.on("connection", (socket) => { //Se crea la coneccion io.on
    console.log("connect: " + socket.id);
    socket.emit("system:welcome", {
        message: "Bienvenido al chat",
        id: socket.id
    });

    //Envia mensajes a todo
    socket.on("chat:send", (msg) => {
        io.emit("chat:newPublic", msg);
    });

    //Al desconectarse, lo imprime
    socket.on("disconnect", () => {
        console.log("disconnected: " + socket.id);
    });
});


server.listen(3000, () => {
    console.log("Server running on http://3000, basic04");
});

