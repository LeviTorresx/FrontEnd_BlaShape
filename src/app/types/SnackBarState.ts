import { ReactNode } from "react";

export type SnackbarState = {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  icon: ReactNode;
};
