import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState } from "preact/hooks";

const socket = io("socket.skota11.com");

export default function MyComponent(props: { data: [] }) {
  const [online, setOnline] = useState();
  let username_g = props.data.name;
  let lastm;
  let stopserver = false;

  socket.on("connect", () => {
    socket.emit("login", props.data);

    socket.on("log", (msg) => {
      const pst = msgpst;
      const p = document.createElement("p");
      p.innerHTML = `<span class="msg"> - ${msg.content}</span>`;
      pst.appendChild(p, pst.firstChild);
    });
    socket.on("newmsg", (msg) => {
      const pst = msgpst;
      const content_div = document.createElement("div");
      const today = new Date();
      var Hour = today.getHours();
      var Min = today.getMinutes();
      var Sec = today.getSeconds();
      console.log(msg);
      content_div.innerHTML =
        `<div class="msg"><div style="display:flex; gap:0.5em;"><img src="${msg.img}" class="userimg"/><span>${msg.display_name}@${msg.name}</span><span class="nowdate">${Hour}:${Min}:${Sec}</span></div><hr style="margin: 0.5em 0;"><div>${msg.content}</div></div>`;
      pst.appendChild(content_div, pst.firstChild);
    });
  });

  const pressEnter = (e: any) => {
    if (e.key == "Enter") {
      if (document.getElementById("content").textContent !== "") {
        socket.emit("newmsg", document.getElementById("content").textContent);
        content.innerHTML = "";
      }
      return e.preventDefault();
    }
  };

  setInterval(check_mamber, 1000);
  function check_mamber() {
    fetch("https://socket.skota11.com/api/nowlogin").then((res) => {
      res.json().then((text) => {
        console.log(text);
        if (!text.nowlogin.includes(username_g)) {
          if (!stopserver) {
            location.reload();
            stopserver = true;
          }
        }
        if (lastm !== text.nowlogin.length) {
          lastm = text.nowlogin.length;
          const content = text.nowlogin;
          setOnline(content);
        }
      });
    });
  }
  return (
    <>
      <div>
        <div class="w-48 rounded-md shadow-2xl pt-28 h-full bg-cloudy float-right fixed bottom-0">
          <div>{online}</div>
        </div>
        <div class="ml-48">
          <div id="msgpst">
          </div>
          <div class="fixed bottom-0 mb-4 rounded-md w-full h-auto bg-cloudy">
            <div class="inpne-block m-auto w-full h-auto">
              <div
                id="content"
                onKeyDown={(e) => pressEnter(e)}
                class="p-4 outpne-0"
                contenteditable="true"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
