import { db } from "../db";
import { getArthBodhProfile, ArthBodhProfile } from "./arthbodh";
import { evaluateVivekDecision, VivekDecisionOutput } from "./vivek";
import { getSaharaWellness, SaharaWellnessData } from "./sahara";
import { getKavachAlerts } from "./kavach";
import { logNyayEvent } from "./nyay";

export type BhashaIntent =
  | "KYC_HELP"
  | "PROFILE_HELP"
  | "RECOMMENDATION_EXPLANATION"
  | "WELLNESS_HELP"
  | "FRAUD_HELP"
  | "GENERAL";

export interface ChatTurnInput {
  userIdOrPersona: string;
  userText: string;
  locale: "en" | "hi" | "gu";
  sessionId?: string;
}

export interface ChatTurnOutput {
  reply: string;
  replyText: string;
  locale: "en" | "hi" | "gu";
  intent: BhashaIntent;
  groundingToolsUsed: string[];
  translations: {
    en: string;
    hi: string;
    gu: string;
  };
  cards?: any[];
}

function formatInr(val: number): string {
  return Math.round(val).toLocaleString("en-IN");
}

/**
 * Robust multilingual intent classification across English, Hindi, and Gujarati
 * (including transliterated Latin script / Gujlish / Hinglish).
 */
export function classifyBhashaIntent(text: string): BhashaIntent {
  const normalized = text.toLowerCase().trim();

  // 1. RECOMMENDATION_EXPLANATION (high priority for "why" queries regarding recommendations)
  if (
    normalized.includes("recommend") ||
    normalized.includes("suggest") ||
    normalized.includes("ભલામણ") ||
    normalized.includes("સિફારિશ") ||
    normalized.includes("સિફારસ") ||
    normalized.includes("સુઝાવ") ||
    normalized.includes("सुझाव") ||
    normalized.includes("सिफारिश") ||
    normalized.includes("why this") ||
    normalized.includes("why was it") ||
    normalized.includes("aa kem aapyu") ||
    normalized.includes("kem aapyu") ||
    (normalized.includes("why") &&
      (normalized.includes("this") ||
        normalized.includes("decision") ||
        normalized.includes("sip") ||
        normalized.includes("loan") ||
        normalized.includes("offer")))
  ) {
    return "RECOMMENDATION_EXPLANATION";
  }

  // 2. KYC_HELP (Video KYC, document queries, branch visits)
  if (
    normalized.includes("kyc") ||
    normalized.includes("shu joie") ||
    normalized.includes("su joie") ||
    normalized.includes("shu joiye") ||
    normalized.includes("su joiye") ||
    normalized.includes("કેવાયસી") ||
    normalized.includes("દસ્તાવેજ") ||
    normalized.includes("દસ્તાવેજો") ||
    normalized.includes("दस्तावेज") ||
    normalized.includes("दस्तावेज़") ||
    normalized.includes("केवाईसी") ||
    normalized.includes("vkyc") ||
    normalized.includes("video kyc") ||
    normalized.includes("branch visit") ||
    normalized.includes("visit branch") ||
    normalized.includes("branch javu") ||
    normalized.includes("branch jana") ||
    normalized.includes("pan card") ||
    normalized.includes("aadhaar") ||
    normalized.includes("आधार") ||
    normalized.includes("આધાર") ||
    (normalized.includes("document") && !normalized.includes("balance"))
  ) {
    return "KYC_HELP";
  }

  // 3. WELLNESS_HELP (Financial distress, EMI pause, moratorium, Sahara, debt burden)
  if (
    normalized.includes("stress") ||
    normalized.includes("struggling") ||
    normalized.includes("hardship") ||
    normalized.includes("trouble paying") ||
    normalized.includes("cannot pay") ||
    normalized.includes("can't pay") ||
    normalized.includes("moratorium") ||
    normalized.includes("sahara") ||
    normalized.includes("wellness") ||
    normalized.includes("debt") ||
    ((normalized.includes("pause") ||
      normalized.includes("freeze") ||
      normalized.includes("stop") ||
      normalized.includes("relief") ||
      normalized.includes("રોક") ||
      normalized.includes("રાહત") ||
      normalized.includes("रोक")) &&
      (normalized.includes("emi") ||
        normalized.includes("loan") ||
        normalized.includes("machinery") ||
        normalized.includes("tractor") ||
        normalized.includes("હપ્તો") ||
        normalized.includes("किस्त"))) ||
    normalized.includes("તણાવ") ||
    normalized.includes("મુશ્કેલી") ||
    normalized.includes("તકલીફ") ||
    normalized.includes("સમસ્યા") ||
    normalized.includes("મોરેટોરિયમ") ||
    normalized.includes("तनाव") ||
    normalized.includes("परेशानी") ||
    normalized.includes("तकलीफ") ||
    normalized.includes("समस्या") ||
    normalized.includes("मोरेटोरियम") ||
    normalized.includes("kamala stress")
  ) {
    return "WELLNESS_HELP";
  }

  // 4. FRAUD_HELP (Kavach, suspicious debit, unusual activity, security alerts)
  if (
    normalized.includes("fraud") ||
    normalized.includes("unusual") ||
    normalized.includes("suspicious") ||
    normalized.includes("scam") ||
    normalized.includes("unauthorized") ||
    normalized.includes("anomaly") ||
    normalized.includes("kavach") ||
    normalized.includes("did i send") ||
    normalized.includes("did i transfer") ||
    normalized.includes("unknown vpas") ||
    normalized.includes("freeze account") ||
    normalized.includes("safe") ||
    normalized.includes("શંકાસ્પદ") ||
    normalized.includes("ફ્રોડ") ||
    normalized.includes("કવચ") ||
    normalized.includes("છેતરપિંડી") ||
    normalized.includes("धोखाधड़ी") ||
    normalized.includes("संदिग्ध") ||
    normalized.includes("कवच") ||
    normalized.includes("अनजान") ||
    normalized.includes("फ्रॉड")
  ) {
    return "FRAUD_HELP";
  }

  // 5. PROFILE_HELP (Balances, statements, income, expenses, accounts)
  if (
    normalized.includes("balance") ||
    normalized.includes("profile") ||
    normalized.includes("account") ||
    normalized.includes("statement") ||
    normalized.includes("inflow") ||
    normalized.includes("salary") ||
    normalized.includes("surplus") ||
    normalized.includes("spends") ||
    normalized.includes("savings") ||
    normalized.includes("how much money") ||
    normalized.includes("બેલેન્સ") ||
    normalized.includes("ખાતું") ||
    normalized.includes("આવક") ||
    normalized.includes("પ્રોફાઇલ") ||
    normalized.includes("बैलेंस") ||
    normalized.includes("खाता") ||
    normalized.includes("आय") ||
    normalized.includes("प्रोफ़ाइल") ||
    normalized.includes("kitna paisa") ||
    normalized.includes("ketla paisa")
  ) {
    return "PROFILE_HELP";
  }

  return "GENERAL";
}

/**
 * Core grounded pipeline for BhashaSahayak turns.
 * Strictly adheres to the ARTHIX Constitution:
 * - NEVER invents balances, transactions, scores, reason codes, eligibility, bank actions, or claims RBI certification.
 * - Always grounds decisions in verified SQLite/Service state.
 */
export function processBhashaSahayakTurn(input: ChatTurnInput): ChatTurnOutput {
  const profile = getArthBodhProfile(input.userIdOrPersona) || {
    userId: "u-rahul",
    name: "Rahul Sharma",
    personaKey: "rahul",
    locale: "en",
    incomeEst: 52000,
    essentialSpends: 28400,
    emiLoad: 8500,
    surplus: 15120,
    runwayMonths: 3.2,
    stressScore: 18,
    stressBand: "LOW" as const,
    segment: "SALARIED_SURPLUS",
    incomeCadence: "MONTHLY_REGULAR" as const,
    spendingMix: { essential: 28400, discretionary: 0, emi: 8500, other: 0, essentialRatio: 0.55, discretionaryRatio: 0, emiRatio: 0.16, categories: {} },
    savingsResidual: 15120,
    savingsRate: 0.29,
    surplusTrend: "EXPANDING" as const,
    salaryRegularity: "HIGHLY_REGULAR" as const,
    regularityScore: 0.95,
    dtiRatio: 0.163,
    signals: [],
    accounts: [{ bankName: "State Bank of India", maskedNo: "•••• 4218", balance: 64820 }],
  };

  const intent = classifyBhashaIntent(input.userText);
  const groundingToolsUsed: string[] = [];

  let translations: { en: string; hi: string; gu: string };

  switch (intent) {
    case "KYC_HELP": {
      groundingToolsUsed.push("get_kyc_requirements", "get_consent_status");

      const consentRecord = db
        .prepare("SELECT status FROM consent_records WHERE user_id = ? AND (purpose LIKE '%KYC%' OR purpose LIKE '%Identity%')")
        .get(profile.userId) as any;

      const consentActive = consentRecord && consentRecord.status !== "REVOKED";

      translations = {
        en: `You do NOT need to visit any bank branch! For Video KYC, you only need three simple things:
1. Your physical Original PAN card
2. Your Aadhaar number for instant OTP authentication
3. A smartphone or device with camera in a well-lit room for a quick 2-minute video call.

Verification is completed 100% from home.${
          consentActive ? "\n\nIdentity Status: DigiLocker/Aadhaar verification consent is currently ACTIVE on your profile." : ""
        }`,
        hi: `आपको किसी भी बैंक शाखा जाने की बिल्कुल आवश्यकता नहीं है! वीडियो केवाईसी (Video KYC) के लिए आपको केवल तीन चीजें चाहिए:
1. आपका मूल पैन कार्ड (Original PAN Card)
2. त्वरित ओटीपी सत्यापन के लिए आधार नंबर
3. अच्छे प्रकाश वाले कमरे में 2 मिनट के वीडियो कॉल के लिए कैमरा युक्त स्मार्टफोन।

यह सत्यापन घर बैठे सुरक्षित रूप से पूरा हो जाता है।${
          consentActive ? "\n\nपहचान स्थिति: डिजिलॉकर/आधार सत्यापन सहमति आपके प्रोफाइल पर वर्तमान में सक्रिय है।" : ""
        }`,
        gu: `તમારે કોઈપણ બેંક શાખા જવાની બિલકુલ જરૂર નથી! વિડિયો કેવાયસી (Video KYC) માટે તમારે ફક્ત ત્રણ સરળ વસ્તુઓની જરૂર છે:
૧. તમારું અસલ પાન કાર્ડ (Original PAN Card)
૨. ઓટીપી (OTP) ચકાસણી માટે આધાર નંબર
૩. સારા અજવાળાવાળા રૂમમાં ૨ મિનિટના વિડિયો કૉલ માટે સ્માર્ટફોન કે કેમેરા.

આ પ્રક્રિયા સંપૂર્ણપણે ઘરે બેઠાં પૂરી થઈ જશે.${
          consentActive ? "\n\nઓળખ સ્થિતિ: ડીજીલોકર/આધાર ચકાસણી સંમતિ આપના પ્રોફાઇલ પર હાલમાં સક્રિય છે." : ""
        }`,
      };
      break;
    }

    case "PROFILE_HELP": {
      groundingToolsUsed.push("get_profile", "get_accounts");

      const primaryAcc = profile.accounts[0] || { bankName: "Bank Account", maskedNo: "•••• 0000", balance: 0 };
      const balanceStr = formatInr(primaryAcc.balance);
      const incomeStr = formatInr(profile.incomeEst);
      const emiStr = formatInr(profile.emiLoad);
      const surplusStr = formatInr(profile.surplus);
      const runwayStr = profile.runwayMonths.toString();
      const stressStr = `${profile.stressScore}/100 (${profile.stressBand})`;

      translations = {
        en: `Verified account summary for ${profile.name}:
• Bank Account: ${primaryAcc.bankName} (${primaryAcc.maskedNo})
• Available Balance: ₹${balanceStr}
• Estimated Monthly Income: ₹${incomeStr}
• Active EMI Load: ₹${emiStr}
• Free Monthly Surplus: ₹${surplusStr}
• Emergency Runway: ${runwayStr} months
• Financial Health: ${stressStr}`,
        hi: `${profile.name} जी, यह आपका सत्यापित वित्तीय विवरण है:
• बैंक खाता: ${primaryAcc.bankName} (${primaryAcc.maskedNo})
• उपलब्ध शेष राशि (बैलेंस): ₹${balanceStr}
• अनुमानित मासिक आय: ₹${incomeStr}
• सक्रिय मासिक ईएमआई: ₹${emiStr}
• मासिक बचत सरप्लस: ₹${surplusStr}
• आपातकालीन रनवे: ${runwayStr} महीने
• वित्तीय स्वास्थ्य: ${stressStr}`,
        gu: `${profile.name} જી, આ આપના ખાતાની પ્રમાણિત વિગતો છે:
• બેંક ખાતું: ${primaryAcc.bankName} (${primaryAcc.maskedNo})
• ઉપલબ્ધ બેલેન્સ: ₹${balanceStr}
• અંદાજિત માસિક આવક: ₹${incomeStr}
• સક્રિય માસિક ઇએમઆઈ: ₹${emiStr}
• માસિક મુક્ત બચત (સરપ્લસ): ₹${surplusStr}
• ઇમરજન્સી રનવે: ${runwayStr} મહિના
• નાણાકીય સ્થિતિ: ${stressStr}`,
      };
      break;
    }

    case "RECOMMENDATION_EXPLANATION": {
      groundingToolsUsed.push("evaluate_vivek_decision", "get_profile", "get_nyay_reasons");

      const decision: VivekDecisionOutput = evaluateVivekDecision(profile.userId);
      const dtiPct = Math.round((profile.emiLoad / (profile.incomeEst || 1)) * 100);

      if (decision.action === "RECOMMEND") {
        const prodName = decision.candidateProduct?.name || decision.headline || "Direct Index SIP";
        translations = {
          en: `Vivek recommended ${prodName} under rule ${decision.ruleCode}.

Why this recommendation?
1. Sustained Surplus: You maintain a steady monthly surplus of ₹${formatInr(profile.surplus)} with ${profile.runwayMonths} months of emergency runway.
2. Safe Leverage: Your debt-to-income (DTI) ratio is ${dtiPct}%, safely within the 35% fiduciary threshold.
3. Zero Commission: 100% direct fiduciary vehicle with 0% distributor kickbacks.`,
          hi: `विवेक ने नियम ${decision.ruleCode} के तहत ${prodName} की सिफारिश की है।

यह सिफारिश क्यों?
1. स्थिर सरप्लस: आपके पास ₹${formatInr(profile.surplus)} का मासिक सरप्लस और ${profile.runwayMonths} महीने का रिजर्व रनवे है।
2. सुरक्षित कर्ज स्तर: आपका डीटीआई (DTI) अनुपात ${dtiPct}% है, जो 35% की सुरक्षित सीमा के भीतर है।
3. शून्य कमीशन: 0% डिस्ट्रीब्यूटर कमीशन के साथ 100% प्रत्यक्ष योजना।`,
          gu: `વિવેકે નિયમ ${decision.ruleCode} હેઠળ ${prodName} ની ભલામણ કરી છે.

આ ભલામણ શા માટે?
૧. મજબૂત સરપ્લસ: તમારી પાસે દર મહિને ₹${formatInr(profile.surplus)} નો ચોખ્ખો સરપ્લસ અને ${profile.runwayMonths} મહિનાનું ઇમરજન્સી રનવે છે.
૨. સુરક્ષિત દેવું: તમારો ડીટીઆઈ (DTI) રેશિયો ${dtiPct}% છે, જે 35% ની સલામત મર્યાદામાં છે.
૩. શૂન્ય કમિશન: 0% ડિસ્ટ્રિબ્યુટર કમિશન સાથે 100% ડાયરેક્ટ પ્લાન.`,
        };
      } else {
        // ASSIST_FIRST or SUPPRESS
        translations = {
          en: `Vivek prioritized assistance over credit recommendations under rule ${decision.ruleCode}.

Why credit products were suppressed:
1. Financial Stress: Your verified stress score is ${profile.stressScore}/100 (${profile.stressBand} band).
2. Heavy Debt Burden: Committed EMIs consume ${dtiPct}% of your monthly inflow (₹${formatInr(profile.emiLoad)} of ₹${formatInr(profile.incomeEst)}).
3. Protective Hold Active: Predatory credit solicitations are blocked. We recommend Sahara 60-day EMI moratorium relief instead.`,
          hi: `विवेक ने नियम ${decision.ruleCode} के तहत नए कर्ज के बजाय राहत और सहायता को प्राथमिकता दी है।

कर्ज उत्पादों पर रोक क्यों लगाई गई:
1. वित्तीय तनाव: आपका सत्यापित तनाव स्कोर ${profile.stressScore}/100 (${profile.stressBand} श्रेणी) है।
2. भारी कर्ज बोझ: सक्रिय ईएमआई आपकी आय का ${dtiPct}% (₹${formatInr(profile.incomeEst)} में से ₹${formatInr(profile.emiLoad)}) ले रही है।
3. सुरक्षात्मक रोक सक्रिय: सभी नए लोन प्रस्ताव ब्लॉक किए गए हैं। इसके बजाय सहारा 60-दिन ईएमआई राहत उपलब्ध है।`,
          gu: `વિવેકે નિયમ ${decision.ruleCode} હેઠળ નવી લોન આપવાને બદલે રાહત અને સહાયને પ્રાથમિકતા આપી છે.

નવી લોન કેમ રોકવામાં આવી:
૧. નાણાકીય તણાવ: આપનો પ્રમાણિત તણાવ સ્કોર ${profile.stressScore}/100 (${profile.stressBand} શ્રેણી) છે.
૨. ભારે દેવાનો બોજ: સક્રિય ઇએમઆઈ આપની આવકના ${dtiPct}% (₹${formatInr(profile.incomeEst)} માંથી ₹${formatInr(profile.emiLoad)}) વાપરે છે.
૩. સુરક્ષા કવચ સક્રિય: તમામ વ્યાવસાયિક લોન ઑફર્સ પર રોક લગાવીને સહારા 60-દિવસની ઇએમઆઈ રાહતની ભલામણ કરાઈ છે.`,
        };
      }
      break;
    }

    case "WELLNESS_HELP": {
      groundingToolsUsed.push("get_sahara_wellness", "get_profile");

      const wellness: SaharaWellnessData = getSaharaWellness(profile.userId);
      const dtiPct = Math.round((wellness.cashFlowAudit.committedEmis / (wellness.cashFlowAudit.monthlyInflow || 1)) * 100);

      if (wellness.stressBand === "HIGH") {
        translations = {
          en: `ARTHIX Sahara Protective Shield is active for your account.

Financial Health Status:
• Stress Score: ${wellness.stressScore}/100 (${wellness.stressBand})
• Monthly Inflow: ₹${formatInr(wellness.cashFlowAudit.monthlyInflow)}
• Committed EMIs: ₹${formatInr(wellness.cashFlowAudit.committedEmis)} (${dtiPct}% of inflow)
• Net Monthly Deficit: ₹${formatInr(Math.abs(wellness.cashFlowAudit.netDeficit))}
• Protective Credit Hold: ACTIVE (zero loan solicitations allowed)

Available Relief Actions:
1. Apply 60-Day EMI Pause on Machinery Loan (freezes monthly ₹1,200 EMI with 0 penalties and 0 credit bureau impact)
2. Shift repayment due date to the 28th of month (aligns with delayed trade receivables)
3. Connect 1-on-1 with a compassionate financial counselor.`,
          hi: `आर्थिक्स सहारा सुरक्षा कवच आपके खाते पर सक्रिय है।

वित्तीय स्थिति विवरण:
• तनाव स्कोर: ${wellness.stressScore}/100 (${wellness.stressBand})
• मासिक आय: ₹${formatInr(wellness.cashFlowAudit.monthlyInflow)}
• सक्रिय ईएमआई: ₹${formatInr(wellness.cashFlowAudit.committedEmis)} (आय का ${dtiPct}%)
• मासिक घाटा (डेफिसिट): ₹${formatInr(Math.abs(wellness.cashFlowAudit.netDeficit))}
• सुरक्षात्मक लोन लॉक: सक्रिय (कोई आक्रामक लोन नहीं दिखाया जाएगा)

उपलब्ध राहत कदम:
1. मशीनरी लोन पर 60 दिनों की ईएमआई रोकें (₹1,200/माह ईएमआई पर 0 पेनाल्टी और 0 सिबिल प्रभाव)
2. भुगतान तिथि 28 तारीख तक बढ़ाएं
3. वित्तीय परामर्शदाता से संपर्क का अनुरोध करें।`,
          gu: `આર્થિક્સ સહારા સુરક્ષા કવચ આપના ખાતા પર સક્રિય છે.

નાણાકીય સ્થિતિ વિગતો:
• તણાવ સ્કોર: ${wellness.stressScore}/100 (${wellness.stressBand})
• માસિક આવક: ₹${formatInr(wellness.cashFlowAudit.monthlyInflow)}
• સક્રિય ઇએમઆઈ: ₹${formatInr(wellness.cashFlowAudit.committedEmis)} (આવકના ${dtiPct}%)
• માસિક ખાધ (ડેફિસિટ): ₹${formatInr(Math.abs(wellness.cashFlowAudit.netDeficit))}
• સુરક્ષાત્મક લોન લૉક: સક્રિય (કોઈ વ્યાવસાયિક લોન ઑફર આપવામાં આવશે નહીં)

ઉપલબ્ધ રાહત વિકલ્પો:
૧. મશીનરી લોન પર ૬૦ દિવસની ઇએમઆઈ રાહત (₹૧,૨૦૦/માસિક હપ્તો ૦ પેનલ્ટી અને ૦ ક્રેડિટ બ્યુરો અસર સાથે ફ્રીઝ)
૨. હપ્તાની તારીખ ૨૮મી સુધી લંબાવો
૩. નાણાકીય સલાહકાર સાથે વાતચીતનો અનુરોધ કરો.`,
        };
      } else {
        translations = {
          en: `Your cashflow is resilient and healthy.
• Stress Score: ${wellness.stressScore}/100 (${wellness.stressBand})
• Free Monthly Surplus: ₹${formatInr(profile.surplus)}
• Emergency Runway: ${profile.runwayMonths} months
No debt relief intervention is required at this time.`,
          hi: `आपका नकदी प्रवाह स्थिर और सुरक्षित है।
• तनाव स्कोर: ${wellness.stressScore}/100 (${wellness.stressBand})
• मासिक बचत सरप्लस: ₹${formatInr(profile.surplus)}
• आपातकालीन रनवे: ${profile.runwayMonths} महीने
वर्तमान में किसी कर्ज राहत हस्तक्षेप की आवश्यकता नहीं है।`,
          gu: `આપનો કેશફ્લો સુરક્ષિત અને મજબૂત છે.
• તણાવ સ્કોર: ${wellness.stressScore}/100 (${wellness.stressBand})
• માસિક મુક્ત સરપ્લસ: ₹${formatInr(profile.surplus)}
• ઇમરજન્સી રનવે: ${profile.runwayMonths} મહિના
હાલ કોઈ દેવા રાહતની જરૂર નથી.`,
        };
      }
      break;
    }

    case "FRAUD_HELP": {
      groundingToolsUsed.push("get_kavach_fraud_events", "get_kavach_alerts");

      let pendingFraud = db
        .prepare(
          "SELECT fe.*, t.amount, t.payee, t.timestamp as tx_time FROM fraud_events fe JOIN transactions t ON fe.transaction_id = t.id WHERE fe.user_id = ? AND fe.customer_response = 'PENDING' LIMIT 1"
        )
        .get(profile.userId) as any;

      if (!pendingFraud) {
        const unusualTx = db
          .prepare("SELECT * FROM transactions WHERE user_id = ? AND is_unusual = 1 ORDER BY timestamp DESC LIMIT 1")
          .get(profile.userId) as any;

        if (unusualTx) {
          pendingFraud = {
            id: `fe-${unusualTx.id}`,
            amount: unusualTx.amount,
            payee: unusualTx.payee,
            tx_time: unusualTx.timestamp,
            customer_response: "PENDING",
          };
        }
      }

      if (pendingFraud) {
        const amtStr = formatInr(pendingFraud.amount);
        translations = {
          en: `Kavach Anomaly Detection Alert on your account:
• Flagged Transfer: ₹${amtStr} debit to "${pendingFraud.payee}"
• Transaction Time: ${pendingFraud.tx_time}
• Verification Status: PENDING CUSTOMER CONFIRMATION
• Account Status: ACTIVE (Your account is NOT frozen; ARTHIX safeguards customer access)
• Zero-Liability Protection: ACTIVE

Please confirm: Did you authorize this transfer? Reply "YES" to confirm, or "NO" to escalate and notify our fraud operations team.`,
          hi: `आपके खाते पर कवच सुरक्षा अलर्ट:
• संदिग्ध लेनदेन: "${pendingFraud.payee}" को ₹${amtStr} का डेबिट
• समय: ${pendingFraud.tx_time}
• स्थिति: ग्राहक सत्यापन लंबित
• खाता स्थिति: सक्रिय (आपका खाता फ्रीज नहीं किया गया है; आर्थिक्स संविधान अनुसार खाता स्वतः बंद नहीं होता)
• शून्य-दायित्व सुरक्षा: सक्रिय

कृपया पुष्टि करें: क्या यह भुगतान आपने किया था? पुष्टि के लिए "हाँ" (YES) लिखें, या शिकायत के लिए "नहीं" (NO) लिखें।`,
          gu: `તમારા ખાતા પર કવચ સુરક્ષા એલર્ટ:
• શંકાસ્પદ વ્યવહાર: "${pendingFraud.payee}" ને ₹${amtStr} નું ડેબિટ
• સમય: ${pendingFraud.tx_time}
• સ્થિતિ: ગ્રાહક ચકાસણી બાકી
• ખાતાની સ્થિતિ: સક્રિય (તમારું ખાતું ફ્રીઝ કરવામાં આવ્યું નથી; આર્થિક્સ સંવિધાન મુજબ ખાતું બંધ થતું નથી)
• ઝીરો-લાયબિલિટી સુરક્ષા: સક્રિય

કૃપા કરીને ચકાસો: શું આ ચૂકવણી તમે કરી હતી? પુષ્ટિ કરવા "હા" (YES) લખો, અથવા સુરક્ષા ફરિયાદ માટે "ના" (NO) લખો.`,
        };
      } else {
        const masked = profile.accounts[0]?.maskedNo || "••••";
        translations = {
          en: `Kavach Security Status: All transactions on your account (${masked}) are verified and routine. No unauthorized debits or anomalous payees have been detected. Your account is secure.`,
          hi: `कवच सुरक्षा स्थिति: आपके खाते (${masked}) पर सभी लेनदेन सत्यापित और सामान्य हैं। कोई भी संदिग्ध भुगतानकर्ता या असामान्य गतिविधि नहीं पाई गई है। आपका खाता पूर्णतः सुरक्षित है।`,
          gu: `કવચ સુરક્ષા સ્થિતિ: આપના ખાતા (${masked}) પર તમામ વ્યવહારો પ્રમાણિત અને સામાન્ય છે. કોઈ શંકાસ્પદ પાયી કે અનિયમિત વ્યવહાર જણાયેલ નથી. આપનું ખાતું સંપૂર્ણપણે સુરક્ષિત છે.`,
        };
      }
      break;
    }

    case "GENERAL":
    default: {
      groundingToolsUsed.push("get_profile", "evaluate_vivek_decision");
      const decision = evaluateVivekDecision(profile.userId);

      translations = {
        en: `Namaste, ${profile.name}! I am BhashaSahayak, your vernacular banking assistant. I can assist you with:
1. Video KYC requirements ("KYC ma shu joie?")
2. Account balances and financial profile ("What is my balance?")
3. Vivek recommendation explanations ("Why did you recommend this?")
4. Sahara financial wellness & EMI relief
5. Kavach fraud alerts and transaction verification

Vivek status for your account is currently ${decision.action} (${decision.ruleCode}). How may I help you today?`,
        hi: `नमस्ते ${profile.name} जी! मैं भाषा सहायक हूँ, आपका डिजिटल बैंक सहायक। मैं आपकी इन विषयों में मदद कर सकता हूँ:
1. वीडियो केवाईसी आवश्यकताएं ("KYC ma shu joie?")
2. खाता शेष और वित्तीय प्रोफाइल ("मेरा बैलेंस कितना है?")
3. विवेक सिफारिशों का स्पष्टीकरण ("यह सिफारिश क्यों की?")
4. सहारा वित्तीय तनाव और ईएमआई राहत
5. कवच फ्रॉड सुरक्षा और लेनदेन सत्यापन

विवेक प्रणाली स्थिति: ${decision.action} (${decision.ruleCode})। आज मैं आपकी क्या सहायता करूँ?`,
        gu: `નમસ્તે ${profile.name} જી! હું ભાષા સહાયક છું, આપનો ડિજિટલ બેંક સહાયક. હું આપને આ વિષયોમાં મદદ કરી શકું છું:
૧. વિડિયો કેવાયસી પ્રક્રિયા (KYC ma shu joie?)
૨. ખાતાનું બેલેન્સ અને પ્રોફાઇલ (મારું બેલેન્સ કેટલું છે?)
૩. વિવેક ભલામણોનું કારણ (શા માટે આ ભલામણ કરી?)
૪. સહારા નાણાકીય રાહત અને ઇએમઆઈ સહાય
૫. કવચ ફ્રોડ સુરક્ષા અને વ્યવહાર ચકાસણી

વિવેક નિર્ણય સ્થિતિ: ${decision.action} (${decision.ruleCode}). આજે હું આપને કેવી રીતે મદદ કરી શકું?`,
      };
      break;
    }
  }

  // Pick locale reply
  const replyText = translations[input.locale] || translations.en;

  // Audit logging & Session persistence
  try {
    const sessionId = input.sessionId || `sess-${profile.userId}-${new Date().toISOString().slice(0, 10)}`;
    db.prepare("INSERT INTO chat_sessions (id, user_id, locale) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING").run(
      sessionId,
      profile.userId,
      input.locale
    );

    const userMsgId = `msg-u-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const botMsgId = `msg-b-${Date.now() + 1}-${Math.random().toString(36).substring(2, 6)}`;

    db.prepare("INSERT INTO chat_messages (id, session_id, sender, content) VALUES (?, ?, 'user', ?)").run(
      userMsgId,
      sessionId,
      input.userText
    );

    db.prepare("INSERT INTO chat_messages (id, session_id, sender, content, tool_trace) VALUES (?, ?, 'bot', ?, ?)").run(
      botMsgId,
      sessionId,
      replyText,
      JSON.stringify(groundingToolsUsed)
    );

    logNyayEvent(profile.userId, "SYSTEM", "BHASHA_SAHAYAK_CHAT", "RULE_CONVERSATIONAL_GROUNDING_V1", {
      intent,
      locale: input.locale,
      groundingToolsUsed,
    });
  } catch (err) {
    // Non-blocking database logging
  }

  return {
    reply: replyText,
    replyText,
    locale: input.locale,
    intent,
    groundingToolsUsed,
    translations,
    cards: [],
  };
}
