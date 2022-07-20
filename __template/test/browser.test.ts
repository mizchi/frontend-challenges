import { test, expect } from "vitest";
import { setupBrowser } from "../../__testutils/browser"

const br = setupBrowser();

test("test", async () => {
  const browser = await br.getBrowser();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000/');
});