import {
  PqrsStatus,
  PqrsStatusLabels,
  PqrsStatusStyles,
  PqrsType,
  PqrsTypeLabels,
  PqrsTypeStyles,
} from "@/app/types/Pqrs";

export function PqrsStatusBadge({ status }: { status: PqrsStatus }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${PqrsStatusStyles[status]}`}
    >
      {PqrsStatusLabels[status]}
    </span>
  );
}

export function PqrsTypeBadge({ type }: { type: PqrsType }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${PqrsTypeStyles[type]}`}
    >
      {PqrsTypeLabels[type]}
    </span>
  );
}