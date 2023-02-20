import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.145.0/http/cookie.ts";
//db
import { db_GetUserFromToken, db_Register } from "../util/db.ts";
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
    const display_name = formData.get("display_name")?.toString();
    const password = formData.get("password")?.toString();

    return await db_Register(name, password, display_name).then((Register) => {
      console.log(Register);
      if (Register[0]) {
        const response = new Response("", {
          status: 303,
          headers: { Location: "/home" },
        });

        setCookie(response.headers, {
          name: "ac",
          value: Register[1].ac,
          secure: true,
          httpOnly: true,
        });

        return response;
      } else {
        const response = new Response("", {
          status: 303,
          headers: { Location: "/register" },
        });

        return response;
      }
    });
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
            始めるには、あなたのユーザーネームとパスワードを登録してください。
          </p>
          <div class="w-full bg-spring_wood h-64 my-8 grid grid-cols-1 gap-8 place-content-center rounded-md shadow-xl pl-4">
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
                <label class="mr-8" htmlFor="display_name">
                  表示名
                </label>
                <input
                  id="display_name"
                  class="bg-martinique text-wild_sand outline-0"
                  type="text"
                  name="display_name"
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
              <div class="my-4">
                <label class="mr-8" htmlFor="agree">
                  下記に同意する
                </label>
                <input
                  id="agree"
                  class="bg-martinique text-wild_sand outline-0"
                  type="checkbox"
                  name="agree"
                  required
                />
                <ul>
                  <li>
                    <a class="underline" href="/terms">利用規約</a>
                  </li>
                </ul>
              </div>
              <input type="submit" value="新規登録" />
            </form>
          </div>
          <p class="my-4">もしくは、ログインですか?</p>
          <p>
            <a
              href="/login"
              class="bg-green-700 hover:bg-green-600 text-white rounded px-4 py-2 mx-4"
            >
              ログイン
            </a>
          </p>
        </div>
      </body>
    </>
  );
}
