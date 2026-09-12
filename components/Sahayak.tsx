"use client";

import { useState } from "react";
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

export function Sahayak({ lang, persona = "rahul" }: { lang: Lang; persona?: string }) {
  const copy = copyByLang[lang];
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: copy.greet },
    { sender: "user", text: copy.user },
    { sender: "bot", text: copy.reply },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInputText("");

    fetch("/api/v1/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        persona,
        text: textToSend,
        locale: lang,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.replyText || data.reply || (data.translations && data.translations[lang]) || "Verified response received.",
          },
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="px-5 py-4 flex flex-col gap-4 min-h-[420px]">
      <div>
        <div className="text-ink text-[17px] font-bold">BhashaSahayak</div>
        <div className="text-ink-faint text-xs">Grounded in bank policy — never invents an answer</div>
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[380px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 text-[13px] leading-relaxed whitespace-pre-line ${
              m.sender === "user"
                ? "bg-navy text-white rounded-tl-xl rounded-tr rounded-br-xl rounded-bl-xl max-w-[85%] self-end"
                : "bg-canvas text-ink rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[88%] self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border border-line rounded-lg px-2.5 py-2">
        <Mic size={16} className="text-ink-faint" />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={copy.placeholder}
          className="text-ink text-[12.5px] flex-1 bg-transparent border-none outline-none focus:ring-0"
        />
        <button
          onClick={handleSend}
          className="bg-navy w-7 h-7 rounded-full flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Send size={13} className="text-white" />
        </button>
      </div>
    </div>
  );
}
