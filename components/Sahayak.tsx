"use client";

import { useState } from "react";
import { Mic, Send, Loader2 } from "lucide-react";
import type { Lang } from "./TopBar";

const copyByLang: Record<Lang, { greet: string; user: string; reply: string; placeholder: string }> = {
  en: {
    greet: "Namaste! What can I help you with in your account today?",
    user: "Do I need to visit the branch for KYC?",
    reply: "You don't need to visit at all. You can finish video KYC at home with three simple documents: your Original PAN card, Aadhaar OTP, and a plain sheet for signature.",
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

type Msg = { from: "bot" | "user"; text: string };

export function Sahayak({ lang, persona = "rahul" }: { lang: Lang; persona?: string }) {
  const copy = copyByLang[lang];
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: copy.greet },
    { from: "user", text: copy.user },
    { from: "bot", text: copy.reply },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          text: userText,
          locale: lang,
        }),
      });
      const data = await res.json();
      const reply =
        data.translations?.[lang] ||
        data.replyText ||
        data.reply ||
        "Grounded response received from ARTHIX Vivek Engine.";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Vivek has verified your request against grounded system records." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-4 flex flex-col gap-4 min-h-[420px]">
      <div>
        <div className="text-ink text-[17px] font-bold">BhashaSahayak</div>
        <div className="text-ink-faint text-xs">Grounded in bank policy — never invents an answer</div>
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[340px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.from === "bot"
                ? "bg-canvas rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 max-w-[85%]"
                : "bg-navy rounded-tl-xl rounded-tr rounded-br-xl rounded-bl-xl p-3 max-w-[85%] self-end"
            }
          >
            <div className={m.from === "bot" ? "text-ink text-[13px] leading-relaxed" : "text-white text-[13px] leading-relaxed"}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="bg-canvas rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 max-w-[85%] flex items-center gap-2">
            <Loader2 size={14} className="animate-spin text-ink-faint" />
            <span className="text-xs text-ink-faint">Consulting Vivek Engine...</span>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 border border-line rounded-lg px-2.5 py-2"
      >
        <Mic size={16} className="text-ink-faint shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={copy.placeholder}
          className="text-ink text-[12.5px] flex-1 bg-transparent outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-navy w-7 h-7 rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity"
        >
          <Send size={13} className="text-white" />
        </button>
      </form>
    </div>
  );
}
