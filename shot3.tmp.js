const { chromium } = require("playwright");
const OUT = "/tmp/claude-0/-home-user-sitev2/064da99d-7816-5b5e-be09-37977f1b6073/scratchpad";
(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, colorScheme: "light", reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3180/contato", { waitUntil: "networkidle" });
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/z2-contato.png`, fullPage: true });
  // testar botão copiar
  await p.click('button:has-text("Copiar e-mail")');
  await p.waitForTimeout(300);
  const btnText = await p.textContent('button:has-text("Copiado")').catch(() => null);
  console.log("Botão copiar:", btnText ? "OK — " + btnText.trim() : "FALHOU");
  const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => "sem permissão"));
  console.log("Clipboard:", clip);
  await browser.close();
})();
