const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

http.listen(1234, () => {
  console.log("listening on *:1234");
});


io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    console.log(token);
    next();
  } catch (error) {
    next(error);
  }
});
io.sockets.on("connection", async (socket) => {
  console.log("new connection ");
  
  socket.on("disconnet", () => {
    console.log("Client disconnected!");
  });
});

module.exports = http;