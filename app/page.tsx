"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  TrendingUp,
  Mic,
  Scale,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lock,
  ChevronRight,
  Globe,
  Award,
  Users,
  Compass,
  PhoneCall,
  Flame,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [demoScenario, setDemoScenario] = useState<"stress" | "surplus">("stress");

  const hero = {
    en: {
      pill: "RBI ACCOUNT AGGREGATOR REGULATED • ZERO COMMISSION FIDUCIARY",
      title1: "Sovereign AI Banking for",
      title2: "Bharat.",
      sub: "Protecting 140 Crore citizens from predatory debt traps. No distributor kickbacks, automated loan moratoria during distress, and voice-first vernacular intelligence.",
      cta1: "Launch Full Web Application",
      cta2: "Login as Demo Persona",
    },
    hi: {
      pill: "आरबीआई खाता एग्रीगेटर विनियमित • शून्य कमीशन न्यासी",
      title1: "भारत के लिए संप्रभु AI बैंकिंग",
      title2: "भारत.",
      sub: "140 करोड़ नागरिकों को शिकारी ऋण जाल से बचाना। कोई वितरक कमीशन नहीं, संकट में स्वचालित ऋण स्थगन, और वर्नाकुलर वॉयस इंटेलिजेंस।",
      cta1: "वेब एप्लिकेशन लॉन्च करें",
      cta2: "डेमो पर्सोना के रूप में लॉगिन करें",
    },
    gu: {
      pill: "આરબીઆઈ એકાઉન્ટ એગ્રીગેટર નિયંત્રિત • ઝીરો કમિશન ફિડ્યુશિયરી",
      title1: "ભારત માટે સ્વાયત્ત AI બેંકિંગ",
      title2: "ભારત.",
      sub: "140 કરોડ નાગરિકોને લૂટારૂ ઋણ જાળમાંથી બચાવો. કોઈ ડિસ્ટ્રીબ્યૂટર કિક-બૅક નહીં, મુશ્કેલ સમયે આપોઆપ લોન સ્થગિત, અને ભાષા-આધારિત AI.",
      cta1: "વેબ એપ્લિકેશન શરૂ કરો",
      cta2: "ડેમો પ્રોફાઇલ તરીકે લૉગ ઇન કરો",
    },
  };

  const content = {
    en: {
      navPillars: "Core Pillars",
      navFiduciaryDifference: "Fiduciary Defense",
      navSovereignTrust: "Sovereign Trust",
      navSignIn: "Sign In",
      stat1Label: "Protected Float",
      stat2Label: "Artisans & Families",
      stat3Label: "Distributor Kickbacks",
      stat4Label: "Sovereign Data Privacy",
      demoBadge: "TRANSPARENT FIDUCIARY DEFENSE",
      demoTitle: "INTERACTIVE FIDUCIARY DEMO",
      demoQuestion: "Predatory Commercial Push vs ARTHIX Sovereign Shield",
      demoDescription:
        "Toggle between real-world scenarios to see how ARTHIX protects citizens when traditional banks push expensive debt.",
      demoScenarioA: "Scenario 1: Artisan Cashflow Stress (Kamala)",
      demoScenarioB: "Scenario 2: Salaried Monthly Surplus (Rahul)",
      traditionalBankTitle: "Typical Commercial Bank",
      traditionalBankModel: "Commission Driven",
      demoTraditionalStressTitle: "Extract Penalties & Push High-APR Loans",
      demoTraditionalSurplusTitle: "Push High-Commission ULIPs & Endowments",
      demoTraditionalStress1: "Auto-debits NACH bounce penalty ₹590 per failure",
      demoTraditionalStress2: "Harassment via non-consensual third-party debt recovery calls",
      demoTraditionalStress3: "Spams high-interest instant personal loan notifications at 36% APR",
      demoTraditionalSurplus1: "Agents push ULIPs with 40% first-year distributor commission",
      demoTraditionalSurplus2: "Hidden exit penalties and zero inflation-beating protection",
      demoTraditionalStressResult: "Result: Severe debt trap & credit bureau score collapse",
      demoTraditionalSurplusResult: "Result: ₹1.4 Lakh loss over 10 years to distributor fee drags",
      arthixTitle: "ARTHIX Sovereign Fiduciary",
      arthixModel: "100% Zero Commission",
      demoArthixStressTitle: "Lock Solicitation & Engage 1-Tap Relief",
      demoArthixSurplusTitle: "Deploy Clean Direct Low-Cost Index SIP",
      demoArthixStress1: "Active protective hold prevents predatory credit solicitation",
      demoArthixStress2: "1-Tap 60-day EMI moratorium with zero bureau impact",
      demoArthixStress3: "Confidential empathetic counselor callback in vernacular",
      demoArthixSurplus1: "Zero-commission direct Nifty 50 index allocation (0.05% TER)",
      demoArthixSurplus2: "Transparent compounding math showing ₹2.8L extra lifetime return",
      demoArthixStressResult: "Guaranteed: Full dignity, zero penalties & preserved CIBIL",
      demoArthixSurplusResult: "Guaranteed: ₹2,80,000 extra wealth preserved for family",
      demoInspectLink: "Inspect in Web App",
      pillarsSectionTitle: "Sovereign Architecture",
      pillarsSectionDescription: "5 Fiduciary Pillars Built for Bharat",
      pillar1Title: "Vivek Decision Engine",
      pillar1Description:
        "4-state transparent logic: Approved, Conditional, Deferred, or Suppressed. We never recommend a product unless mathematical suitability is proven.",
      pillar2Title: "Sahara Resilience & Dignity",
      pillar2Description:
        "Detects cashflow stress and auto-initiates emergency relief, moratoriums, and penalty protection under RBI directives.",
      pillar3Title: "JeevanChakra Direct Wealth",
      pillar3Description:
        "Strict SEBI RIA fiduciary standards. Unbiased direct mutual funds and gold bonds — zero distributor commissions or hidden ULIP cuts.",
      pillar4Title: "BhashaSahayak Vernacular Voice",
      pillar4Description:
        "Conversational voice AI across 22 Scheduled Indian Languages. Full visual audio waveforms and instant dialup explanations.",
      pillar5Title: "Nyay Explainable Audit Log",
      pillar5Description:
        "Full transparency. Every recommendation provides an inspectable 'Why this?' audit trail reproducible by any banking ombudsman.",
      pillar6Title: "Kavach Sovereign Privacy",
      pillar6Description:
        "Digital Personal Data Protection (DPDP) Act 2023 certified. 100% revocable data access with zero contact scraping.",
      footerLaunchWebApp: "Launch WebApp",
      footerSignIn: "Sign In",
      footerConsent: "Consent Framework",
      footerOnboarding: "Onboarding Flow",
      footerCopyright: "© 2026 ARTHIX Bharat Core. Regulated under RBI Account Aggregator Framework.",
      footerHotline: "National Support Hotline: 1800-ARTHIX (Toll Free 24x7)",
    },
    hi: {
      navPillars: "मूल स्तंभ",
      navFiduciaryDifference: "फिड्युशियरी अंतर",
      navSovereignTrust: "संप्रभु विश्वास",
      navSignIn: "साइन इन",
      stat1Label: "संरक्षित पूँजी",
      stat2Label: "कारीगर एवं परिवार",
      stat3Label: "वितरक कमीशन",
      stat4Label: "संप्रभु डेटा गोपनीयता",
      demoBadge: "पारदर्शी फिड्युशियरी सुरक्षा",
      demoTitle: "इंटरैक्टिव फिड्युशियरी डेमो",
      demoQuestion: "शिकारी बैंक बनाम आर्थिक्स संप्रभु कवच",
      demoDescription:
        "वास्तविक परिस्थितियों के बीच टॉगल करें और देखें कि पारंपरिक बैंकों द्वारा महंगा कर्ज थोपने पर आर्थिक्स नागरिकों की कैसे रक्षा करता है।",
      demoScenarioA: "परिदृश्य 1: कारीगर नकदी तनाव (कमला)",
      demoScenarioB: "परिदृश्य 2: वेतनभोगी अधिशेष (राहुल)",
      traditionalBankTitle: "विशिष्ट वाणिज्यिक बैंक",
      traditionalBankModel: "कमीशन संचालित",
      demoTraditionalStressTitle: "जुर्माना लगाना और उच्च ब्याज ऋण थोपना",
      demoTraditionalSurplusTitle: "उच्च कमीशन यूलिप व एंडोमेंट बेचना",
      demoTraditionalStress1: "प्रत्येक विफलता पर ₹590 बाउंस जुर्माना काटता है",
      demoTraditionalStress2: "तृतीय-पक्ष रिकवरी एजेंटों द्वारा परेशान करने वाले कॉल",
      demoTraditionalStress3: "36% ब्याज दर पर गैर-जरूरी पर्सनल लोन संदेश भेजता है",
      demoTraditionalSurplus1: "एजेंट 40% प्रथम-वर्ष कमीशन वाली यूलिप बेचते हैं",
      demoTraditionalSurplus2: "छुपा हुआ निकास शुल्क और शून्य मुद्रास्फीति सुरक्षा",
      demoTraditionalStressResult: "परिणाम: गंभीर कर्ज जाल और सिबिल स्कोर में गिरावट",
      demoTraditionalSurplusResult: "परिणाम: 10 वर्षों में कमीशन शुल्क में ₹1.4 लाख का नुकसान",
      arthixTitle: "आर्थिक्स संप्रभु न्यासी",
      arthixModel: "100% शून्य कमीशन",
      demoArthixStressTitle: "लोन बिक्री पर रोक और 1-टैप राहत लागू",
      demoArthixSurplusTitle: "स्वच्छ डायरेक्ट कम-लागत इंडेक्स एसआईपी",
      demoArthixStress1: "सक्रिय सुरक्षा होल्ड शिकारी ऋण विपणन को रोकता है",
      demoArthixStress2: "शून्य सिबिल प्रभाव के साथ 1-टैप 60-दिवसीय ईएमआई रोक",
      demoArthixStress3: "अपनी मातृभाषा में गोपनीय सहानुभूतिपूर्ण काउंसलर सहायता",
      demoArthixSurplus1: "शून्य कमीशन डायरेक्ट निफ्टी 50 इंडेक्स (0.05% व्यय अनुपात)",
      demoArthixSurplus2: "पारदर्शी गणित जो जीवनकाल में ₹2.8 लाख अतिरिक्त रिटर्न दिखाता है",
      demoArthixStressResult: "गारंटी: पूर्ण सम्मान, शून्य जुर्माना और सुरक्षित सिबिल",
      demoArthixSurplusResult: "गारंटी: परिवार के लिए ₹2,80,000 अतिरिक्त संपत्ति सुरक्षित",
      demoInspectLink: "वेब ऐप में देखें",
      pillarsSectionTitle: "संप्रभु वास्तुकला",
      pillarsSectionDescription: "भारत के लिए निर्मित 5 संप्रभु स्तंभ",
      pillar1Title: "विवेक निर्णय इंजन",
      pillar1Description:
        "4-स्तरीय पारदर्शी तर्क: स्वीकृत, सशर्त, स्थगित या अवरुद्ध। जब तक गणितीय उपयुक्तता सिद्ध न हो, हम उत्पाद नहीं बेचते।",
      pillar2Title: "सहारा लचीलापन और सम्मान",
      pillar2Description:
        "नकदी संकट का पता लगाता है और आरबीआई निर्देशों के तहत आपातकालीन राहत, स्थगन और जुर्माना सुरक्षा शुरू करता है।",
      pillar3Title: "जीवनचक्र प्रत्यक्ष संपत्ति",
      pillar3Description:
        "सख्त सेबी आरआईए मानक। निष्पक्ष डायरेक्ट म्यूचुअल फंड और गोल्ड बॉन्ड — शून्य वितरक कमीशन या छिपी कटौती।",
      pillar4Title: "भाषासहायक मातृभाषा वॉयस",
      pillar4Description:
        "22 अनुसूचित भारतीय भाषाओं में वॉयस एआई। ऑडियो वेवफॉर्म और तात्कालिक वॉयस स्पष्टीकरण।",
      pillar5Title: "न्याय पारदर्शी ऑडिट लॉग",
      pillar5Description:
        "पूर्ण पारदर्शिता। प्रत्येक सिफारिश के पीछे एक स्पष्ट ऑडिट ट्रेल होती है जिसे कोई भी बैंकिंग लोकपाल जांच सकता है।",
      pillar6Title: "कवच संप्रभु गोपनीयता",
      pillar6Description:
        "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 प्रमाणित। 100% प्रतिसंहरणीय डेटा पहुंच और शून्य कॉन्टैक्ट स्क्रैपिंग।",
      footerLaunchWebApp: "वेब ऐप शुरू करें",
      footerSignIn: "साइन इन",
      footerConsent: "सहमति ढाँचा",
      footerOnboarding: "ऑनबोर्डिंग प्रक्रिया",
      footerCopyright: "© 2026 आर्थिक्स भारत कोर। आरबीआई खाता एग्रीगेटर ढांचे के तहत विनियमित।",
      footerHotline: "राष्ट्रीय सहायता हेल्पलाइन: 1800-ARTHIX (टोल फ्री 24x7)",
    },
    gu: {
      navPillars: "મુખ્ય સ્તંભો",
      navFiduciaryDifference: "ફિડ્યુશિયરી તફાવત",
      navSovereignTrust: "સ્વાયત્ત વિશ્વાસ",
      navSignIn: "સાઇન ઇન",
      stat1Label: "સુરક્ષિત ભંડોળ",
      stat2Label: "કારીગરો અને પરિવારો",
      stat3Label: "ડિસ્ટ્રિબ્યુટર કમિશન",
      stat4Label: "સ્વાયત્ત ડેટા ગોપનીયતા",
      demoBadge: "પારદર્શક ફિડ્યુશિયરી સુરક્ષા",
      demoTitle: "ઇન્ટરેક્ટિવ ફિડ્યુશિયરી ડેમો",
      demoQuestion: "લૂંટારી બેન્કો વિરુદ્ધ આર્થિક્સ સ્વાયત્ત કવચ",
      demoDescription:
        "વાસ્તવિક પરિસ્થિતિઓ બદલીને જુઓ કે પરંપરાગત બેન્કો દ્વારા મોંઘી લોન આપતી વખતે આર્થિક્સ નાગરિકોનું રક્ષણ કેવી રીતે કરે છે.",
      demoScenarioA: "પરિસ્થિતિ ૧: કારીગર રોકડ તંગી (કમલા)",
      demoScenarioB: "પરિસ્થિતિ ૨: પગારદાર માસિક બચત (રાહુલ)",
      traditionalBankTitle: "સામાન્ય કોમર્શિયલ બેંક",
      traditionalBankModel: "કમિશન સંચાલિત",
      demoTraditionalStressTitle: "દંડ વસૂલવો અને ઊંચા વ્યાજની લોન આપવી",
      demoTraditionalSurplusTitle: "વધુ કમિશનવાળા યુલિપ અને એન્ડોમેન્ટ પોલિસી આપવી",
      demoTraditionalStress1: "દરેક નિષ્ફળતા પર ₹૫૯૦ બાઉન્સ દંડ વસૂલે છે",
      demoTraditionalStress2: "રિકવરી એજન્ટો દ્વારા ત્રાસદાયક કૉલ",
      demoTraditionalStress3: "૩૬% વ્યાજે બિનજરૂરી પર્સનલ લોન ઑફર્સ મોકલે છે",
      demoTraditionalSurplus1: "એજન્ટો ૪૦% પ્રથમ વર્ષ કમિશનવાળા યુલિપ વેચે છે",
      demoTraditionalSurplus2: "છુપાયેલ એક્ઝિટ ચાર્જ અને કોઈ ફુગાવા સુરક્ષા નહીં",
      demoTraditionalStressResult: "પરિણામ: ગંભીર દેવું અને ક્રેડિટ સ્કોર તૂટી જવો",
      demoTraditionalSurplusResult: "પરિણામ: ૧૦ વર્ષમાં કમિશનમાં ₹૧.૪ લાખનું નુકસાન",
      arthixTitle: "આર્થિક્સ સ્વાયત્ત ફિડ્યુશિયરી",
      arthixModel: "૧૦૦% શૂન્ય કમિશન",
      demoArthixStressTitle: "લોન માર્કેટિંગ બંધ અને ૧-ટેપ રાહત સક્રિય",
      demoArthixSurplusTitle: "ઓછા ખર્ચવાળી ડાયરેક્ટ ઇન્ડેક્સ એસઆઇપી શરૂ",
      demoArthixStress1: "સક્રિય સુરક્ષા હોલ્ડ લૂંટારી લોન માર્કેટિંગ અટકાવે છે",
      demoArthixStress2: "કોઈ બ્યુરો નુકસાન વગર ૧-ટેપ ૬૦-દિવસીય ઈએમઆઈ સ્થગિત",
      demoArthixStress3: "પોતાની માતૃભાષામાં ગોપનીય સહાનુભૂતિપૂર્ણ કાઉન્સિલર કૉલ",
      demoArthixSurplus1: "ઝીરો કમિશન ડાયરેક્ટ નિફ્ટી ૫૦ ઇન્ડેક્સ (૦.૦૫% ખર્ચ)",
      demoArthixSurplus2: "પારદર્શક ગણતરી જે ₹૨.૮ લાખ વધુ નફો દર્શાવે છે",
      demoArthixStressResult: "ખાતરી: સંપૂર્ણ સન્માન, શૂન્ય દંડ અને સુરક્ષિત સિબિલ",
      demoArthixSurplusResult: "ખાતરી: પરિવાર માટે ₹૨,૮૦,૦૦૦ વધારાની સંપત્તિ સુરક્ષિત",
      demoInspectLink: "વેબ ઍપમાં જુઓ",
      pillarsSectionTitle: "સ્વાયત્ત સંરચના",
      pillarsSectionDescription: "ભારત માટે બનેલા ૫ સ્વાયત્ત સ્તંભો",
      pillar1Title: "વિવેક નિર્ણય એન્જિન",
      pillar1Description:
        "૪-તબક્કાનું પારદર્શક તર્ક: માન્ય, શરતી, સ્થગિત કે બ્લૉક. જ્યાં સુધી ગણતરીપૂર્વક યોગ્ય ન હોય, ત્યાં સુધી પ્રોડક્ટ આપતા નથી.",
      pillar2Title: "સહારા લોકસંકલ્પ અને સન્માન",
      pillar2Description:
        "રોકડ તંગી શોધી કાઢે છે અને આરબીઆઈ નિયમો મુજબ આપોઆપ ઈએમઆઈ સ્થગિત તથા દંડથી રક્ષણ આપે છે.",
      pillar3Title: "જીવનચક્ર ડાયરેક્ટ સંપત્તિ",
      pillar3Description:
        "કડક સેબી આરઆઈએ ધોરણો. કમિશન-મુક્ત ડાયરેક્ટ મ્યુચ્યુઅલ ફંડ અને સોવરિન ગોલ્ડ બોન્ડ્સ.",
      pillar4Title: "ભાષાસહાયક માતૃભાષા વૉઇસ",
      pillar4Description:
        "૨૨ ભારતીય ભાષાઓમાં વૉઇસ AI. ઑડિયો વેવફોર્મ અને તાત્કાલિક માતૃભાષામાં સમજૂતી.",
      pillar5Title: "ન્યાય પારદર્શક ઑડિટ લૉગ",
      pillar5Description:
        "સંપૂર્ણ પારદર્શિતા. દરેક ભલામણ પાછળ એક સ્પષ્ટ ઑડિટ પુરાવો હોય છે જે બેંકિંગ લોકપાલ પણ ચકાસી શકે છે.",
      pillar6Title: "કવચ સ્વાયત્ત ગોપનીયતા",
      pillar6Description:
        "ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન (DPDP) એક્ટ ૨૦૨૩ પ્રમાણિત. ૧૦૦% રદ કરી શકાય તેવી પરવાનગી અને સંપર્કો સ્ક્રૅપિંગ મુક્ત.",
      footerLaunchWebApp: "વેબ ઍપ શરૂ કરો",
      footerSignIn: "સાઇન ઇન",
      footerConsent: "સંમતિ ફ્રેમવર્ક",
      footerOnboarding: "ઑનબોર્ડિંગ પ્રક્રિયા",
      footerCopyright: "© 2026 આર્થિક્સ ભારત કોર. આરબીઆઈ એકાઉન્ટ એગ્રીગેટર હેઠળ નિયંત્રિત.",
      footerHotline: "રાષ્ટ્રીય સહાય હેલ્પલાઇન: 1800-ARTHIX (ટોલ ફ્રી 24x7)",
    },
  };

  const h = hero[lang];
  const c = content[lang];

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased flex flex-col selection:bg-azure selection:text-white">
      {/* ─── Top Header Navigation ────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-line px-4 sm:px-8 h-20 flex items-center justify-between transition-all">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/arthix-logo.svg"
                alt="ARTHIX Logo"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-navy-deep group-hover:text-azure transition-colors">
                ARTHIX
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-azure -mt-1">
                Bharat Core AI
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-ink-muted">
            <a href="#pillars" className="hover:text-azure transition-colors">
              {c.navPillars}
            </a>
            <a href="#demo" className="hover:text-azure transition-colors">
              {c.navFiduciaryDifference}
            </a>
            <a href="#governance" className="hover:text-azure transition-colors">
              {c.navSovereignTrust}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-canvas p-1 rounded-xl border border-line">
            {(
              [
                { k: "en", label: "Eng" },
                { k: "hi", label: "हिंदी" },
                { k: "gu", label: "ગુજ" },
              ] as const
            ).map((item) => (
              <button
                key={item.k}
                onClick={() => setLang(item.k)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === item.k
                    ? "bg-navy-deep text-white shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            className="text-xs font-bold text-ink-muted hover:text-ink px-3 py-2 rounded-xl transition-colors"
          >
            {c.navSignIn}
          </Link>

          <Link
            href="/app"
            className="bg-navy-deep hover:bg-navy-rich text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 hover:translate-y-[-1px]"
          >
            <span>{c.footerLaunchWebApp}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ─── Hero Section ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-8 border-b border-line bg-gradient-to-b from-canvas via-white to-canvas">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-azure/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-10 w-80 h-80 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          {/* Sovereign Guarantee Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-soft text-emerald border border-emerald/20 text-xs font-extrabold shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>{h.pill}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-navy-deep leading-tight max-w-4xl">
            {lang === "en" ? (
              <>
                Sovereign AI Banking for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure via-emerald to-terracotta">
                  Bharat.
                </span>
              </>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure via-emerald to-terracotta">
                {h.title1}
              </span>
            )}
          </h1>

          <p className="text-base sm:text-xl text-ink-muted max-w-2xl leading-relaxed">{h.sub}</p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/app"
              className="w-full sm:w-auto bg-navy-deep hover:bg-navy-rich text-white px-8 py-4 rounded-2xl text-sm font-extrabold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>{h.cta1}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-navy-deep border border-line px-8 py-4 rounded-2xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:border-azure"
            >
              <Users className="w-4 h-4 text-azure" />
              <span>{h.cta2}</span>
            </Link>
          </div>

          {/* Real-Time Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-10 border-t border-line w-full max-w-4xl mt-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-navy-deep font-tabular">
                ₹4,200 Cr+
              </span>
              <span className="text-xs text-ink-muted mt-0.5">{c.stat1Label}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-navy-deep font-tabular">
                18.4 Lakh+
              </span>
              <span className="text-xs text-ink-muted mt-0.5">{c.stat2Label}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald font-tabular">
                0%
              </span>
              <span className="text-xs text-ink-muted mt-0.5">{c.stat3Label}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-azure font-tabular">
                100%
              </span>
              <span className="text-xs text-ink-muted mt-0.5">{c.stat4Label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Comparison: Predatory Banking vs ARTHIX ─ */}
      <section id="demo" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-azure">
            {c.demoTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep">
            {c.demoQuestion}
          </h2>
          <p className="text-sm text-ink-muted max-w-xl">
            {c.demoDescription}
          </p>

          <div className="flex items-center bg-white p-1 rounded-2xl border border-line shadow-sm mt-4">
            <button
              onClick={() => setDemoScenario("stress")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                demoScenario === "stress"
                  ? "bg-navy-deep text-white shadow-md"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {c.demoScenarioA}
            </button>
            <button
              onClick={() => setDemoScenario("surplus")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                demoScenario === "surplus"
                  ? "bg-navy-deep text-white shadow-md"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {c.demoScenarioB}
            </button>
          </div>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Commercial Bank */}
          <div className="p-7 rounded-2xl bg-white border border-vermilion/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-vermilion flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  {c.traditionalBankTitle}
                </span>
                <span className="text-xs bg-vermilion-soft text-vermilion font-bold px-2.5 py-0.5 rounded-full">
                  {c.traditionalBankModel}
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink">
                {demoScenario === "stress"
                  ? c.demoTraditionalStressTitle
                  : c.demoTraditionalSurplusTitle}
              </h3>

              <ul className="flex flex-col gap-3 text-xs text-ink-muted">
                {demoScenario === "stress" ? (
                  <>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> {c.demoTraditionalStress1}
                    </li>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> {c.demoTraditionalStress2}
                    </li>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> {c.demoTraditionalStress3}
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> {c.demoTraditionalSurplus1}
                    </li>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> {c.demoTraditionalSurplus2}
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-xs font-semibold text-vermilion">
              {demoScenario === "stress"
                ? c.demoTraditionalStressResult
                : c.demoTraditionalSurplusResult}
            </div>
          </div>

          {/* ARTHIX Sovereign Fiduciary */}
          <div className="p-7 rounded-2xl bg-white border-2 border-emerald shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {c.arthixTitle}
                </span>
                <span className="text-xs bg-emerald-soft text-emerald font-bold px-2.5 py-0.5 rounded-full">
                  {c.arthixModel}
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink">
                {demoScenario === "stress"
                  ? c.demoArthixStressTitle
                  : c.demoArthixSurplusTitle}
              </h3>

              <ul className="flex flex-col gap-3 text-xs text-ink-muted">
                {demoScenario === "stress" ? (
                  <>
                    <li className="flex items-start gap-2 text-emerald">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald mt-0.5" />
                      <span>{c.demoArthixStress1}</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald mt-0.5" />
                      <span>{c.demoArthixStress2}</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald mt-0.5" />
                      <span>{c.demoArthixStress3}</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2 text-emerald">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald mt-0.5" />
                      <span>{c.demoArthixSurplus1}</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald mt-0.5" />
                      <span>{c.demoArthixSurplus2}</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
              <span className="text-xs font-bold text-emerald">
                {demoScenario === "stress" ? c.demoArthixStressResult : c.demoArthixSurplusResult}
              </span>
              <Link
                href="/app"
                className="text-xs font-bold text-azure hover:underline flex items-center gap-1"
              >
                {c.demoInspectLink} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5 Core Pillars Grid ───────────────────────────────── */}
      <section id="pillars" className="py-20 px-4 sm:px-8 bg-white border-y border-line">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-xs uppercase font-extrabold tracking-wider text-azure">
              {c.pillarsSectionTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep">
              {c.pillarsSectionDescription}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3 hover:border-azure transition-all">
              <div className="w-11 h-11 rounded-xl bg-azure-soft text-azure flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{c.pillar1Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {c.pillar1Description}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3 hover:border-emerald transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-soft text-emerald flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{c.pillar2Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {c.pillar2Description}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3 hover:border-azure transition-all">
              <div className="w-11 h-11 rounded-xl bg-azure-soft text-azure flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{c.pillar3Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {c.pillar3Description}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3 hover:border-terracotta transition-all">
              <div className="w-11 h-11 rounded-xl bg-terracotta-soft text-terracotta flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{c.pillar4Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {c.pillar4Description}
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3 hover:border-navy transition-all">
              <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{c.pillar5Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {c.pillar5Description}
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3 hover:border-emerald transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-soft text-emerald flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{c.pillar6Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {c.pillar6Description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer id="governance" className="bg-navy-deep text-white py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative flex items-center justify-center bg-white rounded-xl p-1">
                <Image
                  src="/arthix-logo.svg"
                  alt="ARTHIX Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block">ARTHIX</span>
                <span className="text-xs text-slate-400">Sovereign Bharat Banking Core</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <Link href="/app" className="hover:text-white transition-colors">
                {c.footerLaunchWebApp}
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                {c.footerSignIn}
              </Link>
              <Link href="/consent" className="hover:text-white transition-colors">
                {c.footerConsent}
              </Link>
              <Link href="/onboarding" className="hover:text-white transition-colors">
                {c.footerOnboarding}
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>{c.footerCopyright}</p>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-azure-light" />
              <span>{c.footerHotline}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
