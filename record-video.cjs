const puppeteer = require("puppeteer");
const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const FFMPEG = require("@ffmpeg-installer/ffmpeg").path;

const DURATION = 18;
const CLICK_DELAY = 2;
const DIR = path.join(__dirname, ".record-frames");
const AUDIO = path.join(__dirname, "public", "kannalane.mp3");
const OUT = path.join(__dirname, "invitation.mp4");
const VW = 1080;
const VH = 1920;
const PORT = 5199;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  fs.mkdirSync(DIR, { recursive: true });

  console.log("Building...");
  execSync("node node_modules/vite/bin/vite.js build", { cwd: __dirname, stdio: "pipe" });

  console.log("Starting preview server...");
  const vite = spawn("node", ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--host"], {
    cwd: __dirname, stdio: "pipe",
  });

  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, 8000);
    vite.stdout.on("data", (d) => {
      if (d.toString().includes("Local:") || d.toString().includes("127.0.0.1")) {
        clearTimeout(timeout); resolve();
      }
    });
    vite.stderr.on("data", (d) => {
      if (d.toString().includes("Local:") || d.toString().includes("127.0.0.1")) {
        clearTimeout(timeout); resolve();
      }
    });
  });

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--autoplay-policy=no-user-gesture-required", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: VW, height: VH });

  console.log("Loading invitation...");
  await page.goto("http://localhost:" + PORT, { waitUntil: "networkidle0", timeout: 30000 });
  await sleep(2000);

  const frameInterval = 120;
  const totalFrames = Math.floor((DURATION * 1000) / frameInterval);
  const clickFrame = Math.floor((CLICK_DELAY * 1000) / frameInterval);

  console.log("Capturing ~" + totalFrames + " frames (~" + Math.round(1000 / frameInterval) + "fps)...");

  const startTime = Date.now();
  for (let i = 0; i < totalFrames; i++) {
    const name = "f" + String(i).padStart(5, "0") + ".jpg";
    await page.screenshot({ path: path.join(DIR, name), type: "jpeg", quality: 80 });

    if (i === clickFrame) {
      console.log("Opening envelope...");
      try { await page.click(".overlay"); } catch (e) {}
    }

    const targetTime = (i + 1) * frameInterval;
    const elapsed = Date.now() - startTime;
    if (elapsed < targetTime) await sleep(targetTime - elapsed);
  }

  const elapsed = (Date.now() - startTime) / 1000;
  const fps = Math.round(totalFrames / elapsed);
  console.log("Done in " + elapsed.toFixed(1) + "s, " + totalFrames + " frames, ~" + fps + "fps");

  await browser.close();
  try { vite.kill("SIGTERM"); } catch (e) {}

  console.log("Encoding video...");
  const filterComplex = '"[1:a]adelay=2000|2000[a]"';
  const cmd = [
    '"' + FFMPEG + '"', "-y",
    "-framerate", String(fps),
    "-i", '"' + path.join(DIR, "f%05d.jpg") + '"',
    "-i", '"' + AUDIO + '"',
    "-filter_complex", filterComplex,
    "-map", "0:v", "-map", "[a]",
    "-c:v", "libx264", "-preset", "fast", "-crf", "23",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k",
    "-shortest", "-movflags", "+faststart",
    '"' + OUT + '"',
  ].join(" ");

  execSync(cmd, { stdio: "inherit", shell: "cmd.exe" });

  fs.rmSync(DIR, { recursive: true, force: true });
  const stats = fs.statSync(OUT);
  console.log("\nVideo saved:", OUT);
  console.log("Size:", (stats.size / 1024 / 1024).toFixed(1) + "MB");
}

run().catch((e) => {
  console.error("ERROR:", e.message || e);
  try { fs.rmSync(DIR, { recursive: true, force: true }); } catch (e) {}
  process.exit(1);
});
