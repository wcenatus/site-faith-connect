"use client";

import { useCallback, useState } from "react";
import { Button, type ButtonProps } from "@/components/button";
import { Modal } from "@/components/modal";
import { CreateEventForm } from "@/components/create-event-form";
import type { CategoryOption } from "@/server/categories/getCategories";

export type CreateEventButtonProps = {
  categories: CategoryOption[];
  label?: string;
  buttonColor?: ButtonProps["color"];
  buttonSize?: ButtonProps["size"];
  className?: string;
};

export function CreateEventButton({
  categories,
  label = "Create event",
  buttonColor = "primary",
  buttonSize = "md",
  className,
}: CreateEventButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleSuccess = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button
        type="button"
        color={buttonColor}
        size={buttonSize}
        icon="mdi:calendar-plus"
        iconPosition="left"
        onClick={handleOpen}
        className={className}
      >
        {label}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        title="Create a new event"
        description="Plan a gathering and invite your community."
      >
        <CreateEventForm
          categories={categories}
          onCancel={handleClose}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
}
