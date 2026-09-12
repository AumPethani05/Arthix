import { processBhashaSahayakTurn } from "../lib/services/bhashasahayak";

console.log("=================================================");
console.log("TEST 1: 'KYC ma shu joie?' in Gujarati");
console.log("=================================================");
const r1 = processBhashaSahayakTurn({
  userIdOrPersona: "meena",
  userText: "KYC ma shu joie?",
  locale: "gu",
});
console.log("Intent:", r1.intent);
console.log("Locale:", r1.locale);
console.log("Grounding Tools Used:", r1.groundingToolsUsed);
console.log("Grounded Reply:\n" + r1.replyText);

console.log("\n=================================================");
console.log("TEST 2: 'Why did you recommend this?' (Rahul Sharma)");
console.log("=================================================");
const r2 = processBhashaSahayakTurn({
  userIdOrPersona: "rahul",
  userText: "Why did you recommend this?",
  locale: "en",
});
console.log("Intent:", r2.intent);
console.log("Grounding Tools Used:", r2.groundingToolsUsed);
console.log("Grounded Reply:\n" + r2.replyText);

console.log("\n=================================================");
console.log("TEST 3: Kamala Devi Stress-Help Query");
console.log("=================================================");
const r3 = processBhashaSahayakTurn({
  userIdOrPersona: "kamala",
  userText: "I am struggling with my EMI payments, please help me with my loans",
  locale: "en",
});
console.log("Intent:", r3.intent);
console.log("Grounding Tools Used:", r3.groundingToolsUsed);
console.log("Grounded Reply:\n" + r3.replyText);

console.log("\n=================================================");
console.log("TEST 4: Kamala Devi Stress-Help Query in Hindi");
console.log("=================================================");
const r4 = processBhashaSahayakTurn({
  userIdOrPersona: "kamala",
  userText: "मुझे ईएमआई भरने में बहुत परेशानी हो रही है",
  locale: "hi",
});
console.log("Intent:", r4.intent);
console.log("Grounded Reply:\n" + r4.replyText);
