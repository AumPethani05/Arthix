"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Send,
  Languages,
  CheckCircle2,
  Radio,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebBhashaSahayakProps {
  lang: Lang;
}

export function WebBhashaSahayak({ lang: initialLang }: WebBhashaSahayakProps) {
  const [activeLang, setActiveLang] = useState<Lang>(initialLang);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [inputText, setInputText] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState<"1.0x" | "1.25x">("1.0x");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      time: "10:14 AM",
      text: {
        en: "Namaste! I am your ARTHIX Sovereign Voice Assistant. How may I explain your bank statements, subsidy schemes, or loan protections today?",
        hi: "नमस्ते! मैं आपका आर्थिक्स बैंक सहायक हूँ। मैं आपको सरकारी योजनाओं, बैंक खातों या ईएमआई राहत के बारे में आपकी अपनी भाषा में सहायता करूँगा।",
        gu: "નમસ્તે! હું આપનો આરબીઆઈ-પ્રમાણિત બેંક સહાયક છું. આપ ઘરબેઠા સરળતાથી વીડિયો કેવાયસી કેવી રીતે પૂરું કરી શકો તે હું આપને ગુજરાતીમાં સમજાવીશ.",
      },
      hasAudio: true,
    },
    {
      sender: "user",
      time: "10:15 AM",
      text: {
        en: "What documents do I need for Video KYC? Do I have to visit the bank branch?",
        hi: "वीडियो केवाईसी के लिए कौन से दस्तावेज चाहिए? क्या मुझे बैंक शाखा जाना पड़ेगा?",
        gu: "કેવાયસી માટે શું જોઈએ? મારે બેંક જવું પડશે?",
      },
      hasAudio: false,
    },
    {
      sender: "bot",
      time: "10:16 AM",
      text: {
        en: "You do NOT need to visit any bank branch! You only need your physical Original PAN card, your Aadhaar number for OTP, and a well-lit room for a 2-minute video call.",
        hi: "आपको किसी भी बैंक शाखा जाने की आवश्यकता नहीं है! केवल आपका मूल पैन कार्ड (Original PAN) और आधार नंबर चाहिए। 2 मिनट में घर बैठे मोबाइल से सत्यापन हो जाएगा।",
        gu: "ના, મીનાબેન! તમારે બેંક જવાની બિલકુલ જરૂર નથી. ફક્ત તમારું ઓરિજિનલ પાન કાર્ડ અને આધાર નંબર સાથે રાખો. 2 મિનિટના વીડિયો કોલમાં પૂર્ણ થઈ જશે.",
      },
      hasAudio: true,
    },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      sender: "user",
      time: "Just now",
      text: { en: inputText, hi: inputText, gu: inputText },
      hasAudio: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          time: "Just now",
          text: {
            en: "Vivek has verified this request against RBI Master Direction KYC 2016. Your data is localized in sovereign Indian data centers and never shared with third parties.",
            hi: "विवेक ने इस अनुरोध को आरबीआई मास्टर डायरेक्शन 2016 के तहत सत्यापित किया है। आपकी जानकारी पूरी तरह सुरक्षित और स्थानीय सर्वर पर है।",
            gu: "વિવેકે આ માહિતીને આરબીઆઈ ગાઈડલાઈન મુજબ ચકાસી છે. તમારો ડેટા સંપૂર્ણ સુરક્ષિત છે.",
          },
          hasAudio: true,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-azure text-white flex items-center justify-center shadow-md">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-ink">BhashaSahayak</h1>
              <span className="text-azure text-lg font-bold">• ભાષા સહાયક</span>
              <span className="bg-azure-soft text-azure text-xs font-bold px-2.5 py-0.5 rounded-full">
                Tier-3 Voice AI
              </span>
            </div>
            <p className="text-xs text-ink-muted flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
              Grounded in RBI Master Direction (KYC 2016/Amended 2024) • Zero Hallucinations
            </p>
          </div>
        </div>

        {/* Language Switcher Bar */}
        <div className="flex items-center gap-3">
          <div className="bg-canvas p-1 rounded-xl border border-line flex items-center">
            {(
              [
                { k: "en", label: "English" },
                { k: "hi", label: "हिंदी" },
                { k: "gu", label: "ગુજરાતી" },
              ] as const
            ).map((item) => (
              <button
                key={item.k}
                onClick={() => setActiveLang(item.k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLang === item.k
                    ? "bg-navy-deep text-white shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPlaybackSpeed(playbackSpeed === "1.0x" ? "1.25x" : "1.0x")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-canvas border border-line text-xs font-semibold text-ink-muted hover:text-ink transition-colors"
          >
            <Volume2 className="w-4 h-4 text-azure" />
            <span>{playbackSpeed} Speed</span>
          </button>
        </div>
      </div>

      {/* Two-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Conversational Stream (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl flex flex-col overflow-hidden min-h-[560px] border border-line">
          {/* Chat Header */}
          <div className="px-6 py-4 bg-canvas border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
              <span className="text-xs font-bold text-ink">
                Live Vernacular Session (સક્રિય સત્ર)
              </span>
            </div>
            <span className="text-[11px] text-ink-muted">256-Bit Encrypted Audio Channel</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 max-h-[440px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-navy-deep text-white rounded-br-none"
                      : "bg-canvas border border-line text-ink rounded-bl-none"
                  }`}
                >
                  <p>{m.text[activeLang] || m.text.en}</p>

                  {m.hasAudio && (
                    <div className="mt-2.5 pt-2 border-t border-line/60 flex items-center gap-2">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-azure font-bold text-xs shadow-sm hover:bg-slate-50 transition-colors"
                      >
                        {isPlayingAudio ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                        <span>{isPlayingAudio ? "Playing" : "Listen (સાંભળો)"}</span>
                      </button>
                      <span className="text-[11px] text-ink-muted">0:12s Voice Readout</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-ink-faint mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <div className="p-4 bg-canvas border-t border-line flex items-center gap-3">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                isRecording
                  ? "bg-vermilion text-white animate-pulse"
                  : "bg-azure hover:bg-azure-light text-white shadow-md"
              }`}
              title="Toggle Voice Input"
            >
              {isRecording ? <Radio className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                activeLang === "gu"
                  ? "અહીં પૂછો અથવા માઇક દબાવો..."
                  : activeLang === "hi"
                  ? "यहाँ पूछें या माइक दबाकर बोलें..."
                  : "Ask anything or tap microphone to speak..."
              }
              className="flex-1 bg-white border border-line rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-azure"
            />

            <button
              onClick={handleSend}
              className="p-3 bg-navy-deep hover:bg-navy-rich text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Audio Waveform Visualizer & Presets (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Waveform Visualizer Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-line">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink-muted uppercase">Voice Waveform</span>
              <span className="text-xs text-emerald font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald animate-ping" />
                Speech Synthesis Ready
              </span>
            </div>

            {/* Visual Simulated Audio Bars */}
            <div className="h-20 bg-canvas rounded-xl border border-line p-4 flex items-center justify-center gap-1.5">
              {[40, 65, 85, 30, 95, 50, 75, 45, 90, 60, 35, 80, 55, 70, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isRecording || isPlayingAudio ? "bg-azure" : "bg-slate-300"
                  }`}
                  style={{
                    height: isRecording || isPlayingAudio ? `${h}%` : "20%",
                  }}
                />
              ))}
            </div>

            <span className="text-xs text-ink-muted text-center">
              {isRecording
                ? "Listening in Gujarati/Hindi/English... (સંભળાઈ રહ્યું છે)"
                : "Tap the blue mic button to ask questions via natural speech."}
            </span>
          </div>

          {/* Preset Frequently Asked Vernacular Topics */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-3 border border-line">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              Quick Voice Questions (ઝડપી પ્રશ્નો)
            </h3>

            <div className="flex flex-col gap-2">
              {[
                "How do I pause my tractor or handloom EMI? (ઇએમઆઈ કેવી રીતે રોકવી?)",
                "Is my Aadhaar linked for PM Vishwakarma DBT subsidy?",
                "Why was my personal loan offer blocked? (લોન કેમ રોકવામાં આવી?)",
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(q);
                  }}
                  className="p-3 text-left rounded-xl bg-canvas hover:bg-slate-100/80 border border-line text-xs font-medium text-ink transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
