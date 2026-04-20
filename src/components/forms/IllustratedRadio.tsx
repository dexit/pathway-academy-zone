import * as React from "react";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IllustratedOption = {
  value: string;
  label: string;
  description?: string;
  icon: LucideIcon;
};

type Props = {
  name: string;
  legend: string;
  hint?: string;
  options: IllustratedOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  columns?: 2 | 3 | 4 | 5;
  id?: string;
};

/**
 * Accessible radio group rendered as illustrated tiles.
 * Each option has a Lucide icon, label and optional description.
 * Keyboard: arrow keys move selection; Space/Enter toggles.
 */
export function IllustratedRadio({
  name,
  legend,
  hint,
  options,
  value,
  onChange,
  required,
  error,
  columns = 3,
  id,
}: Props) {
  const groupId = id || `${name}-group`;
  const errorId = `${groupId}-error`;

  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 md:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-4",
    5: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  }[columns];

  return (
    <fieldset
      id={groupId}
      aria-required={required || undefined}
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={error ? errorId : undefined}
      className="space-y-3"
    >
      <legend className="text-sm font-medium text-foreground">
        {legend} {required && <span className="text-destructive">*</span>}
      </legend>
      {hint && <p className="text-xs text-muted-foreground -mt-2">{hint}</p>}
      <div role="radiogroup" aria-labelledby={groupId} className={cn("grid grid-cols-1 gap-3", colsClass)}>
        {options.map((opt) => {
          const checked = value === opt.value;
          const Icon = opt.icon;
          const optId = `${name}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                "group relative cursor-pointer rounded-2xl border bg-card p-4 transition-all duration-200",
                "hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                checked
                  ? "border-primary ring-2 ring-primary/30 shadow-md bg-primary/5"
                  : "border-border/60"
              )}
            >
              <input
                id={optId}
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                required={required}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                    checked
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary group-hover:bg-primary/15"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">{opt.label}</p>
                  {opt.description && (
                    <p className="mt-1 text-xs text-muted-foreground leading-snug">{opt.description}</p>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                    checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
                  )}
                >
                  {checked && <Check className="h-3 w-3" />}
                </span>
              </div>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
}
