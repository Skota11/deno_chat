import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export default function MyComponent(props: { data: [] }) {
  const socket = io("wss://socket.skota11.com");

  socket.on("connect", () => {
    console.log(socket.connected); // true

    socket.emit("login", props.data);

    socket.on("member-post", (msg) => {
      console.log(msg);
    });
    socket.on("log", (msg) => {
      const list = document.querySelector("#msglist");
      const li = document.createElement("p");
      li.innerHTML = `<span class="msg"> - ${msg}</span>`;
      list.appendChild(li, list.firstChild);
    });
  });
  return (
    <>
      <div>
        <div class="w-48 rounded-md shadow-xl h-screen bg-cloudy float-right">
          <p>TEST</p>
        </div>
        <div class="">
          <p>TEST</p>
        </div>
      </div>
    </>
  );
}
