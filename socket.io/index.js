const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("login", (msg)=>{
    socket.user_id = msg.user_id;
    socket.name = msg.name;
    socket.display_name = msg.display_name;
    socket.img = msg.img_url;

    console.log(socket)

    socket.emit("log",{type:0,content:`@${socket.name}が入室しました。`})
  });
  socket.on("login", (msg)=>{
    socket.user_id = msg.id;
    socket.name = msg.name;
    socket.display_name = msg.display_name;
    socket.img = msg.img_url;

    console.log(socket)

    socket.emit("newmsg",{content:`@${socket.name}が入室しました。`})
  });
  socket.on("newmsg", (msg)=>{
    socket.emit("newmsg",{name:socket.name , display_name:socket.display_name , img:socket.img ,content:`@${socket.name}が入室しました。`})
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(10000, ()=>{
  console.log("listening on *:10000");
});
