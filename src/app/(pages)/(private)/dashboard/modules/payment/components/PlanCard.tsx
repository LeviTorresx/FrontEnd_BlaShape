import { Plan } from "@/app/types/Subscription";
import Button from "@/app/components/ui/Button";
import { formatPrice } from "@/app/utils/formatPrice";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Props {
    plan: Plan;
    isCurrentPlan: boolean;
    isLoading: boolean;
    onSelect: () => void;
}

type FeatureDisplayValue = boolean | number | "unlimited" | "limited" | "single";

interface FeatureRow {
    label: string;
    value: FeatureDisplayValue;
}

function getFeatureRows(plan: Plan): FeatureRow[] {
    return [
        { label: "PDF", value: plan.pdf },
        { label: "SVG", value: plan.svg && !plan.limitedSvg ? true : plan.limitedSvg ? "limited" : false },
        { label: "Cortes", value: plan.cuttingLimit >= 9999 ? "unlimited" : plan.cuttingLimit === 1 ? "single" : plan.cuttingLimit },
        { label: "Historial", value: plan.cuttingLimit === 1 ? "single" : plan.limitedRecord ? "limited" : true },
        { label: "Licencia comercial", value: plan.businessLicence },
        { label: "Analíticas", value: plan.analyticsModule },
    ];
}

function FeatureValue({ value }: { value: FeatureDisplayValue }) {
    if (value === true) return <FaCheck className="text-green-500 mx-auto" />;
    if (value === false) return <FaTimes className="text-gray-300 mx-auto" />;
    if (value === "unlimited") return <span className="text-green-600 font-medium">Ilimitado</span>;
    if (value === "limited") return <span className="text-yellow-600 font-medium">Limitado</span>;
    if (value === "single") return <span className="text-gray-500">1 corte</span>;
    if (typeof value === "number") return <span className="text-gray-700">{value}/mes</span>;
    return null;
}

export default function PlanCard({ plan, isCurrentPlan, isLoading, onSelect }: Props) {
    const isPro = plan.planName === "PRO";
    const isSingleCut = plan.planName === "SINGLE_CUT";

    const ctaLabel = isCurrentPlan
        ? "Plan actual"
        : isLoading
            ? "Redirigiendo..."
            : isSingleCut
                ? "Comprar corte"
                : "Contratar";

    return (
        <div className={`flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${isPro ? "border-purple-400 bg-purple-950 text-white" : "border-gray-200 bg-white text-gray-800"
            }`}>

            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${isPro ? "text-white" : "text-gray-800"}`}>
                        {plan.planName}
                    </h3>
                    {isCurrentPlan && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                            Plan actual
                        </span>
                    )}
                </div>
                <p className={`text-2xl font-extrabold mt-2 ${isPro ? "text-purple-200" : "text-purple-800"}`}>
                    {formatPrice(plan.price, plan.planName === "SINGLE_CUT" ? "one_time" : plan.interval, plan.currency)}
                </p>
                {plan.description && (
                    <p className={`text-sm mt-1 ${isPro ? "text-purple-300" : "text-gray-400"}`}>
                        {plan.description}
                    </p>
                )}
            </div>

            {/* Features */}
            <div className="flex-1 mb-6">
                <table className="w-full text-sm">
                    <tbody>
                        {getFeatureRows(plan).map(({ label, value }) => (
                            <tr key={label} className={`border-b ${isPro ? "border-purple-800" : "border-gray-100"}`}>
                                <td className={`py-2 ${isPro ? "text-purple-200" : "text-gray-500"}`}>{label}</td>
                                <td className="py-2 text-center">
                                    <FeatureValue value={value} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CTA */}
            <Button
                label={ctaLabel}
                disabled={isCurrentPlan || isLoading}
                onClick={onSelect}
                className={`w-full ${isPro ? "bg-white !text-purple-950 hover:bg-purple-100" : ""}`}
            />
        </div>
    );
}