import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "arthix.db");
const db = new Database(dbPath);

// Enable foreign keys & WAL mode for performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      persona_key TEXT UNIQUE NOT NULL,
      locale TEXT DEFAULT 'en',
      income_band TEXT,
      digital_maturity TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      bank_name TEXT NOT NULL,
      account_type TEXT NOT NULL,
      masked_no TEXT NOT NULL,
      balance REAL NOT NULL,
      status TEXT DEFAULT 'ACTIVE',
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      timestamp DATETIME NOT NULL,
      amount REAL NOT NULL,
      type TEXT CHECK(type IN ('CREDIT', 'DEBIT')) NOT NULL,
      category TEXT NOT NULL,
      payee TEXT NOT NULL,
      channel TEXT DEFAULT 'UPI',
      is_unusual INTEGER DEFAULT 0,
      FOREIGN KEY(account_id) REFERENCES accounts(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS financial_profiles (
      user_id TEXT PRIMARY KEY,
      income_est REAL NOT NULL,
      essential_spends REAL NOT NULL,
      emi_load REAL NOT NULL,
      surplus REAL NOT NULL,
      runway_months REAL NOT NULL,
      stress_score INTEGER NOT NULL,
      stress_band TEXT CHECK(stress_band IN ('LOW', 'MEDIUM', 'HIGH')) NOT NULL,
      segment TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS financial_signals (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      signal_type TEXT NOT NULL,
      confidence REAL NOT NULL,
      evidence TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      family TEXT NOT NULL,
      provider TEXT NOT NULL,
      min_surplus REAL DEFAULT 0,
      max_dti REAL DEFAULT 0.35,
      apr REAL DEFAULT 0,
      commission_rate REAL DEFAULT 0,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS recommendations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      product_id TEXT,
      action TEXT CHECK(action IN ('RECOMMEND', 'ASSIST_FIRST', 'SUPPRESS', 'VERIFY')) NOT NULL,
      headline TEXT NOT NULL,
      subline TEXT NOT NULL,
      confidence REAL NOT NULL,
      rule_code TEXT NOT NULL,
      status TEXT DEFAULT 'ISSUED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS recommendation_reasons (
      id TEXT PRIMARY KEY,
      recommendation_id TEXT NOT NULL,
      rule_code TEXT NOT NULL,
      citation TEXT NOT NULL,
      text_en TEXT NOT NULL,
      text_hi TEXT NOT NULL,
      text_gu TEXT NOT NULL,
      FOREIGN KEY(recommendation_id) REFERENCES recommendations(id)
    );

    CREATE TABLE IF NOT EXISTS consent_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      purpose TEXT NOT NULL,
      institution TEXT NOT NULL,
      status TEXT CHECK(status IN ('AUTHORIZED', 'REVOKED')) DEFAULT 'AUTHORIZED',
      expires_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      kind TEXT CHECK(kind IN ('STRESS', 'FRAUD', 'INSIGHT')) NOT NULL,
      severity TEXT CHECK(severity IN ('LOW', 'MEDIUM', 'HIGH')) NOT NULL,
      headline TEXT NOT NULL,
      detail TEXT NOT NULL,
      status TEXT DEFAULT 'OPEN',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS fraud_events (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      score REAL NOT NULL,
      decision TEXT CHECK(decision IN ('NORMAL', 'VERIFY', 'ALERT')) NOT NULL,
      customer_response TEXT DEFAULT 'PENDING',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(transaction_id) REFERENCES transactions(id)
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      actor TEXT NOT NULL,
      action TEXT NOT NULL,
      rule_id TEXT NOT NULL,
      metadata TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS chat_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      sender TEXT CHECK(sender IN ('user', 'bot')) NOT NULL,
      content TEXT NOT NULL,
      tool_trace TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(session_id) REFERENCES chat_sessions(id)
    );
  `);

  seedDatabase();
}

function seedDatabase() {
  const userCheck = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (userCheck.count > 0) {
    // Ensure essential fraud event for Kamala is present if table was empty
    const fraudCheck = db.prepare("SELECT COUNT(*) as count FROM fraud_events WHERE user_id = 'u-kamala'").get() as { count: number };
    if (fraudCheck.count === 0) {
      db.prepare(
        "INSERT OR IGNORE INTO fraud_events (id, user_id, transaction_id, score, decision, customer_response) VALUES (?, ?, ?, ?, ?, ?)"
      ).run("fe-k4", "u-kamala", "tx-k4", 0.94, "VERIFY", "PENDING");
    }
    return;
  }

  const insertUser = db.prepare(
    "INSERT INTO users (id, name, persona_key, locale, income_band, digital_maturity) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const insertAccount = db.prepare(
    "INSERT INTO accounts (id, user_id, bank_name, account_type, masked_no, balance) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const insertProfile = db.prepare(
    "INSERT INTO financial_profiles (user_id, income_est, essential_spends, emi_load, surplus, runway_months, stress_score, stress_band, segment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const insertSignal = db.prepare(
    "INSERT INTO financial_signals (id, user_id, signal_type, confidence, evidence) VALUES (?, ?, ?, ?, ?)"
  );
  const insertTx = db.prepare(
    "INSERT INTO transactions (id, account_id, user_id, timestamp, amount, type, category, payee, channel, is_unusual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const insertProduct = db.prepare(
    "INSERT INTO products (id, name, family, provider, min_surplus, max_dti, apr, commission_rate, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const insertConsent = db.prepare(
    "INSERT INTO consent_records (id, user_id, purpose, institution, status, expires_at) VALUES (?, ?, ?, ?, ?, ?)"
  );

  // 1. Seed Users
  insertUser.run("u-rahul", "Rahul Sharma", "rahul", "en", "SALARIED_MID", "DIGITAL_CONFIDENT");
  insertUser.run("u-kamala", "Kamala Devi", "kamala", "hi", "ARTISAN_MSME", "ASSISTED_DIGITAL");
  insertUser.run("u-meena", "Meena Patel", "meena", "gu", "RURAL_HOUSEHOLD", "FIRST_TIME_DIGITAL");

  // 2. Seed Accounts
  insertAccount.run("acc-rahul-sbi", "u-rahul", "State Bank of India", "SAVINGS", "•••• 4218", 64820);
  insertAccount.run("acc-kamala-sbi", "u-kamala", "State Bank of India", "SAVINGS", "•••• 9021", 18400);
  insertAccount.run("acc-meena-bob", "u-meena", "Bank of Baroda", "SAVINGS", "•••• 1104", 12500);

  // 3. Seed Financial Profiles
  insertProfile.run("u-rahul", 52000, 28400, 8500, 15120, 3.2, 18, "LOW", "SALARIED_SURPLUS");
  insertProfile.run("u-kamala", 24000, 14280, 13920, -4200, 1.4, 82, "HIGH", "CASHFLOW_TIGHT");
  insertProfile.run("u-meena", 18000, 11500, 2000, 4500, 2.1, 35, "LOW", "FIRST_DIGITAL");

  // 4. Seed Signals
  insertSignal.run("sig-1", "u-rahul", "INCOME_STEP_UP", 0.95, "Salary credit increased +20% for 2 consecutive payroll cycles");
  insertSignal.run("sig-2", "u-rahul", "SURPLUS_STABLE", 0.92, "Net disposable surplus > ₹12,000 sustained over 60 days");
  insertSignal.run("sig-3", "u-kamala", "HIGH_EMI_LOAD", 0.98, "Active EMIs consume 58% of monthly inflow (Threshold > 35%)");
  insertSignal.run("sig-4", "u-kamala", "PAYMENT_DELAYED", 0.89, "Gujarat Khadi Board trade invoice receivables pending > 21 days");

  // 5. Seed Transactions for Rahul
  insertTx.run("tx-r1", "acc-rahul-sbi", "u-rahul", "2026-09-01 09:30:00", 52000, "CREDIT", "SALARY", "TechServices Corp Ltd", "NEFT", 0);
  insertTx.run("tx-r2", "acc-rahul-sbi", "u-rahul", "2026-09-05 14:10:00", 8500, "DEBIT", "EMI", "HDFC Home Loan", "AUTOPAY", 0);
  insertTx.run("tx-r3", "acc-rahul-sbi", "u-rahul", "2026-09-08 18:22:00", 3400, "DEBIT", "GROCERIES", "DMart Supermarket", "CARD", 0);

  // 6. Seed Transactions for Kamala
  insertTx.run("tx-k1", "acc-kamala-sbi", "u-kamala", "2026-09-01 11:00:00", 24000, "CREDIT", "BUSINESS_INFLOW", "Handloom Weavers Co-op", "UPI", 0);
  insertTx.run("tx-k2", "acc-kamala-sbi", "u-kamala", "2026-09-04 10:15:00", 12720, "DEBIT", "EMI", "Janata Microfinance Loan", "AUTOPAY", 0);
  insertTx.run("tx-k3", "acc-kamala-sbi", "u-kamala", "2026-09-06 16:45:00", 1200, "DEBIT", "EMI", "Loom Machinery Credit", "AUTOPAY", 0);
  insertTx.run("tx-k4", "acc-kamala-sbi", "u-kamala", "2026-09-10 22:14:00", 18500, "DEBIT", "TRANSFER", "Unknown VPAs Merchant", "UPI", 1); // Unusual transaction for Kavach!

  // 7. Seed Products
  insertProduct.run("prod-nifty50", "Direct Nifty 50 Index SIP", "INVESTMENT", "SEBI Regulated Direct Plan", 2000, 0.25, 0, 0.00, "Zero-commission direct equity index investment.");
  insertProduct.run("prod-sgb", "Sovereign Gold Bond Series III", "INVESTMENT", "Reserve Bank of India", 5000, 0.30, 2.5, 0.00, "Sovereign guaranteed 2.5% semi-annual interest gold bond.");
  insertProduct.run("prod-buffer", "Micro-Emergency Reserve Top-up", "SAVINGS", "State Bank of India", 500, 0.40, 4.0, 0.00, "High-yield auto-sweep liquid emergency reserve buffer.");
  insertProduct.run("prod-moratorium", "60-Day EMI Moratorium Relief", "RELIEF", "RBI Sahayak Fiduciary Framework", 0, 1.00, 0, 0.00, "0-penalty 60-day EMI freeze with zero credit bureau impact.");

  // 8. Seed Consents
  insertConsent.run("c-1", "u-rahul", "Cashflow & Runway Analysis", "State Bank of India", "AUTHORIZED", "2026-12-31");
  insertConsent.run("c-2", "u-rahul", "Aadhaar Identity Verification (KYC)", "DigiLocker / UIDAI", "AUTHORIZED", "2030-12-31");
  insertConsent.run("c-3", "u-kamala", "Cashflow & Runway Analysis", "State Bank of India", "AUTHORIZED", "2026-12-31");
  insertConsent.run("c-4", "u-kamala", "Trade Invoice Settlement Tracking", "TReDS Handloom Clearing", "AUTHORIZED", "2026-10-15");

  // 9. Seed Fraud Event
  const insertFraud = db.prepare(
    "INSERT INTO fraud_events (id, user_id, transaction_id, score, decision, customer_response) VALUES (?, ?, ?, ?, ?, ?)"
  );
  insertFraud.run("fe-k4", "u-kamala", "tx-k4", 0.94, "VERIFY", "PENDING");
}

// Ensure Database is Initialized
initDatabase();

export { db };
