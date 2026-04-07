import { SubscriptionStatus } from "@/app/types/Subscription";

interface Props {
    status: SubscriptionStatus;
}

const STATUS_CONFIG: Record<SubscriptionStatus, { label: string; className: string }> = {
    ACTIVE: { label: "Activa", className: "bg-green-100 text-green-700 border-green-200" },
    PAST_DUE: { label: "Pago vencido", className: "bg-amber-100 text-amber-700 border-amber-200" },
    CANCELED: { label: "Cancelada", className: "bg-red-100 text-red-700 border-red-200" },
    INCOMPLETE: { label: "Incompleta", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

export default function SubscriptionStatusBadge({ status }: Props) {
    const { label, className } = STATUS_CONFIG[status] ?? STATUS_CONFIG.INCOMPLETE;
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${className}`}>
            {label}
        </span>
    );
}