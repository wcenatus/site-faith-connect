"use client";

import { useCallback, useState } from "react";
import { Button, type ButtonProps } from "@/components/button";
import { Modal } from "@/components/modal";
import { CreateGroupForm } from "@/components/create-group-form";
import type { CategoryOption } from "@/server/categories/getCategories";

export type CreateGroupButtonProps = {
  categories: CategoryOption[];
  label?: string;
  buttonColor?: ButtonProps["color"];
  buttonSize?: ButtonProps["size"];
  className?: string;
};

export function CreateGroupButton({
  categories,
  label = "Create group",
  buttonColor = "primary",
  buttonSize = "md",
  className,
}: CreateGroupButtonProps) {
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
        icon="mdi:plus"
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
        title="Create a new group"
        description="Start a faith community others can find and join."
      >
        <CreateGroupForm
          categories={categories}
          onCancel={handleClose}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
}
