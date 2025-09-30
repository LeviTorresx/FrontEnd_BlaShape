
import Alert from '@mui/material/Alert';
import { ReactNode } from 'react';


type Props = {
    severity: "error" | "warning" | "info" | "success";
    icon: ReactNode;
    label: string;
};

export default function SimpleAlert({ severity, icon, label }: Props) {
  return (
    <Alert icon={icon} severity={severity}>
      {label}
    </Alert>
  );
}
