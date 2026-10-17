import { useEffect, useMemo, useRef, useState } from "react";

import { RoomCard } from "~/components/paint-calculator/room-card";
import { ResultCard } from "~/components/paint-calculator/result-card";
import { SettingsCard } from "~/components/paint-calculator/settings-card";
import { SiteHeader } from "~/components/site-header";
import { calculateJob } from "~/lib/paint/calculate";
import { DEFAULT_SETTINGS, DEFAULTS_LAST_CHECKED } from "~/lib/paint/defaults";
import { DEFAULT_SETTINGS_FIELDS, createRoomFields, readSettings, toRoomInput } from "~/lib/paint/form";
import type { RoomFields, SettingsFields } from "~/lib/paint/form";
import { formatPence } from "~/lib/numbers";
import { formatDays, formatLitres, formatTins, resultSummaryText } from "~/lib/paint/format";
import type { CalculatorSettings, RoomInput } from "~/lib/paint/types";
import { SITE_URL, seo } from "~/seo/meta";
import type { Route } from "./+types/paint-calculator";

// /paint-calculator — cut-order step 1 (CEO decision #1): one room, litres, tins, days and
// "Your price at your day rate". Copy: docs/design/screens.md P2 · SEO: docs/seo/keyword-map.md.

const PAGE_PATH = "/paint-calculator";
const TITLE = "Paint Calculator UK: How Much Paint Do I Need? | PriceBrush";
const DESCRIPTION =
  "Work out litres and tins for walls and ceilings, room by room. Decorators: add your day rate to see days and a rough price, then turn it into a quote.";

export function meta({}: Route.MetaArgs) {
  return seo({
    path: PAGE_PATH,
    title: TITLE,
    description: DESCRIPTION,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "PriceBrush Paint Calculator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: 0, priceCurrency: "GBP" },
        url: SITE_URL + PAGE_PATH,
        inLanguage: "en-GB",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Paint calculator", item: SITE_URL + PAGE_PATH },
        ],
      },
    ],
  });
}

// The worked example on the page is calculated by the same engine (spec §7, test T1), so the
// text and the tool can never disagree.
const WORKED_EXAMPLE_ROOM: RoomInput = {
  id: "worked-example",
  name: "Bedroom",
  lengthMetres: 4,
  widthMetres: 3.5,
  heightMetres: 2.4,
  doorCount: 1,
  windowCount: 1,
  coats: 2,
  includeCeiling: true,
  newPlaster: false,
};
const workedExample = calculateJob([WORKED_EXAMPLE_ROOM], DEFAULT_SETTINGS);

const TOAST_MILLISECONDS = 4000;

export default function PaintCalculator() {
  const [room, setRoom] = useState<RoomFields>(() => createRoomFields("1"));
  const [settingsFields, setSettingsFields] = useState<SettingsFields>(DEFAULT_SETTINGS_FIELDS);
  const [lastValidSettings, setLastValidSettings] = useState<CalculatorSettings>(DEFAULT_SETTINGS);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const settingsReading = useMemo(() => readSettings(settingsFields), [settingsFields]);
  useEffect(() => {
    if (settingsReading.settings) setLastValidSettings(settingsReading.settings);
  }, [settingsReading.settings]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const activeSettings = settingsReading.settings ?? lastValidSettings;
  const result = useMemo(() => calculateJob([toRoomInput(room)], activeSettings), [room, activeSettings]);
  const roomIssues = result.issues.filter((issue) => issue.roomId === room.id);

  const showToast = (message: string) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), TOAST_MILLISECONDS);
  };

  const copyResult = async () => {
    const text = resultSummaryText(result, `${SITE_URL.replace("https://", "")}${PAGE_PATH}`);
    try {
      await navigator.clipboard.writeText(text);
      showToast("Result copied");
    } catch {
      showToast("Couldn't copy — select the result and copy it yourself");
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pt-6 pb-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-h1 font-extrabold text-balance [font-stretch:87.5%]">
            Paint calculator: how much paint do I need?
          </h1>
          <p className="mt-2 text-ink-2">
            Litres and tins for walls and ceilings, room by room. Decorators: add your day rate to see days and your
            price. Free, no sign-up, nothing stored.
          </p>
        </div>

        <div className="mt-6 grid gap-4 desk:grid-cols-[1fr_448px] desk:items-start">
          <form className="grid grid-cols-1 gap-4" onSubmit={(event) => event.preventDefault()} noValidate>
            <RoomCard room={room} roomNumber={1} issues={roomIssues} onChange={setRoom} />
            <SettingsCard fields={settingsFields} errors={settingsReading.errors} onChange={setSettingsFields} />
          </form>
          <div className="desk:sticky desk:top-4">
            <ResultCard
              result={result}
              settings={activeSettings}
              isStale={settingsReading.settings === null}
              onCopy={copyResult}
            />
          </div>
        </div>

        <HowWeWorkItOut />
      </main>

      <div
        role="status"
        className={`fixed inset-x-4 bottom-4 mx-auto max-w-md rounded-md bg-ink px-4 py-3 text-bg transition-opacity motion-reduce:transition-none ${toastMessage ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {toastMessage}
      </div>
    </>
  );
}

function HowWeWorkItOut() {
  const [wallPaint, ceilingPaint] = workedExample.paintGroups;
  const [wallLine, ceilingLine] = workedExample.labourLines;
  const settings = DEFAULT_SETTINGS;

  return (
    <section aria-labelledby="how-heading" className="mt-12 max-w-2xl">
      <h2 id="how-heading" className="font-display text-h2 font-bold [font-stretch:87.5%]">
        How to work out how much paint you need
      </h2>
      <ol className="mt-3 grid list-decimal gap-2 pl-6">
        <li>Walls: 2 × (length + width) × height, for each room.</li>
        <li>
          Take off {settings.doorAreaSquareMetres} m² per door and {settings.windowAreaSquareMetres} m² per window.
        </li>
        <li>Add the ceiling (length × width) if you're painting it.</li>
        <li>New plaster? The mist coat is one extra coat on its own line, plus time for it to dry.</li>
        <li>
          Multiply by the coats and divide by the coverage ({settings.coverageSquareMetresPerLitre} m² per litre is
          typical for emulsion — check your tin).
        </li>
        <li>
          Add {settings.sparePercent}% spare and round up to real tin sizes (10 L, 5 L, 2.5 L), separately for walls,
          ceilings and the mist coat.
        </li>
        <li>
          Days = m² painted ÷ your m² a day, for each line. Your price = days × your day rate + the tins you buy.
        </li>
      </ol>

      <h3 className="mt-6 font-display text-title font-bold [font-stretch:87.5%]">Worked example</h3>
      <p className="mt-2">
        A bedroom 4 × 3.5 m, 2.4 m high, with 1 door and 1 window, 2 coats on the walls and ceiling: walls{" "}
        {wallLine.areaSquareMetres.toFixed(1)} m² and ceiling {ceilingLine.areaSquareMetres.toFixed(1)} m² →{" "}
        {formatLitres(workedExample.totalLitresShown)} → buy {formatTins(wallPaint.tins)} for the walls and{" "}
        {formatTins(ceilingPaint.tins)} for the ceiling. At {settings.squareMetresPerDay} m² a day that's{" "}
        {formatDays(workedExample.labourDays)}, so {formatPence(workedExample.labourPence)} labour at{" "}
        {formatPence(settings.dayRatePence)} a day + {formatPence(workedExample.paintPence)} paint ={" "}
        <strong>{formatPence(workedExample.totalPence)}</strong>.
      </p>
      <p className="mt-2 text-caption text-ink-2">
        No tape measure? A 4 × 4 m room usually needs about 5 litres for two coats on the walls. Day rate, speed and
        paint price are example defaults, not market prices. Defaults last checked: {DEFAULTS_LAST_CHECKED}.
      </p>
    </section>
  );
}
