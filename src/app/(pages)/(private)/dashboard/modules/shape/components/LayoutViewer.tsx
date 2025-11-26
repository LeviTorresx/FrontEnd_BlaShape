import { Item } from "@/app/types/Item";
import Guillotine from "../sections/Guillotine";

type Props = {
  itemsProps:Item[];
}

export default function LayoutViewer({ itemsProps }: Props) {

  const items = itemsProps.length > 0
    ? itemsProps
    : []; // fallback seguro

    const itemsPrueba = [
    { width: 500, height: 450, color: { hex: "#ff6b6b" } },

    { width: 460, height: 400, color: { hex: "#4ecdc4" } },

    { width: 470, height: 400, color: { hex: "#4ecdc4" } },
    { width: 470, height: 400, color: { hex: "#4ecdc4" } },

    { width: 460, height: 150, color: { hex: "#96ceb4" } },
    { width: 460, height: 150, color: { hex: "#96ceb4" } },
    { width: 460, height: 150, color: { hex: "#96ceb4" } },

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
    
  ];

  return (
    <Guillotine
      width={2430}
      height={1060}
      items={itemsPrueba}
      method="guillotine"
      kerf={0.5}
    />
  );
}

