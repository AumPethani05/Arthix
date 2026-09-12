import Image from "next/image";

export type Lang = "en" | "hi" | "gu";

const langs: { k: Lang; label: string }[] = [
  { k: "en", label: "Eng" },
  { k: "hi", label: "हिंदी" },
  { k: "gu", label: "ગુજ" },
];

export function TopBar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-line">
      <Image
        src="/arthix-logo.svg"
        alt="Arthix — Bharat Intelligence"
        width={96}
        height={29}
        priority
      />
      <div className="flex bg-canvas rounded-lg p-0.5">
        {langs.map((l) => {
          const active = lang === l.k;
          return (
            <button
              key={l.k}
              onClick={() => setLang(l.k)}
              className={`text-[11px] px-2 py-1 rounded-md ${
                active ? "bg-white text-navy font-bold" : "text-ink-faint font-medium"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
