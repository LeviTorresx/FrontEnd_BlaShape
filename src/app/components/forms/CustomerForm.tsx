"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaIdCard,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Customer } from "@/app/types/Customer";
import Button from "../ui/Button";

interface CustomerFormProps {
  data?: Customer;
  carpenterId?: number;
  onSubmit: (customer: Customer) => void;
  onClose?: () => void;
  buttonLabel?: string;
}

export default function CustomerForm({
  data,
  carpenterId,
  onSubmit,
  buttonLabel = "Guardar",
  onClose,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<Customer>({
    customerId: data?.customerId,
    name: data?.name || "",
    lastName: data?.lastName || "",
    phone: data?.phone || "",
    email: data?.email || "",
    dni: data?.dni || "",
    role: data?.role || "default",
    carpenterId: carpenterId,
    furnitureList: data?.furnitureList || [],
  });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("El nombre es obligatorio");
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-5 p-6 rounded-2xl shadow-md border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <FaUser className="text-purple-700 text-lg" />
        <h2 className="text-lg md:text-xl font-semibold text-purple-900">
          {data ? "Cliente" : "Nuevo cliente"}
        </h2>
      </div>

      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
            placeholder="Ej. Juan"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
            placeholder="Ej. Pérez"
          />
        </div>
      </div>

      {/* Teléfono y DNI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaPhoneAlt className="inline mr-1 text-purple-600" />
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
            placeholder="555-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaIdCard className="inline mr-1 text-purple-600" />
            DNI / Cédula
          </label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
            placeholder="ABC12345"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FaEnvelope className="inline mr-1 text-purple-600" />
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
          placeholder="cliente@email.com"
        />
      </div>

      {/* Botones de acción */}
      <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
        <Button
          label="Cancelar"
          onClick={onClose}
          
          className="w-full sm:w-auto bg-red-500 hover:bg-red-400 text-white font-medium"
        />
        <Button
          label={buttonLabel}
          type="submit"
          
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-medium"
        />
      </div>
    </form>
  );
}
