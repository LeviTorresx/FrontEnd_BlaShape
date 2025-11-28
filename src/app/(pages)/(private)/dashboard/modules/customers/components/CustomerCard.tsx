import React from "react";
import { Customer } from "@/app/types/Customer";
import { FaPhone, FaEnvelope, FaIdCard } from "react-icons/fa";
import { MdChair } from "react-icons/md";

type Props = {
  customer: Customer;
};

export default function CustomerCard({ customer }: Props) {
  if (!customer) return null;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 leading-tight">
            {`${customer.name} ${customer.lastName}`}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            ID Cliente #{customer.customerId}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
          {customer.role || "Cliente"}
        </span>
      </div>

      {/* Información del cliente */}
      <div className="space-y-2 text-gray-700 text-sm md:text-base">
        <div className="flex items-center gap-3">
          <FaPhone className="text-purple-500" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-purple-500" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaIdCard className="text-purple-500" />
          <span>CC: {customer.dni}</span>
        </div>
      </div>

      {/* Lista de muebles */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <MdChair className="text-purple-600" />
          Muebles asociados
        </h3>

        {customer.furnitureListIds && customer.furnitureListIds.length > 0 ? (
          <ul className="divide-y divide-gray-100 rounded-lg border border-gray-100 overflow-hidden">
            {customer.furnitureListIds.map((furniture, i) => (
              <li
                key={i}
                className="px-4 py-2 bg-gray-50 hover:bg-purple-100 transition-colors duration-200"
              >
                <p className="font-medium text-gray-800">{furniture}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-sm text-center py-4 border border-dashed border-gray-200 rounded-lg">
            Este cliente no tiene muebles registrados.
          </p>
        )}
      </div>
    </div>
  );
}
