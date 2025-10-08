"use client";
import React, { useState } from "react";
import ClientsTable from "./components/ClientsTable";
import { FaPlus } from "react-icons/fa";
import ButtonActions from "@/app/components/ui/ButtonActions";
import { useGetCustomersQuery } from "@/app/services/mockCustomersApi";

export default function ClientsModule() {
  const { data: customers = [] } = useGetCustomersQuery();
  const [search, setSearch] = useState("");

  const filtered = customers.filter((customer) =>
    Object.values(customer).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateClient = () => {
    alert("Acción: Crear nuevo cliente (pendiente de implementar)");
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Gestión de Clientes
        </h1>

        <ButtonActions
          label="Nuevo Cliente"
          icon={<FaPlus className="text-sm" />}
          type="button"
          onClick={handleCreateClient}
        />
      </div>

      {/* Tabla */}
      <ClientsTable filtered={filtered} search={search} setSearch={setSearch} />
    </div>
  );
}
