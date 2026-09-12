"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  HeartHandshake,
  Sparkles,
  RefreshCw,
  Mic,
  ShieldCheck,
  Scale,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  PhoneCall,
  LogOut,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";
import { WebDashboard } from "@/components/web/WebDashboard";
import { WebSahara } from "@/components/web/WebSahara";
import { WebVivek } from "@/components/web/WebVivek";
import { WebJeevanChakra } from "@/components/web/WebJeevanChakra";
import { WebBhashaSahayak } from "@/components/web/WebBhashaSahayak";
import { WebKavach } from "@/components/web/WebKavach";
import { WebNyay } from "@/components/web/WebNyay";

type WebTab =
  | "dashboard"
  | "sahara"
  | "vivek"
  | "jeevanchakra"
  | "bhashasahayak"
  | "consent"
  | "nyay";

export default function WebAppPage() {
  const [activeTab, setActiveTab] = useState<WebTab>("dashboard");
  const [lang, setLang] = useState<Lang>("en");
  const [activePersona, setActivePersona] = useState<"rahul" | "kamala">("rahul");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync initial persona from URL query param if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const p = params.get("persona");
      if (p === "kamala" || p === "rahul") {
        setActivePersona(p);
        if (p === "kamala") {
          setActiveTab("sahara");
        }
      }
    }
  }, []);

  // Close notification panel on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-notif-panel]")) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [notifOpen]);

  const navItems = [
    { key: "dashboard", label: "Dashboard Overview", labelHi: "डैशबोर्ड अवलोकन", labelGu: "ડેશબોર્ડ વિહંગાવલોકન", icon: LayoutDashboard },
    { key: "sahara", label: "Sahara Debt Shield", labelHi: "सहारा कर्ज सुरक्षा", labelGu: "સહારા દેવા સુરક્ષા", icon: HeartHandshake },
    { key: "vivek", label: "Vivek Decision Engine", labelHi: "विवेक निर्णय प्रणाली", labelGu: "વિવેક નિર્ણય એન્જિન", icon: Sparkles },
    { key: "jeevanchakra", label: "JeevanChakra Wealth", labelHi: "जीवन चक्र धन संचय", labelGu: "જીવન ચક્ર સંપત્તિ", icon: RefreshCw },
    { key: "bhashasahayak", label: "BhashaSahayak Voice", labelHi: "भाषा सहायक वाणी", labelGu: "ભાષા સહાયક અવાજ", icon: Mic },
    { key: "consent", label: "Kavach AA Consent", labelHi: "कवच डेटा सहमति", labelGu: "કવચ એકાઉન્ટ સંમતિ", icon: ShieldCheck },
    { key: "nyay", label: "Nyay Explainable Audit", labelHi: "न्याय पारदर्शी ऑडिट", labelGu: "ન્યાય ઓડિટ નિરીક્ષણ", icon: Scale },
  ] as const;

  const getNavLabel = (item: (typeof navItems)[number]) => {
    if (lang === "hi") return item.labelHi;
    if (lang === "gu") return item.labelGu;
    return item.label;
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col antialiased font-sans text-ink">
      {/* ─── Mobile Sidebar Backdrop ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-deep/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Desktop Left Sidebar ────────── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 bg-white border-r border-line flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="h-20 px-7 border-b border-line flex items-center justify-between">
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
                <span className="font-extrabold text-xl tracking-tight text-navy-deep">
                  ARTHIX
                </span>
                <span className="text-xs text-azure font-bold uppercase tracking-wider -mt-0.5">
                  Bharat Core AI
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" title="Sovereign Core Live" />
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-ink-muted p-1.5 rounded-lg hover:bg-canvas"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Links (Generous desktop height & font sizes) */}
          <nav className="p-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key as WebTab);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-navy-deep text-white shadow-md font-extrabold scale-[1.01]"
                      : "text-ink-muted hover:bg-canvas hover:text-ink"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-azure"}`} />
                  <span className="truncate">{getNavLabel(item)}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Widgets */}
        <div className="p-5 border-t border-line flex flex-col gap-3.5 bg-canvas/40">
          {/* Bank Sync Widget */}
          <div className="bg-white p-4 rounded-2xl border border-line flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center justify-between text-sm font-bold text-ink">
              <span>State Bank of India</span>
              <span className="text-emerald text-xs bg-emerald-soft px-2.5 py-0.5 rounded-full font-extrabold">
                Live Synced
              </span>
            </div>
            <span className="text-xs text-ink-muted font-tabular">A/C •••• 4218 (RBI AA Protocol)</span>
          </div>

          {/* Helpline */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-azure-soft text-azure text-xs">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span className="font-extrabold text-sm">1800-ARTHIX</span>
            </div>
            <span className="text-xs text-azure/80 font-bold">24x7 Support</span>
          </div>

          <Link
            href="/"
            className="text-xs text-center text-ink-muted hover:text-ink flex items-center justify-center gap-1.5 py-1 font-semibold transition-colors"
          >
            <span>Back to Public Overview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* ─── Main Content Container (offset by sidebar width on lg) ─── */}
      <div className="lg:pl-80 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-20 bg-white/85 backdrop-blur-xl border-b border-line px-6 sm:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-2xl border border-line text-ink"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Sovereign Badge */}
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-canvas border border-line text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span className="font-extrabold text-ink">RBI AA Regulated</span>
              <span className="text-line">•</span>
              <span className="text-ink-muted font-semibold">Sovereign Grade</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex relative items-center">
              <Search className="absolute left-3 w-4 h-4 text-ink-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    const q = searchQuery.toLowerCase();
                    if (q.includes("sahara") || q.includes("emi") || q.includes("debt") || q.includes("loan")) setActiveTab("sahara");
                    else if (q.includes("vivek") || q.includes("decision")) setActiveTab("vivek");
                    else if (q.includes("jeevan") || q.includes("sip") || q.includes("wealth")) setActiveTab("jeevanchakra");
                    else if (q.includes("bhasha") || q.includes("voice") || q.includes("hindi")) setActiveTab("bhashasahayak");
                    else if (q.includes("kavach") || q.includes("consent") || q.includes("data")) setActiveTab("consent");
                    else if (q.includes("nyay") || q.includes("audit")) setActiveTab("nyay");
                    else setActiveTab("dashboard");
                    setSearchQuery("");
                  }
                }}
                placeholder="Search schemes, DBT, Kisan loans..."
                className="h-10 pl-9 pr-4 rounded-xl bg-canvas border border-line text-xs text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-azure w-64"
              />
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Vivek Guard Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-canvas px-3 py-1.5 rounded-full border border-line text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
              <span className="font-bold text-ink">Vivek Guard Active</span>
            </div>

            {/* Live Persona Switcher */}
            <div className="flex items-center bg-canvas p-1 rounded-2xl border border-line shadow-sm">
              <span className="text-xs font-bold text-ink-muted px-2.5 hidden md:inline">
                Persona:
              </span>
              <button
                onClick={() => setActivePersona("rahul")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activePersona === "rahul"
                    ? "bg-white text-navy-deep shadow-md font-extrabold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Rahul
              </button>
              <button
                onClick={() => setActivePersona("kamala")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activePersona === "kamala"
                    ? "bg-white text-navy-deep shadow-md font-extrabold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Kamala
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-canvas p-1 rounded-2xl border border-line">
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
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    lang === item.k
                      ? "bg-navy-deep text-white shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <div className="relative" data-notif-panel>
              <button
                onClick={() => {
                  setNotifOpen((v) => !v);
                  if (!notifOpen) setNotifRead(false);
                }}
                className="relative p-2.5 rounded-xl text-ink-muted hover:bg-canvas hover:text-ink transition-colors"
              >
                <Bell className="w-5 h-5" />
                {!notifRead && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vermilion" />}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-line rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-line flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">Notifications</span>
                    <button onClick={() => setNotifOpen(false)} className="text-ink-muted hover:text-ink p-1 rounded-lg hover:bg-canvas">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col divide-y divide-line max-h-72 overflow-y-auto">
                    {[
                      { icon: "🛡️", title: "Vivek Guard blocked a predatory loan offer", time: "2 min ago", color: "text-emerald", nav: "vivek" as WebTab },
                      { icon: "💰", title: "SBI account synced — ₹52,000 salary credited", time: "Today 09:41 AM", color: "text-azure", nav: "dashboard" as WebTab },
                      { icon: "⚠️", title: "EMI of ₹1,200 due on Sept 15 — relief available", time: "Yesterday", color: "text-vermilion", nav: "sahara" as WebTab },
                      { icon: "✅", title: "KYC verified via RBI Account Aggregator", time: "3 days ago", color: "text-emerald", nav: "consent" as WebTab },
                    ].map((n, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveTab(n.nav);
                          setNotifOpen(false);
                          setNotifRead(true);
                        }}
                        className="flex items-start gap-3 px-4 py-3.5 hover:bg-canvas text-left transition-colors w-full"
                      >
                        <span className="text-lg shrink-0">{n.icon}</span>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold ${n.color} leading-snug`}>{n.title}</p>
                          <p className="text-[11px] text-ink-faint mt-0.5">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-line">
                    <button
                      onClick={() => {
                        setNotifRead(true);
                        setNotifOpen(false);
                      }}
                      className="text-xs font-semibold text-azure hover:underline w-full text-center"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Name & Avatar & Logout */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-line">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-ink leading-none">
                  {activePersona === "rahul" ? "Rahul Sharma" : "Kamala Devi"}
                </span>
                <span className="text-[10px] text-ink-muted mt-0.5">
                  {activePersona === "rahul" ? "Tier-2 Salaried" : "Artisan MSME"}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-azure/30 shrink-0">
                <Image
                  src="/portrait-kamala.png"
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link
                href="/login"
                className="text-ink-muted hover:text-vermilion p-2 rounded-xl transition-colors hover:bg-canvas"
                title="Logout / Switch Account"
              >
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Main Module View (Generous desktop padding) */}
        <main className="flex-1 p-6 sm:p-10">
          {activeTab === "dashboard" && (
            <WebDashboard
              lang={lang}
              onNavigateTab={(tab) => setActiveTab(tab as WebTab)}
              onSelectPersona={setActivePersona}
              activePersona={activePersona}
            />
          )}
          {activeTab === "sahara" && (
            <WebSahara lang={lang} activePersona={activePersona} />
          )}
          {activeTab === "vivek" && <WebVivek lang={lang} />}
          {activeTab === "jeevanchakra" && (
            <WebJeevanChakra lang={lang} onOpenNyay={() => setActiveTab("nyay")} />
          )}
          {activeTab === "bhashasahayak" && <WebBhashaSahayak lang={lang} />}
          {activeTab === "consent" && <WebKavach lang={lang} />}
          {activeTab === "nyay" && <WebNyay lang={lang} />}
        </main>
      </div>
    </div>
  );
}
