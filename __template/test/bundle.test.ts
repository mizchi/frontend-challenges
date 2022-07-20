import { getEntrypointSize } from './../../__testutils/bundle';
import { setupBundler } from "../../__testutils/bundle";
import { test, expect } from "vitest";

setupBundler();

test("check size", () => {
  const size = getEntrypointSize();
  expect(size).lessThan(1000);
});
