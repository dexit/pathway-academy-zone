import * as React from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  id: string;
};

type InputProps = BaseProps & React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };
type SelectProps = BaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & { as: "select"; children: React.ReactNode };

export type FormFieldProps = InputProps | TextareaProps | SelectProps;

/**
 * Lightweight, accessible form field wrapper used across all site forms.
 * Renders the label, control, optional hint, and error text with proper
 * aria-describedby/aria-invalid wiring.
 */
export const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(function FormField(props, ref) {
  const { label, required, error, hint, id, className, as = "input", ...rest } = props as FormFieldProps & { className?: string };
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const baseClass = cn(
    "w-full rounded-lg border bg-background px-4 py-3 text-sm transition-colors",
    "placeholder:text-muted-foreground/70",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:border-primary",
    error ? "border-destructive ring-1 ring-destructive/30" : "border-input",
    className
  );

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={baseClass}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={baseClass}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {(props as SelectProps).children}
        </select>
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={baseClass}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
});
