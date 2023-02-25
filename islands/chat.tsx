import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState } from "preact/hooks";

export default function MyComponent(props: { data: [] }) {
  const socket = io("wss://socket-mongrop.onrender.com");

  socket.on("connect", () => {
    socket.emit("login", props.data);

    socket.on("log", (msg) => {
      const list = msglist;
      const li = document.createElement("p");
      li.innerHTML = `<span class="msg"> - ${msg.content}</span>`;
      list.appendChild(li, list.firstChild);
    });
    socket.on("newmsg", (msg) => {
      const list = msglist;
      const li = document.createElement("p");
      li.innerHTML = `<span class="msg"> - ${msg.content}</span>`;
      list.appendChild(li, list.firstChild);
    });
  });

  const pressEnter = (e: any) => {
    if (e.key == "Enter") {
      content.innerHTML = "";
      socket.emit("newmsg", content.textContent);
      return e.preventDefault();
    }
  };
  return (
    <>
      <div>
        <div class="w-48 rounded-md shadow-2xl h-screen bg-cloudy w-full float-right">
        </div>
        <div class="">
          <div id="msglist">
          </div>
          <div class="fixed w-10/12 bottom-0 mb-4 rounded-md w-full h-auto bg-cloudy">
            <div class="inline-block m-auto w-full h-auto">
              <div
                id="content"
                onKeyDown={(e) => pressEnter(e)}
                class="p-4 outline-0"
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
