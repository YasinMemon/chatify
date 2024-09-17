const io = require("socket.io")(8000, {
    cors: {
        origin: "*",  // You can specify the allowed origins here, e.g., "http://example.com"
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
const users = {}

io.on("connection", socket => {
    socket.on("newUserJoined", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });

    socket.on("send", message => {
        socket.broadcast.emit('receieve', { message: message, name: users[socket.id] });
    });

     socket.on("disconnect", message => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
     })
});

console.log("done");
