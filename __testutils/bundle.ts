import puppeteer from "puppeteer-core";
import { afterAll, beforeAll } from "vitest";
import { execSync } from 'child_process';
import fs from "fs";
import path from 'path'

export const runViteBuild = () => {
  execSync('vite build', {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
}

export const cleanDist = () => {
  execSync('rm -r dist', {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
}

export const getEntrypointName = () => {
  const distAssetsPath = path.join(process.cwd(), 'dist/assets');
  const dirs = fs.readdirSync(distAssetsPath, { withFileTypes: true });
  const entrypoint = dirs.find(dir => dir.isFile() && dir.name.startsWith('index') &&  dir.name.endsWith('.js'));
  return path.join(distAssetsPath, entrypoint!.name);
}

export const getEntrypointSize = () => {
  const entry = getEntrypointName();
  const size = fs.statSync(entry).size;
  return size;
}

export const setupBundler = () => {
  beforeAll(() => {
    runViteBuild();
  });
  afterAll(() => {
    cleanDist();
  });
}
