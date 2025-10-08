"use client";
import React, { useState } from "react";
import ClientsTable from "./components/ClientsTable";
import { FaPlus } from "react-icons/fa";
import ButtonActions from "@/app/components/ui/ButtonActions";

const clients = [
  {
    id: "1",
    name: "Juan Pérez",
    phone: "555-1234",
    address: "Calle Falsa 123",
    dni: "12345678A",
  },
  {
    id: "2",
    name: "María García",
    phone: "555-5678",
    address: "Avenida Siempre Viva 742",
    dni: "87654321B",
  },
  {
    id: "3",
    name: "Carlos López",
    phone: "555-8765",
    address: "Plaza Mayor 1",
    dni: "11223344C",
  },
  {
    id: "4",
    name: "Ana Martínez",
    phone: "555-4321",
    address: "Calle del Sol 45",
    dni: "44332211D",
  },
  {
    id: "5",
    name: "Luis Fernández",
    phone: "555-6789",
    address: "Camino Real 99",
    dni: "55667788E",
  },
  {
    id: "6",
    name: "Sofía Sánchez",
    phone: "555-9876",
    address: "Ronda de la Luna 12",
    dni: "99887766F",
  },
  {
    id: "7",
    name: "Miguel Torres",
    phone: "555-3456",
    address: "Avenida del Mar 77",
    dni: "66778899G",
  },
];

export default function ClientsModule() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter((client) =>
    Object.values(client).some((v) =>
      v.toLowerCase().includes(search.toLowerCase())
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
