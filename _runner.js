// Run and restart in a good way
// killing old processes before new start

import fs from 'fs';
import { spawn } from 'child_process';
import nodemon from 'nodemon';
import express from 'express';
import { killPortProcess } from "kill-port-process";
import { portToPid } from 'pid-port';
const sleep = ms => new Promise(res => setTimeout(res, ms));

await killOldMe();
await sleep(500);
await startBackend();
await sleep(2000);
startVite();

async function killer(port) {
  await portToPid(port).catch(e => { }) &&
    killPortProcess(port);
}

async function startBackend() {
  spawn('npm run tsc-watch', { shell: true, stdio: 'inherit' });
  while (!fs.existsSync('backendDist')) { await sleep(100); }
  nodemon({
    script: 'backendDist/index.js',
    ext: 'js json',
    watch: 'backendDist'
  });
}

function startVite() {
  spawn('npm run dev', { shell: true, stdio: 'inherit' });
}

async function killOldMe() {
  await killer(5001);
  await killer(5173);
  await fetch('http://127.0.0.1:5002').catch(e => { });
  await killer(5002);
}

// now i listen to a port and can be easily killed
// by killPortProcess
const app = express();
app.listen(5002);
app.get('*', (req, res) => {
  console.log("\nGOODBYE! I WAS STARTED ELSEWHERE!\n");
  res.json({ ok: true });
});