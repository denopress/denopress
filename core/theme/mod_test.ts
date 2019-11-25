#!/usr/bin/env deno run --allow-run --allow-net

import { testing, asserts, bufio } from "./../../deps.ts";

const { test } = testing;
const { assertEquals } = asserts;
const { BufReader } = bufio;
const run = Deno.run;

const testAddr = "127.0.0.1:5001";

const testSite = `http://${testAddr}`;

let httpServer: any;

async function startHTTPServer() {
  httpServer = run({
    args: [Deno.execPath(), "run", "--allow-all", "core/theme/mod_example.ts", ".", "--cors"],
    stdout: "piped"
  });
  const buffer = httpServer.stdout;
  const bufReader = new BufReader(buffer);
  for (let i = 0; i < 11; i++) {
    await bufReader.readLine();
  }
}

function closeHTTPServer() {
  httpServer.close();
  httpServer.stdout.close();
}

function sleep(time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

test(async function startThemeLoaderServer() {
  await startHTTPServer();
  await sleep(1000);
  assertEquals(1, 1);
})

test(async function themeRender() {
  try {
    const res = await fetch(`${testSite}/page/theme_demo/testing`);
    const result = await res.text();
    const expectResult = `<html ><head ><title >testing</title></head><body ><p >hello world</p></body></html>`;
    assertEquals(expectResult, result);
    // closeHTTPServer();
  } catch (err) {
    // closeHTTPServer();
    throw new Error(err);
  }
});

test(async function themeFrontGetAPI() {
  const res = await fetch(`${testSite}/api/testFront/getData`);
  const result = await res.json();
  assertEquals(result, { type: "front", todolist: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] });
});


test(async function themeFrontPostAPI() {
  const res = await fetch(`${testSite}/api/testFront/postData`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: "a=1&b=2&c=3", // body data type must match "Content-Type" header
  });
  const result = await res.json();
  assertEquals(result, { type: "front", body: {"a":"1","b":"2","c":"3"} });
});

test(async function themeServerAPI() {
  const res = await fetch(`${testSite}/page/theme_demo/server_api`);
  const result = await res.text();
  const expectResult = `<html >    <head >    <title >server api</title>    </head><body >    <p >type: server    </p><ul >                    <li >        0: 0          </li>              <li >        1: 1          </li>              <li >        2: 2          </li>              <li >        3: 3          </li>              <li >        4: 4          </li>              <li >        5: 5          </li>              <li >        6: 6          </li>              <li >        7: 7          </li>              <li >        8: 8          </li>              <li >        9: 9          </li>              </ul></body></html>`;
  assertEquals(result, expectResult);
});

test(async function closeThemeLoaderServer() {
  await closeHTTPServer();
  assertEquals(1, 1);
})
