import { MeasureField } from "~/components/form-fields";
import type { SettingsFieldName, SettingsFields } from "~/lib/paint/form";

// "Your day rate" card with the collapsed "Paint and spare" settings (screens.md P2).

interface SettingsCardProps {
  fields: SettingsFields;
  errors: Partial<Record<SettingsFieldName, string>>;
  onChange: (fields: SettingsFields) => void;
}

export function SettingsCard({ fields, errors, onChange }: SettingsCardProps) {
  const field = (name: SettingsFieldName, label: string, unit: string, unitPosition: "prefix" | "suffix" = "suffix") => (
    <MeasureField
      id={`setting-${name}`}
      label={label}
      value={fields[name]}
      onChange={(value) => onChange({ ...fields, [name]: value })}
      unit={unit}
      unitPosition={unitPosition}
      hasError={Boolean(errors[name])}
      describedBy={errors[name] ? `setting-${name}-error` : undefined}
    />
  );
  const errorMessages = (Object.entries(errors) as Array<[SettingsFieldName, string]>).map(([name, message]) => (
    <p key={name} id={`setting-${name}-error`} role="alert" className="mt-2 font-semibold text-danger-fg">
      {message}
    </p>
  ));
  const hasPaintError = Boolean(errors.coverageSquareMetresPerLitre || errors.sparePercent || errors.paintPoundsPerLitre);

  return (
    <section aria-labelledby="settings-heading" className="rounded-lg border border-line bg-surface p-4">
      <h2 id="settings-heading" className="font-display text-title font-bold [font-stretch:87.5%]">
        Your day rate
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {field("dayRatePounds", "Day rate", "£", "prefix")}
        {field("squareMetresPerDay", "m² a day", "m²")}
      </div>
      <p className="mt-2 text-caption text-ink-2">
        Each coat counts towards your m² a day. 40 is our starting guess — change it to yours.
      </p>

      <details className="group mt-3 border-t border-line pt-3" open={hasPaintError || undefined}>
        <summary className="flex min-h-12 cursor-pointer items-center justify-between rounded-md font-semibold">
          Paint and spare
          <svg viewBox="0 0 24 24" className="size-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {field("coverageSquareMetresPerLitre", "Coverage", "m²/L")}
          {field("sparePercent", "Spare", "%")}
          {field("paintPoundsPerLitre", "Paint per litre", "£", "prefix")}
        </div>
        <p className="mt-2 text-caption text-ink-2">Coverage is on the tin — use that if it's different.</p>
      </details>
      {errorMessages}
    </section>
  );
}
