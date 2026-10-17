import { formatPence } from "~/lib/numbers";
import {
  formatDays,
  formatLitres,
  labourLineDetail,
  labourLineTitle,
  paintLineDetail,
  paintShoppingList,
} from "~/lib/paint/format";
import type { CalculationResult, CalculatorSettings } from "~/lib/paint/types";

// Live result (screens.md P2 "Output"): litres, tins, the working, time on the job and the price.
// A stale result keeps full text contrast (design-system §9: disabled never drops below 4.5:1).

interface ResultCardProps {
  result: CalculationResult;
  settings: CalculatorSettings;
  /** True while a setting is invalid: the last valid result stays, greyed out. */
  isStale: boolean;
  onCopy: () => void;
}

export function ResultCard({ result, settings, isStale, onCopy }: ResultCardProps) {
  const isEmpty = result.status === "empty";
  const hasMistCoat = result.labourLines.some((line) => line.surface === "mistCoat");

  return (
    <section
      aria-labelledby="result-heading"
      className={`rounded-lg border-2 bg-surface p-4 ${isStale ? "border-dashed border-line-strong" : "border-ink"}`}
    >
      {/* One short announcement per change, instead of reading the whole card on every keystroke. */}
      <p className="sr-only" aria-live="polite">
        {isEmpty ? "" : `${formatLitres(result.totalLitresShown)}. Your price ${formatPence(result.totalPence)}.`}
      </p>
      {isStale && <p className="mb-3 font-semibold text-danger-fg">Fix the settings above to update the result</p>}
      <h2 id="result-heading" className="text-caption font-semibold text-ink-2">
        You need
      </h2>
      {isEmpty ? (
        <p className="mt-1 text-body-lg font-semibold">Enter a room size to see litres</p>
      ) : (
        <>
          <p className="font-display text-money-xl font-extrabold tabular-nums [font-stretch:87.5%]">
            {formatLitres(result.totalLitresShown)}
          </p>
          <p className="mt-0.5 font-semibold">Buy: {paintShoppingList(result.paintGroups)}</p>

          <h3 className="mt-4 text-caption font-semibold text-ink-2">The working</h3>
          <ul className="mt-1 divide-y divide-line border-y border-line">
            {result.labourLines.map((line) => (
              <WorkingRow
                key={`${line.roomId}-${line.surface}`}
                title={labourLineTitle(line)}
                detail={labourLineDetail(line)}
                amount={formatPence(line.amountPence)}
              />
            ))}
            <WorkingRow
              title="Paint"
              detail={paintLineDetail(result.paintGroups, settings.paintPencePerLitre)}
              amount={formatPence(result.paintPence)}
            />
          </ul>

          <dl className="mt-3 flex items-baseline justify-between gap-3">
            <dt className="text-ink-2">Time on the job</dt>
            <dd className="font-semibold tabular-nums">
              About {formatDays(result.timeOnJobDays)}
              {hasMistCoat ? ", incl. drying" : ""}
            </dd>
          </dl>

          <div className="mt-3 rounded-md bg-surface-2 p-3">
            <p className="text-caption font-semibold">Your price at your day rate</p>
            <p className="font-display text-money-xl font-extrabold tabular-nums [font-stretch:87.5%]">
              {formatPence(result.totalPence)}
            </p>
            <p className="text-caption text-ink-2">
              Labour {formatPence(result.labourPence)} ({formatDays(result.labourDays)} at{" "}
              {formatPence(settings.dayRatePence)} a day) + paint {formatPence(result.paintPence)}
            </p>
            <p className="mt-1 text-caption text-ink-2">Check prep, access and woodwork before you quote.</p>
          </div>

          <button
            type="button"
            onClick={onCopy}
            className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-2 border-line-strong bg-surface font-semibold hover:bg-surface-2"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy result
          </button>
        </>
      )}
    </section>
  );
}

function WorkingRow({ title, detail, amount }: { title: string; detail: string; amount: string }) {
  return (
    <li className="flex items-start justify-between gap-3 py-2.5">
      <span>
        <strong className="block font-semibold">{title}</strong>
        <span className="block text-caption text-ink-2">{detail}</span>
      </span>
      <b className="shrink-0 tabular-nums">{amount}</b>
    </li>
  );
}
