/**
 * Renders documentation UI frames from the ARTHIX design system
 * and captures them with Chrome headless for the README gallery.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const outDir = path.join(root, "docs", "screenshots");
const chrome =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.mkdirSync(outDir, { recursive: true });

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
:root {
  --canvas:#F8F9FC; --ink:#0F172A; --muted:#475569; --faint:#94A3B8;
  --navy:#0F2042; --navy-deep:#08132B; --navy-rich:#1E3A8A;
  --azure:#1D4ED8; --emerald:#0F766E; --emerald-b:#10B981;
  --terracotta:#C2410C; --amber:#B45309; --vermilion:#BE123C;
  --line:#E2E8F0; --soft-em:#F0FDF4; --soft-az:#EFF6FF; --soft-ve:#FFF1F2; --soft-am:#FFFBEB;
}
* { box-sizing:border-box; }
html,body { margin:0; padding:0; background:var(--canvas); color:var(--ink);
  font-family:'Space Grotesk',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
.tabular { font-variant-numeric:tabular-nums; }
.mono { font-family:'JetBrains Mono',monospace; }
button { font-family:inherit; }
.card { background:#fff; border:1px solid var(--line); border-radius:20px; box-shadow:0 4px 24px rgba(15,32,66,.06); }
.pill { display:inline-flex; align-items:center; gap:6px; border-radius:999px; font-weight:800; font-size:11px; padding:5px 10px; }
.app { display:flex; min-height:100vh; }
.side { width:280px; background:#fff; border-right:1px solid var(--line); padding:22px 16px; display:flex; flex-direction:column; }
.brand { display:flex; align-items:center; gap:10px; padding:0 8px 18px; border-bottom:1px solid var(--line); margin-bottom:14px; }
.brand img { width:40px; height:40px; }
.brand b { display:block; font-size:18px; color:var(--navy-deep); letter-spacing:-.02em; }
.brand span { font-size:10px; color:var(--azure); font-weight:800; letter-spacing:.08em; }
.navbtn { display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:16px; font-size:13px; font-weight:700; color:var(--muted); margin-bottom:6px; }
.navbtn.active { background:var(--navy-deep); color:#fff; }
.main { flex:1; display:flex; flex-direction:column; min-width:0; }
.top { height:72px; background:rgba(255,255,255,.9); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:0 28px; }
.page { padding:28px 32px 40px; }
`;

const logo = path.join(root, "public", "arthix-logo.svg");
const logoHref = path.relative(__dirname, logo).replace(/\\/g, "/");

function shell(active, persona = "rahul") {
  const items = [
    ["dashboard", "Dashboard Overview"],
    ["sahara", "Sahara Debt Shield"],
    ["vivek", "Vivek Decision Engine"],
    ["jeevan", "JeevanChakra Wealth"],
    ["bhasha", "BhashaSahayak Voice"],
    ["kavach", "Kavach AA Consent"],
    ["nyay", "Nyay Explainable Audit"],
  ];
  return `
  <aside class="side">
    <div class="brand">
      <img src="${logoHref}" alt="ARTHIX" />
      <div><b>ARTHIX</b><span>BHARAT CORE AI</span></div>
    </div>
    ${items
      .map(
        ([k, l]) =>
          `<div class="navbtn ${k === active ? "active" : ""}">${l}</div>`
      )
      .join("")}
    <div class="card" style="margin-top:auto;padding:14px">
      <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:800">
        <span>State Bank of India</span>
        <span class="pill" style="background:#F0FDF4;color:#0F766E">Live Synced</span>
      </div>
      <div style="font-size:11px;color:#64748B;margin-top:4px">A/C •••• ${persona === "kamala" ? "9021" : "4218"} (Demo ledger)</div>
    </div>
  </aside>`;
}

function topbar(persona = "rahul") {
  const name = persona === "kamala" ? "Kamala Devi" : "Rahul Sharma";
  const role = persona === "kamala" ? "Artisan MSME" : "Tier-2 Salaried";
  return `
  <header class="top">
    <div class="pill" style="background:var(--canvas);border:1px solid var(--line);color:var(--ink)">
      <span style="width:8px;height:8px;border-radius:50%;background:#10B981;display:inline-block"></span>
      Vivek Guard Active
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <div style="background:var(--canvas);border:1px solid var(--line);border-radius:14px;padding:4px">
        <span style="padding:6px 10px;border-radius:10px;${persona === "rahul" ? "background:#fff;font-weight:800" : "color:#64748B"}">Rahul</span>
        <span style="padding:6px 10px;border-radius:10px;${persona === "kamala" ? "background:#fff;font-weight:800" : "color:#64748B"}">Kamala</span>
      </div>
      <div style="background:var(--canvas);border:1px solid var(--line);border-radius:14px;padding:4px">
        <span style="padding:6px 10px;border-radius:10px;background:var(--navy-deep);color:#fff;font-weight:800">Eng</span>
        <span style="padding:6px 10px;color:#64748B">हिंदी</span>
        <span style="padding:6px 10px;color:#64748B">ગુજ</span>
      </div>
      <div style="text-align:right">
        <div style="font-size:12px;font-weight:800">${name}</div>
        <div style="font-size:10px;color:#64748B">${role}</div>
      </div>
    </div>
  </header>`;
}

function wrapApp(active, persona, inner, h = 900) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="app" style="min-height:${h}px">${shell(active, persona)}<div class="main">${topbar(persona)}<div class="page">${inner}</div></div></div></body></html>`;
}

const pages = {
  "01-landing": {
    w: 1440,
    h: 900,
    html: `<!doctype html><html><head><meta charset="utf-8"><style>${css}
      body{background:linear-gradient(#F8F9FC,#fff 40%,#F8F9FC)}
    </style></head><body>
      <header style="height:80px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.9)">
        <div style="display:flex;align-items:center;gap:12px">
          <img src="${logoHref}" width="38" />
          <div><b style="font-size:18px;color:var(--navy-deep)">ARTHIX</b><div style="font-size:10px;color:var(--azure);font-weight:800;letter-spacing:.08em">BHARAT CORE AI</div></div>
        </div>
        <div style="display:flex;gap:18px;align-items:center;font-size:12px;font-weight:700;color:#64748B">
          <span>Core Pillars</span><span>Fiduciary Defense</span>
          <span style="padding:10px 18px;background:var(--navy-deep);color:#fff;border-radius:12px">Launch Web App</span>
        </div>
      </header>
      <main style="max-width:980px;margin:70px auto;text-align:center;padding:0 24px">
        <div class="pill" style="background:#F0FDF4;color:#0F766E;border:1px solid #bbf7d0">Hackathon MVP · Hindi · Gujarati · English</div>
        <h1 style="font-size:58px;line-height:1.05;letter-spacing:-.03em;color:var(--navy-deep);margin:22px 0 12px">AI-Powered Hyper-Personalized<br/>Banking for <span style="background:linear-gradient(90deg,#1D4ED8,#0F766E,#C2410C);-webkit-background-clip:text;color:transparent">Bharat.</span></h1>
        <p style="font-size:22px;color:#475569;font-weight:600;margin:0 0 10px">The right product. The right moment. Or no product at all.</p>
        <p style="color:#64748B;max-width:640px;margin:0 auto 28px;line-height:1.6">ARTHIX understands financial context, assists in the customer's language, and recommends a product only when need, eligibility, suitability, consent, and safety align.</p>
        <div style="display:flex;gap:12px;justify-content:center">
          <div style="background:var(--navy-deep);color:#fff;padding:16px 28px;border-radius:16px;font-weight:800">Launch Full Web Application</div>
          <div style="background:#fff;border:1px solid var(--line);padding:16px 28px;border-radius:16px;font-weight:700">Login as Demo Persona</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px">
          <div class="card" style="padding:20px;text-align:left"><div class="pill" style="background:#F0FDF4;color:#0F766E">RECOMMEND</div><p style="font-weight:800;margin:10px 0 4px">Rahul · SIP</p><p style="font-size:13px;color:#64748B;margin:0">Stable surplus. Suitable product.</p></div>
          <div class="card" style="padding:20px;text-align:left"><div class="pill" style="background:#EFF6FF;color:#1D4ED8">ASSIST FIRST</div><p style="font-weight:800;margin:10px 0 4px">Meena · KYC</p><p style="font-size:13px;color:#64748B;margin:0">Gujarati guidance. No product dump.</p></div>
          <div class="card" style="padding:20px;text-align:left"><div class="pill" style="background:#FFF1F2;color:#BE123C">SUPPRESS</div><p style="font-weight:800;margin:10px 0 4px">Kamala · Stress</p><p style="font-size:13px;color:#64748B;margin:0">No aggressive credit. Relief first.</p></div>
        </div>
      </main>
    </body></html>`,
  },

  "02-login": {
    w: 1440,
    h: 900,
    html: `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
      <header style="height:80px;display:flex;align-items:center;padding:0 40px;border-bottom:1px solid var(--line);background:#fff">
        <img src="${logoHref}" width="38" /><b style="margin-left:10px;color:var(--navy-deep)">ARTHIX</b>
      </header>
      <main style="display:flex;justify-content:center;padding:48px 24px">
        <div class="card" style="width:560px;padding:36px">
          <div style="text-align:center">
            <div style="width:56px;height:56px;border-radius:16px;background:var(--navy-deep);margin:0 auto 12px"></div>
            <h1 style="margin:0;color:var(--navy-deep)">Sovereign Bharat Banking Login</h1>
            <p style="color:#64748B;font-size:14px">Demo persona access for the hackathon prototype</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;background:var(--canvas);padding:6px;border-radius:16px;border:1px solid var(--line);margin:18px 0;font-size:11px;font-weight:800;text-align:center">
            <div style="background:#fff;padding:10px;border-radius:12px">Demo</div><div style="padding:10px;color:#64748B">OTP</div><div style="padding:10px;color:#64748B">DigiLocker</div><div style="padding:10px;color:#64748B">Google</div>
          </div>
          <div class="card" style="padding:16px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
            <div><b>Kamala Devi</b> <span class="pill" style="background:#FFF1F2;color:#BE123C">Stress Relief</span><div style="font-size:12px;color:#64748B;margin-top:4px">Artisan MSME · EMIs consume 58% of inflow</div></div>
            <div style="width:36px;height:36px;border-radius:10px;border:1px solid var(--line)"></div>
          </div>
          <div class="card" style="padding:16px;display:flex;justify-content:space-between;align-items:center;border-color:#1D4ED8">
            <div><b>Rahul Sharma</b> <span class="pill" style="background:#F0FDF4;color:#0F766E">Surplus Growth</span><div style="font-size:12px;color:#64748B;margin-top:4px">Tier-2 salaried · 3.2 months reserve · +20% surplus</div></div>
            <div style="width:36px;height:36px;border-radius:10px;background:var(--navy-rich);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800">RS</div>
          </div>
        </div>
      </main>
    </body></html>`,
  },

  "03-onboarding": {
    w: 430,
    h: 920,
    html: `<!doctype html><html><head><meta charset="utf-8"><style>${css} body{display:flex;justify-content:center;padding:24px}</style></head><body>
      <div class="card" style="width:400px;padding:22px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <img src="${logoHref}" width="90" />
          <span class="pill" style="background:#EEF2FF;color:#1E3A8A">Verified AI Partner</span>
        </div>
        <div style="background:var(--canvas);border:1px solid var(--line);border-radius:14px;padding:16px;margin:16px 0">
          <span class="pill" style="background:#EFF6FF;color:#1D4ED8">Intelligent Banking Layer for Bharat</span>
          <h1 style="font-size:22px;margin:10px 0 4px">Your money, understood.</h1>
          <p style="margin:0 0 10px;color:#64748B;font-size:14px">Right banking for your needs</p>
          <div style="background:#fff;border-radius:10px;padding:10px;font-weight:700">“The right product. The right moment. <span style="color:var(--navy)">Or no product at all.</span>”</div>
        </div>
        <div style="font-size:11px;font-weight:700;color:#94A3B8;margin-bottom:8px">Preferred language</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">
          <div style="background:var(--navy);color:#fff;border-radius:10px;padding:10px;text-align:center;font-weight:700">English</div>
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center">हिंदी</div>
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center">ગુજરાતી</div>
        </div>
        <div style="font-weight:800;margin-bottom:8px">Our Bharat First Promise</div>
        <div style="border-bottom:1px solid var(--line);padding:10px 0"><b>Recommend</b><div style="font-size:12px;color:#64748B">Only what genuinely fits surplus and cashflow.</div></div>
        <div style="border-bottom:1px solid var(--line);padding:10px 0"><b>Assist first</b><div style="font-size:12px;color:#64748B">Guidance before any loan is offered.</div></div>
        <div style="padding:10px 0 16px"><b>Suppress</b><div style="font-size:12px;color:#64748B">Pause offers when income dips.</div></div>
        <div style="background:var(--navy);color:#fff;border-radius:12px;padding:14px;text-align:center;font-weight:800">Get started with Arthix</div>
      </div>
    </body></html>`,
  },

  "04-consent": {
    w: 430,
    h: 920,
    html: `<!doctype html><html><head><meta charset="utf-8"><style>${css} body{display:flex;justify-content:center;padding:24px}</style></head><body>
      <div class="card" style="width:400px;padding:22px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px"><img src="${logoHref}" width="72" /><b>Consent manager</b></div>
        <div style="background:var(--canvas);border:1px solid var(--line);border-radius:14px;padding:14px;margin-bottom:14px">
          <div class="pill" style="background:#EFF6FF;color:#1D4ED8">Purpose-level consent</div>
          <h2 style="margin:8px 0 6px">Your data, your rules · आपकी अनुमति</h2>
          <p style="margin:0;font-size:13px;color:#64748B">Pause, review, or revoke at any time. Transaction analysis is not the same purpose as personalization.</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <b>Granular data permissions</b><span class="pill" style="background:#F0FDF4;color:#0F766E">3 of 3 active</span>
        </div>
        ${["Transaction categorisation & spends", "Income & salary regularity", "Active EMI & credit load"]
          .map(
            (t) =>
              `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)"><div style="font-size:13px;font-weight:700">${t}</div><div style="width:40px;height:22px;background:var(--navy);border-radius:99px;position:relative"><div style="width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;right:3px;top:3px"></div></div></div>`
          )
          .join("")}
        <div style="margin-top:16px;background:var(--navy);color:#fff;border-radius:12px;padding:14px;text-align:center;font-weight:800">Allow personalisation (अनुमति दें)</div>
      </div>
    </body></html>`,
  },

  "05-dashboard-rahul": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "dashboard",
      "rahul",
      `
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:18px">
        <div><div style="font-size:13px;color:#64748B;font-weight:700">Namaste, Rahul Sharma</div>
        <h1 style="margin:4px 0 0;font-size:30px;color:var(--navy-deep)">Your money, understood.</h1></div>
        <div class="pill" style="background:#F0FDF4;color:#0F766E">RECOMMEND · RULE_EXPANSION_STABLE_SURPLUS_V4</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px">
        <div class="card" style="padding:20px"><div style="font-size:11px;font-weight:800;color:#64748B;letter-spacing:.06em">PRIMARY LIQUID BALANCE</div><div class="tabular" style="font-size:36px;font-weight:800;color:var(--navy-deep);margin:8px 0">₹64,820</div><div style="font-size:12px;color:#64748B">SBI •••• 4218</div></div>
        <div class="card" style="padding:20px"><div style="display:flex;justify-content:space-between"><div style="font-size:11px;font-weight:800;color:#64748B">ACTIVE EMI BURDEN</div><span class="pill" style="background:#F0FDF4;color:#0F766E">Safe Zone (16%)</span></div><div class="tabular" style="font-size:36px;font-weight:800;margin:8px 0">₹8,500<span style="font-size:14px;color:#64748B">/mo</span></div><div style="height:8px;background:#E2E8F0;border-radius:99px"><div style="width:16%;height:8px;background:#0F766E;border-radius:99px"></div></div></div>
        <div class="card" style="padding:20px"><div style="font-size:11px;font-weight:800;color:#64748B">NET MONTHLY SURPLUS</div><div class="tabular" style="font-size:36px;font-weight:800;color:#0F766E;margin:8px 0">₹15,120</div><div style="font-size:12px;color:#64748B">INCOME_STEP_UP · SURPLUS_STABLE</div></div>
      </div>
      <div style="border-radius:24px;padding:28px;background:linear-gradient(135deg,#08132B,#0F2042,#1E3A8A);color:#fff">
        <div class="pill" style="background:#10B981;color:#052e16">RECOMMEND · Capital expansion</div>
        <h2 style="margin:14px 0 8px;font-size:26px">Approved: ₹3,000 Nifty 50 Index SIP Allocation</h2>
        <p style="margin:0;color:#cbd5e1;max-width:720px">3.2 months of emergency liquidity verified. DTI 16.3%. Zero-commission direct plan. Vivek allows a product only because every gate passed.</p>
        <div style="margin-top:18px;display:flex;gap:10px">
          <div style="background:#fff;color:var(--navy-deep);padding:12px 18px;border-radius:14px;font-weight:800">Review ₹3,000 Nifty 50 Index SIP</div>
          <div style="border:1px solid rgba(255,255,255,.25);padding:12px 18px;border-radius:14px;font-weight:700">Why this?</div>
        </div>
      </div>`
    ),
  },

  "06-vivek-recommend": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "vivek",
      "rahul",
      `
      <div class="pill" style="background:#EFF6FF;color:#1D4ED8">100% Deterministic · Zero Black-Box ML</div>
      <h1 style="margin:8px 0 4px;font-size:32px;color:var(--navy-deep)">Ethical Financial Decision State Machine</h1>
      <p style="margin:0 0 16px;color:#64748B">विवेक पारदर्शी निर्णय प्रणाली</p>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <div class="pill" style="border:2px solid #0F766E;color:#0F766E;background:#F0FDF4">1. RECOMMEND</div>
        <div class="pill" style="border:1px solid var(--line);color:#64748B">2. ASSIST FIRST</div>
        <div class="pill" style="border:1px solid var(--line);color:#64748B">3. SUPPRESS</div>
        <div class="pill" style="border:1px solid var(--line);color:#64748B">4. VERIFY</div>
      </div>
      <div class="card" style="padding:24px">
        <div class="pill" style="background:#F0FDF4;color:#0F766E">RECOMMEND: Capital Expansion Approved</div>
        <h2 style="margin:12px 0 6px">Approved: ₹3,000 Nifty 50 Index SIP Allocation</h2>
        <p style="color:#64748B;margin:0 0 16px">3.2 months liquidity secured · debt ratio &lt; 20% · rule RULE_EXPANSION_STABLE_SURPLUS_V4</p>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          ${[
            ["Reserve Coverage", "3.2 Months", true],
            ["Debt-to-Income", "16.3%", true],
            ["Surplus Stability", "60 Days", true],
            ["Commission Load", "0% Direct", true],
          ]
            .map(
              ([l, v]) =>
                `<div style="background:var(--canvas);border:1px solid var(--line);border-radius:14px;padding:14px"><div style="font-size:11px;color:#64748B;font-weight:700">${l}</div><div style="font-weight:800;margin-top:6px">${v}</div><div style="color:#0F766E;font-size:11px;font-weight:800;margin-top:4px">✓ Gate passed</div></div>`
            )
            .join("")}
        </div>
      </div>`
    ),
  },

  "07-jeevanchakra": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "jeevan",
      "rahul",
      `
      <div class="pill" style="background:#EEF2FF;color:#1E3A8A">Algorithmic Wealth Stewardship</div>
      <h1 style="margin:8px 0 16px;font-size:32px;color:var(--navy-deep)">JeevanChakra Life-Stage Guidance</h1>
      <div class="card" style="padding:24px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="pill" style="background:#F0FDF4;color:#0F766E">OPTIMAL TRAJECTORY RECOMMENDATION</div>
          <span class="pill" style="background:#EFF6FF;color:#1D4ED8">98% Suitability Match</span>
        </div>
        <h2 style="margin:14px 0 6px">Direct Nifty 50 Index SIP</h2>
        <p style="color:#64748B;margin:0 0 18px">Zero-commission direct plan. Uses about a fifth of Rahul’s ₹15,120 surplus. Emergency buffer stays untouched.</p>
        <div style="font-size:12px;color:#64748B;font-weight:700">Recommended monthly deployment</div>
        <div class="tabular" style="font-size:42px;font-weight:800;color:var(--navy-deep)">₹3,000</div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <div style="background:var(--navy-deep);color:#fff;padding:12px 18px;border-radius:14px;font-weight:800">Start Direct SIP (Zero Fees)</div>
          <div style="border:1px solid var(--line);padding:12px 18px;border-radius:14px;font-weight:700">Why this? Inspect Nyay Audit</div>
        </div>
      </div>`
    ),
  },

  "08-sahara-kamala": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "sahara",
      "kamala",
      `
      <div class="pill" style="background:#EFF6FF;color:#1D4ED8">SAHARA · Dignified Care</div>
      <h1 style="margin:8px 0 16px;font-size:32px;color:var(--navy-deep)">Financial Resilience & Relief</h1>
      <div class="card" style="padding:22px;background:#FFF1F2;border-color:#fecdd3;margin-bottom:14px">
        <div class="pill" style="background:#BE123C;color:#fff">PROTECTIVE HOLD ACTIVE</div>
        <h2 style="margin:10px 0 6px">No new loan or credit card is being offered.</h2>
        <p style="margin:0;color:#9f1239">Active EMIs consume 58% of monthly inflow. Vivek locked solicitation and unlocked 1-tap moratorium relief.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-bottom:14px">
        ${[
          ["Stress score", "82 / 100", "HIGH"],
          ["Monthly inflow", "₹24,000", "Delayed"],
          ["Committed EMIs", "₹13,920", "58%"],
          ["Net deficit", "−₹4,200", "Contracting"],
        ]
          .map(
            ([l, v, s]) =>
              `<div class="card" style="padding:16px"><div style="font-size:11px;color:#64748B;font-weight:700">${l}</div><div class="tabular" style="font-size:24px;font-weight:800;margin:6px 0">${v}</div><div style="font-size:11px;color:#BE123C;font-weight:800">${s}</div></div>`
          )
          .join("")}
      </div>
      <div class="card" style="padding:18px;display:flex;justify-content:space-between;align-items:center">
        <div><b>Apply 60-Day EMI Pause on Machinery Loan</b><div style="font-size:13px;color:#64748B">Freeze ₹1,200 / mo · zero late fee · no bureau mark in this demo</div></div>
        <div style="background:var(--navy-deep);color:#fff;padding:12px 16px;border-radius:12px;font-weight:800">Apply 1-Tap Relief</div>
      </div>`
    ),
  },

  "09-vivek-suppress": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "vivek",
      "kamala",
      `
      <div class="pill" style="background:#FFF1F2;color:#BE123C">Same engine. Different ledger. Different duty.</div>
      <h1 style="margin:8px 0 16px;font-size:30px;color:var(--navy-deep)">Vivek switched to Assist First / Suppress</h1>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <div class="pill" style="border:1px solid var(--line);color:#64748B">1. RECOMMEND</div>
        <div class="pill" style="border:2px solid #1D4ED8;color:#1D4ED8;background:#EFF6FF">2. ASSIST FIRST</div>
        <div class="pill" style="border:2px solid #BE123C;color:#BE123C;background:#FFF1F2">3. SUPPRESS</div>
        <div class="pill" style="border:1px solid var(--line);color:#64748B">4. VERIFY</div>
      </div>
      <div class="card" style="padding:24px">
        <div class="pill" style="background:#FFF1F2;color:#BE123C">SUPPRESS: Predatory credit blocked</div>
        <h2 style="margin:12px 0 6px">₹50,000 instant loan at 36% APR was withheld</h2>
        <p style="color:#64748B">Stress score 82/100. DTI 58%. An empty product rail is the feature — not a bug.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px">
          <div style="background:#FFF1F2;border-radius:14px;padding:14px"><b>Blocked</b><div style="font-size:13px;color:#9f1239">Instant digital credit · revolving overdraft</div></div>
          <div style="background:#EFF6FF;border-radius:14px;padding:14px"><b>Opened instead</b><div style="font-size:13px;color:#1D4ED8">Sahara 60-day EMI relief · counsellor callback</div></div>
        </div>
      </div>`
    ),
  },

  "10-kavach-fraud": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "kavach",
      "kamala",
      `
      <div class="pill" style="background:#FFFBEB;color:#B45309">KAVACH · Customer stays in the loop</div>
      <h1 style="margin:8px 0 16px;font-size:30px;color:var(--navy-deep)">Unusual UPI — confirm before we proceed</h1>
      <div class="card" style="padding:24px;border-color:#F59E0B">
        <div class="pill" style="background:#FFFBEB;color:#B45309">VERIFY · Account is NOT frozen</div>
        <h2 style="margin:12px 0 4px">Did you send ₹18,500 to Unknown VPAs Merchant?</h2>
        <p style="color:#64748B;margin:0 0 16px">10 Sep 2026, 22:14 IST · New payee · unusual hour · amount spike. Prototype rule detection on the sample ledger.</p>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
          ${[
            ["Amount", "₹18,500"],
            ["Payee", "Unknown VPA"],
            ["Hour", "22:14 IST"],
            ["Account", "ACTIVE"],
          ]
            .map(
              ([l, v]) =>
                `<div style="background:var(--canvas);border-radius:12px;padding:12px"><div style="font-size:11px;color:#64748B">${l}</div><div style="font-weight:800">${v}</div></div>`
            )
            .join("")}
        </div>
        <div style="display:flex;gap:10px">
          <div style="background:#0F766E;color:#fff;padding:12px 18px;border-radius:12px;font-weight:800">Yes, I sent this</div>
          <div style="background:#BE123C;color:#fff;padding:12px 18px;border-radius:12px;font-weight:800">No — escalate</div>
        </div>
      </div>`
    ),
  },

  "11-bhashasahayak": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "bhasha",
      "rahul",
      `
      <div class="pill" style="background:#EEF2FF;color:#1E3A8A">BHASHASAHAYAK · Grounded vernacular chat</div>
      <h1 style="margin:8px 0 16px;font-size:30px;color:var(--navy-deep)">Hindi · Gujarati · English</h1>
      <div class="card" style="padding:22px;max-width:820px">
        <div style="background:var(--canvas);border-radius:16px;padding:14px;margin-bottom:10px;max-width:640px">
          <div style="font-size:11px;color:#64748B;font-weight:700">ARTHIX · 10:14 AM</div>
          Namaste! I can help with KYC, your profile, Vivek reasons, Sahara relief, or Kavach alerts. I will not invent balances.
        </div>
        <div style="background:var(--navy-deep);color:#fff;border-radius:16px;padding:14px;margin:0 0 10px auto;max-width:520px">
          KYC ma shu joie? Branch javu pade?
        </div>
        <div style="background:#F0FDF4;border-radius:16px;padding:14px;max-width:680px">
          <div style="font-size:11px;color:#0F766E;font-weight:800">GUJARATI · KYC_HELP · tools: get_kyc_requirements</div>
          તમારે કોઈપણ બેંક શાખા જવાની બિલકુલ જરૂર નથી. માત્ર અસલ પાન કાર્ડ, આધાર OTP, અને 2 મિનિટનો વીડિયો કૉલ.
        </div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <div style="flex:1;border:1px solid var(--line);border-radius:14px;padding:12px;color:#94A3B8">Ask in Hindi, Gujarati, or English…</div>
          <div style="background:var(--navy-deep);color:#fff;padding:12px 16px;border-radius:14px;font-weight:800">Send</div>
        </div>
      </div>`
    ),
  },

  "12-nyay-audit": {
    w: 1440,
    h: 900,
    html: wrapApp(
      "nyay",
      "rahul",
      `
      <div class="pill" style="background:#EEF2FF;color:#1E3A8A">NYAY · Runtime guardrail</div>
      <h1 style="margin:8px 0 16px;font-size:30px;color:var(--navy-deep)">Why this? Inspectable decision trail</h1>
      <div class="card" style="padding:22px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div><div class="mono" style="font-size:12px;color:#64748B">AUDIT #BRT-AUD-2026-90412</div><b>Deterministic Decision Log: RECOMMEND</b></div>
          <span class="pill" style="background:#F0FDF4;color:#0F766E">PASSED FIDUCIARY INTEGRITY CHECK</span>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr style="text-align:left;color:#64748B;font-size:11px;letter-spacing:.06em">
            <th style="padding:10px 8px;border-bottom:1px solid var(--line)">PARAMETER</th>
            <th style="padding:10px 8px;border-bottom:1px solid var(--line)">VALUE</th>
            <th style="padding:10px 8px;border-bottom:1px solid var(--line)">GUARDRAIL</th>
            <th style="padding:10px 8px;border-bottom:1px solid var(--line)">RESULT</th>
          </tr>
          ${[
            ["Emergency runway", "3.2 months", "≥ 3.0 months", "PASS"],
            ["Debt-to-inflow", "16.3%", "< 35%", "PASS"],
            ["Commission load", "0.00%", "Direct plan only", "PASS"],
            ["Personalization consent", "AUTHORIZED", "Purpose granted", "PASS"],
          ]
            .map(
              (r) =>
                `<tr>${r
                  .map(
                    (c, i) =>
                      `<td style="padding:12px 8px;border-bottom:1px solid var(--line);font-weight:${i === 3 ? 800 : 600};color:${i === 3 ? "#0F766E" : "inherit"}">${c}</td>`
                  )
                  .join("")}</tr>`
            )
            .join("")}
        </table>
        <p style="font-size:13px;color:#64748B;margin:16px 0 0">This decision contains no neural-network override. Stress, leverage, or revoked consent would have suppressed the product.</p>
      </div>`
    ),
  },
};

for (const [name, page] of Object.entries(pages)) {
  const htmlPath = path.join(__dirname, `${name}.html`);
  fs.writeFileSync(htmlPath, page.html, "utf8");
  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
  const png = path.join(outDir, `${name}.png`);
  const r = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${page.w},${page.h}`,
      `--screenshot=${png}`,
      "--virtual-time-budget=4000",
      fileUrl,
    ],
    { encoding: "utf8" }
  );
  if (r.status !== 0) {
    console.error(name, r.stderr || r.stdout);
    process.exitCode = 1;
  } else {
    const stat = fs.statSync(png);
    console.log("captured", name, stat.size, "bytes");
  }
}
