import { VALID_FOR_DAY_OPTIONS, type QuoteDraft } from "./quote";

// Autosave for the free template (SEO brief §2.1: "a refresh doesn't lose it"). The draft only
// lives in this browser's localStorage; nothing is sent anywhere.

export const QUOTE_DRAFT_STORAGE_KEY = "pricebrush.quoteTemplate";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function saveQuoteDraft(storage: StorageLike, draft: QuoteDraft): void {
  try {
    storage.setItem(QUOTE_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Private mode or a full disk: the form still works, it just won't survive a refresh.
  }
}

/** Returns the saved draft, or null if there is none or it isn't one we understand. */
export function loadQuoteDraft(storage: StorageLike): QuoteDraft | null {
  let text: string | null;
  try {
    text = storage.getItem(QUOTE_DRAFT_STORAGE_KEY);
  } catch {
    return null;
  }
  if (!text) return null;
  try {
    const parsed = JSON.parse(text) as Partial<QuoteDraft>;
    if (!looksLikeDraft(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearQuoteDraft(storage: StorageLike): void {
  try {
    storage.removeItem(QUOTE_DRAFT_STORAGE_KEY);
  } catch {
    // Nothing to do: see saveQuoteDraft.
  }
}

function looksLikeDraft(value: Partial<QuoteDraft>): value is QuoteDraft {
  return (
    value.version === 1 &&
    typeof value.business === "object" &&
    typeof value.client === "object" &&
    typeof value.quoteNumber === "string" &&
    typeof value.quoteDate === "string" &&
    VALID_FOR_DAY_OPTIONS.includes(value.validForDays as (typeof VALID_FOR_DAY_OPTIONS)[number]) &&
    Array.isArray(value.lines) &&
    value.lines.every(
      (line) =>
        typeof line?.id === "string" &&
        typeof line.description === "string" &&
        typeof line.detail === "string" &&
        typeof line.amount === "string",
    ) &&
    (value.materialsBasis === "supplyAndApply" || value.materialsBasis === "labourOnly") &&
    typeof value.vatRegistered === "boolean" &&
    typeof value.vatNumber === "string" &&
    typeof value.notes === "string"
  );
}
