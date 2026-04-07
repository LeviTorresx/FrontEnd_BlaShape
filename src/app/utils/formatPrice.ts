const INTERVAL_LABELS: Record<string, string> = {
    MONTH: "/ mes",
    YEAR: "/ año",
    WEEK: "/ semana",
    DAY: "/ día",
    one_time: "/ corte",
};

export const formatPrice = (price: number, interval: string, currency: string = "COP"): string => {
    const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: 0,
    }).format(price);
    return `${formatted} ${INTERVAL_LABELS[interval] ?? "/ mes"}`;
};