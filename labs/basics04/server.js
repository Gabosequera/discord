const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());

let messages = [];

function formatMessage(socketID, msg) {
    return {
        id: socketID,
        text: msg.text
    };
};

io.on("connection", (socket) => { //Se crea la coneccion io.on
    console.log("connect: " + socket.id);

    //Welcome message
    socket.emit("system:welcome", {
        message: "Bienvenido al chat",
        id: socket.id
    });
    


    //Envia el historial del chat
    socket.emit("chat:history", messages);

    function saveMessage(socketID, msg) {
        const newMessage = formatMessage(socketID, msg);
        messages.push(newMessage);
    };

    //Envia mensajes a todo
    socket.on("chat:send", (msg) => {
        saveMessage(socket.id, msg);
        io.emit("chat:newPublic", messages);
    });



    //Al desconectarse, lo imprime
    socket.on("disconnect", () => {
        console.log("disconnected: " + socket.id);
    });
});


server.listen(3000, () => {
    console.log("Server running on http://3000, basic04");
});

