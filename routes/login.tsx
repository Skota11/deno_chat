import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.145.0/http/cookie.ts";
//db
import {
  db_GetUserFromToken,
  db_SignInWithNameAndPassword,
} from "../util/db.ts";
//dom
import Common_head from "../libs/common_head.tsx";
import Header from "../islands/header.tsx";
//islands

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
  async POST(req, ctx) {
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const password = formData.get("password")?.toString();

    const SingIn = await db_SignInWithNameAndPassword(name, password);
    if (SingIn[0]) {
      const response = new Response("", {
        status: 303,
        headers: { Location: "/home" },
      });

      setCookie(response.headers, {
        name: "ac",
        value: SingIn[1].ac,
        secure: true,
        httpOnly: true,
      });

      return response;
    } else {
      const response = new Response("", {
        status: 303,
        headers: { Location: "/login" },
      });

      return response;
    }
  },
};

export default function Home({ data }: PageProps) {
  return (
    <>
      <Head>
        <Common_head />
        <title>Mongrop</title>
      </Head>
      <body class="bg-wild_sand pb-16">
        <Header data={data} />
        <div class="mx-28 pt-28">
          <p class="text-xl">
            始めるには、あなたのユーザーネームとパスワードを入力してください。
          </p>
          <div class="w-full bg-spring_wood h-56 my-8 grid grid-cols-1 gap-8 place-content-center rounded-md shadow-xl pl-4">
            <form action="" method="post">
              <div class="my-4">
                <label class="mr-8" htmlFor="name">
                  ユーザーネーム
                </label>
                <input
                  id="name"
                  class="bg-martinique text-wild_sand outline-0"
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div class="my-4">
                <label class="mr-8" htmlFor="password">
                  パスワード
                </label>
                <input
                  id="password"
                  class="bg-martinique text-wild_sand outline-0"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <input type="submit" value="ログイン" />
            </form>
          </div>
          <p class="my-4">もしくは、新規登録ですか?</p>
          <p>
            <a
              href="/register"
              class="bg-blue-700 hover:bg-blue-600 text-white rounded px-4 py-2 mx-4"
            >
              新規登録
            </a>
          </p>
        </div>
      </body>
    </>
  );
}
