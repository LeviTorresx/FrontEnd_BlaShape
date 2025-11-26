import { Item } from "@/app/types/Item";
import Guillotine from "../sections/Guillotine";

type Props = {
  itemsProps:Item[];
}

export default function LayoutViewer({ itemsProps }: Props) {

  const items = itemsProps.length > 0
    ? itemsProps
    : []; // fallback seguro


  return (
    <Guillotine
      width={2430}
      height={1060}
      items={items}
      method="guillotine"
      kerf={0.5}
    />
  );
}

