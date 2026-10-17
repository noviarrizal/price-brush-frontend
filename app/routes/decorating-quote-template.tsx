import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

import { PrimaryButton, SecondaryButton } from "~/components/buttons";
import { ChoiceGroup, SwitchField, TextAreaField, TextField } from "~/components/form-fields";
import { LineItems } from "~/components/quote-template/line-items";
import { QuoteTemplateGuide } from "~/components/quote-template/quote-template-guide";
import { SiteHeader } from "~/components/site-header";
import { formatPence } from "~/lib/numbers";
import { formatUkDate, isIsoDate, todayIsoDate, addDaysToIsoDate } from "~/lib/quote/dates";
import {
  VALID_FOR_DAY_OPTIONS,
  VAT_RATE_PERCENT,
  buildQuoteDocument,
  createEmptyDraft,
  quoteFileName,
  type MaterialsBasis,
  type QuoteDraft,
} from "~/lib/quote/quote";
import { clearQuoteDraft, loadQuoteDraft, saveQuoteDraft } from "~/lib/quote/storage";
import { SITE_URL, seo } from "~/seo/meta";
import type { Route } from "./+types/decorating-quote-template";

// /decorating-quote-template — cut-order step 2 (CEO decision #1): free quote form → PDF made in
// the browser. Copy: docs/design/screens.md P3/P4 · SEO: docs/seo/briefs/decorating-quote-template.md.
// Never uses the word "invoice" in the title or H1 (cannibalisation rule).

const PAGE_PATH = "/decorating-quote-template";
const TITLE = "Free Painting & Decorating Quote Template UK | PriceBrush";
const DESCRIPTION =
  "Fill in a UK painting and decorating quote online and download a clean PDF. VAT optional, £ and UK dates, worked example. No sign-up, nothing stored.";

export function meta({}: Route.MetaArgs) {
  return seo({
    path: PAGE_PATH,
    title: TITLE,
    description: DESCRIPTION,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "PriceBrush Free Decorating Quote Template",
        applicationCategory: "BusinessApplication",
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
          { "@type": "ListItem", position: 2, name: "Decorating quote template", item: SITE_URL + PAGE_PATH },
        ],
      },
    ],
  });
}

const AUTOSAVE_DELAY_MILLISECONDS = 400;
const TOAST_MILLISECONDS = 4000;
const UNDO_TOAST_MILLISECONDS = 6000;

const MATERIALS_OPTIONS: Record<MaterialsBasis, string> = {
  supplyAndApply: "Supply and apply",
  labourOnly: "Labour only",
};

interface ToastState {
  message: string;
  undo?: () => void;
}

export default function DecoratingQuoteTemplate() {
  const [draft, setDraft] = useState<QuoteDraft>(createEmptyDraft);
  // Saved drafts and today's date only exist in the browser, so they are read after hydration
  // (the prerendered HTML must not bake in the build date).
  const [hasRestored, setHasRestored] = useState(false);
  const [isMakingPdf, setIsMakingPdf] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lineCounter = useRef(1);

  useEffect(() => {
    const savedDraft = loadQuoteDraft(window.localStorage);
    const startingDraft = savedDraft ?? createEmptyDraft();
    setDraft(isIsoDate(startingDraft.quoteDate) ? startingDraft : { ...startingDraft, quoteDate: todayIsoDate() });
    lineCounter.current = startingDraft.lines.length + 1;
    setHasRestored(true);
  }, []);

  useEffect(() => {
    if (!hasRestored) return;
    const timer = setTimeout(() => saveQuoteDraft(window.localStorage, draft), AUTOSAVE_DELAY_MILLISECONDS);
    return () => clearTimeout(timer);
  }, [draft, hasRestored]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // The pinned "Download PDF" bar covers the bottom of the screen, so tell the browser to keep
  // focused fields and scrolled-to elements above it (WCAG 2.2 "Focus Not Obscured").
  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.scrollPaddingBottom = "14rem";
    return () => {
      rootStyle.scrollPaddingBottom = "";
    };
  }, []);

  const quoteCheck = useMemo(() => buildQuoteDocument(draft), [draft]);
  const validUntil = isIsoDate(draft.quoteDate) ? formatUkDate(addDaysToIsoDate(draft.quoteDate, draft.validForDays)) : null;

  const showToast = (nextToast: ToastState) => {
    setToast(nextToast);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), nextToast.undo ? UNDO_TOAST_MILLISECONDS : TOAST_MILLISECONDS);
  };

  const createLineId = () => {
    lineCounter.current += 1;
    return `line-${lineCounter.current}-${Math.random().toString(36).slice(2, 7)}`;
  };

  const updateDraft = (changes: Partial<QuoteDraft>) => setDraft((current) => ({ ...current, ...changes }));

  const clearForm = () => {
    const previousDraft = draft;
    clearQuoteDraft(window.localStorage);
    setDraft({ ...createEmptyDraft(), quoteDate: todayIsoDate(), lines: [{ id: createLineId(), description: "", detail: "", amount: "" }] });
    setHasDownloaded(false);
    showToast({ message: "Form cleared", undo: () => setDraft(previousDraft) });
  };

  const downloadPdf = async () => {
    if (!quoteCheck.document) return;
    setIsMakingPdf(true);
    try {
      // react-pdf is large, so it only loads when someone actually asks for a PDF.
      const { renderQuotePdf } = await import("~/components/quote-template/quote-pdf");
      const pdfBlob = await renderQuotePdf(quoteCheck.document);
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = quoteFileName(quoteCheck.document);
      downloadLink.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 60_000);
      setHasDownloaded(true);
      showToast({ message: "PDF downloaded." });
    } catch {
      showToast({ message: "Couldn't make the PDF. Check your signal the first time, then try again." });
    } finally {
      setIsMakingPdf(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 pt-4 pb-56">
        <nav aria-label="Breadcrumb" className="text-caption text-ink-2">
          <ol className="flex gap-1.5">
            <li>
              <Link to="/" className="underline">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Quote template</li>
          </ol>
        </nav>
        <h1 className="mt-2 font-display text-h1 font-extrabold text-balance [font-stretch:87.5%]">
          Free painting and decorating quote template (UK)
        </h1>
        <p className="mt-2 text-ink-2">
          Fill in the form, download a professional PDF and send it to your client today. Built for UK painters and
          decorators: £, VAT only if you're registered, UK dates. No sign-up, and nothing you type leaves your device.
        </p>
        <p className="mt-2">
          <Link to="/paint-calculator" className="font-semibold underline">Work out the paint first</Link>
        </p>

        <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(event) => event.preventDefault()} noValidate>
          <FormSection title="Your business">
            <TextField id="business-name" label="Business or trading name" autoComplete="organization" value={draft.business.name} onChange={(value) => updateDraft({ business: { ...draft.business, name: value } })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField id="business-phone" label="Phone" type="tel" autoComplete="tel" value={draft.business.phone} onChange={(value) => updateDraft({ business: { ...draft.business, phone: value } })} />
              <TextField id="business-email" label="Email" type="email" autoComplete="email" value={draft.business.email} onChange={(value) => updateDraft({ business: { ...draft.business, email: value } })} />
            </div>
            <TextField id="business-address" label="Address (optional)" autoComplete="street-address" value={draft.business.address} onChange={(value) => updateDraft({ business: { ...draft.business, address: value } })} />
          </FormSection>

          <FormSection title="Client">
            <TextField id="client-name" label="Client name" placeholder="e.g. Mrs Patel" value={draft.client.name} onChange={(value) => updateDraft({ client: { ...draft.client, name: value } })} />
            <TextField id="client-address" label="Job address" value={draft.client.jobAddress} onChange={(value) => updateDraft({ client: { ...draft.client, jobAddress: value } })} />
          </FormSection>

          <FormSection title="Quote details">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField id="quote-number" label="Quote number" value={draft.quoteNumber} onChange={(value) => updateDraft({ quoteNumber: value })} />
              <TextField id="quote-date" label="Date" type="date" value={draft.quoteDate} onChange={(value) => updateDraft({ quoteDate: value })} />
            </div>
            <ChoiceGroup
              name="valid-for"
              label="Valid for (days)"
              options={VALID_FOR_DAY_OPTIONS}
              value={draft.validForDays}
              onChange={(value) => updateDraft({ validForDays: value })}
            />
            {validUntil && <p className="text-ink-2">Valid until {validUntil}</p>}
          </FormSection>

          <FormSection title="The work">
            <LineItems
              lines={draft.lines}
              lineIssues={quoteCheck.lineIssues}
              onChange={(lines) => updateDraft({ lines })}
              createLineId={createLineId}
              onLineRemoved={(description) => showToast({ message: `${description} removed` })}
            />
            <fieldset className="mt-2">
              <legend className="mb-1.5 font-semibold">Paint and materials</legend>
              <div className="grid grid-cols-2 overflow-hidden rounded-md border-2 border-line-strong bg-surface">
                {(Object.keys(MATERIALS_OPTIONS) as MaterialsBasis[]).map((basis) => (
                  <label
                    key={basis}
                    className="relative grid min-h-12 cursor-pointer place-items-center px-2 text-center font-semibold not-last:border-r-2 not-last:border-line-strong has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-[3px] has-focus-visible:-outline-offset-4 has-focus-visible:outline-focus"
                  >
                    <input
                      type="radio"
                      name="materials-basis"
                      className="sr-only"
                      checked={draft.materialsBasis === basis}
                      onChange={() => updateDraft({ materialsBasis: basis })}
                    />
                    {MATERIALS_OPTIONS[basis]}
                  </label>
                ))}
              </div>
            </fieldset>
            <SwitchField
              id="vat-registered"
              label="I'm VAT registered"
              hint={`Adds VAT at ${VAT_RATE_PERCENT}% and your VAT number`}
              checked={draft.vatRegistered}
              onChange={(checked) => updateDraft({ vatRegistered: checked })}
            />
            {draft.vatRegistered && (
              <TextField id="vat-number" label="VAT number" placeholder="e.g. GB123456789" value={draft.vatNumber} onChange={(value) => updateDraft({ vatNumber: value })} />
            )}
            <dl className="grid gap-1 border-t border-line pt-3">
              {draft.vatRegistered && (
                <>
                  <TotalRow label="Subtotal" amountPence={quoteCheck.totals.subtotalPence} />
                  <TotalRow label={`VAT ${VAT_RATE_PERCENT}%`} amountPence={quoteCheck.totals.vatPence} />
                </>
              )}
              <TotalRow label="Total" amountPence={quoteCheck.totals.totalPence} isGrandTotal />
            </dl>
          </FormSection>

          <FormSection title="Notes">
            <TextAreaField
              id="quote-notes"
              label="Notes and terms (optional)"
              placeholder={"e.g. 30% deposit on acceptance, balance on completion.\nFurniture moved and floors covered by us.\nPrices are fixed unless the agreed work changes."}
              hint="Deposit, payment terms, what's included or not. The PDF also says whether paint is included and when the quote runs out."
              value={draft.notes}
              onChange={(value) => updateDraft({ notes: value })}
            />
          </FormSection>

          <div className="flex justify-end">
            <SecondaryButton onClick={clearForm}>Clear form</SecondaryButton>
          </div>
        </form>

        {hasDownloaded && (
          <section aria-labelledby="next-heading" className="mt-6 rounded-lg bg-brand p-4 text-on-brand">
            <h2 id="next-heading" className="font-display text-title font-bold [font-stretch:87.5%]">
              Pricing the next job?
            </h2>
            <p className="mt-1 text-on-brand-2">
              Work out coats, litres, days and labour from your day rate, then bring it back here.
            </p>
            <Link
              to="/paint-calculator"
              className="mt-3 flex min-h-12 items-center justify-center rounded-md border-2 border-on-brand font-semibold text-on-brand hover:bg-on-brand/10"
            >
              Price a room free
            </Link>
          </section>
        )}

        <QuoteTemplateGuide />
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-bg/95 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-sheet backdrop-blur">
        <div className="mx-auto max-w-2xl">
          {toast && (
            <div role="status" className="mb-3 flex min-h-12 items-center justify-between gap-3 rounded-md bg-ink px-4 py-2 text-bg">
              <span>{toast.message}</span>
              {toast.undo && (
                <button
                  type="button"
                  className="min-h-12 px-2 font-semibold underline underline-offset-2"
                  onClick={() => {
                    toast.undo?.();
                    setToast(null);
                  }}
                >
                  Undo
                </button>
              )}
            </div>
          )}
          <p className="mb-2 text-center text-caption text-ink-2">
            Nothing you type here leaves your phone. The PDF has a small "Made with PriceBrush" mark.
          </p>
          <PrimaryButton
            onClick={downloadPdf}
            disabledReason={hasRestored ? quoteCheck.blockedReason : "Loading…"}
            isBusy={isMakingPdf}
            busyLabel="Making your PDF…"
          >
            <DownloadIcon />
            Download PDF
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  const headingId = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <section aria-labelledby={headingId} className="grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface p-4">
      <h2 id={headingId} className="font-display text-title font-bold [font-stretch:87.5%]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TotalRow({ label, amountPence, isGrandTotal = false }: { label: string; amountPence: number; isGrandTotal?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between ${isGrandTotal ? "pt-1" : ""}`}>
      <dt className={isGrandTotal ? "font-bold" : "text-ink-2"}>{label}</dt>
      <dd className={`tabular-nums ${isGrandTotal ? "font-display text-money-xl font-extrabold [font-stretch:87.5%]" : ""}`}>
        {formatPence(amountPence)}
      </dd>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}
