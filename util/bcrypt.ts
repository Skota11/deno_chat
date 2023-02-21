import {
  compare as comparePromise,
  compareSync,
  hash as hashPromise,
  hashSync,
} from "https://deno.land/x/bcrypt/mod.ts";

export const isRunningInDenoDeploy = Deno.permissions?.query === undefined; // This is crude check for if the code in running in Deno Deploy. It works for now but may not work in the future.

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
    new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;
export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
    new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;