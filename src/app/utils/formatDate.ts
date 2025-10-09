export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  }).format(d);
};
