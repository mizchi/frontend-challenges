import { test, expect } from "vitest";
import { setupBrowser } from "../../__testutils/browser"

const br = setupBrowser();

test("click to output", async () => {
  const browser = await br.getBrowser();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000/');

  expect(
    await page.evaluate(() => document.querySelector('#output')!.textContent)
  ).toBe('');

  await page.click("#btn");
  await page.waitForSelector('#output', { visible: true });
  expect(
    await page.evaluate(() => document.querySelector('#output')!.textContent)
  ).toBe('clicked');
});