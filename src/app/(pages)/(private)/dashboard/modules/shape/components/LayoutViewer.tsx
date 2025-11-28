import { useState, useRef } from "react";
import { GroupedItems } from "@/app/types/Item";
import Guillotine, { GuillotineRef } from "../sections/cut/Guillotine";
import Button from "@/app/components/ui/Button";
import { PiFilePdf } from "react-icons/pi";

type Props = {
  groupedItems: GroupedItems[];
};

export default function LayoutViewer({ groupedItems }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<GroupedItems | null>(null);
  const guillotineRef = useRef<GuillotineRef>(null);

  // Items que se enviarán a Guillotine
  const itemsToRender = selectedGroup ? selectedGroup.items : [];

  const handleExportPDF = async () => {
    if (guillotineRef.current) {
      await guillotineRef.current.exportAllSheetsToPDF();
    }
  };

  return (
    <div className="flex gap-6">
      {/* LISTADO DE GRUPOS */}
      <div className="w-80 bg-purple-100 rounded-2xl shadow-sm border border-gray-200 p-5 h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Filtrar por color
        </h2>

        {/* Botón para mostrar TODOS */}
        <button
          onClick={() => setSelectedGroup(null)}
          className={`w-full mb-4 py-2.5 rounded-xl transition-all duration-200 font-medium
            ${
              !selectedGroup
                ? "bg-purple-600 text-white shadow-md"
                : "bg-purple-200 text-gray-700 hover:bg-purple-300"
            }
          `}
        >
          Blashape
        </button>

        <div className="flex flex-col gap-2">
          {groupedItems.map((group) => {
            const active = selectedGroup?.key === group.key;

            return (
              <button
                key={group.key}
                onClick={() => setSelectedGroup(group)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                  ${
                    active
                      ? "text-white bg-purple-700 shadow-md"
                      : "bg-purple-200 text-gray-800 hover:bg-purple-300"
                  }
                `}
              >
                <span className="font-bold">{group.colorName}</span>

                <span
                  className="w-5 h-5 rounded-full border border-gray-400 shadow-sm"
                  style={{
                    backgroundColor: group.colorHex,
                    transform: active ? "scale(1.1)" : "scale(1)",
                  }}
                ></span>
              </button>
            );
          })}
        </div>

      </div>

      {/* VISOR DEL PACKING */}
      <div className="flex justify-center w-full h-full">
        <Guillotine
          ref={guillotineRef}
          width={2430}
          height={2130}
          items={itemsToRender}
          method="guillotine"
          kerf={0.5}
        />
      </div>
    </div>
  );
}