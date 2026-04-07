export const formatPrice = (price: number, interval: string) => {
    const dollars = (price / 100).toFixed(0);
    return interval === "one_time" ? `$${dollars} USD / corte` : `$${dollars} USD / mes`;
}