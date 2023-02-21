import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.145.0/http/cookie.ts";
//db
import { db_GetUserFromToken } from "../util/db.ts";
//dom
import Common_head from "../libs/common_head.tsx";
import Header from "../islands/header.tsx";
//islands
import Title from "../islands/title_show.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const token = cookies.ac;
    if (token == null) {
      return ctx.render([]);
    } else {
      const User = await db_GetUserFromToken(token);
      return await ctx.render(User);
    }
  },
};

export default function Home({ data }: PageProps) {
  console.log(data);
  const nowlogin = (res) => {
    if (res == null) {
      return (
        <>
          <a
            href="/login"
            class="bg-green-700 hover:bg-green-600 text-white rounded px-4 py-2 mx-4"
          >
            ログイン
          </a>
          <a
            href="/register"
            class="bg-blue-700 hover:bg-blue-600 text-white rounded px-4 py-2 mx-4"
          >
            新規登録
          </a>
        </>
      );
    } else {
      return (
        <a
          href="/home"
          class="bg-green-700 hover:bg-green-600 text-white rounded px-4 py-2 mx-4"
        >
          ホーム
        </a>
      );
    }
  };
  return (
    <>
      <Head>
        <Common_head />
        <title>Mongrop</title>
      </Head>
      <body class="bg-wild_sand pb-16">
        <Header data={data} />
        <div class="ml-28 pt-28">
          <Title />
          <div class="grid grid-cols-1 gap-8 place-content-center h-48">
            <i class="fa-regular fa-message text-6xl text-xanadu"></i>
            <p>
              たまたまいたユーザーたちとチャットを楽しもう。はじめての人も、きっと歓迎してくれるはず！
            </p>
            <p>
              オンラインのユーザーとリアルタイムでチャットすることが出来ます。チャットを後で見直すことは出来ません。
            </p>
          </div>
          <div class="grid grid-cols-1 gap-8 place-content-center h-56">
            <i class="fa-solid fa-door-open text-6xl text-xanadu"></i>
            <p>ルームに入っているユーザーとチャットを楽しもう。</p>
            <p>
              ルームにユーザーを追加して、リアルタイムでチャットすることが出来ます。チャットを後で見ることが出来ます。
            </p>
          </div>
        </div>
        <div class="h-56 w-full grid grid-cols-1 place-content-center">
          <div class="place-self-center">
            <h1 class="text-4xl">Developer</h1>
            <a href="https://github.com/Skota11">
              <i class="mr-2 fa-brands fa-github text-4xl"></i>
            </a>
            <a href="https://twitter.com/Kota_pclive">
              <i class="m-2 fa-brands fa-twitter text-4xl"></i>
            </a>
            <div class=" my-2 grid grid-cols-2 place-content-center">
              <img
                src="https://avatars.githubusercontent.com/u/91359399"
                alt="Developer-icon"
                class="w-24 h-24"
              />
              <p class="place-self-center">
                Skota11(こた)<br />@Kota_pclive
              </p>
            </div>
          </div>
        </div>
        <div class="ml-28">
          <h1 class="text-4xl text-killarney my-4">さぁ始めましょう</h1>
          {nowlogin(data.name)}
        </div>
      </body>
    </>
  );
}
