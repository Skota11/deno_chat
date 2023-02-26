const app  = require("express")();
const http = require("http").createServer(app);

const crypto = require('crypto');
const io   = require("socket.io")(http,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  function createRandomId() {
    const S = '0123456789abcdefghijklmnopqrstuvwxyz';
    const L = 8;
    let buf = crypto.randomBytes(L);
    let rnd = '';
    for (var i = 0; i < L; i++) {
      rnd += S.charAt(Math.floor((buf[i] / 256) * S.length));
    }
    return rnd;
  }

io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("login", (msg)=>{
    socket.user_id = msg.user_id;
    socket.name = msg.name;
    socket.display_name = msg.display_name;
    socket.img = msg.img_url;

    console.log(socket)

    socket.emit("log",{content:`@${socket.name}が入室しました。`})
  });
  socket.on("newmsg", (msg)=>{
    console.log(msg)
    socket.emit("newmsg",{"id":createRandomId(),"name":socket.name , "display_name":socket.display_name , "img":socket.img , "content":msg.content});
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(5000, ()=>{
  console.log("listening on *:10000");
});
