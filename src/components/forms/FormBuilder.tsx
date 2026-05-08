import * as React from "react";
import { Controller } from "react-hook-form";
import type {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio } from "@/components/forms/IllustratedRadio";
import type { IllustratedFieldOption, SelectOption, FieldConfig, FormMeta } from "@/lib/form-configs/types";
import { maskUkPhone, maskUkPostcode } from "@/lib/uk-validators";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type Props = {
  config: FormMeta;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  loading: boolean;
  error?: string | null;
  success: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true for fields that should participate in the 2-col grid. */
function isGridEligible(field: FieldConfig): boolean {
  return field.type !== "textarea" && field.type !== "illustrated-radio";
}

/** Derive the HTML id used for a field: `<form-id>-<name>`. */
function fieldId(formId: string, name: string): string {
  return `${formId}-${name}`;
}

/** Resolve dateMax="today" to today's ISO date string. */
function resolveDateMax(dateMax?: "today"): string | undefined {
  if (dateMax === "today") return new Date().toISOString().slice(0, 10);
  return undefined;
}

// ---------------------------------------------------------------------------
// Single field renderer
// ---------------------------------------------------------------------------

function RenderField({
  field,
  formId,
  register,
  control,
  errors,
  setValue,
  watch,
}: {
  field: FieldConfig;
  formId: string;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}) {
  const id = fieldId(formId, field.name);
  const error = errors[field.name]?.message as string | undefined;

  // ---- illustrated-radio --------------------------------------------------
  if (field.type === "illustrated-radio") {
    const options = (field.options ?? []) as IllustratedFieldOption[];
    return (
      <Controller
        name={field.name}
        control={control}
        render={({ field: ctrlField }) => (
          <IllustratedRadio
            id={id}
            name={field.name}
            legend={field.label}
            hint={field.hint}
            options={options}
            value={ctrlField.value ?? ""}
            onChange={ctrlField.onChange}
            required={field.required}
            columns={field.columns}
            error={error}
          />
        )}
      />
    );
  }

  // ---- select -------------------------------------------------------------
  if (field.type === "select") {
    const options = (field.options ?? []) as SelectOption[];
    return (
      <FormField
        as="select"
        id={id}
        label={field.label}
        required={field.required}
        hint={field.hint}
        error={error}
        {...register(field.name)}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </FormField>
    );
  }

  // ---- textarea -----------------------------------------------------------
  if (field.type === "textarea") {
    return (
      <FormField
        as="textarea"
        id={id}
        label={field.label}
        required={field.required}
        hint={field.hint}
        error={error}
        rows={field.rows}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        {...register(field.name)}
      />
    );
  }

  // ---- masked inputs (phone / postcode) -----------------------------------
  if (field.mask === "phone" || field.mask === "postcode") {
    const masker = field.mask === "phone" ? maskUkPhone : maskUkPostcode;
    const watchedValue = watch(field.name) as string | undefined;
    return (
      <FormField
        id={id}
        label={field.label}
        required={field.required}
        hint={field.hint}
        error={error}
        type={field.type === "tel" ? "tel" : "text"}
        inputMode={field.inputMode}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        value={watchedValue ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(field.name, masker(e.target.value), { shouldValidate: true })
        }
      />
    );
  }

  // ---- standard input (text, email, tel, date) ----------------------------
  const dateMax = field.type === "date" ? resolveDateMax(field.dateMax) : undefined;

  return (
    <FormField
      id={id}
      label={field.label}
      required={field.required}
      hint={field.hint}
      error={error}
      type={field.type}
      inputMode={field.inputMode}
      autoComplete={field.autoComplete}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      max={dateMax}
      {...register(field.name)}
    />
  );
}

// ---------------------------------------------------------------------------
// Grid-grouping renderer for a section's fields
// ---------------------------------------------------------------------------

function RenderSectionFields({
  fields,
  formId,
  register,
  control,
  errors,
  setValue,
  watch,
}: {
  fields: FieldConfig[];
  formId: string;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}) {
  const elements: React.ReactNode[] = [];
  let gridBuffer: FieldConfig[] = [];
  let keyIndex = 0;

  function flushGrid() {
    if (gridBuffer.length === 0) return;
    const buffered = gridBuffer.slice();
    elements.push(
      <div key={`grid-${keyIndex++}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buffered.map((f) => (
          <RenderField
            key={f.name}
            field={f}
            formId={formId}
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        ))}
      </div>
    );
    gridBuffer = [];
  }

  for (const field of fields) {
    if (isGridEligible(field)) {
      gridBuffer.push(field);
    } else {
      flushGrid();
      elements.push(
        <RenderField
          key={field.name}
          field={field}
          formId={formId}
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      );
    }
  }
  flushGrid();

  return <>{elements}</>;
}

// ---------------------------------------------------------------------------
// FormBuilder
// ---------------------------------------------------------------------------

export function FormBuilder({
  config,
  register,
  control,
  errors,
  setValue,
  watch,
  loading,
  error,
  success,
  onSubmit,
}: Props) {
  return (
    <form id={config.id} onSubmit={onSubmit} noValidate className="space-y-5">
      {config.sections.map((section, sIdx) => (
        <React.Fragment key={sIdx}>
          {section.divider && <hr className="border-border" />}
          {section.title && (
            <h3 className="font-display text-lg font-bold text-foreground">
              {section.title}
            </h3>
          )}
          <RenderSectionFields
            fields={section.fields}
            formId={config.id}
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </React.Fragment>
      ))}

      <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </span>
        ) : (
          config.submitLabel
        )}
      </Button>

      <div aria-live="polite" aria-atomic="true">
        {success && (
          <p className="flex items-center justify-center gap-2 text-xs font-medium text-primary">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {config.successBody}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="flex items-center justify-center gap-2 text-xs font-medium text-destructive"
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
