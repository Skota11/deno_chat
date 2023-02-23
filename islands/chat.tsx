import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export default function MyComponent(props: { data: [] }) {
  const socket = io("socket.skota11.com");

  socket.on("connect", () => {
    console.log(socket.connected); // true

    socket.emit("login", props.data);

    socket.on("member-post", (msg) => {
      console.log(msg);
    });
  });
  return (
    <>
      <div>
        <p>TEST</p>
      </div>
    </>
  );
}
