"use client";
import { Snackbar } from "@mui/material";
import Alert from "./Alert";

type Props = {
  open: boolean;
  onClose: () => void;
  severity: "error" | "warning" | "info" | "success";
  icon?: React.ReactNode;
  message: string;
  autoHideDuration?: number; // opcional
};

export default function NotificationSnackbar({
  open,
  onClose,
  severity,
  icon,
  message,
  autoHideDuration = 3000,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // esquina superior derecha
    >
      <div>
        <Alert severity={severity} icon={icon || undefined} label={message} />
      </div>
    </Snackbar>
  );
}
