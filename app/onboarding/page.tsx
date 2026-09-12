"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Handshake, Shield } from "lucide-react";
import { LedgerRow } from "@/components/ui";
import type { Lang } from "@/components/TopBar";

type LangKey = Lang;

const copy: Record<LangKey, {
  tagline: string; sub: string; quote: string; quoteAuthor: string;
  langLabel: string; promiseTitle: string;
  p1: string; p1sub: string; p1tag: string;
  p2: string; p2sub: string; p2tag: string;
  p3: string; p3sub: string; p3tag: string;
  testimonial: string; testName: string;
  cta1: string; cta2: string; trust: string;
}> = {
  en: {
    tagline: "Your money, understood.",
    sub: "Right banking for your needs",
    quote: '"The right product. The right moment.',
    quoteAuthor: "Or no product at all."  ,
    langLabel: "Preferred language",
    promiseTitle: "Our Bharat First Promise",
    p1: "Recommend", p1sub: "Only what genuinely fits your surplus, crop cycle, or business cashflow. Zero predatory upselling.", p1tag: "Fair match",
    p2: "Assist first", p2sub: "Guidance and emergency buffer support before any loan or credit line is ever offered.", p2tag: "Support",
    p3: "Suppress", p3sub: "Algorithmic guardrails that pause offers when income dips, protecting your family from debt traps.", p3tag: "Protection",
    testimonial: '"ARTHIX stopped me from taking a high-interest app loan and helped me save ₹14,000 instead."',
    testName: "Trusted by 2.4L+ citizens",
    cta1: "Get started with Arthix",
    cta2: "Continue with basic banking (without AI personalisation)",
    trust: "Regulated Banking Partner · 256-bit encrypted · Consented data only",
  },
  hi: {
    tagline: "आपका पैसा, समझा गया।",
    sub: "आपकी ज़रूरतों के अनुसार सही बैंकिंग",
    quote: '"सही उत्पाद। सही समय।',
    quoteAuthor: "या फिर कोई उत्पाद नहीं।",
    langLabel: "पसंदीदा भाषा",
    promiseTitle: "हमारा भारत प्रथम वादा",
    p1: "सिफारिश करें", p1sub: "केवल वही जो आपकी बचत, फसल चक्र, या व्यावसायिक नकदी प्रवाह के अनुकूल हो। शून्य शिकारी अपसेलिंग।", p1tag: "उचित मिलान",
    p2: "पहले सहायता", p2sub: "कोई लोन या क्रेडिट लाइन देने से पहले मार्गदर्शन और आपातकालीन बफर समर्थन।", p2tag: "सहायता",
    p3: "दबाएं", p3sub: "एल्गोरिदमिक सुरक्षा जो आय गिरने पर ऑफर रोकती है, आपके परिवार को ऋण जाल से बचाती है।", p3tag: "सुरक्षा",
    testimonial: '"आर्थिक्स ने मुझे हाई-इंटरेस्ट ऐप लोन लेने से रोका और ₹14,000 बचाने में मदद की।"',
    testName: "2.4 लाख+ नागरिकों का विश्वास",
    cta1: "आर्थिक्स के साथ शुरू करें",
    cta2: "बुनियादी बैंकिंग जारी रखें (AI वैयक्तिकरण के बिना)",
    trust: "विनियमित बैंकिंग भागीदार · 256-बिट एन्क्रिप्टेड · सहमति डेटा केवल",
  },
  gu: {
    tagline: "તમારા પૈસા, સમજાયા.",
    sub: "તમારી જરૂરિયાતો મુજબ સાચી બેંકિંગ",
    quote: '"સાચો ઉત્પાદ. સાચો સમય.',
    quoteAuthor: "અથવા કોઈ ઉત્પાદ નહીં.",
    langLabel: "પ્રિય ભાષા",
    promiseTitle: "અમારો ભારત ફર્સ્ટ વાયદો",
    p1: "ભલામણ કરો", p1sub: "ફક્ત તે જ સૂચવો જે તમારી બચત, પાક ચક્ર, અથવા વ્યવસાય રોકડ પ્રવાહ માટે ખરેખર ઉચિત હોય.", p1tag: "ઉચિત મેળ",
    p2: "પહેલા સહાય", p2sub: "કોઈ લોન અથવા ક્રેડિટ લાઇન આપતા પહેલા માર્ગદર્શન અને કટોકટી બફર સહાય.", p2tag: "સહાય",
    p3: "દબાવો", p3sub: "અલ્ગોરિધમ ગ્વાર્ડ કે જ્યારે આવક ઘટે ત્યારે ઓફર અટકાવે, તમારા પરિવારને દેવા ફાંસો થી બચાવે.", p3tag: "સંરક્ષણ",
    testimonial: '"આર્થિક્સ મને હાઈ-ઈન્ટ્રેસ્ટ ઍપ લોન લેવાથી રોક્યો અને ₹14,000 બચાવવામાં મદદ કરી."',
    testName: "2.4 લાખ+ નાગરિકોનો વિશ્વાસ",
    cta1: "આર્થિક્સ સાથે શરૂ કરો",
    cta2: "મૂળ બેંકિંગ ચાલુ રાખો (AI વ્યક્તિગતકરણ વિના)",
    trust: "નિયંત્રિત બેંકિંગ ભાગીદાર · 256-બિટ એન્ક્રિપ્ટ · ફક્ત સ્વીકૃત ડેટા",
  },
};

const langs: { k: LangKey; primary: string; sub: string }[] = [
  { k: "en", primary: "English", sub: "Default" },
  { k: "hi", primary: "हिंदी", sub: "Hindi" },
  { k: "gu", primary: "ગુજરાતી", sub: "Gujarati" },
];

export default function OnboardingPage() {
  const [activeLang, setActiveLang] = useState<LangKey>("en");
  const t = copy[activeLang];

  return (
    <div className="min-h-screen bg-canvas flex justify-center py-8 px-4">
      <div className="bg-white border border-line w-full max-w-[400px] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-5 flex flex-col gap-5">

          {/* Brand header */}
          <div className="flex items-center justify-between">
            <Image src="/arthix-logo.svg" alt="Arthix" width={100} height={30} priority />
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-soft text-navy text-[10.5px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              Verified AI Partner
            </span>
          </div>

          {/* HERO banner */}
          <div className="bg-canvas border border-line rounded-xl p-4 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-azure-soft opacity-60 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[10.5px] font-semibold text-azure bg-azure-soft px-2.5 py-1 rounded-full">
                Intelligent Banking Layer for Bharat
              </span>
            </div>
            <h1 className="text-ink text-[22px] font-bold leading-tight tracking-tight mb-1">
              {t.tagline}
            </h1>
            <p className="text-ink-muted text-[14px] font-medium mb-3 leading-relaxed">{t.sub}</p>
            <div className="bg-white rounded-lg px-3 py-2.5">
              <p className="text-ink text-[13px] font-semibold leading-snug">
                {t.quote}{" "}
                <span className="text-navy">{t.quoteAuthor}</span>"
              </p>
            </div>
          </div>

          {/* Language selector */}
          <div>
            <div className="text-ink-faint text-[11.5px] font-semibold mb-2">{t.langLabel}</div>
            <div className="grid grid-cols-3 gap-2">
              {langs.map((l) => {
                const active = activeLang === l.k;
                return (
                  <button
                    key={l.k}
                    onClick={() => setActiveLang(l.k)}
                    className={`flex flex-col items-center py-2.5 rounded-lg border transition-colors ${
                      active ? "border-navy bg-navy text-white" : "border-line bg-white text-ink"
                    }`}
                  >
                    <span className="text-[13px] font-semibold">{l.primary}</span>
                    <span className={`text-[10.5px] ${active ? "text-white/70" : "text-ink-faint"}`}>{l.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bharat First Promise */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck size={15} className="text-navy" />
              <div className="text-ink text-[13.5px] font-semibold">{t.promiseTitle}</div>
            </div>
            <LedgerRow icon={<ShieldCheck size={16} />} title={t.p1} subtitle={t.p1sub}
              trailing={<span className="text-[10.5px] font-semibold text-ink-faint bg-canvas px-2 py-0.5 rounded-full border border-line">{t.p1tag}</span>}
            />
            <LedgerRow icon={<Handshake size={16} />} title={t.p2} subtitle={t.p2sub}
              trailing={<span className="text-[10.5px] font-semibold text-ink-faint bg-canvas px-2 py-0.5 rounded-full border border-line">{t.p2tag}</span>}
            />
            <LedgerRow icon={<Shield size={16} />} title={t.p3} subtitle={t.p3sub}
              trailing={<span className="text-[10.5px] font-semibold text-ink-faint bg-canvas px-2 py-0.5 rounded-full border border-line">{t.p3tag}</span>}
            />
          </div>

          {/* Testimonial */}
          <div className="flex items-center gap-3 border-t border-line pt-4">
            <div className="w-11 h-11 rounded-lg bg-navy-soft flex items-center justify-center shrink-0 text-[22px]">🛒</div>
            <div className="min-w-0">
              <div className="text-emerald text-[10.5px] font-bold">{t.testName}</div>
              <p className="text-ink-faint text-xs leading-relaxed">{t.testimonial}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <Link href="/consent" className="w-full h-12 rounded-lg bg-navy text-white text-[13.5px] font-bold flex items-center justify-center hover:bg-navy-rich transition-colors">
              {t.cta1}
            </Link>
            <Link href="/app" className="w-full py-2.5 text-center text-ink-faint text-[12.5px] font-medium hover:text-ink transition-colors">
              {t.cta2}
            </Link>
          </div>

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-1 text-ink-faint text-[10.5px] text-center">
            <ShieldCheck size={11} className="text-emerald" />
            {t.trust}
          </div>

        </div>
      </div>
    </div>
  );
}
