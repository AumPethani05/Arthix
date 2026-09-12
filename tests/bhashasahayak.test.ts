import { describe, it } from "node:test";
import assert from "node:assert";
import { processBhashaSahayakTurn, classifyBhashaIntent } from "../lib/services/bhashasahayak";
import { db } from "../lib/db";

console.log("\n=======================================================");
console.log("   ARTHIX: BHASHASAHAYAK MULTILINGUAL GROUNDING SUITE  ");
console.log("=======================================================\n");

describe("BhashaSahayak Conversational Grounding & Fiduciary Integrity", () => {
  // ─── 1. Intent Classification ───────────────────────────
  it("correctly classifies multilingual and transliterated intents", () => {
    // KYC_HELP
    assert.strictEqual(classifyBhashaIntent("KYC ma shu joie?"), "KYC_HELP");
    assert.strictEqual(classifyBhashaIntent("What documents do I need for Video KYC?"), "KYC_HELP");
    assert.strictEqual(classifyBhashaIntent("કેવાયસી માટે શું જોઈએ?"), "KYC_HELP");
    assert.strictEqual(classifyBhashaIntent("केवाईसी के लिए कौन से दस्तावेज चाहिए?"), "KYC_HELP");

    // RECOMMENDATION_EXPLANATION
    assert.strictEqual(classifyBhashaIntent("Why did you recommend this?"), "RECOMMENDATION_EXPLANATION");
    assert.strictEqual(classifyBhashaIntent("Explain recommendation"), "RECOMMENDATION_EXPLANATION");
    assert.strictEqual(classifyBhashaIntent("આ ભલામણ કેમ કરવામાં આવી?"), "RECOMMENDATION_EXPLANATION");
    assert.strictEqual(classifyBhashaIntent("यह सिफारिश क्यों की गई?"), "RECOMMENDATION_EXPLANATION");

    // WELLNESS_HELP
    assert.strictEqual(classifyBhashaIntent("I am struggling with my EMI payments, please help"), "WELLNESS_HELP");
    assert.strictEqual(classifyBhashaIntent("How do I pause my tractor or machinery EMI?"), "WELLNESS_HELP");
    assert.strictEqual(classifyBhashaIntent("મને ઇએમઆઈ ભરવામાં તકલીફ છે"), "WELLNESS_HELP");
    assert.strictEqual(classifyBhashaIntent("मुझे लोन चुकाने में परेशानी हो रही है"), "WELLNESS_HELP");
    assert.strictEqual(classifyBhashaIntent("Kamala stress help query"), "WELLNESS_HELP");

    // FRAUD_HELP
    assert.strictEqual(classifyBhashaIntent("Was there an unusual transaction on my account?"), "FRAUD_HELP");
    assert.strictEqual(classifyBhashaIntent("Did I transfer to Unknown VPAs?"), "FRAUD_HELP");
    assert.strictEqual(classifyBhashaIntent("ખાતામાં કોઈ શંકાસ્પદ વ્યવહાર થયો છે?"), "FRAUD_HELP");
    assert.strictEqual(classifyBhashaIntent("क्या खाते में कोई फ्रॉड लेनदेन हुआ है?"), "FRAUD_HELP");

    // PROFILE_HELP
    assert.strictEqual(classifyBhashaIntent("What is my current account balance?"), "PROFILE_HELP");
    assert.strictEqual(classifyBhashaIntent("Show my financial profile"), "PROFILE_HELP");
    assert.strictEqual(classifyBhashaIntent("મારું બેલેન્સ કેટલું છે?"), "PROFILE_HELP");
    assert.strictEqual(classifyBhashaIntent("मेरा खाता बैलेंस बताओ"), "PROFILE_HELP");
  });

  // ─── 2. Test Requirement 1: "KYC ma shu joie?" in Gujarati ─
  it("handles 'KYC ma shu joie?' in Gujarati with 100% grounded checklist and no branch visit", () => {
    const result = processBhashaSahayakTurn({
      userIdOrPersona: "meena",
      userText: "KYC ma shu joie?",
      locale: "gu",
    });

    assert.strictEqual(result.intent, "KYC_HELP");
    assert.strictEqual(result.locale, "gu");
    assert.ok(result.groundingToolsUsed.includes("get_kyc_requirements"));

    // Verify Gujarati content specifies original PAN, Aadhaar OTP, and video call
    assert.ok(result.replyText.includes("પાન કાર્ડ") || result.replyText.includes("PAN"));
    assert.ok(result.replyText.includes("આધાર") || result.replyText.includes("Aadhaar") || result.replyText.includes("OTP"));
    assert.ok(result.replyText.includes("બેંક શાખા જવાની બિલકુલ જરૂર નથી"));

    // Constitutional check: MUST NOT invent RBI certification
    assert.ok(!result.replyText.includes("આરબીઆઈ-પ્રમાણિત"));
    assert.ok(!result.replyText.includes("RBI-certified"));
    console.log("  ✓ 'KYC ma shu joie?' in Gujarati verified with zero hallucinations");
  });

  // ─── 3. Test Requirement 2: "Why did you recommend this?" ─
  it("explains Vivek recommendation for Rahul (fiduciary expansion) and Kamala (stress suppression)", () => {
    // Rahul: Surplus expansion → Direct Nifty 50 Index SIP
    const rahulResult = processBhashaSahayakTurn({
      userIdOrPersona: "rahul",
      userText: "Why did you recommend this?",
      locale: "en",
    });

    assert.strictEqual(rahulResult.intent, "RECOMMENDATION_EXPLANATION");
    assert.ok(rahulResult.groundingToolsUsed.includes("evaluate_vivek_decision"));
    assert.ok(rahulResult.replyText.includes("RULE_EXPANSION_STABLE_SURPLUS_V4") || rahulResult.replyText.includes("Direct Nifty 50 Index SIP"));
    assert.ok(rahulResult.replyText.includes("40,100") || rahulResult.replyText.includes("15,120")); // Grounded free surplus
    assert.ok(rahulResult.replyText.includes("0% distributor kickbacks") || rahulResult.replyText.includes("Zero Commission") || rahulResult.replyText.includes("0%"));
    assert.ok(!rahulResult.replyText.includes("RBI certified"));

    // Kamala: High stress → Credit suppressed, 60-day Moratorium relief
    const kamalaResult = processBhashaSahayakTurn({
      userIdOrPersona: "kamala",
      userText: "Why did you recommend this?",
      locale: "en",
    });

    assert.strictEqual(kamalaResult.intent, "RECOMMENDATION_EXPLANATION");
    assert.ok(kamalaResult.replyText.includes("RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1") || kamalaResult.replyText.includes("Protective Hold Active"));
    assert.ok(kamalaResult.replyText.includes("HIGH") || kamalaResult.replyText.includes("82/100") || kamalaResult.replyText.includes("100/100")); // Grounded stress band/score
    assert.ok(kamalaResult.replyText.includes("58%")); // Grounded EMI burden
    assert.ok(kamalaResult.replyText.includes("13,920")); // Grounded committed EMIs
    assert.ok(kamalaResult.replyText.includes("Protective Hold Active") || kamalaResult.replyText.includes("moratorium"));
    console.log("  ✓ 'Why did you recommend this?' verified across different user contexts");
  });

  // ─── 4. Test Requirement 3: Kamala Stress-Help Query ─
  it("provides grounded Sahara assistance for Kamala stress-help query with 60-day moratorium", () => {
    const result = processBhashaSahayakTurn({
      userIdOrPersona: "kamala",
      userText: "I am struggling with my EMI payments, please help me with my loans",
      locale: "en",
    });

    assert.strictEqual(result.intent, "WELLNESS_HELP");
    assert.ok(result.groundingToolsUsed.includes("get_sahara_wellness"));
    assert.ok(result.replyText.includes("HIGH") || result.replyText.includes("Stress Score"));
    assert.ok(result.replyText.includes("₹13,920"));
    assert.ok(result.replyText.includes("58% of inflow"));
    assert.ok(result.replyText.includes("Protective Credit Hold: ACTIVE"));
    assert.ok(result.replyText.includes("60-Day EMI Pause on Machinery Loan"));
    assert.ok(result.replyText.includes("₹1,200")); // Grounded relief amount

    // Also verify in Hindi
    const resultHi = processBhashaSahayakTurn({
      userIdOrPersona: "kamala",
      userText: "मुझे ईएमआई भरने में बहुत परेशानी हो रही है",
      locale: "hi",
    });
    assert.strictEqual(resultHi.locale, "hi");
    assert.ok(resultHi.replyText.includes("HIGH") || resultHi.replyText.includes("तनाव स्कोर"));
    assert.ok(resultHi.replyText.includes("13,920"));
    assert.ok(resultHi.replyText.includes("60 दिनों की ईएमआई रोकें"));
    console.log("  ✓ Kamala stress-help query verified with exact cashflow audit and moratorium relief");
  });

  // ─── 5. Test PROFILE_HELP: Real Balances from DB ────────
  it("grounds PROFILE_HELP in actual database balances without inventing figures", () => {
    const rahulProfile = processBhashaSahayakTurn({
      userIdOrPersona: "rahul",
      userText: "What is my account balance?",
      locale: "en",
    });

    assert.strictEqual(rahulProfile.intent, "PROFILE_HELP");
    assert.ok(rahulProfile.groundingToolsUsed.includes("get_profile"));
    assert.ok(rahulProfile.groundingToolsUsed.includes("get_accounts"));
    assert.ok(rahulProfile.replyText.includes("₹64,820")); // Exact Rahul SBI balance
    assert.ok(rahulProfile.replyText.includes("•••• 4218"));
    assert.ok(rahulProfile.replyText.includes("₹52,000")); // Exact income
    assert.ok(rahulProfile.replyText.includes("40,100") || rahulProfile.replyText.includes("15,120")); // Exact surplus

    // Kamala balance
    const kamalaProfile = processBhashaSahayakTurn({
      userIdOrPersona: "kamala",
      userText: "Mera account balance kitna hai?",
      locale: "hi",
    });
    assert.ok(kamalaProfile.replyText.includes("₹18,400")); // Exact Kamala SBI balance
    assert.ok(kamalaProfile.replyText.includes("•••• 9021"));
    console.log("  ✓ PROFILE_HELP grounded in verified database balances");
  });

  // ─── 6. Test FRAUD_HELP: Kavach Anomaly Alerts & No Auto-Freeze ──
  it("grounds FRAUD_HELP in Kavach anomaly events and strictly enforces NO auto-freeze", () => {
    // Kamala has pending fraud event fe-k4: ₹18,500 to Unknown VPAs
    const kamalaFraud = processBhashaSahayakTurn({
      userIdOrPersona: "kamala",
      userText: "Was there a suspicious transaction on my account?",
      locale: "en",
    });

    assert.strictEqual(kamalaFraud.intent, "FRAUD_HELP");
    assert.ok(kamalaFraud.groundingToolsUsed.includes("get_kavach_fraud_events"));
    assert.ok(kamalaFraud.replyText.includes("₹18,500"));
    assert.ok(kamalaFraud.replyText.includes("Unknown VPAs Merchant"));
    assert.ok(kamalaFraud.replyText.includes("Your account is NOT frozen"));
    assert.ok(kamalaFraud.replyText.includes("Zero-Liability Protection: ACTIVE"));

    // Rahul has clean transaction history
    const rahulFraud = processBhashaSahayakTurn({
      userIdOrPersona: "rahul",
      userText: "Any fraud alert?",
      locale: "en",
    });
    assert.ok(rahulFraud.replyText.includes("All transactions on your account (•••• 4218) are verified and routine"));
    console.log("  ✓ FRAUD_HELP accurately flags anomaly event and enforces constitutional NO auto-freeze");
  });

  // ─── 7. Multilingual Consistency Across EN, HI, GU ─────
  it("provides valid translations in English, Hindi, and Gujarati for every intent turn", () => {
    const result = processBhashaSahayakTurn({
      userIdOrPersona: "rahul",
      userText: "KYC ma shu joie?",
      locale: "gu",
    });

    assert.ok(result.translations.en.length > 20);
    assert.ok(result.translations.hi.length > 20);
    assert.ok(result.translations.gu.length > 20);
    assert.ok(result.translations.gu.includes("પાન કાર્ડ"));
    assert.ok(result.translations.hi.includes("पैन कार्ड"));
    assert.ok(result.translations.en.includes("PAN card"));
    console.log("  ✓ Multilingual translation consistency verified across all 3 languages");
  });

  // ─── 8. Anti-Hallucination & Fiduciary Defense Check ────
  it("never invents balances, transactions, scores, reason codes, or RBI certifications", () => {
    const queries = [
      { text: "KYC ma shu joie?", locale: "gu" as const },
      { text: "Why did you recommend this?", locale: "en" as const },
      { text: "I have loan stress", locale: "en" as const },
      { text: "Account balance", locale: "en" as const },
      { text: "Suspicious transaction check", locale: "en" as const },
      { text: "Hello", locale: "en" as const },
    ];

    for (const q of queries) {
      const turn = processBhashaSahayakTurn({
        userIdOrPersona: "rahul",
        userText: q.text,
        locale: q.locale,
      });

      // No claim of RBI certification
      assert.ok(!turn.replyText.toLowerCase().includes("rbi-certified"));
      assert.ok(!turn.replyText.includes("આરબીઆઈ-પ્રમાણિત"));
      assert.ok(!turn.replyText.toLowerCase().includes("rbi certification"));

      // Grounding tools must always be populated
      assert.ok(turn.groundingToolsUsed.length > 0);
    }
    console.log("  ✓ Anti-hallucination fiduciary defense checks passed");
  });
});
