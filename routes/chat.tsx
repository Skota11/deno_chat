import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.145.0/http/cookie.ts";
//db
import { db_GetUserFromToken } from "../util/db.ts";
//dom
import Common_head from "../libs/common_head.tsx";
import Header from "../islands/header.tsx";
//islands
import Chat from "../islands/chat.tsx";

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
        <link rel="stylesheet" href="chat.css" />
      </Head>
      <body class="bg-wild_sand pb-16">
        <Header data={data} />
        <div class="pt-28">
          <Chat data={data} />
        </div>
      </body>
    </>
  );
}
