"use client";

import { PLAN_LABELS } from "../constant";
import { formatDate } from "@/app/utils/formatDate";
import { Subscription } from "@/app/types/Subscription";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
    subscription: Subscription | null;
    isLoading: boolean;
}

export default function SubscriptionSection({ subscription, isLoading }: Props) {
    if (isLoading) {
        return <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />;
    }

    if (!subscription) {
        return (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl text-gray-500">
                No tienes ninguna suscripción activa.
            </div>
        );
    }

    const { status, startDate, endDate, plan } = subscription;
    const planLabel = PLAN_LABELS[plan.planName] ?? plan.planName;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5 max-w-lg">

            {/* Plan y estado */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Plan actual</p>
                    <p className="text-xl font-bold text-gray-800">{planLabel}</p>
                </div>
                <SubscriptionStatusBadge status={status} />
            </div>

            {/* Período */}
            <div className="flex items-start gap-3 text-sm text-gray-600">
                <FaCalendarAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                    <p>Desde <span className="font-medium text-gray-800">{formatDate(startDate)}</span></p>
                    <p>Próximo cobro el <span className="font-medium text-gray-800">{formatDate(endDate)}</span></p>
                </div>
            </div>

            {/* TODO: añadir cancelar/reactivar cuando el backend exponga los endpoints */}
        </div>
    );
}
