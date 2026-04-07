export type PaymentTab = "plans" | "subscription";

interface Props {
    tab: PaymentTab,
    setTab: (tab: PaymentTab) => void;
}

export default function PaymentTabs({ tab, setTab }: Props) {
    const tabs: PaymentTab[] = ["plans", "subscription"];
    const tabIndex = tabs.indexOf(tab);

    return (
        <div className="relative max-w-xs">
            <div className="grid grid-cols-2 bg-purple-100 rounded-xl p-1 relative shadow-inner">

                <div
                    className="absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow transition-transform duration-300"
                    style={{ transform: `translateX(${tabIndex * 100}%)` }}
                />

                <button
                    onClick={() => setTab("plans")}
                    className={`relative z-10 py-2 font-medium ${tab === "plans" ? "text-purple-700" : "text-gray-500"
                        }`}
                >
                    Planes
                </button>

                <button
                    onClick={() => setTab("subscription")}
                    className={`relative z-10 py-2 font-medium ${tab === "subscription" ? "text-purple-700" : "text-gray-500"
                        }`}
                >
                    Mi suscripción
                </button>

            </div>
        </div>
    )
}