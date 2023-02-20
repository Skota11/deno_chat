import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export default function MyComponent(props: { target: [] }) {
  const socket = io("wss://mongrop.skota11.com/socket.io/");
  // サーバに接続できた場合のイベント処理を定義する
  return (
    <>
      <div class="bg-spring_wood h-16">
        <p>TEST</p>
      </div>
    </>
  );
}
