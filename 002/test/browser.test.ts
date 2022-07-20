import { test, expect } from "vitest";
import { setupBrowser } from "../../__testutils/browser"
import fs from "fs";

const expected = fs.readFileSync(__dirname + "/expected.txt", "utf8");

const br = setupBrowser();

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
    await page.evaluate(() => document.getElementById("r")!.textContent),
    "r"
  );
  await page.click('#r > button');
  expect(
    await page.evaluate(() => document.getElementById("r")!.textContent),
    "*r"
  );

  const deepId = 'r_2_2_0_1_0';
  await page.click(`#${deepId} > button`);
  await page.click(`#${deepId} > button`);
  await page.click(`#${deepId} > button`);

  expect(
    await page.evaluate(() => document.getElementById('r_2_2_0_1_0')!.textContent),
    '-----***r_2_2_0_1_0'
  );
});