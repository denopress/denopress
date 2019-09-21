#! deno run --importmap ./import_map.json --allow-all  start.ts

import * as bufio from "io/bufio.ts";
import { readJsonSync } from "fs/read_json.ts";
import { writeJsonSync } from "fs/write_json.ts";

const run = Deno.run;
const { BufReader } = bufio;

interface DenoPressConfig {
  process: {
    [key: string]: {
      [key: string]: number;
    }
  }
}

async function main() {

  const portalProcess = run({
    args: ["deno", "run", "--importmap", "import_map.json",  "--allow-run", "--allow-net", "server/portal/mod.ts", ".", "--cors"],
    cwd: "./",
    stdout: "piped"
  })
  const buffer = portalProcess.stdout;
  const bufReader = new BufReader(buffer);
  await bufReader.readLine();
  console.log('portalProcess = ', portalProcess)

  const dashboardProcess = run({
    args: ["deno", "run", "--importmap", "import_map.json", "--allow-run", "--allow-net", "server/dashboard/mod.ts", ".", "--cors"],
    cwd: "./",
    stdout: "piped"
  })
  const dashboardBuf = dashboardProcess.stdout;
  const dashboardReader = new BufReader(dashboardBuf);
  await dashboardReader.readLine();
  console.log('dashboardProcess = ', dashboardProcess)

  // reset process config
  const denopressConfigPath = './.denopress/config.json';
  const config: DenoPressConfig = readJsonSync(denopressConfigPath) as DenoPressConfig;

  config.process.portal = {
    pid: portalProcess.pid,
    rid: portalProcess.rid
  };
  config.process.dashboard = {
    pid: dashboardProcess.pid,
    rid: dashboardProcess.rid
  };

  console.log(config);

  writeJsonSync(denopressConfigPath, config);
  
  console.log(`[Denoprocess]: start successfully!`);
}

main();
