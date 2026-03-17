"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  severity: "error" | "warning" | "info" | "success";
  icon?: ReactNode;
  message: string;
  autoHideDuration?: number;
};

const SEVERITY_STYLES: Record<string, string> = {
  success: "bg-purple-50 border-purple-300 text-purple-900",
  error: "bg-red-50 border-red-300 text-red-900",
  warning: "bg-amber-50 border-amber-300 text-amber-900",
  info: "bg-blue-50 border-blue-300 text-blue-900",
};

const ICON_STYLES: Record<string, string> = {
  success: "text-purple-600",
  error: "text-red-600",
  warning: "text-amber-600",
  info: "text-blue-600",
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
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm max-w-sm ${SEVERITY_STYLES[severity]}`}
        >
          {icon && (
            <span className={`mt-0.5 flex-shrink-0 text-2xl ${ICON_STYLES[severity]}`}>
              {icon}
            </span>
          )}

          <p className="flex-1 text-2xl font-medium leading-snug">
            {message}
          </p>

          <button
            onClick={onClose}
            className="flex-shrink-0 mt-0.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar notificación"
          >
            <IoMdClose className="text-2xl justify-center" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
