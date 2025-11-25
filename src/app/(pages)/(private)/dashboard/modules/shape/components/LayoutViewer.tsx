import Guillotine from "../sections/Guillotine";
import { gruopedPieces } from "@/app/types/Piece";

export default function LayoutViewer() {
  const items = [
    { width: 450, height: 500, color: { hex: "#ff6b6b" } },

    { width: 400, height: 460, color: { hex: "#4ecdc4" } },

    { width: 400, height: 470, color: { hex: "#4ecdc4" } },
    { width: 400, height: 470, color: { hex: "#4ecdc4" } },

    { width: 460, height: 150, color: { hex: "#96ceb4" } },
    { width: 460, height: 150, color: { hex: "#96ceb4" } },
    { width: 460, height: 150, color: { hex: "#96ceb4" } },

    { width: 375, height: 120, color: { hex: "#FAFFC9" } },
    { width: 375, height: 120, color: { hex: "#FAFFC9" } },
    { width: 375, height: 120, color: { hex: "#FAFFC9" } },
    { width: 375, height: 120, color: { hex: "#FAFFC9" } },
    { width: 375, height: 120, color: { hex: "#FAFFC9" } },
    { width: 375, height: 120, color: { hex: "#FAFFC9" } },
    { width: 375, height: 120, color: { hex: "#FAFFC9" } },

    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
    { width: 350, height: 120, color: { hex: "#F1C9FF" } },
  ];

  return (
    <Guillotine
      width={2430} // Ancho de la lámina
      height={1060} // Alto de la lámina
      items={items}
      method="guillotine" // Método de corte
      kerf={0.5} // 0.5mm de ancho de corte
    />
  );
}
