import Image from "next/image";

export type AvatarStackPerson = {
  name: string;
  imageUrl: string;
};

export type AvatarStackSize = "sm" | "md" | "lg";

type AvatarStackBaseProps = {
  /** People to render as overlapping circular avatars. */
  people: AvatarStackPerson[];
  /** Maximum avatars to show before collapsing into the trailing element. */
  max?: number;
  /** Avatar diameter. `sm` = 24px, `md` = 32px (default), `lg` = 36px. */
  size?: AvatarStackSize;
  className?: string;
};

type OverflowVariantProps = AvatarStackBaseProps & {
  /**
   * Trailing `+N` pill. Use this when you want to indicate "more members"
   * (e.g. group member previews).
   */
  variant?: "overflow";
  /**
   * Number rendered in the trailing pill. If omitted, derived from
   * `people.length - max` when positive.
   */
  extraCount?: number;
};

type LabelVariantProps = AvatarStackBaseProps & {
  /**
   * Trailing free-form text. Use this for things like "12 going".
   */
  variant: "label";
  label: string;
};

export type AvatarStackProps = OverflowVariantProps | LabelVariantProps;

const sizeStyles: Record<
  AvatarStackSize,
  { avatar: string; sizes: string; spacing: string }
> = {
  sm: { avatar: "h-6 w-6", sizes: "24px", spacing: "-space-x-2" },
  md: { avatar: "h-8 w-8", sizes: "32px", spacing: "-space-x-2" },
  lg: { avatar: "h-9 w-9", sizes: "36px", spacing: "-space-x-3" },
};

export function AvatarStack(props: AvatarStackProps) {
  const { people, max = 5, size = "md", className = "" } = props;
  const styles = sizeStyles[size];
  const visible = people.slice(0, max);

  const trailing = renderTrailing(props, visible.length);
  if (visible.length === 0 && trailing === null) return null;

  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      {visible.length > 0 && (
        <div className={["flex", styles.spacing].join(" ")}>
          {visible.map((person, i) => (
            <div
              key={`${person.name}-${i}`}
              className={[
                "relative overflow-hidden rounded-full ring-2 ring-white",
                styles.avatar,
              ].join(" ")}
              style={{ zIndex: visible.length - i }}
            >
              <Image
                src={person.imageUrl}
                alt={person.name}
                fill
                sizes={styles.sizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {trailing}
    </div>
  );
}

function renderTrailing(
  props: AvatarStackProps,
  visibleCount: number,
): React.ReactNode {
  if (props.variant === "label") {
    return <span className="text-sm text-slate-600">{props.label}</span>;
  }

  const derived = Math.max(props.people.length - visibleCount, 0);
  const extra = props.extraCount ?? derived;
  if (extra <= 0) return null;

  return (
    <span className="rounded-full bg-[#e6d4ad] px-2.5 py-1 text-xs font-semibold text-[#5a4632]">
      +{extra}
    </span>
  );
}
