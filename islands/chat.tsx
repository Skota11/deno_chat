import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState } from "preact/hooks";

import {
  animated,
  useSpring,
} from "https://esm.sh/react-spring@9.6.1?alias=react:preact/compat&deps=preact@10.11.0";

const socket = io("socket.skota11.com");

export default function MyComponent(props: { data: [] }) {
  const [online, setOnline] = useState([]);
  const [play, setPlay] = useState([]);
  const [AddColumn_show, setAddColumn_show] = useState(false);
  let isopen = false;
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
      content_div.innerHTML =
        `<div class="msg"><div style="display:flex; gap:0.5em;"><img src="${msg.img}" class="userimg"/><span>${msg.display_name}@${msg.name}</span><span class="nowdate">${Hour}:${Min}:${Sec}</span></div><hr style="margin: 0.5em 0;"><div>${msg.content}</div></div>`;
      pst.appendChild(content_div, pst.firstChild);
    });
    socket.on("newplay", (msg) => {
      setPlay(msg);
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
        if (!text.nowlogin.includes(username_g)) {
        }
        if (lastm !== text.nowlogin.length) {
          lastm = text.nowlogin.length;
          const content = text.nowlogin;
          setOnline(content);
        }
      });
    });
  }

  //animation
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = () => {
    let towidth;
    if (isopen) {
      towidth = "100%";
      isopen = false;
    } else {
      towidth = "40%";
      isopen = true;
    }
    api.start({
      to: {
        width: towidth,
      },
    });
  };

  const AddColumn_showbtn = () => {
    setAddColumn_show(!AddColumn_show);
  };
  const AddColumn = () => {
    const url = AddColumn_input.value;
    socket.emit("newplay", url);
  };
  const AddColumn_shortcut_1 = () => {
    AddColumn_input.value = "https://togetheryoutube.skota11.repl.co/";
  };

  return (
    <>
      <div class="flex">
        <animated.div
          style={{
            ...springs,
          }}
          onClick={handleClick}
          class="w-2/5 rounded-md shadow-2xl bg-cloudy"
        >
          <div>
            {
              <>
                <div>
                  <p>{play.url}</p>
                  <iframe
                    width="100%"
                    height="500px"
                    allowtransparency="true"
                    src={play.url}
                    frameborder="0"
                  >
                  </iframe>
                </div>
              </>
            }
          </div>
          <div>
            <p>Online</p>
            {online.map((a) => <p>@{a}</p>)}
          </div>
          <div>
            <button
              onClick={AddColumn_showbtn}
              class="w-4/5 text-center border-4 m-4 h-12"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            {AddColumn_show && (
              <>
                <div class="p-4">
                  <button class="my-2" onClick={AddColumn_shortcut_1}>
                    ・TogetherYoutube
                  </button>
                  <p>
                    URL:<input id="AddColumn_input" type="text" />
                  </p>
                  <p>
                    <button onClick={AddColumn}>追加</button>
                  </p>
                </div>
              </>
            )}
          </div>
        </animated.div>
        <div class="w-full">
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
