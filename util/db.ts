import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const client = new Client({
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("DB_NAME"),
  hostname: Deno.env.get("DB_HOST"),
  password: Deno.env.get("DB_PASSWORD"),
  port: Deno.env.get("DB_PORT"),
});
await client.connect();

export async function db_GetUserFromToken(token: string) {
  const rows = await client.queryObject(
    "SELECT * FROM acount where ac = $1",
    [
      token,
    ],
  )
    .then((res) => {
      return res.rows[0];
    });
  return rows;
}
export async function db_SignInWithNameAndPassword(name: string, pwd: string) {
  const check: [] = await client.queryObject(
    "SELECT * FROM acount where name = $1",
    [name],
  ).then(
    (res) => {
      if (res.rows.length !== 0) {
        return bcrypt.compare(pwd, res.rows[0].password).then(
          (isCorrectPassword) => {
            if (isCorrectPassword) {
              return [true, res.rows[0]];
            } else {
              return [false, []];
            }
          },
        );
      } else {
        return [false, []];
      }
    },
  );
  return check;
}
export async function db_Register(
  name: string,
  password: string,
  display_name: string,
) {
  return await client.queryObject("SELECT * FROM acount where name = $1", [
    name,
  ]).then(
    (res) => {
      if (res.rows.length !== 0) {
        return [false, []];
      } else {
        return bcrypt.hash(password).then((hashed) => {
          return client.queryObject(
            "INSERT INTO acount (name,display_name,img_url,password) VALUES ($1, $2 ,$3,$4)",
            [name, display_name, "https://example.com", hashed],
          ).then(async (res) => {
            return await client.queryObject(
              "SELECT * FROM acount where name = $1",
              [name],
            ).then((res) => {
              return [true, res.rows[0]];
            });
          });
        });
      }
    },
  );
}
