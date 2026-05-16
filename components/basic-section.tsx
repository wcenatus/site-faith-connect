"use client";

export type BasicSectionProps = {
  title: string;
  highlightColor?: string;
  highlightText?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const BasicSection = ({ title, highlightColor, highlightText, onClick, children }: BasicSectionProps) => {
  const highlightTextClass = `text-${highlightColor}-500`;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-gray-800">
        {title}{" "}
        {highlightText && (
          <span
            className={`${highlightTextClass} cursor-pointer hover:underline`}
            onClick={onClick}
          >
            {highlightText}
          </span>
        )}
      </h2>
      {children}
    </div>
  );
};