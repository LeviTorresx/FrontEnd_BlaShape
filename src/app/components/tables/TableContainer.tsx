import { ReactNode } from "react";

export default function TableContainer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </section>
  );
}
