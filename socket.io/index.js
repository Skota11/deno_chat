const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("login", (msg)=>{
    socket.user_id = msg.user_id;
    socket.name = msg.name;
    socket.display_name = msg.display_name;
    socket.img = msg.img_url;

    socket.emit("log",`@${socket.name}が入室しました。`)
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(5000, ()=>{
  console.log("listening on *:5000");
});
