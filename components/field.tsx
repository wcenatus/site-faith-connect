type BaseFieldProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  placeholder?: string;
};

type InputFieldProps = BaseFieldProps & {
  as?: "input";
  type?: string;
  autoComplete?: string;
};

type TextareaFieldProps = BaseFieldProps & {
  as: "textarea";
  rows?: number;
};

type SelectFieldProps = BaseFieldProps & {
  as: "select";
  children: React.ReactNode;
};

export type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export function Field(props: FieldProps) {
  const {
    id,
    name,
    label,
    required,
    error,
    hint,
    defaultValue,
    placeholder,
  } = props;

  const baseControlClass = [
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-[#2c4a32]/30",
    error
      ? "border-red-300 focus:border-red-400"
      : "border-slate-200 focus:border-[#2c4a32]/50",
  ].join(" ");

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={props.rows ?? 3}
          className={baseControlClass}
        />
      ) : props.as === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={baseControlClass}
        >
          {props.children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          required={required}
          autoComplete={props.autoComplete}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={baseControlClass}
        />
      )}

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
