"use client";

import { TopCustomer } from "@/app/types/Analytics";
import { FaUserTie, FaIdCard, FaChair } from "react-icons/fa";

interface Props {
  data: TopCustomer[];
  loading?: boolean;
}

export default function TopCustomersTable({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <p className="text-sm text-gray-400 italic text-center py-6">
        Sin clientes registrados
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-purple-100 text-purple-800">
          <tr>
            <th className="p-3 text-left font-semibold">#</th>
            <th className="p-3 text-left font-semibold">
              <span className="flex items-center gap-1">
                <FaUserTie className="text-purple-600" /> Cliente
              </span>
            </th>
            <th className="p-3 text-left font-semibold">
              <span className="flex items-center gap-1">
                <FaIdCard className="text-purple-600" /> DNI
              </span>
            </th>
            <th className="p-3 text-center font-semibold">
              <span className="flex items-center justify-center gap-1">
                <FaChair className="text-purple-600" /> Muebles
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-100">
          {data.map((customer, index) => (
            <tr
              key={customer.dni}
              className="bg-purple-50 hover:bg-purple-100 transition-colors duration-150"
            >
              <td className="p-3 font-bold text-purple-400">
                {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : index + 1 === 3 ? "🥉" : `#${index + 1}`}
              </td>
              <td className="p-3 font-medium text-gray-800">{customer.fullName}</td>
              <td className="p-3 text-gray-500">{customer.dni}</td>
              <td className="p-3 text-center">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
                  {customer.furnitureCount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}