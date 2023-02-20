import {
  animated,
  useSpring,
} from "https://esm.sh/react-spring@9.6.1?alias=react:preact/compat&deps=preact@10.11.0";

export default function MyComponent() {
  const [springs1, api1] = useSpring(() => ({
    from: { x: 0 },
  }));
  const [springs2, api2] = useSpring(() => ({
    from: { x: 0 },
  }));

  const onEnter1 = () => {
    api1.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    });
  };
  const onLeave1 = () => {
    api1.start({
      to: {
        x: 0,
      },
    });
  };
  const onEnter2 = () => {
    api2.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    });
  };
  const onLeave2 = () => {
    api2.start({
      to: {
        x: 0,
      },
    });
  };

  return (
    <>
      <animated.div
        style={{
          ...springs1,
        }}
        class="h-48 block w-11/12"
        onMouseEnter={onEnter1}
        onMouseLeave={onLeave1}
      >
        <h1 class="text-8xl text-xanadu">
          <a href="/chat">Chat</a>
        </h1>
      </animated.div>
      <animated.div
        style={{
          ...springs2,
        }}
        class="h-48 block w-11/12"
        onMouseEnter={onEnter2}
        onMouseLeave={onLeave2}
      >
        <h1 class="text-8xl text-xanadu">
          <a href="/room">Loom</a>
        </h1>
      </animated.div>
    </>
  );
}
