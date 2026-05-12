import { Icon } from "@iconify/react";

type ButtonColor = "primary" | "secondary" | "outline";
type IconPosition = "left" | "right";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "default" | "pill";

export type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  icon?: string;
  iconPosition?: IconPosition;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

const defaultRadiusBySize: Record<ButtonSize, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

const colorClasses: Record<ButtonColor, string> = {
  primary: "bg-[#2c4a32] text-white hover:bg-[#23391f]",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
  outline:
    "border border-[#2c4a32] bg-transparent text-[#2c4a32] hover:bg-[#2c4a32]/5",
};

export function Button({
  color = "primary",
  size = "md",
  radius = "default",
  icon,
  iconPosition = "left",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const resolvedColor = colorClasses[color];
  const resolvedSize = sizeClasses[size];
  const resolvedRadius =
    radius === "pill" ? "rounded-full" : defaultRadiusBySize[size];

  const iconEl = icon ? (
    <Icon icon={icon} width={iconSizes[size]} height={iconSizes[size]} aria-hidden />
  ) : null;

  return (
    <button
      className={[base, resolvedSize, resolvedRadius, resolvedColor, className].join(" ")}
      {...rest}
    >
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </button>
  );
}
