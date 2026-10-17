import type { ReactNode } from "react";
import { Link } from "react-router";

import { formatPence } from "~/lib/numbers";
import { calculateJob } from "~/lib/paint/calculate";
import { DEFAULT_SETTINGS } from "~/lib/paint/defaults";
import { labourLineDetail, labourLineTitle, paintLineDetail } from "~/lib/paint/format";
import type { RoomInput } from "~/lib/paint/types";
import { VAT_RATE_PERCENT } from "~/lib/quote/quote";

// Prerendered guide below the quote form (docs/seo/briefs/decorating-quote-template.md §2.2).
// The example is calculated by the paint engine (spec T5), so it matches the calculator and the
// landing page. Legal and VAT facts were checked 17/10/2026; review every April.

export const GUIDE_LAST_REVIEWED = "17/10/2026";

const EXAMPLE_ROOMS: RoomInput[] = [
  { id: "living", name: "Living room", lengthMetres: 4.6, widthMetres: 3.8, heightMetres: 2.4, doorCount: 1, windowCount: 1, coats: 2, includeCeiling: true, newPlaster: false },
  { id: "hallway", name: "Hallway", lengthMetres: 4, widthMetres: 1.4, heightMetres: 2.4, doorCount: 3, windowCount: 0, coats: 2, includeCeiling: false, newPlaster: false },
];
const example = calculateJob(EXAMPLE_ROOMS, DEFAULT_SETTINGS);
const exampleVatPence = Math.round((example.totalPence * VAT_RATE_PERCENT) / 100);

const FAQ_ITEMS: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "What should a painting quote include?",
    answer:
      "Your details, the client and job address, a quote number and date, how long the price is valid, the work room by room with the price of each line, whether paint is included, VAT if you're registered, and your payment terms. The checklist above has the full list.",
  },
  {
    question: "Do painting quotes include paint?",
    answer:
      "It depends on the decorator. \"Supply and apply\" means your price includes paint and materials; \"labour only\" means the client buys the paint. Always say which on the quote — the switch above adds the sentence for you.",
  },
  {
    question: "How do painters and decorators quote jobs?",
    answer: (
      <>
        Most work out how many days the job takes and multiply by their day rate, then add paint and materials. Some
        price per room. Either way, show the work line by line. The <Link to="/paint-calculator" className="underline">paint calculator</Link>{" "}
        works out the days and litres from your day rate.
      </>
    ),
  },
  {
    question: "How long should a decorating quote be valid for?",
    answer:
      "30 days is common, and it's the default here; 14 or 60 days are one tap away. Paint prices and your diary change, so always state the date the price runs out.",
  },
  {
    question: "Do I need to add VAT to my quote?",
    answer: (
      <>
        Only if you're VAT registered. You must register once your taxable turnover goes over £90,000 in 12 months (
        <a href="https://www.gov.uk/vat-registration/when-to-register" className="underline" rel="noopener">
          GOV.UK
        </a>
        ). If you're registered, switch VAT on: the quote adds {VAT_RATE_PERCENT}% and shows your VAT number.
      </>
    ),
  },
  {
    question: "Do I have to give my client a right to cancel?",
    answer: (
      <>
        If you agree the contract in the client's home and they'll pay more than £42, the Consumer Contracts Regulations
        2013 normally give them 14 days to cancel, and you must tell them in writing. If they ask you to start sooner,
        they pay for the work done before they cancel. See{" "}
        <a href="https://www.businesscompanion.info/en/quick-guides/consumer-contracts/consumer-contracts-off-premises-sales" className="underline" rel="noopener">
          Business Companion
        </a>{" "}
        and the{" "}
        <a href="https://www.legislation.gov.uk/uksi/2013/3134/part/3" className="underline" rel="noopener">
          regulations
        </a>
        . This is general information, not legal advice.
      </>
    ),
  },
  {
    question: "Should a decorator take a deposit?",
    answer: (
      <>
        Many do, especially on bigger jobs or when they buy materials up front. In Direct Line's research with UK
        tradespeople, 39% said they take half up front (Direct Line business insurance research, reported 15/01/2026,
        sample size not published —{" "}
        <a href="https://www.scottishfinancialnews.com/articles/two-thirds-of-tradespeople-left-chasing-late-payments-research-finds" className="underline" rel="noopener">
          Scottish Financial News
        </a>
        ). Put the amount and when it's due in your notes, e.g. "30% deposit on acceptance, balance on completion". If
        the client has a right to cancel, a deposit normally has to be refunded if they cancel in time.
      </>
    ),
  },
  {
    question: "Should I charge for a mist coat on new plaster?",
    answer: (
      <>
        Yes. It's an extra coat, extra paint and usually an extra visit while it dries. Put it on its own line so the
        client sees why the price is higher — the "Mist coat (new plaster)" button adds one, and the{" "}
        <Link to="/paint-calculator" className="underline">paint calculator</Link> works out its litres and days.
      </>
    ),
  },
  {
    question: "Can I send a quote on WhatsApp?",
    answer:
      "Yes. Download the PDF and attach it to a WhatsApp message or an email. Ask the client to reply \"yes\" in writing so you both have a record of the agreed price.",
  },
  {
    question: "Is this template really free?",
    answer:
      "Yes. No sign-up, and nothing you type leaves your device. The PDF has a small \"Made with PriceBrush\" mark at the bottom.",
  },
];

export function QuoteTemplateGuide() {
  return (
    <div className="mt-14 grid max-w-2xl gap-12">
      <section aria-labelledby="example-heading">
        <h2 id="example-heading" className="font-display text-h2 font-bold [font-stretch:87.5%]">
          Example: a painting and decorating quote (UK)
        </h2>
        <p className="mt-2 text-ink-2">
          Example — prices are illustrative. A living room (walls and ceiling) and a hallway (walls), two coats, priced at
          a £200 day rate and £6 a litre for paint, with the working on each line:
        </p>
        <table className="mt-3 w-full border-collapse rounded-md bg-paper text-paper-ink">
          <caption className="sr-only">Example quote lines</caption>
          <thead>
            <tr className="border-b-2 border-paper-ink text-left text-caption">
              <th scope="col" className="py-2 pl-3 font-semibold">Line</th>
              <th scope="col" className="py-2 pr-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {example.labourLines.map((line) => (
              <tr key={`${line.roomId}-${line.surface}`} className="border-b border-line">
                <td className="py-2 pl-3">
                  <strong className="block">{labourLineTitle(line)}</strong>
                  <span className="text-caption text-ink-2">{labourLineDetail(line)}</span>
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">{formatPence(line.amountPence)}</td>
              </tr>
            ))}
            <tr className="border-b border-line">
              <td className="py-2 pl-3">
                <strong className="block">Paint</strong>
                <span className="text-caption text-ink-2">{paintLineDetail(example.paintGroups, DEFAULT_SETTINGS.paintPencePerLitre)}</span>
              </td>
              <td className="py-2 pr-3 text-right tabular-nums">{formatPence(example.paintPence)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="py-2 pl-3 text-left font-bold">Total (not VAT registered)</th>
              <td className="py-2 pr-3 text-right font-bold tabular-nums">{formatPence(example.totalPence)}</td>
            </tr>
          </tfoot>
        </table>
        <p className="mt-2">
          If you're VAT registered: subtotal {formatPence(example.totalPence)} + VAT {VAT_RATE_PERCENT}%{" "}
          {formatPence(exampleVatPence)} = {formatPence(example.totalPence + exampleVatPence)}.
        </p>
      </section>

      <section aria-labelledby="include-heading">
        <h2 id="include-heading" className="font-display text-h2 font-bold [font-stretch:87.5%]">
          What should a painting and decorating quote include?
        </h2>
        <p className="mt-2">A clear quote wins jobs and stops arguments later. Check yours has:</p>
        <ul className="mt-2 grid list-disc gap-1 pl-6">
          <li>Your business name and how to reach you</li>
          <li>The client's name and the job address</li>
          <li>A quote number and the date</li>
          <li>How long the price is valid (a "valid until" date)</li>
          <li>The work room by room: surfaces, coats, and colours or products if you've agreed them</li>
          <li>The prep that's included (filling, sanding, mist coat on new plaster)</li>
          <li>What's not included, e.g. moving heavy furniture or repairs found later</li>
          <li>Whether paint and materials are included (supply and apply) or not (labour only)</li>
          <li>A price for each line and the total</li>
          <li>VAT and your VAT number — only if you're VAT registered</li>
          <li>When you can start and roughly how long it takes</li>
          <li>Payment terms and any deposit</li>
          <li>The client's right to cancel, if you agreed the job in their home (see the FAQ)</li>
        </ul>
      </section>

      <section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="font-display text-h2 font-bold [font-stretch:87.5%]">
          How to write a painting and decorating quote in 5 steps
        </h2>
        <ol className="mt-2 grid list-decimal gap-2 pl-6">
          <li>
            <strong>Look at the job.</strong> Walk every room with the client, note the surfaces, the state of the walls
            and anything that needs extra prep.
          </li>
          <li>
            <strong>Measure.</strong> Length, width and height of each room, plus doors and windows. The{" "}
            <Link to="/paint-calculator" className="underline">paint calculator</Link> turns them into litres, tins and
            days.
          </li>
          <li>
            <strong>Price it.</strong> Days × your day rate, plus paint and materials. Put anything unusual — a mist coat,
            wallpaper removal, high ceilings — on its own line.
          </li>
          <li>
            <strong>Write the lines.</strong> One line per room and surface, with the working underneath, so the client can
            see what they're paying for.
          </li>
          <li>
            <strong>Send it the same day.</strong> A quick, tidy quote beats a cheap late one. Send the PDF on WhatsApp or
            email and follow up after a few days.
          </li>
        </ol>
      </section>

      <section aria-labelledby="estimate-heading">
        <h2 id="estimate-heading" className="font-display text-h2 font-bold [font-stretch:87.5%]">
          Quote or estimate?
        </h2>
        <p className="mt-2">
          In the UK a quote is normally a fixed price for the work you've described, while an estimate is your best guess
          and can change. Say clearly which one you're giving. Under the{" "}
          <a href="https://www.legislation.gov.uk/ukpga/2015/15/contents" className="underline" rel="noopener">
            Consumer Rights Act 2015
          </a>
          , what you tell a homeowner about the price can become part of the contract, so if something might change the
          price — rotten wood under the paint, extra coats on a dark colour — write that in your notes.
        </p>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-h2 font-bold [font-stretch:87.5%]">
          Quote template FAQs
        </h2>
        <div className="mt-3 divide-y divide-line border-y border-line">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 font-semibold">
                {item.question}
                <span aria-hidden="true" className="text-title transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-3 text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-3 text-caption text-ink-2">Legal and VAT information last reviewed: {GUIDE_LAST_REVIEWED}.</p>
      </section>
    </div>
  );
}
