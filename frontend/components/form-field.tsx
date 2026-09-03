import { Input, Textarea } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
  /** Controlled value. Omit to leave the input uncontrolled. */
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  /** Validation message from the server action; also drives aria-invalid. */
  error?: string;
};

/** Label + input pair used by every form of the site. */
export function Field({
  id,
  label,
  type = 'text',
  placeholder,
  textarea = false,
  rows = 5,
  value,
  onChange,
  required = false,
  disabled = false,
  autoComplete,
  maxLength,
  error,
}: FieldProps) {
  const control = {
    id,
    name: id,
    placeholder,
    required,
    disabled,
    autoComplete,
    maxLength,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: cn(error && 'border-destructive focus-visible:border-destructive'),
    ...(value !== undefined
      ? { value, onChange: (e: { target: { value: string } }) => onChange?.(e.target.value) }
      : {}),
  };

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-destructive">
            *
          </span>
        ) : null}
      </label>
      {textarea ? <Textarea rows={rows} {...control} /> : <Input type={type} {...control} />}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
