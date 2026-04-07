import { SubscriptionStatus } from "@/app/types/Subscription";

interface Props {
    status: SubscriptionStatus;
}

const STATUS_CONFIG: Record<SubscriptionStatus, { label: string, className: string }> = {
    active: { label: "Activa", className: "bg-green-100 text-green-700 border-green-200" },
    trialing: { label: "En prueba", className: "bg-blue-100 text-blue-700 border-blue-200" },
    past_due: { label: "Pago vencido", className: "bg-amber-100 text-amber-700 border-amber-200" },
    canceled: { label: "Cancelada", className: "bg-red-100 text-red-700 border-red-200" },
    inactive: { label: "Inactiva", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

export default function SubscriptionStatusBadge({ status }: Props) {
    const { label, className } = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${className}`}>
            {label}
        </span>
    );
}