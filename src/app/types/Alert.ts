export interface Alert {
  alertId: number;
  mensaje: string;
  date: string;
  time: string;
  severity: "HIGH"| "MEDIUM" |"LOW";

}
