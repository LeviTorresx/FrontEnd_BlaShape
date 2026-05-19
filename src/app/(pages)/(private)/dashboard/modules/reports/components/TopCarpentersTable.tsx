"use client";

import { TopCarpenter, TopCarpenterAmount } from "@/app/types/Analytics";
import { FaHammer, FaDollarSign } from "react-icons/fa";

interface TopCarpenterProps {
  data: TopCarpenter[];
  loading?: boolean;
  mode: "cuttings" | "payments";
}

interface TopCarpenterAmountProps {
  data: TopCarpenterAmount[];
  loading?: boolean;
  mode: "amount";
}

type Props = TopCarpenterProps | TopCarpenterAmountProps;

function medal(index: number) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `#${index + 1}`;
}

export default function TopCarpentersTable(props: Props) {
  const { loading } = props;

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!props.data.length) {
    return (
      <p className="text-sm text-gray-400 italic text-center py-6">
        Sin datos disponibles
      </p>
    );
  }

  if (props.mode === "amount") {
    const amountData = props.data as TopCarpenterAmount[];
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-emerald-100 text-emerald-800">
            <tr>
              <th className="p-3 text-left font-semibold">#</th>
              <th className="p-3 text-left font-semibold">Carpintero</th>
              <th className="p-3 text-right font-semibold">
                <span className="flex items-center justify-end gap-1">
                  <FaDollarSign /> Total generado
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {amountData.map((c, i) => (
              <tr key={c.carpenterId} className="bg-emerald-50 hover:bg-emerald-100 transition-colors duration-150">
                <td className="p-3 font-bold text-emerald-400">{medal(i)}</td>
                <td className="p-3 font-medium text-gray-800">{c.fullName}</td>
                <td className="p-3 text-right">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    ${c.totalAmount.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const countData = props.data as TopCarpenter[];
  const isPayments = props.mode === "payments";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <table className="min-w-full text-sm text-gray-700">
        <thead className={`${isPayments ? "bg-indigo-100 text-indigo-800" : "bg-violet-100 text-violet-800"}`}>
          <tr>
            <th className="p-3 text-left font-semibold">#</th>
            <th className="p-3 text-left font-semibold">Carpintero</th>
            <th className="p-3 text-right font-semibold">
              <span className="flex items-center justify-end gap-1">
                <FaHammer /> {isPayments ? "Pagos" : "Cortes"}
              </span>
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isPayments ? "divide-indigo-50" : "divide-violet-50"}`}>
          {countData.map((c, i) => (
            <tr
              key={c.carpenterId}
              className={`${isPayments ? "bg-indigo-50 hover:bg-indigo-100" : "bg-violet-50 hover:bg-violet-100"} transition-colors duration-150`}
            >
              <td className={`p-3 font-bold ${isPayments ? "text-indigo-400" : "text-violet-400"}`}>{medal(i)}</td>
              <td className="p-3 font-medium text-gray-800">{c.fullName}</td>
              <td className="p-3 text-right">
                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold text-white ${isPayments ? "bg-indigo-600" : "bg-violet-600"}`}>
                  {c.count}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}