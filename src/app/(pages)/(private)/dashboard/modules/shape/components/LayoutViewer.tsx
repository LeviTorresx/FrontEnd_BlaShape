import { useState } from "react";
import { GroupedItems } from "@/app/types/Item";
import Guillotine from "../sections/Guillotine";

type Props = {
  groupedItems: GroupedItems[];
};

export default function LayoutViewer({ groupedItems }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<GroupedItems | null>(null);

  // Items que se enviarán a Guillotine
  const itemsToRender = selectedGroup ? selectedGroup.items : [];

  return (
    <div className="flex gap-6">
      {/* LISTADO DE GRUPOS */}
      <div className="w-80 border p-4 rounded">
        <h2 className="font-bold mb-3">Grupos por color</h2>

        {/* Botón para mostrar TODOS (vaciar selección) */}
        <button
          onClick={() => setSelectedGroup(null)}
          className={`w-full mb-3 p-2 rounded border ${
            !selectedGroup ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Mostrar todos (vacío)
        </button>

        {groupedItems.map((group) => (
          <button
            key={group.key}
            onClick={() => setSelectedGroup(group)}
            className={`w-full text-left mb-2 p-2 rounded border flex items-center gap-2 
              ${
                selectedGroup?.key === group.key
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
          >
            <div
              style={{
                width: 16,
                height: 16,
                background: group.colorHex,
                borderRadius: 4,
                border: "1px solid #0002",
              }}
            />
            <span>
              {group.colorName} ({group.colorHex})
            </span>
          </button>
        ))}
      </div>

      {/* VISOR DEL PACKING */}
      <Guillotine
        width={2430}
        height={1060}
        items={itemsToRender}
        method="guillotine"
        kerf={0.5}
      />
    </div>
  );
}
