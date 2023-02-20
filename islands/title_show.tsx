import {
  animated,
  useSpring,
} from "https://esm.sh/react-spring@9.6.1?alias=react:preact/compat&deps=preact@10.11.0";

export default function MyComponent() {
  const springs = useSpring({
    from: { x: -500 },
    to: { x: 0 },
  });

  return (
    <animated.div
      style={{
        ...springs,
      }}
      class="h-48 inline-block"
    >
      <h1 class="text-8xl text-seagull">Mongrop</h1>
      <p class="my-4">快適なチャットを楽しもう</p>
    </animated.div>
  );
}
