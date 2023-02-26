const app  = require("express")();
const http = require("http").createServer(app);

const cors = require('cors')

app.use(cors())

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

  let nowlogin = [];
  let usernum = [];

  app.get("/api/nowlogin", (req, ex_res) => {
    ex_res.json({
      nowlogin: nowlogin
    })
  })

io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("login", (msg)=>{
    socket.user_id = msg.user_id;
    socket.name = msg.name;
    socket.display_name = msg.display_name;
    socket.img = msg.img_url;

    if (usernum[socket.name] == undefined) {
      usernum[socket.name] = 0;
    }
    usernum[socket.name] = usernum[socket.name] + 1;
    if (nowlogin.includes(socket.name)) {
    } else {
      nowlogin[nowlogin.length] = socket.name;
    }
    io.emit("log",{content:`@${socket.name}が入室しました。`})
  });
  socket.on("newmsg", (msg)=>{
    console.log(msg)
    io.emit("newmsg",{"id":createRandomId(),"name":socket.name , "display_name":socket.display_name , "img":socket.img , "content":msg});
  });
  socket.on("disconnect", () => {
    io.emit("log",{content:`@${socket.name}が退出しました。`})
      usernum[socket.username] = usernum[socket.username] - 1;
      console.log(usernum)
      if (usernum[socket.username] == 0) {
        for (i = 0; i < nowlogin.length; i++) {
          if (nowlogin[i] == socket.username) {
            //spliceメソッドで要素を削除
            nowlogin.splice(i, 1);
            break;
          }
        }
      } else {}
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(5000, ()=>{
  console.log("listening on *:5000");
});
