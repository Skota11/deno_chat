import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState } from "preact/hooks";

export default function MyComponent(props: { data: [] }) {
  const [messages, setMsgObject] = useState(0);

  const socket = io("wss://socket-mongrop.onrender.com");

  socket.on("connect", () => {
    socket.emit("login", props.data);

    socket.on("log", (msg) => {
      const Obj = messages + 1;
      setMsgObject(Obj);
    });
  });

  const pressEnter = (e: any) => {
    if (e.key == "Enter") {
      document.getElementById("content").innerHTML = "";
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
            {
              /* {messages.map((message) => {
              console.log(message);
              if (message.type == 0) {
                return <p>{message.content}</p>;
              } else if (message.type == 1) {
              }
            })} */
            }
            {messages}
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
