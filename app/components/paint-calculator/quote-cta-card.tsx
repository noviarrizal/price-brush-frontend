import { PrimaryButton } from "~/components/buttons";

// "Pricing a job like this?" card (screens.md P2): the calculator's one primary action, which
// hands the rooms over to the quote template (spec §10).

interface QuoteCtaCardProps {
  onTurnIntoQuote: () => void;
  disabledReason: string | null;
}

export function QuoteCtaCard({ onTurnIntoQuote, disabledReason }: QuoteCtaCardProps) {
  return (
    <section aria-labelledby="quote-cta-heading" className="rounded-lg bg-brand p-4 text-on-brand">
      <h2 id="quote-cta-heading" className="font-display text-title font-bold [font-stretch:87.5%]">
        Pricing a job like this?
      </h2>
      <p className="mt-1 text-on-brand-2">
        We'll put every room on a quote, one line per surface, with the working shown. Change any line, then download
        the PDF.
      </p>
      <div className="mt-3">
        <PrimaryButton onClick={onTurnIntoQuote} disabledReason={disabledReason} isOnBrand>
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
          Turn this into a quote
        </PrimaryButton>
      </div>
      <p className="mt-2 text-caption text-on-brand-2">Free. No sign-up. Nothing you type leaves this browser.</p>
    </section>
  );
}
