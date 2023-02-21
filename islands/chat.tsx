import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export default function MyComponent(props: { target: [] }) {
  const socket = io("wss://mong-deno-s.deno.dev//socket.io/");
  // サーバに接続できた場合のイベント処理を定義する
  return (
    <>
      <div>
        <p>TEST</p>
      </div>
    </>
  );
}
