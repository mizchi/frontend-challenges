import puppeteer from "puppeteer-core";
import { afterAll, beforeAll } from "vitest";
import { spawn } from 'child_process';

type ServerProcess = {
  ready: Promise<void>;
  dispose: () => void;
}

export const run = (command: string, args: string[]): ServerProcess => {
  const pid = spawn(command, args, {
    cwd: process.cwd(),
  });
  // pid.on('exit', (code) => {});
  const p = new Promise<void>((resolve, reject) => {
    pid.stdout.on('data', (data) => {
      // catch VITE v3.x.x  ready in xx ms
      if (data.toString().includes(" ready in")) {
        resolve();
      }
    })
  });
  return {
    ready: p,
    dispose: () => {
      pid.kill();
    }
  }
}
let browser: puppeteer.Browser;
export const setupBrowser = () => {
  let serverProcess: ServerProcess;

  let _resolve: (browser: puppeteer.Browser) => void;
  let p = new Promise<puppeteer.Browser>((resolve, reject) => {
    _resolve = resolve;
  });

  beforeAll(async () => {
    browser = await puppeteer.launch({
      channel: 'chrome',
      args: [
        "--guest",
        '--window-size=1280,800',
      ]
    });
    serverProcess = run('vite', ['dev', '--port', '3000']);
    await serverProcess.ready;
    _resolve(browser);
  });
  
  afterAll(async () => {
    await browser.close();
    if (serverProcess) {
      serverProcess.dispose();
    }
  });
  return {
    ready: p,
    async getBrowser() {
      return p;
    }
  }
};

