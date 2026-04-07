import { Plan } from "@/app/types/Subscription";
import Button from "@/app/components/ui/Button";
import { formatPrice } from "@/app/utils/formatPrice";
import { FaCheck, FaTimes, FaMinus } from "react-icons/fa";

interface Props {
    plan: Plan;
    isCurrentPlan: boolean;
    onSelect: () => void;
}

const featureRows: { label: string; key: keyof Plan["features"] }[] = [
    { label: "PDF", key: "pdf" },
    { label: "SVG", key: "svg" },
    { label: "Cortes", key: "cuts" },
    { label: "Historial", key: "history" },
    { label: "Licencia comercial", key: "commercialLicense" },
    { label: "Analíticas", key: "analytics" },
];

function FeatureValue({ value }: { value: Plan["features"][keyof Plan["features"]] }) {
    if (value === true) return <FaCheck className="text-green-500 mx-auto" />;
    if (value === false) return <FaTimes className="text-gray-300 mx-auto" />;
    if (value === "full") return <span className="text-green-600 font-medium">Completo</span>;
    if (value === "limited") return <span className="text-yellow-600 font-medium">Limitado</span>;
    if (value === "single") return <span className="text-gray-500">1 corte</span>;
    if (value === "unlimited") return <span className="text-green-600 font-medium">Ilimitado</span>;
    if (typeof value === "number") return <span className="text-gray-700">{value}/mes</span>;
    return <FaMinus className="text-gray-300 mx-auto" />;
}

export default function PlanCard({ plan, isCurrentPlan, onSelect }: Props) {
    const isPro = plan.planId === "PRO";

    return (
        <div className={`flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${isPro
                ? "border-purple-400 bg-purple-950 text-white"
                : "border-gray-200 bg-white text-gray-800"
            }`}>
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${isPro ? "text-white" : "text-gray-800"}`}>
                        {plan.name}
                    </h3>
                    {isCurrentPlan && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                            Plan actual
                        </span>
                    )}
                </div>
                <p className={`text-2xl font-extrabold mt-2 ${isPro ? "text-purple-200" : "text-purple-800"}`}>
                    {formatPrice(plan.price, plan.interval)}
                </p>
            </div>

            {/* Features */}
            <div className="flex-1 mb-6">
                <table className="w-full text-sm">
                    <tbody>
                        {featureRows.map(({ label, key }) => (
                            <tr key={key} className={`border-b ${isPro ? "border-purple-800" : "border-gray-100"}`}>
                                <td className={`py-2 ${isPro ? "text-purple-200" : "text-gray-500"}`}>{label}</td>
                                <td className="py-2 text-center">
                                    <FeatureValue value={plan.features[key]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CTA */}
            <Button
                label={isCurrentPlan ? "Plan actual" : plan.planId === "SINGLE_CUT" ? "Comprar corte" : "Contratar"}
                disabled={isCurrentPlan}
                onClick={onSelect}
                className={`w-full ${isPro ? "bg-white !text-purple-950 hover:bg-purple-100 hover:!text-white " : ""}`}
            />
        </div>
    );
}
