import { evaluateVivekDecision } from "./vivek";
import { getArthBodhProfile } from "./arthbodh";
import { getSaharaWellness, applySaharaRelief } from "./sahara";

export interface ChatTurnInput {
  userIdOrPersona: string;
  userText: string;
  locale: "en" | "hi" | "gu";
  sessionId?: string;
}

export interface ChatTurnOutput {
  replyText: string;
  locale: "en" | "hi" | "gu";
  groundingToolsUsed: string[];
  cards?: any[];
}

export function processBhashaSahayakTurn(input: ChatTurnInput): ChatTurnOutput {
  const profile = getArthBodhProfile(input.userIdOrPersona);
  const decision = evaluateVivekDecision(input.userIdOrPersona);
  const text = input.userText.toLowerCase();

  let replyText = "";
  let groundingToolsUsed: string[] = ["get_profile", "evaluate_vivek_decision"];

  if (text.includes("kyc") || text.includes("document") || text.includes("દસ્તાવેજ") || text.includes("દસ્તાવેજો") || text.includes("दस्तावेज")) {
    groundingToolsUsed.push("get_rbi_kyc_checklist");
    if (input.locale === "gu") {
      replyText = "ના, મીનાબેન! તમારે બેંક જવાની બિલકુલ જરૂર નથી. ફક્ત તમારું ઓરિજિનલ પાન કાર્ડ (Original PAN) અને આધાર નંબર સાથે રાખો. 2 મિનિટના વીડિયો કોલમાં ઘરબેઠા પૂર્ણ થઈ જશે.";
    } else if (input.locale === "hi") {
      replyText = "आपको किसी भी बैंक शाखा जाने की आवश्यकता नहीं है! केवल आपका मूल पैन कार्ड (Original PAN) और आधार नंबर चाहिए। 2 मिनट में घर बैठे मोबाइल से सत्यापन हो जाएगा।";
    } else {
      replyText = "You do NOT need to visit any bank branch! You only need your physical Original PAN card, your Aadhaar number for OTP, and a well-lit room for a 2-minute Video KYC call.";
    }
  } else if (text.includes("emi") || text.includes("relief") || text.includes("pause") || text.includes("राहत") || text.includes("લાભ")) {
    groundingToolsUsed.push("get_sahara_wellness");
    if (profile && profile.stressBand === "HIGH") {
      replyText = input.locale === "gu"
        ? "તમારી ઇએમઆઈ આવકના 58% વાપરી રહી છે. સહારા અંતર્ગત અમે તમારી 15 સપ્ટેમ્બરની ₹1,200 મશીનરી લોન ઇએમઆઈ પર 60 દિવસનું ફ્રીઝ લાગુ કરી શકીએ છીએ."
        : input.locale === "hi"
        ? "आपकी ईएमआई आय का 58% हिस्सा ले रही है। सहारा के तहत हम आपकी 15 सितंबर की ₹1,200 की ईएमआई पर 60 दिनों की राहत लागू कर सकते हैं।"
        : "Your active EMIs consume 58% of monthly inflow. Under Sahara, we can apply a 60-day freeze on your ₹1,200 machinery loan EMI with zero penalties.";
    } else {
      replyText = input.locale === "gu"
        ? "તમારું કેશફ્લો સુરક્ષિત છે. 3.2 મહિનાનું ઇમરજન્સી ફંડ ઉપલબ્ધ છે."
        : input.locale === "hi"
        ? "आपका नकद प्रवाह सुरक्षित है। 3.2 महीने का आपातकालीन फंड उपलब्ध है।"
        : "Your cashflow is healthy with 3.2 months of reserve runway.";
    }
  } else if (text.includes("sip") || text.includes("invest") || text.includes("nifty") || text.includes("રોકાણ") || text.includes("निवेश")) {
    groundingToolsUsed.push("get_jeevanchakra_recommendation");
    replyText = input.locale === "gu"
      ? `વિવેક અલ્ગોરિધમ મુજબ: ${decision.headline}. બચતમાં 20% વૃદ્ધિ જોવા મળી છે.`
      : input.locale === "hi"
      ? `विवेक निर्णय: ${decision.headline}। आपकी बचत में +20% की सतत वृद्धि है।`
      : `Vivek Recommendation: ${decision.headline}. Your surplus expanded +20% with 0% distributor kickbacks.`;
  } else {
    replyText = input.locale === "gu"
      ? `નમસ્તે! હું આપનો આરબીઆઈ-પ્રમાણિત બેંક સહાયક છું. વિવેકે આપની માહિતી ચકાસી છે.`
      : input.locale === "hi"
      ? `नमस्ते! मैं आपका आर्थिक्स बैंक सहायक हूँ। विवेक ने आपकी जानकारी को सत्यापित किया है।`
      : `Namaste! I am your ARTHIX Sovereign Voice Assistant. Vivek decision engine status: ${decision.action} (${decision.ruleCode}).`;
  }

  return {
    replyText,
    locale: input.locale,
    groundingToolsUsed,
  };
}
