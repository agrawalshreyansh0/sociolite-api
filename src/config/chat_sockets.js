module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", (socket) => {
    console.log("new Connection recieved", socket.id);

    socket.on("disconnect", () => {
      console.log("socket disconnected!");
    });

    socket.on("join_room", (data) => {
      console.log("joining request recieved : ", data);
      socket.join(data.chatroom);
      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send_message", (data) => {
      console.log(data);
      io.in(data.chatroom).emit("recieve_message", data);
    });
  });
};
