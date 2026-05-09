import { Icon } from "@iconify/react";

type ButtonColor = "primary" | "secondary";
type IconPosition = "left" | "right";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: IconPosition;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-7 py-3.5 text-base gap-2.5 rounded-2xl",
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

const colorClasses: Record<ButtonColor, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
};

export function Button({
  color = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const resolvedColor = colorClasses[color];
  const resolvedSize = sizeClasses[size];

  const iconEl = icon ? (
    <Icon icon={icon} width={iconSizes[size]} height={iconSizes[size]} aria-hidden />
  ) : null;

  return (
    <button className={[base, resolvedSize, resolvedColor, className].join(" ")} {...rest}>
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </button>
  );
}
