import { Mic, Send } from "lucide-react";
import type { Lang } from "./TopBar";

const copyByLang: Record<Lang, { greet: string; user: string; reply: string; placeholder: string }> = {
  en: {
    greet: "Namaste! What can I help you with in your account today?",
    user: "Do I need to visit the branch for KYC?",
    reply:
      "You don't need to visit at all. You can finish video KYC at home with three simple documents.",
    placeholder: "Type or speak your question",
  },
  hi: {
    greet: "नमस्ते! आज मैं आपके खाते में क्या मदद कर सकता हूँ?",
    user: "क्या KYC के लिए ब्रांच जाना ज़रूरी है?",
    reply: "बिल्कुल नहीं। आप घर बैठे तीन आसान दस्तावेज़ों से वीडियो KYC पूरा कर सकते हैं।",
    placeholder: "अपना सवाल लिखें या बोलें",
  },
  gu: {
    greet: "નમસ્તે! આજે તમારા ખાતામાં હું શું મદદ કરી શકું?",
    user: "KYC માટે બ્રાન્ચ જવું જરૂરી છે?",
    reply: "બિલકુલ નહીં. તમે ઘરે બેઠાં ત્રણ સરળ દસ્તાવેજોથી વિડિયો KYC પૂર્ણ કરી શકો છો.",
    placeholder: "તમારો પ્રશ્ન લખો અથવા બોલો",
  },
};

export function Sahayak({ lang }: { lang: Lang }) {
  const copy = copyByLang[lang];

  return (
    <div className="px-5 py-4 flex flex-col gap-4 min-h-[420px]">
      <div>
        <div className="text-ink text-[17px] font-bold">BhashaSahayak</div>
        <div className="text-ink-faint text-xs">Grounded in bank policy — never invents an answer</div>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="bg-canvas rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 max-w-[85%]">
          <div className="text-ink text-[13px] leading-relaxed">{copy.greet}</div>
        </div>
        <div className="bg-navy rounded-tl-xl rounded-tr rounded-br-xl rounded-bl-xl p-3 max-w-[85%] self-end">
          <div className="text-white text-[13px] leading-relaxed">{copy.user}</div>
        </div>
        <div className="bg-canvas rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 max-w-[88%]">
          <div className="text-ink text-[13px] leading-relaxed">{copy.reply}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 border border-line rounded-lg px-2.5 py-2">
        <Mic size={16} className="text-ink-faint" />
        <span className="text-ink-faint text-[12.5px] flex-1">{copy.placeholder}</span>
        <div className="bg-navy w-7 h-7 rounded-full flex items-center justify-center">
          <Send size={13} className="text-white" />
        </div>
      </div>
    </div>
  );
}
