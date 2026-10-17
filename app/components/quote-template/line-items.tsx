import { useEffect, useRef } from "react";

import { GhostButton, SecondaryButton } from "~/components/buttons";
import { MeasureField, TextField } from "~/components/form-fields";
import { QUICK_ADD_LINES, type QuoteLineFields, type QuoteLineIssue } from "~/lib/quote/quote";

// "The work" lines on the quote template (screens.md P3/P4; SEO brief §2.1 quick-add chips).

interface LineItemsProps {
  lines: QuoteLineFields[];
  lineIssues: QuoteLineIssue[];
  onChange: (lines: QuoteLineFields[]) => void;
  createLineId: () => string;
  onLineRemoved: (description: string) => void;
}

export function LineItems({ lines, lineIssues, onChange, createLineId, onLineRemoved }: LineItemsProps) {
  // Move focus to what the user types next once the new line is on screen: the price after a
  // quick-add (the description is already filled), the description after "Add line".
  const elementIdToFocus = useRef<string | null>(null);
  useEffect(() => {
    if (!elementIdToFocus.current) return;
    document.getElementById(elementIdToFocus.current)?.focus();
    elementIdToFocus.current = null;
  }, [lines]);

  const updateLine = (lineId: string, changes: Partial<QuoteLineFields>) =>
    onChange(lines.map((line) => (line.id === lineId ? { ...line, ...changes } : line)));

  const removeLine = (lineToRemove: QuoteLineFields) => {
    const remainingLines = lines.filter((line) => line.id !== lineToRemove.id);
    onChange(remainingLines.length > 0 ? remainingLines : [{ id: createLineId(), description: "", detail: "", amount: "" }]);
    onLineRemoved(lineToRemove.description.trim() || "Line");
  };

  const addLine = (description = "") => {
    const lastLine = lines[lines.length - 1];
    const lastLineIsBlank =
      lastLine && lastLine.description === "" && lastLine.detail === "" && lastLine.amount === "";
    if (lastLineIsBlank && description !== "") {
      elementIdToFocus.current = `line-${lastLine.id}-amount`;
      updateLine(lastLine.id, { description });
      return;
    }
    const newLineId = createLineId();
    elementIdToFocus.current = description === "" ? `line-${newLineId}-description` : `line-${newLineId}-amount`;
    onChange([...lines, { id: newLineId, description, detail: "", amount: "" }]);
  };

  return (
    <div>
      <ol className="grid gap-3">
        {lines.map((line, lineIndex) => {
          const issue = lineIssues.find((lineIssue) => lineIssue.lineId === line.id);
          const isError = issue?.severity === "error";
          const issueId = `line-${line.id}-issue`;
          const lineNumber = lineIndex + 1;
          return (
            <li key={line.id} className={`rounded-md border-2 p-3 ${isError ? "border-danger-fg" : "border-line"}`}>
              <TextField
                id={`line-${line.id}-description`}
                label={`Line ${lineNumber} description`}
                labelHidden
                placeholder="e.g. Living room walls, 2 coats"
                value={line.description}
                onChange={(value) => updateLine(line.id, { description: value })}
                hasError={isError && issue?.field === "description"}
                describedBy={issue ? issueId : undefined}
              />
              <div className="mt-2">
                <TextField
                  id={`line-${line.id}-detail`}
                  label={`Line ${lineNumber} detail (optional)`}
                  labelHidden
                  placeholder="Detail (optional): colour, prep, m²"
                  value={line.detail}
                  onChange={(value) => updateLine(line.id, { detail: value })}
                />
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="w-40">
                  <MeasureField
                    id={`line-${line.id}-amount`}
                    label="Price"
                    unit="£"
                    unitPosition="prefix"
                    value={line.amount}
                    onChange={(value) => updateLine(line.id, { amount: value })}
                    hasError={isError && issue?.field === "amount"}
                    describedBy={issue ? issueId : undefined}
                  />
                </div>
                <div className="ml-auto">
                  <GhostButton onClick={() => removeLine(line)} ariaLabel={`Remove line ${lineNumber}`}>
                    <TrashIcon />
                    Remove
                  </GhostButton>
                </div>
              </div>
              {issue && (
                <p
                  id={issueId}
                  role={isError ? "alert" : undefined}
                  className={`mt-2 ${isError ? "font-semibold text-danger-fg" : "text-caption text-ink-2"}`}
                >
                  {issue.message}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <SecondaryButton onClick={() => addLine()} className="mt-3 w-full">
        <span aria-hidden="true" className="text-title leading-none">
          +
        </span>
        Add line
      </SecondaryButton>

      <p id="quick-add-label" className="mt-4 text-caption font-semibold text-ink-2">
        Quick add
      </p>
      <div role="group" aria-labelledby="quick-add-label" className="mt-1.5 flex flex-wrap gap-2">
        {QUICK_ADD_LINES.map((description) => (
          <button
            key={description}
            type="button"
            onClick={() => addLine(description)}
            className="min-h-12 rounded-full border-2 border-line-strong bg-surface px-4 text-caption font-semibold hover:bg-surface-2"
          >
            + {description}
          </button>
        ))}
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
