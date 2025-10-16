import { ReactNode } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

type ActionType = "view" | "edit" | "delete";

interface ActionButtonProps {
  type: ActionType;
  onClick?: () => void;
  size?: number;
}

const actionConfig: Record<
  ActionType,
  { color: string; hover: string; ring: string; icon: ReactNode; title: string }
> = {
  view: {
    color: "text-purple-600",
    hover: "hover:bg-purple-50",
    ring: "focus-visible:ring-purple-300",
    icon: <FaEye />,
    title: "Ver más",
  },
  edit: {
    color: "text-amber-600",
    hover: "hover:bg-amber-50",
    ring: "focus-visible:ring-amber-300",
    icon: <FaEdit />,
    title: "Editar",
  },
  delete: {
    color: "text-red-600",
    hover: "hover:bg-red-50",
    ring: "focus-visible:ring-red-300",
    icon: <FaTrash />,
    title: "Eliminar",
  },
};

export function ActionButton({ type, onClick, size = 18 }: ActionButtonProps) {
  const config = actionConfig[type];

  return (
    <button
      onClick={onClick}
      title={config.title}
      className={`
        p-2 rounded-xl flex items-center justify-center 
        transition-all duration-200 
        ${config.color} ${config.hover} ${config.ring}
        bg-white/70 backdrop-blur-sm border border-gray-200
        shadow-sm hover:shadow-md 
        focus:outline-none focus-visible:ring-2
        hover:-translate-y-[1px] active:scale-95
      `}
    >
      <span
        className="flex items-center justify-center"
        style={{ fontSize: size }}
      >
        {config.icon}
      </span>
    </button>
  );
}

interface ActionButtonsGroupProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  size?: number;
}

export default function ActionButtonsGroup({
  onView,
  onEdit,
  onDelete,
  size = 18,
}: ActionButtonsGroupProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      {onView && <ActionButton type="view" onClick={onView} size={size} />}
      {onEdit && <ActionButton type="edit" onClick={onEdit} size={size} />}
      {onDelete && <ActionButton type="delete" onClick={onDelete} size={size} />}
    </div>
  );
}
