import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.145.0/http/cookie.ts";
//db
import { db_GetUserFromToken } from "../util/db.ts";
//dom
import Common_head from "../libs/common_head.tsx";
import Header from "../islands/header.tsx";
//islands
import Button from "../islands/home_button.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const token = cookies.ac;
    if (token == null) {
      const response = new Response("", {
        status: 303,
        headers: { Location: "/" },
      });

      return response;
    } else {
      const User = await db_GetUserFromToken(token);
      return await ctx.render(User);
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
        <div class="ml-28 pt-28">
          <h1 class="text-2xl my-4">ホーム</h1>
          <div class="border-l-4 pl-4 my-12">
            <p class="text-xl">
              <i class="fa-regular fa-bell"></i>通知
            </p>
            <div class="m-4">
              <ul>
                <li>お知らせ</li>
              </ul>
            </div>
          </div>
          <Button />
        </div>
      </body>
    </>
  );
}
