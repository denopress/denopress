import { ThemeServer } from "./../core/theme/mod.ts";

const addr = "127.0.0.1:8001";
const baseDir: string = [Deno.cwd(), 'themes'].join("/");
const server = new ThemeServer(addr, {
  path: baseDir,
  themeList: [
    "portal",
  ]
})

async function main() {
  await server.start();
  console.log('------- portal ------');
}

main();