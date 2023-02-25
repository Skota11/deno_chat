import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState } from "preact/hooks";

export default function MyComponent(props: { data: [] }) {
  const [messages, setMsgObject] = useState([]);

  const socket = io("wss://socket.skota11.com");

  socket.on("connect", () => {
    console.log(socket.connected); // true

    socket.emit("login", props.data);

    socket.on("log", (msg) => {
      const Obj = messages;
      Obj.push(msg);
      setMsgObject(Obj);
    });
  });

  const pressEnter = (e: any) => {
    // ここでエンターキーを指定する
    if (e.key == "Enter") {
      document.getElementById("content").innerHTML = "";
      return e.preventDefault();
    }
  };
  console.log(messages);
  return (
    <>
      <div>
        <div class="w-48 rounded-md shadow-2xl h-screen bg-cloudy w-full float-right">
          <p>TEST</p>
        </div>
        <div class="">
          <div id="msglist">
            {messages.map((message) => {
              if (message.type == 0) {
                return <p>{message.content}</p>;
              } else if (message.type == 1) {
              }
            })}
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
