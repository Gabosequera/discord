const express = require("express");
const app = express();

app.use(express.json());


let messages = [{id: 0, text: "gabriel", createdAt: new Date(Date.now()).toUTCString()}]; //Crea un date Date.now(). Lo mete en un new Date object. Ejecuta funcion .toUTCString para poder leerlo

app.post("/notes", (req, res) => {
    const { text } = req.body;
    if (text.trim() === "") return res.status(400).json({error: "Text is required"});

    const newMessage = {
        id: messages.length,
        text,
        createdAt: new Date(Date.now()).toUTCString() //Crea un date Date.now(). Lo mete en un new Date object. Ejecuta funcion .toUTCString para poder leerlo
    };

    messages.push(newMessage);
    console.log(messages);

    res.status(201).json("Message created: " + messages);
});


app.get("/notes", (req, res) => {
    try {
        const { srchBy, limit } = req.query;
        if (srchBy === undefined) return res.json(messages);

        const message = messages.filter(m => m.text
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(
                srchBy.toLowerCase()
                .replace(/\s+/g, "")
            ));
        if(!message) return res.status(400).json({error: "Message not found"});

        if (limit !== undefined) {
            const limitObjt = message.slice(0, limit);
            res.json({
                countCoincident: Object.keys(message).length,
                countLimit: Number(limit),
                message: limitObjt
            });
        }
        else res.json({count: Object.keys(message).length, message: message});

    } catch (error) {
        res.status(500).json("No se apa, se activo el catch error de el .get");
    }
});

app.get("/notes/:id", (req, res) => {
    const msgId = Number(req.params.id);

    const msgById = messages.find(m => m.id === msgId);
    if (!msgById) res.status(400).json({error: "id not found"});

    res.status(200).json(msgById);
});

app.patch("/notes/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (text.trim() === "") return res.status(400).json({error: "Text is required"});

    const updatedUser = messages.find(m => m.id === Number(id));

    if (text) {
        updatedUser.text = text;
        updatedUser.updatedAt = new Date(Date.now()).toUTCString();
    }
    res.status(200).json(updatedUser);

});

app.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    
    try {
        const messageId = messages.find(m => m.id === Number(id));
        console.log("messageid " + messageId);
        console.log("typeof " + typeof(messageId));

        
        if (!messageId) return res.status(404).json({error: "El indice no se encuentra"});

        deletedMsg = messages.find(m => m.id === Number(id));
        console.log("message: " + deletedMsg.text); 
    } catch (error) {
        res.status(10000).json("Problema en el catch de .delete");
    };

    messages = messages.filter(m => m.id !== Number(id));
    res.status(200).json({message: "Deleted"});

});


app.listen(3000, () => {
    console.log("Server running on http://3000");
});