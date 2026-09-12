"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Fingerprint,
  Users,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Shield,
  PhoneCall,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [authMode, setAuthMode] = useState<"persona" | "otp" | "aadhaar" | "google">("persona");

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPersona, setLoadingPersona] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (otpSent && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [otpSent]);

  useEffect(() => {
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, []);

  const startCountdown = () => {
    setResendCountdown(24);
    countdownRef.current = setInterval(() => {
      setResendCountdown((v) => {
        if (v <= 1) { clearInterval(countdownRef.current!); return 0; }
        return v - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    const cleaned = mobileNumber.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setMobileError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setMobileError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpError("");
      startCountdown();
    }, 500);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Handle paste of multiple characters
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otpVal];
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtpVal(newOtp);
      const nextFocus = Math.min(index + digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newOtp = [...otpVal];
    newOtp[index] = digit;
    setOtpVal(newOtp);

    // Auto-advance to next box if filled
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpVal[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    const demoDigits = ["7", "4", "2", "9", "1", "0"];
    setOtpVal(demoDigits);
    setOtpError("");
    inputRefs.current[5]?.focus();
  };

  const handleVerifyOtp = () => {
    const fullOtp = otpVal.join("");
    if (fullOtp.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP");
      return;
    }
    setOtpError("");
    setLoading(true);
    setTimeout(() => {
      router.push("/app?persona=rahul");
    }, 500);
  };

  const handlePersonaLogin = (persona: "kamala" | "rahul") => {
    setLoadingPersona(persona);
    setTimeout(() => {
      router.push(`/app?persona=${persona}`);
    }, 450);
  };

  const handleDigiLockerLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/app?persona=kamala");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between antialiased selection:bg-azure selection:text-white">
      {/* ─── Top Header Navigation ────────────────────────────── */}
      <header className="h-20 px-6 sm:px-12 border-b border-line bg-white/90 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 relative flex items-center justify-center">
            <Image
              src="/arthix-logo.svg"
              alt="ARTHIX Logo"
              width={42}
              height={42}
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-navy-deep">
              ARTHIX
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-azure -mt-0.5">
              Bharat Core AI
            </span>
          </div>
        </Link>

        {/* Header Right: Language Switcher & Home link */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-canvas p-1 rounded-xl border border-line">
            {(
              [
                { k: "en", label: "Eng" },
                { k: "hi", label: "हिंदी" },
                { k: "gu", label: "ગુજરાતી" },
              ] as const
            ).map((item) => (
              <button
                key={item.k}
                onClick={() => setLang(item.k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-ink-muted hover:text-navy-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Landing Page</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Center Auth Container ────────────────────────── */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] bg-azure/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

        <div className="glass-card rounded-3xl max-w-xl w-full p-8 sm:p-10 shadow-2xl border border-line flex flex-col gap-7 relative z-10">
          {/* Card Header */}
          <div className="text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-navy-deep text-white flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7 text-emerald-bright" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-deep tracking-tight">
                Sovereign Bharat Banking Login
              </h1>
              <p className="text-sm text-ink-muted mt-1.5">
                Access your RBI Account Aggregator verified banking sanctuary.
              </p>
            </div>
          </div>

          {/* Auth Mode Tabs */}
          <div className="grid grid-cols-4 gap-1.5 bg-canvas p-1.5 rounded-2xl border border-line text-sm font-bold">
            <button
              onClick={() => { setAuthMode("persona"); setMobileError(""); setOtpError(""); }}
              className={`py-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${authMode === "persona" ? "bg-white text-navy-deep shadow-md font-extrabold" : "text-ink-muted hover:text-ink"}`}
            >
              <Users className="w-4 h-4 text-azure" />
              <span className="text-[10px]">Demo</span>
            </button>
            <button
              onClick={() => { setAuthMode("otp"); setMobileError(""); setOtpError(""); }}
              className={`py-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${authMode === "otp" ? "bg-white text-navy-deep shadow-md font-extrabold" : "text-ink-muted hover:text-ink"}`}
            >
              <Smartphone className="w-4 h-4 text-emerald" />
              <span className="text-[10px]">OTP</span>
            </button>
            <button
              onClick={() => { setAuthMode("aadhaar"); setMobileError(""); setOtpError(""); }}
              className={`py-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${authMode === "aadhaar" ? "bg-white text-navy-deep shadow-md font-extrabold" : "text-ink-muted hover:text-ink"}`}
            >
              <Fingerprint className="w-4 h-4 text-terracotta" />
              <span className="text-[10px]">DigiLocker</span>
            </button>
            <button
              onClick={() => { setAuthMode("google"); setMobileError(""); setOtpError(""); }}
              className={`py-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${authMode === "google" ? "bg-white text-navy-deep shadow-md font-extrabold" : "text-ink-muted hover:text-ink"}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-[10px]">Google</span>
            </button>
          </div>

          {/* ─── Mode 1: 1-Click Demo Personas ─────────────────────── */}
          {authMode === "persona" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                  Choose a Test Persona to Launch:
                </span>
                <span className="text-xs font-bold text-azure bg-azure-soft px-2.5 py-0.5 rounded-full">
                  Instant Demo Access
                </span>
              </div>

              {/* Persona 1: Kamala Devi (Stress & Debt Relief) */}
              <button
                onClick={() => handlePersonaLogin("kamala")}
                disabled={loadingPersona !== null}
                className="p-5 rounded-2xl border border-line bg-canvas hover:border-azure hover:bg-white transition-all text-left flex items-center justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-vermilion/30 shrink-0">
                    <Image
                      src="/portrait-kamala.png"
                      alt="Kamala Devi"
                      width={52}
                      height={52}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-ink">Kamala Devi</span>
                      <span className="text-xs font-extrabold bg-vermilion-soft text-vermilion px-2.5 py-0.5 rounded-full">
                        Stress Relief Mode
                      </span>
                    </div>
                    <span className="text-xs text-ink-muted">
                      Artisan MSME Cluster (Surat) • Active EMIs consume 58% of inflow
                    </span>
                    <span className="text-xs text-emerald font-semibold mt-1">
                      → Test Sahara 1-Tap Moratorium Relief & Credit Hold
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center group-hover:bg-navy-deep group-hover:text-white transition-colors shrink-0">
                  {loadingPersona === "kamala" ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-azure" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Persona 2: Rahul Sharma (Surplus & Wealth Expansion) */}
              <button
                onClick={() => handlePersonaLogin("rahul")}
                disabled={loadingPersona !== null}
                className="p-5 rounded-2xl border border-line bg-canvas hover:border-azure hover:bg-white transition-all text-left flex items-center justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full bg-navy-rich text-white flex items-center justify-center font-extrabold text-base border-2 border-emerald/30 shrink-0">
                    RS
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-ink">Rahul Sharma</span>
                      <span className="text-xs font-extrabold bg-emerald-soft text-emerald px-2.5 py-0.5 rounded-full">
                        Surplus Growth Mode
                      </span>
                    </div>
                    <span className="text-xs text-ink-muted">
                      Tier-2 Salaried Specialist • 3.2 Months Reserve • +20% Surplus
                    </span>
                    <span className="text-xs text-azure font-semibold mt-1">
                      → Test JeevanChakra Direct Nifty 50 SIP & Nyay Audit
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center group-hover:bg-navy-deep group-hover:text-white transition-colors shrink-0">
                  {loadingPersona === "rahul" ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-azure" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </button>
            </div>
          )}

          {/* ─── Mode 2: Mobile OTP ────────────────────────────────── */}
          {authMode === "otp" && (
            <div className="flex flex-col gap-5">
              {!otpSent ? (
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-bold text-ink flex items-center justify-between">
                    <span>Enter 10-Digit Mobile Number</span>
                    <span className="text-xs text-ink-muted">Aadhaar Linked</span>
                  </label>

                  <div className="flex items-center border-2 border-line focus-within:border-azure rounded-2xl overflow-hidden bg-white transition-colors">
                    <span className="px-4 text-sm font-bold text-navy-deep bg-canvas border-r border-line py-3.5 flex items-center gap-1.5">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        setMobileError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="w-full px-4 py-3.5 text-base font-semibold text-ink focus:outline-none tracking-wider"
                    />
                  </div>

                  {mobileError && (
                    <p className="text-xs font-semibold text-vermilion flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {mobileError}
                    </p>
                  )}

                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full bg-navy-deep hover:bg-navy-rich text-white py-4 rounded-2xl text-sm font-extrabold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-1"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Sovereign Verification OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-ink block">
                        Enter 6-Digit OTP
                      </span>
                      <span className="text-xs text-ink-muted">
                        Sent to +91 {mobileNumber || "98765 43210"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="text-xs font-bold text-azure bg-azure-soft hover:bg-azure-soft/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Auto-fill Demo (742910)
                    </button>
                  </div>

                  {/* 6 OTP Boxes with clean input handlers */}
                  <div className="flex justify-between gap-2">
                    {otpVal.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 sm:w-14 h-14 sm:h-16 text-center text-2xl font-extrabold text-navy-deep border-2 border-line focus:border-azure rounded-2xl focus:outline-none bg-white font-tabular transition-colors shadow-sm"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="text-xs font-semibold text-vermilion flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {otpError}
                    </p>
                  )}

                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="w-full bg-navy-deep hover:bg-navy-rich text-white py-4 rounded-2xl text-sm font-extrabold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying with Sovereign Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Launch WebApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
                    <button
                      onClick={() => setOtpSent(false)}
                      className="hover:text-ink font-semibold"
                    >
                      Change Mobile Number
                    </button>
                    <button
                      onClick={() => { if (resendCountdown === 0) { handleSendOtp(); } }}
                      disabled={resendCountdown > 0}
                      className={`font-semibold hover:underline ${resendCountdown > 0 ? "text-ink-muted cursor-not-allowed" : "text-azure"}`}
                    >
                      {resendCountdown > 0 ? `Resend OTP (${resendCountdown}s)` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── Mode 3: DigiLocker ───────────────────────────────── */}
          {authMode === "aadhaar" && (
            <div className="flex flex-col gap-4 text-center">
              <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-soft text-emerald flex items-center justify-center">
                  <Fingerprint className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    DigiLocker & UIDAI Sovereign Bridge
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed max-w-sm">
                    Instant 1-tap paperless verification via sovereign e-KYC. Zero document uploads
                    required.
                  </p>
                </div>
                <button
                  onClick={handleDigiLockerLogin}
                  disabled={loading}
                  className="w-full bg-emerald hover:bg-emerald-deep text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Connecting to DigiLocker..." : "Authorize via DigiLocker"}
                </button>
              </div>
            </div>
          )}

          {/* ─── Mode 4: Google Sign-In ───────────────────────────── */}
          {authMode === "google" && (
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col items-center gap-5">
                {/* Google branding */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-line shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-9 h-9">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>

                <div className="text-center">
                  <h3 className="text-base font-bold text-ink">Continue with Google</h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed max-w-sm">
                    Sign in securely using your Google account. Your banking data stays
                    sovereign — Google only verifies your identity.
                  </p>
                </div>

                {/* Demo accounts for hackathon */}
                <div className="w-full flex flex-col gap-3">
                  <button
                    onClick={() => handlePersonaLogin("rahul")}
                    disabled={loadingPersona !== null}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-white border border-line hover:border-azure hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-navy-rich text-white flex items-center justify-center font-bold text-sm shrink-0">RS</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ink">rahul.sharma@gmail.com</p>
                      <p className="text-xs text-ink-muted">Tier-2 Salaried • Surplus Growth</p>
                    </div>
                    {loadingPersona === "rahul"
                      ? <RefreshCw className="w-4 h-4 animate-spin text-azure shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
                    }
                  </button>

                  <button
                    onClick={() => handlePersonaLogin("kamala")}
                    disabled={loadingPersona !== null}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-white border border-line hover:border-azure hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-line shrink-0">
                      <img src="/portrait-kamala.png" alt="Kamala" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ink">kamala.devi@gmail.com</p>
                      <p className="text-xs text-ink-muted">Artisan MSME • Debt Relief</p>
                    </div>
                    {loadingPersona === "kamala"
                      ? <RefreshCw className="w-4 h-4 animate-spin text-azure shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
                    }
                  </button>
                </div>

                <p className="text-[11px] text-ink-faint text-center">
                  Demo accounts shown above. In production, this connects to real Google OAuth 2.0.
                </p>
              </div>
            </div>
          )}

          {/* ─── Card Footer: Bank-Grade Trust Badges ─────────────── */}
          <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between text-xs text-ink-muted gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              256-Bit AES Fiduciary Encryption
            </span>
            <span className="font-medium">RBI Account Aggregator Protocol</span>
          </div>
        </div>
      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="h-16 px-6 sm:px-12 border-t border-line flex items-center justify-between text-xs text-ink-muted bg-white/80">
        <Link href="/" className="hover:text-ink font-semibold transition-colors flex items-center gap-1">
          <span>← Back to Public Overview</span>
        </Link>
        <div className="flex items-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-azure" />
          <span>Counselor Helpline: 1800-ARTHIX (Toll Free 24x7)</span>
        </div>
      </footer>
    </div>
  );
}
