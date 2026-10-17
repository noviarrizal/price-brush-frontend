import type { ReactNode } from "react";

// Buttons from design-system.md §9.1. Yellow is only for the one primary action on a screen.

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  /** When set, the button is disabled and this explains why (shown under it). */
  disabledReason?: string | null;
  isBusy?: boolean;
  busyLabel?: string;
}

export function PrimaryButton({ children, onClick, disabledReason, isBusy = false, busyLabel }: PrimaryButtonProps) {
  const isDisabled = Boolean(disabledReason);
  const reasonId = "primary-action-reason";
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled || isBusy}
        aria-busy={isBusy || undefined}
        aria-describedby={isDisabled ? reasonId : undefined}
        className={
          isDisabled
            ? "flex min-h-14 w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-line-strong bg-surface-2 text-body-lg font-bold text-ink-2"
            : "flex min-h-14 w-full items-center justify-center gap-2 rounded-md border-2 border-accent-edge bg-accent text-body-lg font-bold text-on-accent shadow-plate active:translate-y-0.5 active:bg-accent-pressed active:shadow-none disabled:cursor-progress"
        }
      >
        {isBusy ? busyLabel : children}
      </button>
      {isDisabled && (
        <p id={reasonId} className="mt-1.5 text-center text-caption font-semibold text-ink-2">
          {disabledReason}
        </p>
      )}
    </div>
  );
}

export function SecondaryButton({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-line-strong bg-surface px-4 font-semibold hover:bg-surface-2 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, ariaLabel }: { children: ReactNode; onClick: () => void; ariaLabel?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex min-h-12 items-center gap-1.5 rounded-md px-2 font-semibold underline underline-offset-2 hover:bg-surface-2"
    >
      {children}
    </button>
  );
}
