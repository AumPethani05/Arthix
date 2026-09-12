export type Lang = "en" | "hi" | "gu";

export const i18n = {
  // ─── Common / Shared ───────────────────────────────────────────────
  common: {
    rbiRegulated: { en: "RBI AA Regulated", hi: "आरबीआई विनियमित", gu: "આરબીઆઈ નિયંત્રિત" },
    sovereignGrade: { en: "Sovereign Grade", hi: "संप्रभु श्रेणी", gu: "સ્વાયત્ત ગ્રેડ" },
    vivekGuard: { en: "Vivek Guard Active", hi: "विवेक गार्ड सक्रिय", gu: "વિવેક ગાર્ડ સક્રિય" },
    noPenalties: { en: "No Penalties • No CIBIL Impact", hi: "कोई जुर्माना नहीं • सीबीआईल पर प्रभाव नहीं", gu: "કોઈ દંડ નહીં • સીબીઆઈએ પ્રભાવ નહીં" },
    cancel: { en: "Cancel", hi: "रद्द करें", gu: "રદ કરો" },
    confirm: { en: "Confirm", hi: "पुष्टि करें", gu: "પુષ્ટિ કરો" },
    learnMore: { en: "Learn more", hi: "अधिक जानें", gu: "વધુ જાણો" },
  },

  // ─── WebSahara ──────────────────────────────────────────────────────
  sahara: {
    headerBadge: { en: "ARTHIX Sahara Dignified Care • Sovereign Welfare Tier", hi: "आर्थिक्स सहारा सम्मानजनक देखभाल • संप्रभु कल्याण स्तर", gu: "આર્થિક્સ સહારા ગૌરવપૂર્ণ સંભાળ • સ્વાયત્ત કલ્યાણ સ્તર" },
    title: { en: "Sahara Financial Resilience & Relief Center", hi: "सहारा वित्तीय लचीलापन एवं राहत केंद्र", gu: "સહારા આર્થિક સ્થિતિ અને રાહત કેન્દ્ર" },
    titleHi: { en: "सहारा स्वास्थ्य एवं सुरक्षा केंद्र", hi: "सहारा स्वास्थ्य एवं सुरक्षा केंद्र", gu: "સહારા સ્વાસ્થ્ય અને સુરક્ષા કેન્દ્ર" },
    protectiveHold: { en: "PROTECTIVE HOLD ACTIVE", hi: "संरक्षण होल्ड सक्रिय", gu: "સંરક્ષણ હોલ્ડ સક્રિય" },
    holdSubtext: { en: "(अभी कोई नया लोन या क्रेडिट कार्ड नहीं दिया जा रहा है)", hi: "(अभी कोई नया लोन या क्रेडिट कार्ड नहीं दिया जा रहा है)", gu: "(હાલ કોઈ નવો લોન કે ક્રેડિટ કાર્ড આપવામાં આવી રહ્યો નથી)" },
    holdDesc: { en: "ARTHIX detected an outflow mismatch: Active monthly EMIs currently consume 58% of monthly inflow due to delayed seasonal craft wholesale payments. We deliberately lock all loan solicitation to shield your family.", hi: "आर्थिक्स ने बाहरी नकदी में असंतुलन पाया: मौसमी भुगतान विलंब के कारण मासिक ईएमआई 58% आय ले रही है। आपके परिवार की सुरक्षा के लिए सभी लोन मार्केटिंग बंद कर दी गई है।", gu: "આર્થિક્સ ને બહારી રોકડ અસંતુલન જોવા મળ્યું: હસ્તકળા ચૂકવણી વિલંબ કારણે ઈએમઆઈ 58% આવક વાપરી રહ્યી છે. આપના પરિવારની સુરક્ষા માટે તમામ લોન માર્કેટિંગ બંધ." },
    healthyBuffer: { en: "HEALTHY BUFFER MAINTAINED", hi: "स्वस्थ बफर बनाए रखा", gu: "સ્વસ્થ બફર સુરક્ષિત" },
    healthyDesc: { en: "Liquidity buffer verified: EMIs consume only 16% of monthly net inflows. All borrowing is verified safe and in compliance with institutional fiduciary standards.", hi: "लिक्विडिटी बफर सत्यापित: ईएमआई केवल 16% मासिक आय ले रही है। सभी ऋण सुरक्षित और संस्थागत मानकों के अनुरूप।", gu: "લિક્વિડિટી બફર ચકાસવામાં આવ્યું: ઈએમઆઈ ફક્ત 16% માસિક આવક વાપરી રહ્ય છ. તમામ ઋણ સંસ્થાકીય ધોરણ મુજબ." },
    diagnosticIndex: { en: "Diagnostic Index", hi: "निदान सूचकांक", gu: "નિદાન સૂચક" },
    resilienceIndex: { en: "Resilience Index", hi: "लचीलापन सूचकांक", gu: "લચીલાપણ સૂચક" },
    stressFlag: { en: "सावधानी आवश्यक", hi: "सावधानी आवश्यक", gu: "સાવધાની જરૂરી" },
    safeStatus: { en: "सुरक्षित स्थिति", hi: "सुरक्षित स्थिति", gu: "સુરક્ષિત સ્થિતિ" },
    cashFlowAudit: { en: "CASH FLOW AUDIT (30 DAYS)", hi: "नकदी प्रवाह ऑडिट (30 दिन)", gu: "રોકડ પ્રવાહ ઓડિટ (30 દિવસ)" },
    monthlyInflow: { en: "Monthly Inflow", hi: "मासिक आय", gu: "માસિક આવક" },
    essentials: { en: "Essentials (Food/Ration)", hi: "आवश्यक व्यय (खाद्य/राशन)", gu: "આવશ્યક ખર્ચ (ખાદ્ય/રાશન)" },
    committedEmis: { en: "Committed EMIs", hi: "बंधक ईएमआई", gu: "બંધિત ઈએમઆઈ" },
    monthlyDeficit: { en: "Monthly Deficit", hi: "मासिक घाटा", gu: "માસિક ઘાટો" },
    frameworkTitle: { en: "1-Tap Relief Actions (RBI Master Circular §8.2)", hi: "1-टैप राहत कार्रवाई (आरबीआई मास्टर सर्कुलर §8.2)", gu: "1-ટેપ રાહત ક્રિયા (આરબીઆઈ §8.2)" },
    recommended: { en: "RECOMMENDED", hi: "सिफारिश", gu: "ભલામણ" },
    emiPauseTitle: { en: "Apply 60-Day EMI Pause on Machinery Loan", hi: "मशीनरी लोन पर 60-दिवसीय ईएमआई विराम लागू करें", gu: "મશીનરી લોન પર 60-દિવસ ઈએમઆઈ સ્થગિત કરો" },
    emiPauseDesc: { en: "Temporarily freeze monthly ₹1,200 EMI due on 15th Sept without late fees or negative credit bureau reporting. Backed by Gujarat Handloom Support Scheme.", hi: "15 सितंबर की मासिक ₹1,200 ईएमआई बिना देरी शुल्क या क्रेडिट ब्यूरो पर नकारात्मक रिपोर्टिंग के स्थगित करें।", gu: "15 સપ્ટેમ્બરની ₹1,200 ઈએમઆઈ ક્રેડિટ બ્યુરો અહેવાલ વિના થમેન કરો." },
    applyRelief: { en: "Apply 1-Tap Relief", hi: "1-टैप राहत लागू करें", gu: "1-ટેપ રાહત લાગૂ કરો" },
    moratoriumActive: { en: "Moratorium Active ✓", hi: "मोरेटोरियम सक्रिय ✓", gu: "મોરેટોરિયમ સક્રિય ✓" },
    restructureTitle: { en: "Consolidate ₹12,720 Card Debt into 0% 12-Month Plan", hi: "₹12,720 कार्ड ऋण को 0% 12-माह योजना में परिवर्तित करें", gu: "₹12,720 કાર્ડ ઋણ 0% 12-મહિના યોજનામાં રૂપાંતરિત કરો" },
    restructureDesc: { en: "Convert compounding credit dues into a transparent zero-interest schedule. Cuts monthly payment from ₹13,920 to ₹6,500 immediately.", hi: "चक्रवृद्धि क्रेडिट बकाया को पारदर्शी शून्य-ब्याज कार्यक्रम में बदलें।", gu: "ચક્રવૃદ્ધિ ક્રેડિટ બાકી ઝીરો-વ્યાજ કાર્યયોજનામાં ફેરવો." },
    reviewSchedule: { en: "Review Schedule", hi: "शेड्यूल समीक्षा", gu: "શેડ્યુલ સમીક્ષા" },
    shiftTitle: { en: "Realign EMI Due Date to Festive Inflow (28th)", hi: "ईएमआई देय तिथि को त्योहारी आय से संरेखित करें (28 तारीख)", gu: "ઈએમઆઈ તારીખ ઉત્સવ આવક સાથે સંરેખિત કરો (28 તારીખ)" },
    shiftDesc: { en: "Shift debit from 5th to 28th, matching Diwali artisan market payouts. Prevents ₹590 NACH bounce fee per cycle.", hi: "डेबिट 5 से 28 तारीख पर स्थानांतरित करें, दीपावली कारीगर बाजार भुगतान से मेल खाता है।", gu: "ડેબિટ 5 થી 28 તારીખ ખસેડો, દિવાળી કારીગર ચૂકવણી સાથે. ₹590 NACH બાઉન્સ ફી ટાળો." },
    shiftDueDate: { en: "Shift Due Date", hi: "दिनांक स्थानांतरित करें", gu: "દિવસ ખસેડો" },
    dateShifted: { en: "✓ Date Shifted to 28th", hi: "✓ दिनांक 28 तारीख पर स्थानांतरित", gu: "✓ 28 તારીખ ખસેડવામાં આવ્યો" },
    counselorTitle: { en: "Talk to a Dedicated Empathetic Counselor", hi: "समर्पित सहानुभूतिपूर्ण परामर्शदाता से बात करें", gu: "સમર્પિત સહાનુભૂતિ કાઉન્સેલર સાથે વાત કરો" },
    counselorDesc: { en: "Free confidential callback via sovereign encrypted line. Hindi • Gujarati • English. No pressure, no upselling.", hi: "संप्रभु एन्क्रिप्टेड लाइन पर निःशुल्क गोपनीय कॉलबैक। हिंदी • गुजराती • अंग्रेजी।", gu: "સ્વાયત્ત એન્ક્રિપ્ટ્ડ લાઈન પર નિઃશૂલ્ક ગોપનીય કૉલ. હિન્દી • ગુજરાતી • English." },
    requestCallback: { en: "Request Dignified Callback", hi: "कॉलबैक अनुरोध करें", gu: "કૉલ વિનંતી કરો" },
    callbackScheduled: { en: "✓ Callback Scheduled 4:30 PM", hi: "✓ 4:30 बजे कॉल शेड्यूल", gu: "✓ 4:30 વાગ્યે કૉલ" },
    dbtTitle: { en: "PM Vishwakarma Artisan Toolkit Incentive", hi: "पीएम विश्वकर्मा कारीगर टूलकिट प्रोत्साहन", gu: "PM વિશ્વકર્મા કારીગર ટૂલકિટ પ્રોત્સાહન" },
    dbtDesc: { en: "₹15,000 direct grant ready for disbursement to Kamala Devi's Aadhaar-linked SBI account upon automated verification.", hi: "₹15,000 प्रत्यक्ष अनुदान कमला देवी के आधार-लिंक्ड एसबीआई खाते में स्वचालित सत्यापन पर भुगतान के लिए तैयार।", gu: "₹15,000 ગ્રાન્ટ કમળા દેવીના આધાર-SBI ખાતામાં ઑટો ચકાસણી પર ચૂકવણી." },
    verifyPortal: { en: "Verify Portal", hi: "पोर्टल सत्यापित करें", gu: "પોર્ટલ ચકાસો" },
    confirmTitle: { en: "Confirm 60-Day EMI Relief", hi: "60-दिवसीय ईएमआई राहत पुष्टि करें", gu: "60-દિવસ ઈએમઆઈ રાહત પુષ્ટિ" },
    confirm1Tap: { en: "Confirm 1-Tap Relief", hi: "1-टैप राहत पुष्टि करें", gu: "1-ટેપ રાહત પુષ્ટિ" },
  },

  // ─── WebKavach ──────────────────────────────────────────────────────
  kavach: {
    headerBadge: { en: "Sovereign Consent & Data Sovereignty Architecture", hi: "संप्रभु सहमति और डेटा संप्रभुता वास्तुकला", gu: "સ્વાયત્ત સ્વીકૃતિ અને ડેટા સ્વાયત્તતા" },
    title: { en: "Kavach RBI Account Aggregator Manager", hi: "कवच आरबीआई अकाउंट एग्रीगेटर प्रबंधक", gu: "કવચ આરબીઆઈ ખાતા એગ્રીગેટર મેનેજર" },
    titleHi: { en: "कवच डेटा सहमति एवं गोपनीयता प्रबंधक", hi: "कवच डेटा सहमति एवं गोपनीयता प्रबंधक", gu: "કવચ ડેટા સ્વીકૃતિ અને ગોપનીયતા" },
    badge: { en: "Digital Personal Data Protection Act 2023 Compliant", hi: "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 अनुपालक", gu: "ડિજિટલ વ્યક્તિગત ડેટા સંરક્ષણ અધિનિયમ 2023" },
    activeStreams: { en: "Active Consented Streams", hi: "सक्रिय सहमति स्ट्रीम", gu: "સક્રિય સ્વીકૃત સ્ટ્રીમ" },
    revocable: { en: "100% Granularly Revocable Anytime", hi: "100% किसी भी समय रद्द करने योग्य", gu: "100% ગ્રૅન્યૂલરી ગમે ત્યારે રદ કરી શકાય" },
    authsTitle: { en: "Active Financial Data Authorizations", hi: "सक्रिय वित्तीय डेटा प्राधिकरण", gu: "સક્રિય આર્થિક ડેટા અધિકૃતતા" },
    authorized: { en: "AUTHORIZED", hi: "अधिकृत", gu: "અધિકૃત" },
    revoked: { en: "REVOKED", hi: "रद्द", gu: "રદ" },
    purpose: { en: "Purpose:", hi: "उद्देश्य:", gu: "હેતુ:" },
    expires: { en: "Expires:", hi: "समाप्ति:", gu: "સમાપ્તિ:" },
    revokeAccess: { en: "Revoke Access", hi: "पहुंच रद्द करें", gu: "એક્સેસ રદ કરો" },
    reauthorize: { en: "Re-authorize", hi: "पुनः अधिकृत करें", gu: "ફરી અધિકૃત કરો" },
    revokeAll: { en: "Revoke All", hi: "सभी रद्द करें", gu: "બધા રદ કરો" },
    allRevoked: { en: "✓ All Revoked", hi: "✓ सभी रद्द", gu: "✓ બધા રદ" },
    neverTitle: { en: "ARTHIX Absolute \"Never-Do\" Commitments", hi: "आर्थिक्स पूर्ण \"कभी नहीं\" प्रतिबद्धताएं", gu: "આર્થિક્સ સંપૂર્ण \"ક્યારેય નહીં\" પ્રતિબદ્ધતા" },
    never1: { en: "Never Scrapes Contacts or Gallery: ARTHIX uses zero device permissions. Only authenticated RBI AA streams.", hi: "संपर्क या गैलरी कभी नहीं स्क्रेप करता: आर्थिक्स शून्य डिवाइस अनुमति उपयोग करता है।", gu: "ક્યારેય સ્ક્રેપ ન કરે: આર્થિક્સ ઝીરો ડિવાઈસ પરવાનગી વાપરે છે." },
    never2: { en: "Never Shares with Recovery Agents: Fiduciary firewall forbids disclosing numbers to third-party collection agencies.", hi: "वसूली एजेंट के साथ कभी साझा नहीं: फिड्युशियरी फ़ायरवॉल तीसरे पक्ष को नंबर देने से मना करता है।", gu: "ક્યારેય recovery agentsसाथ share ન કરે: fiduciary firewall third-party ने number ন આપે." },
    never3: { en: "Zero Advertising Monetization: Your financial data is strictly used for your protection and growth only.", hi: "शून्य विज्ञापन मुद्रीकरण: आपका वित्तीय डेटा केवल आपकी सुरक्षा के लिए उपयोग किया जाता है।", gu: "ઝીરો જાહેરાત: તમારો ડેટા ફક્ત તમારી સુરક્ષા માટે." },
    activityLog: { en: "Consent Activity Log", hi: "सहमति गतिविधि लॉग", gu: "સ્વીકૃતિ પ્રવૃત્તિ લૉગ" },
  },

  // ─── WebNyay ─────────────────────────────────────────────────────────
  nyay: {
    headerBadge: { en: "Nyay Algorithmic Transparency Engine • Fiduciary Audit", hi: "न्याय एल्गोरिदमिक पारदर्शिता इंजन • फिड्युशियरी ऑडिट", gu: "ન્યાય અલ્ગોરિધમ પારદર્શિતા • ફિડ્ યૂ ઑડિટ" },
    title: { en: "Nyay Explainable AI Decision Trail", hi: "न्याय व्याख्यात्मक AI निर्णय ट्रेल", gu: "ન્યાય સ્પષ્ટ AI નિર્ણય ટ્રેઇલ" },
    titleHi: { en: "न्याय पारदर्शी ऑडिट एवं निर्णय व्याख्या", hi: "न्याय पारदर्शी ऑडिट एवं निर्णय व्याख्या", gu: "ન્યાય ઑડિટ અને નિર્ણય સ્પષ્ટીકરણ" },
    badge: { en: "Cryptographically Signed Ledger Entry", hi: "क्रिप्टोग्राफिक रूप से हस्ताक्षरित लेजर प्रविष्टि", gu: "ક્રિપ્ટો સ્બ્ ધ સ્署 લેજર" },
    auditRecord: { en: "AUDIT RECORD #BRT-AUD-2026-90412", hi: "ऑडिट रिकॉर्ड #BRT-AUD-2026-90412", gu: "ઑડિટ રેકોર્ડ #BRT-AUD-2026-90412" },
    auditTitle: { en: "Deterministic Decision Log: Direct Equity Authorization", hi: "नियतात्मक निर्णय लॉग: प्रत्यक्ष इक्विटी प्राधिकरण", gu: "નિર્ણાયક નિર્ણય લૉગ: ડાયરેક્ટ ઇક્વિટી" },
    passedCheck: { en: "PASSED STATUTORY INTEGRITY CHECK", hi: "वैधानिक अखंडता जांच उत्तीर्ण", gu: "વૈધાનિક અખંડિતતા ચકાસણી પાસ" },
    formulasTitle: { en: "Evaluated Mathematical Formulas", hi: "मूल्यांकित गणितीय सूत्र", gu: "મૂલ્યાંકિત ગાણિતિક સૂત્રો" },
    colParam: { en: "Variable Parameter", hi: "परिवर्तनीय पैरामीटर", gu: "ચલ પરિમાણ" },
    colValue: { en: "Evaluated Value", hi: "मूल्यांकित मूल्य", gu: "મૂલ્યાંકિત કિંમત" },
    colGuardrail: { en: "Statutory Guardrail", hi: "वैधानिक सुरक्षा", gu: "કાયદાકીય મર્યાદા" },
    colResult: { en: "Compliance Result", hi: "अनुपालन परिणाम", gu: "સુસંગતતા પરિણામ" },
    guaranteeText: { en: "This decision contains zero proprietary neural network heuristics. Any banking ombudsman can independently reproduce this audit.", hi: "इस निर्णय में शून्य मालिकाना न्यूरल नेटवर्क ह्यूरिस्टिक्स हैं। कोई भी बैंकिंग लोकपाल इस ऑडिट को स्वतंत्र रूप से पुनः प्रस्तुत कर सकता है।", gu: "આ નિર્ણયમાં કોઈ ખાનગી ન્યુરલ નેટવર્ક પૂર્વગ્રહ નથી. કોઈપણ બેંકિંગ લોકપાલ આ ઑડિટની સ્વતંત્ર રીતે ચકાસણી કરી શકે છે." },
    downloadBtn: { en: "Download Signed Audit (.pdf)", hi: "हस्ताक्षरित ऑडिट डाउनलोड करें (.pdf)", gu: "હસ્તાક્ષરિત ઑડિટ ડાઉનલોડ કરો (.pdf)" },
    downloading: { en: "Generating...", hi: "तैयार हो रहा है...", gu: "તૈયાર થઈ રહ્યું છે..." },
    downloaded: { en: "✓ Downloaded", hi: "✓ डाउनलोड हो गया", gu: "✓ ડાઉનલોડ પૂર્ણ" },
  },

  // ─── WebVivek ─────────────────────────────────────────────────────────
  vivek: {
    headerBadge: { en: "Vivek Sovereign Algorithmic Intelligence", hi: "विवेक संप्रभु एल्गोरिदमिक इंटेलिजेंस", gu: "વિવેક સ્વાયત્ત અલ્ગોરિધમિક ઇન્ટેલિજન્સ" },
    title: { en: "Ethical Financial Decision State Machine", hi: "नैतिक वित्तीय निर्णय स्टेट मशीन", gu: "નૈતિક નાણાકીય નિર્ણય સ્ટેટ મશીન" },
    titleHi: { en: "विवेक पारदर्शी निर्णय प्रणाली", hi: "विवेक पारदर्शी निर्णय प्रणाली", gu: "વિવેક પારદર્શક નિર્ણય પ્રણાલી" },
    badge: { en: "100% Deterministic • Zero Black-Box ML", hi: "100% नियतात्मक • शून्य ब्लैक-बॉक्स ML", gu: "૧૦૦% સ્પષ્ટ • શૂન્ય બ્લેક-બોક્સ ML" },
    rationale: { en: "Mathematical Rationale (निर्णय का कारण)", hi: "गणितीय तर्क (निर्णय का कारण)", gu: "ગાણિતિક કારણ (નિર્ણયનો આધાર)" },
    regulatory: { en: "Regulatory Authority:", hi: "नियामक प्राधिकरण:", gu: "નિયમનકારી સત્તા:" },
    confidenceScore: { en: "Confidence Score", hi: "विश्वास स्कोर", gu: "વિશ્વાસ સ્કોર" },
    verifiedPass: { en: "✓ Verified Pass", hi: "✓ सत्यापित पास", gu: "✓ ચકાસાયેલ પાસ" },
    thresholdGate: { en: "⚠ Threshold Gate", hi: "⚠ सीमा गेट", gu: "⚠ મર્યાદા ગેટ" },
  },

  // ─── WebJeevanChakra ──────────────────────────────────────────────────
  jeevan: {
    headerBadge: { en: "Algorithmic Wealth Stewardship • Fiduciary Tier", hi: "एल्गोरिदमिक धन प्रबंधन • फिड्युशियरी स्तर", gu: "અલ્ગોરિધમિક સંપત્તિ વ્યવસ્થાપન • ફિડ્યુશિયરી સ્તર" },
    title: { en: "JeevanChakra Life-Stage Guidance", hi: "जीवन चक्र जीवन-चरण मार्गदर्शन", gu: "જીવનચક્ર જીવન-તબક્કા માર્ગદર્શન" },
    titleHi: { en: "जीवन चक्र दीर्घकालिक वित्तीय मार्गदर्शन", hi: "जीवन चक्र दीर्घकालिक वित्तीय मार्गदर्शन", gu: "જીવનચક્ર દીર્ઘકાલીન નાણાકીય માર્ગદર્શન" },
    sebi: { en: "SEBI Direct Fiduciary", hi: "सेबी प्रत्यक्ष न्यासी", gu: "સેબી ડાયરેક્ટ ફિડ્યુશિયરી" },
    zeroCommission: { en: "0% Commission Model", hi: "0% कमीशन मॉडल", gu: "0% કમિશન મોડલ" },
    optimalRec: { en: "OPTIMAL TRAJECTORY RECOMMENDATION", hi: "इष्टतम प्रक्षेपवक्र सिफारिश", gu: "શ્રેષ્ઠ માર્ગ ભલામણ" },
    sipTitle: { en: "Disciplined Long-Term Wealth: Direct Nifty 50 Index SIP", hi: "अनुशासित दीर्घकालिक संपत्ति: प्रत्यक्ष Nifty 50 इंडेक्स SIP", gu: "શિસ્તબદ્ધ દીર્ઘકાલીન સંપત્તિ: ડાયરેક્ટ નિફ્ટી 50 ઇન્ડેક્સ SIP" },
    sipMatch: { en: "98% Suitability Match", hi: "98% उपयुक्तता मिलान", gu: "98% યોગ્યતા મેળ" },
    deployment: { en: "Recommended Monthly Deployment", hi: "अनुशंसित मासिक तैनाती", gu: "ભલામણ કરેલ માસિક રોકાણ" },
    startSip: { en: "Start Direct SIP (Zero Fees)", hi: "प्रत्यक्ष SIP शुरू करें (शून्य शुल्क)", gu: "ડાયરેક્ટ SIP શરૂ કરો (શૂન્ય શુલ્ક)" },
    whyThis: { en: "Why this? (Inspect Nyay Audit)", hi: "यह क्यों? (न्याय ऑडिट देखें)", gu: "આ કેમ? (ન્યાય ઑડિટ જુઓ)" },
    guardrails: { en: "Key Suitability Guardrails:", hi: "मुख्य उपयुक्तता सुरक्षा:", gu: "મુખ્ય યોગ્યતા સુરક્ષાઓ:" },
    transparency: { en: "Transparency Audit", hi: "पारदर्शिता ऑडिट", gu: "પારદર્શિતા ઑડિટ" },
    comparison: { en: "Direct Index SIP vs Traditional Bank ULIP Policy", hi: "प्रत्यक्ष इंडेक्स SIP बनाम पारंपरिक बैंक ULIP पॉलिसी", gu: "ડાયરેક્ટ ઇન્ડેક્સ SIP વિરુદ્ધ પરંપરાગત બેંક ULIP" },
    milestones: { en: "Life-Stage Milestones (जीवन पथ)", hi: "जीवन-चरण मील के पत्थर (जीवन पथ)", gu: "જીવન-તબક્કાના લક્ષ્યો (જીવન પથ)" },
    sipConfirm: { en: "✓ SIP mandate initiated — Confirmation sent to your registered mobile.", hi: "✓ SIP आदेश शुरू — पंजीकृत मोबाइल पर पुष्टि भेजी गई।", gu: "✓ SIP શરૂ થઈ — મોબાઇલ પર પુષ્ટિ તપાસો" },
  },
} as const;

export function t(key: string, lang: Lang): string {
  const parts = key.split(".");
  let obj: unknown = i18n;
  for (const p of parts) {
    if (obj && typeof obj === "object" && p in (obj as Record<string, unknown>)) {
      obj = (obj as Record<string, unknown>)[p];
    } else return key;
  }
  if (obj && typeof obj === "object" && lang in (obj as Record<string, string>)) {
    return (obj as Record<string, string>)[lang];
  }
  if (obj && typeof obj === "object" && "en" in (obj as Record<string, string>)) {
    return (obj as Record<string, string>).en;
  }
  return key;
}
