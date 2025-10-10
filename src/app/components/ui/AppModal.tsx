"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { ReactNode } from "react";
import Button from "./Button";

type AppModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg";
};

export default function AppModal({
  open,
  title,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  children,
  maxWidth = "sm",
}: AppModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      // 🟣 Nueva forma recomendada en MUI v6+
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            background: "linear-gradient(to bottom right, #faf5ff, #ede9fe)",
            border: "1px solid #e9d5ff",
            boxShadow:
              "0 10px 25px -5px rgba(147, 51, 234, 0.1), 0 8px 10px -6px rgba(147, 51, 234, 0.1)",
            p: 1.5,
          },
        },
      }}
    >
      {/* Header */}
      {title && (
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6b21a8",
            fontWeight: 600,
            fontSize: "1.3rem",
            pb: 1,
          }}
        >
          {title}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "#9333ea",
              "&:hover": { color: "#7e22ce", backgroundColor: "transparent" },
            }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
      )}

      {/* Contenido */}
      <DialogContent
        dividers
        sx={{
          borderColor: "#e9d5ff",
          py: 2,
        }}
      >
        <div className="text-gray-700">{children}</div>
      </DialogContent>

      {/* Acciones */}
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          px: 3,
          pb: 2,
          gap: 1.5,
        }}
      >
        <Button
          label={cancelText}
          onClick={onClose}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        />
        {onConfirm && (
          <Button
            label={confirmText}
            onClick={onConfirm}
            className="bg-purple-600 text-white hover:bg-purple-700"
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
