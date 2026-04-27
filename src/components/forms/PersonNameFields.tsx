import { FormField } from "./FormField";
import type { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  /** Prefix used in element ids (e.g. "contact" -> "contact-firstname"). */
  idPrefix: string;
  firstNameField: Path<T>;
  lastNameField: Path<T>;
}

/**
 * Reusable two-column First name / Last name pair. Keeps spacing,
 * autoComplete tokens and validation wiring identical across every form.
 */
export function PersonNameFields<T extends FieldValues>({
  register,
  errors,
  idPrefix,
  firstNameField,
  lastNameField,
}: Props<T>) {
  const firstErr = (errors as Record<string, { message?: string } | undefined>)[firstNameField as string]?.message;
  const lastErr = (errors as Record<string, { message?: string } | undefined>)[lastNameField as string]?.message;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        id={`${idPrefix}-firstname`}
        label="First Name"
        required
        autoComplete="given-name"
        placeholder="First name"
        error={firstErr}
        {...register(firstNameField)}
      />
      <FormField
        id={`${idPrefix}-lastname`}
        label="Last Name"
        required
        autoComplete="family-name"
        placeholder="Last name"
        error={lastErr}
        {...register(lastNameField)}
      />
    </div>
  );
}
