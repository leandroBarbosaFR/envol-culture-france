import { Input, Textarea } from '@/components/ui/input';

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
};

/** Label + input pair used by every form of the site. */
export function Field({
  id,
  label,
  type = 'text',
  placeholder,
  textarea = false,
  rows = 5,
}: FieldProps) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <Textarea id={id} name={id} rows={rows} placeholder={placeholder} />
      ) : (
        <Input id={id} name={id} type={type} placeholder={placeholder} />
      )}
    </div>
  );
}
