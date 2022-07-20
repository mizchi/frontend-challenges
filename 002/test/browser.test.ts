import { test, expect } from "vitest";
import { setupBrowser } from "../../__testutils/browser"

const br = setupBrowser();

const expected = '<div id="root"><button>root</button></div><div id="a">-<button>a</button></div><div id="aa">--<button>aa</button></div><div id="aaa">---<button>aaa</button></div><div id="aab">---<button>aab</button></div><div id="aac">---<button>aac</button></div><div id="aad">---<button>aad</button></div><div id="b">-<button>b</button></div><div id="baa">--<button>baa</button></div><div id="bab">--<button>bab</button></div><div id="bac">--<button>bac</button></div><div id="bad">--<button>bad</button></div><div id="c">-<button>c</button></div><div id="d">--<button>d</button></div><div id="e">---<button>e</button></div><div id="f">----<button>f</button></div>';

test("test", async () => {
  const browser = await br.getBrowser();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await page.waitForSelector('#app');

  expect(
    await page.$eval("#app", el => el.innerHTML),
    expected
  );

  expect(
    await page.evaluate(() => document.querySelector("#root")!.textContent),
    "root"
  );
  await page.click('#root > button');

  expect(
    await page.evaluate(() => document.querySelector("#root")!.textContent),
    "*root"
  );

  await page.click('#f > button');
  await page.click('#f > button');
  await page.click('#f > button');

  expect(
    await page.evaluate(() => document.querySelector("#f")!.textContent),
    "----***f"
  );
});