import assert from "node:assert";
import {
  calculateArthBodhMetrics,
  getArthBodhProfile,
  refreshArthBodhProfile,
  TransactionRecord,
} from "../lib/services/arthbodh";
import { evaluateJeevanChakraCandidates } from "../lib/services/jeevanchakra";
import { evaluateVivekDecision } from "../lib/services/vivek";

console.log("\n=======================================================");
console.log("   ARTHIX: ARTHBODH & JEEVANCHAKRA VERIFICATION SUITE  ");
console.log("=======================================================\n");

let passedCount = 0;
let totalCount = 0;

function it(name: string, fn: () => void) {
  totalCount++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err: any) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────
// 1. ARTHBODH PURE FEATURE CALCULATION TESTS
// ─────────────────────────────────────────────────────────────
console.log("--- 1. Testing ArthBodh Calculation Metrics ---");

it("calculates income cadence, regularity, and step-up from regular salary transactions", () => {
  const txs: TransactionRecord[] = [
    {
      id: "tx-1",
      timestamp: "2026-07-01 09:30:00",
      amount: 43000,
      type: "CREDIT",
      category: "SALARY",
      payee: "TechServices Corp",
    },
    {
      id: "tx-2",
      timestamp: "2026-08-01 09:30:00",
      amount: 52000,
      type: "CREDIT",
      category: "SALARY",
      payee: "TechServices Corp",
    },
    {
      id: "tx-3",
      timestamp: "2026-09-01 09:30:00",
      amount: 52000,
      type: "CREDIT",
      category: "SALARY",
      payee: "TechServices Corp",
    },
    {
      id: "tx-4",
      timestamp: "2026-09-05 10:00:00",
      amount: 8500,
      type: "DEBIT",
      category: "EMI",
      payee: "HDFC Home Loan",
    },
    {
      id: "tx-5",
      timestamp: "2026-09-08 14:00:00",
      amount: 15000,
      type: "DEBIT",
      category: "GROCERIES",
      payee: "DMart",
    },
    {
      id: "tx-6",
      timestamp: "2026-09-10 16:00:00",
      amount: 4000,
      type: "DEBIT",
      category: "DINING",
      payee: "Zomato",
    },
  ];

  const totalBalance = 65000;
  const metrics = calculateArthBodhMetrics(txs, totalBalance);

  // Income cadence
  assert.strictEqual(metrics.incomeCadence, "MONTHLY_REGULAR");
  assert.strictEqual(metrics.salaryRegularity, "HIGHLY_REGULAR");
  assert.ok(metrics.regularityScore >= 0.9, "Regularity score should be high");

  // Income estimate
  assert.strictEqual(metrics.incomeEst, 52000);

  // Spending mix
  assert.strictEqual(metrics.spendingMix.essential, 15000);
  assert.strictEqual(metrics.spendingMix.discretionary, 4000);
  assert.strictEqual(metrics.spendingMix.emi, 8500);
  assert.ok(metrics.spendingMix.essentialRatio > 0.5);

  // EMI load & DTI
  assert.strictEqual(metrics.emiLoad, 8500);
  assert.strictEqual(metrics.dtiRatio, 8500 / 52000);

  // Savings residual
  // surplus = 52000 - 15000 - 8500 = 28500
  assert.strictEqual(metrics.surplus, 28500);
  assert.strictEqual(metrics.savingsResidual, 28500);
  assert.ok(metrics.savingsRate > 0.5);

  // Surplus trend
  assert.strictEqual(metrics.surplusTrend, "EXPANDING");
});

// ─────────────────────────────────────────────────────────────
// 2. ARTHBODH SIGNAL DETECTION TESTS
// ─────────────────────────────────────────────────────────────
console.log("\n--- 2. Testing ArthBodh Signal Detection ---");

it("detects INCOME_STEP_UP and SURPLUS_STABLE on salary jump and healthy surplus", () => {
  const txs: TransactionRecord[] = [
    {
      id: "t1",
      timestamp: "2026-08-01",
      amount: 43000,
      type: "CREDIT",
      category: "SALARY",
      payee: "Employer",
    },
    {
      id: "t2",
      timestamp: "2026-09-01",
      amount: 52000, // +20.9% increase
      type: "CREDIT",
      category: "SALARY",
      payee: "Employer",
    },
    {
      id: "t3",
      timestamp: "2026-09-05",
      amount: 8500,
      type: "DEBIT",
      category: "EMI",
      payee: "Bank",
    },
    {
      id: "t4",
      timestamp: "2026-09-08",
      amount: 12000,
      type: "DEBIT",
      category: "GROCERIES",
      payee: "Store",
    },
  ];

  const metrics = calculateArthBodhMetrics(txs, 75000);
  const sigTypes = metrics.detectedSignals.map((s) => s.signalType);

  assert.ok(sigTypes.includes("INCOME_STEP_UP"), "Must detect INCOME_STEP_UP");
  assert.ok(sigTypes.includes("SURPLUS_STABLE"), "Must detect SURPLUS_STABLE");
  const stepUpSig = metrics.detectedSignals.find((s) => s.signalType === "INCOME_STEP_UP")!;
  assert.ok(stepUpSig.evidence.includes("+20.9%"));
  assert.ok(stepUpSig.confidence >= 0.9);
});

it("detects NEW_CREDIT_LOAD and SURPLUS_DECLINE when heavy loan debits emerge", () => {
  const txs: TransactionRecord[] = [
    {
      id: "t1",
      timestamp: "2026-09-01",
      amount: 40000,
      type: "CREDIT",
      category: "SALARY",
      payee: "Employer",
    },
    {
      id: "t2",
      timestamp: "2026-09-04",
      amount: 14000,
      type: "DEBIT",
      category: "EMI",
      payee: "NBFC Loan 1",
    },
    {
      id: "t3",
      timestamp: "2026-09-06",
      amount: 8000,
      type: "DEBIT",
      category: "LOAN_REPAYMENT",
      payee: "BNPL Fintech",
    },
    {
      id: "t4",
      timestamp: "2026-09-08",
      amount: 22000,
      type: "DEBIT",
      category: "GROCERIES",
      payee: "Household",
    },
  ];

  // Baseline profile had ₹15,000 surplus and ₹0 EMI
  const metrics = calculateArthBodhMetrics(txs, 10000, {
    incomeEst: 40000,
    emiLoad: 0,
    surplus: 15000,
  });

  const sigTypes = metrics.detectedSignals.map((s) => s.signalType);
  assert.ok(sigTypes.includes("NEW_CREDIT_LOAD"), "Must detect NEW_CREDIT_LOAD");
  assert.ok(sigTypes.includes("SURPLUS_DECLINE"), "Must detect SURPLUS_DECLINE");
  assert.ok(metrics.dtiRatio > 0.5, "DTI ratio should be over 50%");
  assert.strictEqual(metrics.stressBand, "HIGH", "High stress band expected");
});

it("detects MISSED_EMI when an ECS return/bounce occurs in debit transactions", () => {
  const txs: TransactionRecord[] = [
    {
      id: "t1",
      timestamp: "2026-09-01",
      amount: 20000,
      type: "CREDIT",
      category: "BUSINESS_INFLOW",
      payee: "Customer",
    },
    {
      id: "t2",
      timestamp: "2026-09-05",
      amount: 590,
      type: "DEBIT",
      category: "EMI_BOUNCE",
      payee: "HDFC Mandate Return Charges",
    },
    {
      id: "t3",
      timestamp: "2026-09-06",
      amount: 12000,
      type: "DEBIT",
      category: "EMI",
      payee: "Co-op Bank Loan",
    },
  ];

  const metrics = calculateArthBodhMetrics(txs, 5000);
  const sigTypes = metrics.detectedSignals.map((s) => s.signalType);
  assert.ok(sigTypes.includes("MISSED_EMI"), "Must detect MISSED_EMI");
});

// ─────────────────────────────────────────────────────────────
// 3. JEEVANCHAKRA 4-DIMENSION SCORING & WEIGHTING TESTS
// ─────────────────────────────────────────────────────────────
console.log("\n--- 3. Testing JeevanChakra Candidate Scoring & Formula ---");

it("strictly follows the exact formula: 0.35 need + 0.25 suitability + 0.20 eligibility + 0.20 timing", () => {
  const profile = getArthBodhProfile("rahul");
  assert.ok(profile, "Rahul profile must exist");

  const candidates = evaluateJeevanChakraCandidates(profile!);
  assert.ok(candidates.length > 0, "Candidates list must not be empty");

  for (const c of candidates) {
    const calculatedScore = Number(
      (0.35 * c.needScore + 0.25 * c.suitabilityScore + 0.20 * c.eligibilityScore + 0.20 * c.timingScore).toFixed(4)
    );
    assert.strictEqual(
      c.compositeScore,
      calculatedScore,
      `Candidate ${c.id} compositeScore must match exact weighted formula`
    );
  }
});

it("verifies JeevanChakra returns ranked candidates and does NOT make the final decision", () => {
  const profile = getArthBodhProfile("rahul");
  const candidates = evaluateJeevanChakraCandidates(profile!);

  // Check that candidates are sorted descending by compositeScore
  for (let i = 1; i < candidates.length; i++) {
    assert.ok(
      candidates[i - 1].compositeScore >= candidates[i].compositeScore,
      "Candidates must be sorted descending by compositeScore"
    );
  }

  // JeevanChakra output is ProductCandidate[] (no binding actions like RECOMMEND / ASSIST_FIRST)
  assert.ok(Array.isArray(candidates));
  assert.ok(!("action" in candidates)); // Not a decision object
  assert.ok("needHypothesis" in candidates[0]);
  assert.ok("timingRationale" in candidates[0]);
});

// ─────────────────────────────────────────────────────────────
// 4. PERSONA SCENARIO: RAHUL SHARMA WITH VARIED CONTEXTS
// ─────────────────────────────────────────────────────────────
console.log("\n--- 4. Testing Rahul Across Different Contexts ---");

it("Rahul Context 1 (Baseline Expansion): Stable surplus & step-up triggers Index SIP top ranking", () => {
  const profile = getArthBodhProfile("rahul");
  assert.ok(profile);
  assert.strictEqual(profile.personaKey, "rahul");
  assert.strictEqual(profile.stressBand, "LOW");

  const candidates = evaluateJeevanChakraCandidates(profile);
  const topCandidate = candidates[0];

  assert.strictEqual(topCandidate.family, "INVESTMENT");
  assert.strictEqual(topCandidate.id, "prod-nifty50");
  assert.ok(topCandidate.compositeScore >= 0.85);
  assert.strictEqual(topCandidate.reasonTag, "SUITABLE_EQUITY_EXPANSION");

  // Vivek evaluates candidates and confirms RECOMMEND
  const decision = evaluateVivekDecision("rahul");
  assert.strictEqual(decision.action, "RECOMMEND");
  assert.ok(decision.headline.includes("Approved"));
  assert.ok(decision.candidateProduct);
  assert.strictEqual(decision.candidateProduct.id, "prod-nifty50");
});

it("Rahul Context 2 (Adverse New Credit Load): Heavy debt suppresses equity expansion and prioritizes relief", () => {
  // Simulate Rahul taking a sudden high-interest personal loan of ₹22,000/mo and high spending
  const adverseTxs: TransactionRecord[] = [
    {
      id: "tx-r-salary",
      timestamp: "2026-09-01 09:30:00",
      amount: 52000,
      type: "CREDIT",
      category: "SALARY",
      payee: "TechServices Corp Ltd",
    },
    {
      id: "tx-r-existing-emi",
      timestamp: "2026-09-05 14:10:00",
      amount: 8500,
      type: "DEBIT",
      category: "EMI",
      payee: "HDFC Home Loan",
    },
    {
      id: "tx-r-new-loan-emi",
      timestamp: "2026-09-06 11:00:00",
      amount: 22000, // New heavy credit line
      type: "DEBIT",
      category: "EMI",
      payee: "Instant Credit FinTech",
    },
    {
      id: "tx-r-grocery",
      timestamp: "2026-09-08 18:22:00",
      amount: 24000,
      type: "DEBIT",
      category: "GROCERIES",
      payee: "DMart",
    },
  ];

  const totalBalance = 25000;
  const metrics = calculateArthBodhMetrics(adverseTxs, totalBalance, {
    incomeEst: 52000,
    emiLoad: 8500,
    surplus: 15120,
  });

  assert.ok(metrics.emiLoad === 30500, "EMI load is 30,500");
  assert.ok(metrics.dtiRatio > 0.55, "DTI is over 55%");
  assert.ok(metrics.surplus < 0, "Surplus is in deficit");
  assert.strictEqual(metrics.stressBand, "HIGH");

  const simulatedProfile = {
    ...getArthBodhProfile("rahul")!,
    ...metrics,
    signals: metrics.detectedSignals,
  };

  const candidates = evaluateJeevanChakraCandidates(simulatedProfile);
  const topCandidate = candidates[0];

  // Relief candidate should now take precedence
  assert.strictEqual(topCandidate.family, "RELIEF");
  assert.ok(topCandidate.needScore >= 0.95);

  // Direct Nifty 50 should fail eligibility / have very low suitability
  const sipCandidate = candidates.find((c) => c.id === "prod-nifty50")!;
  assert.strictEqual(sipCandidate.eligibilityPassed, false);
  assert.ok(sipCandidate.suitabilityScore <= 0.1);
});

// ─────────────────────────────────────────────────────────────
// 5. PERSONA SCENARIO: KAMALA DEVI WITH VARIED CONTEXTS
// ─────────────────────────────────────────────────────────────
console.log("\n--- 5. Testing Kamala Across Different Contexts ---");

it("Kamala Context 1 (MSME Cashflow Tightness): High DTI and delayed receivables rank Moratorium top", () => {
  const profile = getArthBodhProfile("kamala");
  assert.ok(profile);
  assert.strictEqual(profile.personaKey, "kamala");
  assert.strictEqual(profile.stressBand, "HIGH");
  assert.ok(profile.surplus < 0, "Kamala net surplus is negative");

  const candidates = evaluateJeevanChakraCandidates(profile);
  const topCandidate = candidates[0];

  assert.strictEqual(topCandidate.family, "RELIEF");
  assert.strictEqual(topCandidate.id, "prod-moratorium");
  assert.strictEqual(topCandidate.reasonTag, "HIGH_STRESS_RELIEF_REQUIRED");
  assert.ok(topCandidate.needScore >= 0.95);
  assert.ok(topCandidate.suitabilityScore >= 0.95);

  // Vivek evaluates Kamala's high stress profile:
  // Predatory loan offers suppressed; 1-tap moratorium active (ASSIST_FIRST)
  const decision = evaluateVivekDecision("kamala");
  assert.strictEqual(decision.action, "ASSIST_FIRST");
  assert.ok(decision.headline.includes("Suppressed: 36% APR Instant Loan Blocked"));
  assert.strictEqual(decision.ruleCode, "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1");
});

it("Kamala Context 2 (Trade Invoice Cleared & Restructured): Relieved cashflow prioritizes emergency buffer", () => {
  // Simulate trade invoice cleared (+₹45,000) and Loom EMI on 60-day pause
  const recoveryTxs: TransactionRecord[] = [
    {
      id: "tx-k-trade-1",
      timestamp: "2026-09-01 11:00:00",
      amount: 24000,
      type: "CREDIT",
      category: "BUSINESS_INFLOW",
      payee: "Handloom Weavers Co-op",
    },
    {
      id: "tx-k-trade-cleared",
      timestamp: "2026-09-12 10:00:00",
      amount: 45000, // Pending Khadi Board trade payment received
      type: "CREDIT",
      category: "BUSINESS_INFLOW",
      payee: "Gujarat Khadi Board TReDS Settlement",
    },
    {
      id: "tx-k-microfinance",
      timestamp: "2026-09-04 10:15:00",
      amount: 6000, // Restructured microfinance payment
      type: "DEBIT",
      category: "EMI",
      payee: "Janata Microfinance Loan",
    },
    {
      id: "tx-k-essentials",
      timestamp: "2026-09-08 14:00:00",
      amount: 14000,
      type: "DEBIT",
      category: "GROCERIES",
      payee: "Local Stores",
    },
  ];

  const totalBalance = 49000;
  const metrics = calculateArthBodhMetrics(recoveryTxs, totalBalance, {
    incomeEst: 24000,
    emiLoad: 13920,
    surplus: -4200,
  });

  assert.ok(metrics.surplus > 0, "Surplus must be restored to positive");
  assert.ok(metrics.dtiRatio < 0.20, "DTI decreased dramatically");

  const recoveryProfile = {
    ...getArthBodhProfile("kamala")!,
    ...metrics,
    runwayMonths: 2.2, // Still building towards 3.0 months
    signals: metrics.detectedSignals,
  };

  const candidates = evaluateJeevanChakraCandidates(recoveryProfile);
  const bufferCandidate = candidates.find((c) => c.family === "SAVINGS")!;

  assert.ok(bufferCandidate.needScore >= 0.85, "Buffer buildup should have high need");
  assert.strictEqual(bufferCandidate.reasonTag, "BUFFER_BUILDUP_RECOMMENDED");
});

console.log("\n=======================================================");
console.log(`   ALL ${passedCount} / ${totalCount} TESTS PASSED SUCCESSFULLY!`);
console.log("=======================================================\n");
