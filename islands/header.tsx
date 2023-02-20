import {
  animated,
  useSpring,
} from "https://esm.sh/react-spring@9.6.1?alias=react:preact/compat&deps=preact@10.11.0";
export default function MyComponent(props: { data: [] }) {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 0 },
  });

  const nowlogin = (res) => {
    if (res == null) {
      return (
        <p class="text-marzipan">
          <i class="fa-regular fa-user"></i> ログインしていません
        </p>
      );
    } else {
      return (
        <p class="text-marzipan">
          <i class="fa-regular fa-user"></i> {res}でログイン中
        </p>
      );
    }
  };

  return (
    <>
      <animated.div
        style={{
          ...springs,
        }}
        class="z-50 fixed left-0 top-0 w-full rounded-md shadow-xl mb-16 h-16 bg-st_tropaz"
      >
        <h1 class="inline-block text-2xl ml-2 text-wild_sand">
          <a href="/">Mongrop</a>
        </h1>
        <div class="inline ml-8 text-alabaster">
          <p class="inline-block ml-4 text-alabaster">
            <a href="/home">Home</a>
          </p>
          <p class="inline-block ml-4 text-alabaster">
            <a href="/chat">Chat</a>
          </p>
          <p class="inline-block ml-4 text-alabaster">
            <a href="/room">Room</a>
          </p>
        </div>
        {nowlogin(props.data.name)}
      </animated.div>
    </>
  );
}
