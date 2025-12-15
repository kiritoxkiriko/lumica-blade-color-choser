"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import lumicaColors from "../data/lumica_colors.json";

type PaletteColor = {
  name: string;
  value: string;
  hsv: [number, number, number];
  index: number;
  mode: "standard" | "extended";
};

type ParsedHex = { hex: string; rgb: [number, number, number] };
type Locale = "en" | "zh" | "ja";

type Copy = {
  languageLabel: string;
  heroBadge: string;
  heroSource: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroLinkText: string;
  presetsHighlight: string;
  comboHighlight: string;
  matcherHighlight: string;
  inputTitle: string;
  inputSubtitle: string;
  hexLabel: string;
  hexPlaceholder: string;
  matchButton: string;
  currentPreview: string;
  livePreview: string;
  closestTitle: string;
  standardLabel: string;
  extendedLabel: string;
  hsvDistance: string;
  inputCardLabel: string;
  matchedCardLabel: string;
  officialSprite: string;
  indexLabel: string;
  standardModeLabel: string;
  extendedModeLabel: string;
  allColorsTitle: string;
  allColorsSubtitle: string;
  invalidHex: string;
};

const translations: Record<Locale, Copy> = {
  en: {
    languageLabel: "Language",
    heroBadge: "Product intro",
    heroSource: "Based on Lumica DAISENKO Blade Charge details from penlightstore.com",
    heroTitle: "Rechargeable Lumica DAISENKO Blade Charge with 24 official colors",
    heroSubtitle: "Color Selector & Matcher",
    heroDescription:
      "A USB-rechargeable glow stick that ships with 12 standard colors and allows 12 additional modes. Use the picker below to match any hex color to the closest official hue, and preview the exact slot from the official color sheet.",
    heroLinkText: "View product page",
    presetsHighlight: "24 presets",
    comboHighlight: "Standard 12 + Extended 12",
    matcherHighlight: "Hex-to-official matcher",
    inputTitle: "Input color",
    inputSubtitle: "Supports # prefix or plain 6-digit hex with live preview.",
    hexLabel: "Hex",
    hexPlaceholder: "#d51519",
    matchButton: "Match",
    currentPreview: "Current preview",
    livePreview: "Live preview of input",
    closestTitle: "Closest official color",
    standardLabel: "Standard",
    extendedLabel: "Extended",
    hsvDistance: "HSV distance",
    inputCardLabel: "Input",
    matchedCardLabel: "Matched",
    officialSprite: "Official sprite",
    indexLabel: "Index",
    standardModeLabel: "Standard Mode",
    extendedModeLabel: "Extended Mode",
    allColorsTitle: "All 24 colors",
    allColorsSubtitle: "Click to jump to a color",
    invalidHex: "Please enter a 6-digit hex color, e.g. #d51519.",
  },
  zh: {
    languageLabel: "语言",
    heroBadge: "产品介绍",
    heroSource: "参考 penlightstore.com 的 Lumica DAISENKO Blade Charge 信息",
    heroTitle: "24 种官方配色的可充电 Lumica DAISENKO Blade Charge",
    heroSubtitle: "颜色选择与匹配",
    heroDescription:
      "一支 USB 充电的荧光棒，自带 12 种标准色并提供额外 12 种扩展模式。使用下面的选择器，将任意 Hex 与最接近的官方颜色匹配，并预览官方色卡中的对应切片。",
    heroLinkText: "查看商品页面",
    presetsHighlight: "24 预设",
    comboHighlight: "标准 12 + 扩展 12",
    matcherHighlight: "Hex 匹配官方色",
    inputTitle: "输入颜色",
    inputSubtitle: "支持 # 前缀或 6 位十六进制，实时预览。",
    hexLabel: "Hex",
    hexPlaceholder: "#d51519",
    matchButton: "匹配",
    currentPreview: "当前预览",
    livePreview: "输入实时预览",
    closestTitle: "最接近的官方颜色",
    standardLabel: "标准",
    extendedLabel: "扩展",
    hsvDistance: "HSV 距离",
    inputCardLabel: "输入",
    matchedCardLabel: "匹配结果",
    officialSprite: "官方切片",
    indexLabel: "索引",
    standardModeLabel: "标准模式",
    extendedModeLabel: "扩展模式",
    allColorsTitle: "全部 24 种颜色",
    allColorsSubtitle: "点击跳转到对应颜色",
    invalidHex: "请输入 6 位十六进制颜色，例如 #d51519。",
  },
  ja: {
    languageLabel: "言語",
    heroBadge: "製品紹介",
    heroSource: "penlightstore.com の Lumica DAISENKO Blade Charge 情報を基にしています",
    heroTitle: "24色の公式カラーを備えた充電式 Lumica DAISENKO Blade Charge",
    heroSubtitle: "カラーセレクター & マッチャー",
    heroDescription:
      "USB 充電式のペンライト。基本カラー12色＋カスタム選択できる追加カラー12色、最大24色カラーチェンジ！下のピッカーで任意の Hex を最も近い公式色にマッチさせ、公式シートのスプライトを確認できます。",
    heroLinkText: "商品ページを見る",
    presetsHighlight: "24 プリセット",
    comboHighlight: "基本 12 + 追加 12",
    matcherHighlight: "Hex から公式色へマッチ",
    inputTitle: "入力カラー",
    inputSubtitle: "# 付き/6 桁 Hex に対応、ライブプレビュー付き。",
    hexLabel: "Hex",
    hexPlaceholder: "#d51519",
    matchButton: "マッチ",
    currentPreview: "現在のプレビュー",
    livePreview: "入力のライブプレビュー",
    closestTitle: "最も近い公式カラー",
    standardLabel: "基本",
    extendedLabel: "追加",
    hsvDistance: "HSV 距離",
    inputCardLabel: "入力",
    matchedCardLabel: "マッチ結果",
    officialSprite: "公式スプライト",
    indexLabel: "インデックス",
    standardModeLabel: "基本",
    extendedModeLabel: "追加",
    allColorsTitle: "全 24 色",
    allColorsSubtitle: "クリックでその色へ移動",
    invalidHex: "6 桁の 16 進カラーを入力してください（例: #d51519）。",
  },
};

const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
};

const toTitle = (text: string) =>
  text
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const colorNames: Record<Locale, Record<string, string>> = {
  en: {
    sakura_pink: "Sakura Pink",
    passion_pink: "Passion Pink",
    pastel_blue: "Pastel Blue",
    emerald_green: "Emerald Green",
    lime_green: "Lime Green",
    yellow_green: "Yellow Green",
    light_blue: "Light Blue",
    light_green: "Light Green",
    apple_green: "Apple Green",
    hiyoko_yellow: "Hiyoko Yellow",
    yamabuki_orange: "Yamabuki Orange",
    light_orange: "Light Orange",
    hot_pink: "Hot Pink",
    ice_blue: "Ice Blue",
  },
  zh: {
    red: "正红",
    white: "纯白",
    sakura_pink: "樱花粉",
    pink: "粉色",
    passion_pink: "热情粉",
    purple: "紫色",
    blue: "蓝色",
    pastel_blue: "粉蓝",
    emerald_green: "祖母绿",
    green: "绿色",
    yellow: "黄色",
    orange: "橙色",
    lime_green: "酸橙绿",
    yellow_green: "黄绿色",
    light_blue: "浅蓝",
    light_green: "浅绿",
    apple_green: "苹果绿",
    hiyoko_yellow: "小鸡黄",
    yamabuki_orange: "山吹橙",
    light_orange: "浅橙",
    hot_pink: "亮粉",
    peach: "桃色",
    violet: "紫罗兰",
    ice_blue: "冰蓝",
  },
  ja: {
    red: "レッド",
    white: "ホワイト",
    sakura_pink: "さくらピンク",
    pink: "ピンク",
    passion_pink: "パッションピンク",
    purple: "バイオレット",
    blue: "ブルー",
    pastel_blue: "パステルブルー",
    emerald_green: "エメラルドグリーン",
    green: "グリーン",
    yellow: "イエロー",
    orange: "オレンジ",
    lime_green: "ライムグリーン",
    yellow_green: "イエローグリーン",
    light_blue: "ライトブルー",
    light_green: "ライトグリーン",
    apple_green: "アップルグリーン",
    hiyoko_yellow: "ひよこイエロー",
    yamabuki_orange: "やまぶきオレンジ",
    light_orange: "ライトオレンジ",
    hot_pink: "ピンク",
    peach: "ホットピーチ",
    violet: "パープル",
    ice_blue: "アイスブルー",
  },
};

const getColorLabel = (name: string, currentLocale: Locale) =>
  colorNames[currentLocale]?.[name] ?? toTitle(name);

const parseHex = (input: string): ParsedHex | null => {
  if (!input) return null;
  const cleaned = input.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  const hex = `#${cleaned.toLowerCase()}`;
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return { hex, rgb: [r, g, b] };
};

const rgbToHsv = ([r, g, b]: [number, number, number]): [number, number, number] => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6;
    else if (max === gNorm) h = (bNorm - rNorm) / delta + 2;
    else h = (rNorm - gNorm) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return [h, s, v];
};

const hsvDistance = (a: [number, number, number], b: [number, number, number]) => {
  const hueDiff = Math.min(Math.abs(a[0] - b[0]), 360 - Math.abs(a[0] - b[0])) / 360;
  const satDiff = a[1] - b[1];
  const valDiff = a[2] - b[2];
  return hueDiff * hueDiff + satDiff * satDiff + valDiff * valDiff;
};

const palette: PaletteColor[] = lumicaColors.map((color, index) => {
  const parsed = parseHex(color.value);
  const rgb = parsed?.rgb ?? [0, 0, 0];
  return {
    ...color,
    value: color.value.toLowerCase(),
    hsv: rgbToHsv(rgb),
    index,
    mode: index < 12 ? "standard" : "extended",
  };
});

const findClosestColor = (inputHex: string) => {
  const parsed = parseHex(inputHex);
  if (!parsed) return null;
  const hsv = rgbToHsv(parsed.rgb);

  return palette.reduce(
    (best, color) => {
      const distance = hsvDistance(hsv, color.hsv);
      if (distance < best.distance) {
        return { color, distance };
      }
      return best;
    },
    { color: palette[0], distance: Number.POSITIVE_INFINITY }
  );
};

const getSpritePosition = (index: number) => {
  const columns = 6;
  const rows = 4;
  const col = index % columns;
  const row = Math.floor(index / columns);
  const x = col * (100 / (columns - 1)); // 0,20,40,60,80,100
  const y = row * (100 / (rows - 1)); // 0,33.33,66.67,100
  return `${x}% ${y}%`;
};

const getSpriteStyle = (index: number) => ({
  backgroundImage: "url(/lumica_colors.jpg)",
  backgroundSize: "600% 400%",
  backgroundPosition: getSpritePosition(index),
  backgroundRepeat: "no-repeat",
});

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [input, setInput] = useState("#d51519");
  const [submittedHex, setSubmittedHex] = useState("#d51519");
  const [error, setError] = useState<string | null>(null);
  const t = translations[locale];

  const result = useMemo(() => findClosestColor(submittedHex), [submittedHex]);
  const preview = parseHex(input)?.hex ?? submittedHex;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseHex(input);
    if (!parsed) {
      setError(t.invalidHex);
      return;
    }
    setError(null);
    setSubmittedHex(parsed.hex);
  };

  const matched = result?.color ?? palette[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff8e1] via-white to-[#ffe7a3] text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#fabe01]/30 bg-[#fabe01]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5a00] shadow-sm">
              Lumica DAISENKO Blade Charge
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-600" htmlFor="locale">
                {t.languageLabel}
              </label>
              <select
                id="locale"
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition hover:border-[#fabe01]/60 focus:border-[#fabe01] focus:ring-2 focus:ring-[#fabe01]/40"
              >
                {Object.entries(localeLabels).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className="text-xs text-slate-500">{t.heroSource}</span>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t.heroSubtitle}</h1>
          <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{t.heroDescription}
            <a
              href="https://penlightstore.com/products/daisenko-blade-charge"
              className="ml-2 font-semibold text-[#b37a00] underline decoration-[#fabe01]/70 underline-offset-4 hover:text-[#7a5a00]"
              target="_blank"
              rel="noreferrer"
            >
              {t.heroLinkText}
            </a>
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#fabe01]/20 px-3 py-1 text-xs font-semibold text-[#7a5a00]">
                {t.heroBadge}
              </span>
              <span className="text-xs text-slate-500">
                {t.heroSource}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {t.heroTitle}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {t.heroDescription}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="rounded-full border border-[#fabe01]/50 bg-[#fabe01]/15 px-3 py-1 font-semibold">
                {t.presetsHighlight}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                {t.comboHighlight}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                {t.matcherHighlight}
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
              <Image
                src="/lumica_blade_charge.webp"
                alt="Lumica DAISENKO Blade Charge main product"
                width={1000}
                height={1000}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
              <Image
                src="/lumica_blade_charge_colors.jpg"
                alt="Lumica DAISENKO Blade Charge official color lineup"
                width={1000}
                height={1000}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </section>

        <section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex h-full flex-col gap-4">
            <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-lg font-semibold">{t.inputTitle}</p>
                <p className="text-sm text-slate-500">{t.inputSubtitle}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="text-sm text-slate-700">{t.hexLabel}</label>
              <div className="mt-2 flex gap-3">
                <input
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                      if (error && parseHex(event.target.value)) {
                        setError(null);
                      }
                  }}
                  className="w-full max-w-xs sm:max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#fabe01] focus:ring-2 focus:ring-[#fabe01]/40"
                  placeholder={t.hexPlaceholder}
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#fabe01] px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#ffd24d] active:translate-y-[1px]"
                >
                  {t.matchButton}
                </button>
              </div>
              {error ? (
                <p className="mt-2 text-sm text-rose-600">{error}</p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">
                  {t.currentPreview}: <span className="font-mono">{preview}</span>
                </p>
              )}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-full border border-slate-200 shadow-inner shadow-black/10"
                  style={{ background: preview }}
                  aria-label="color preview"
                />
                <p className="text-sm text-slate-700">{t.livePreview}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg border border-slate-200 shadow-inner shadow-black/10" style={{ background: matched.value }} />
                <div>
                  <p className="text-sm text-slate-700">{t.closestTitle}</p>
                  <p className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                    <span>
                      {getColorLabel(matched.name, locale)} · <span className="font-mono uppercase">{matched.value}</span>
                    </span>
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-semibold leading-none ${
                        matched.mode === "standard"
                          ? "bg-[#fabe01]/25 text-[#7a5a00] border border-[#fabe01]/40"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {matched.mode === "standard" ? t.standardLabel : t.extendedLabel}
                    </span>
                    {result ? (
                      <span className="rounded-md bg-[#fabe01]/20 px-2.5 py-1 text-[10px] font-semibold leading-none text-[#7a5a00]">
                          {t.hsvDistance} {result.distance.toFixed(4)}
                        </span>
                      ) : null}
                  </p>
                </div>
              </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs text-slate-500">{t.inputCardLabel}</p>
                    <p className="text-base font-semibold">{preview}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs text-slate-500">{t.matchedCardLabel}</p>
                    <p className="text-base font-semibold">{matched.value}</p>
                  </div>
                </div>
              </div>
            </form>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-semibold text-slate-900">
                  {t.officialSprite}
                </p>
              </div>
              <div className="mt-4">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                  <div
                    className="mx-auto w-full max-w-md rounded-lg"
                    style={getSpriteStyle(matched.index)}
                    aria-label={`Color ${matched.name}`}
                  >
                    <div className="aspect-[9/16]" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {t.indexLabel} {matched.index + 1} ·{" "}
                  {matched.mode === "standard" ? t.standardModeLabel : t.extendedModeLabel} ·{" "}
                  {getColorLabel(matched.name, locale)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{t.allColorsTitle}</p>
              <p className="text-xs text-slate-500">{t.allColorsSubtitle}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {palette.map((color) => {
                const active = color.index === matched.index;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      setInput(color.value);
                      setSubmittedHex(color.value);
                      setError(null);
                    }}
                    className={`group relative overflow-hidden rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-[#fabe01] bg-[#fabe01]/15 shadow-[0_8px_30px_-12px_rgba(250,190,1,0.6)]"
                        : "border-slate-200 bg-white hover:border-[#fabe01]/60 hover:bg-[#fabe01]/10"
                    }`}
                  >
                    <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2">
                      <span
                        className="aspect-square w-12 shrink-0 rounded-lg border border-slate-200 shadow-inner shadow-black/10"
                        style={{ background: color.value }}
                      />
                      <p
                        className="text-sm font-semibold leading-tight text-slate-900"
                        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", minHeight: "2.2rem" }}
                      >
                        {getColorLabel(color.name, locale)}
                      </p>
                      <span
                        className={`w-fit rounded-md border px-1.5 py-[2px] text-[9px] font-semibold leading-tight shadow-sm ${
                          color.mode === "standard"
                            ? "bg-[#fabe01]/25 text-[#7a5a00] border-[#fabe01]/40"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {color.mode === "standard" ? t.standardLabel : t.extendedLabel}
                      </span>
                      <p className="font-mono text-xs uppercase text-slate-600">{color.value}</p>
                    </div>
                    {active ? (
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#fabe01]/60" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
