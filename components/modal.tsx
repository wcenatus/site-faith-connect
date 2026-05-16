"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: ModalSize;
  /** Hide the built-in close (×) button in the header. */
  hideCloseButton?: boolean;
  /** Disable backdrop click-to-close. */
  disableBackdropClose?: boolean;
  /** Disable Escape key-to-close. */
  disableEscapeClose?: boolean;
  /** Rendered in the body of the modal. */
  children: React.ReactNode;
  /** Optional footer area, typically used for action buttons. */
  footer?: React.ReactNode;
  className?: string;
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  hideCloseButton = false,
  disableBackdropClose = false,
  disableEscapeClose = false,
  children,
  footer,
  className = "",
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || disableEscapeClose) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, disableEscapeClose, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleBackdropMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disableBackdropClose) return;
    if (event.target === event.currentTarget) onClose();
  };

  const node = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={handleBackdropMouseDown}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={[
          "relative flex w-full max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none",
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {(title || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
            <div className="flex flex-col gap-1">
              {title && (
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-slate-900"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="text-sm text-slate-500">
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <Icon icon="mdi:close" width={20} height={20} aria-hidden />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
