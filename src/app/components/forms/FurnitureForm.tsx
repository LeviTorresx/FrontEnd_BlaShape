"use client";

import { Furniture } from "@/app/types/Furniture";
import { useState, useEffect } from "react";
import { FaSave, FaHammer } from "react-icons/fa";
import ButtonActions from "../ui/ButtonActions";

interface FurnitureFormProps {
  data?: Furniture;
  onSubmit: (furniture: Furniture) => void;
  buttonLabel?: string;
}

export default function FurnitureForm({
  data,
  onSubmit,
  buttonLabel = "Guardar",
}: FurnitureFormProps) {
  const [formData, setFormData] = useState<Furniture>({
    furnitureId: data?.furnitureId || 0,
    carpenterId: data?.carpenterId || 0,
    customerId: data?.customerId || 0,
    creationDate: data?.creationDate || new Date().toISOString(),
    endDate: data?.endDate || "",
    imageInitUrl: data?.imageInitUrl || "",
    name: data?.name || "",
    pieces: data?.pieces || [],
    status: data?.status || "INICIAL",
  });

  // Actualiza si llega data externa
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
    if (!formData.name.trim()) {
      alert("El nombre del mueble es obligatorio.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100"
    >
      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-3">
        <FaHammer className="text-purple-600 text-lg" />
        <h2 className="text-lg font-semibold text-gray-800">
          {data ? "Editar mueble" : "Nuevo mueble"}
        </h2>
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del mueble
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej. Mesa de comedor"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de creación
          </label>
          <input
            type="date"
            name="creationDate"
            value={formData.creationDate.split("T")[0]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de finalización
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
        >
          <option value="INICIAL">Inicial</option>
          <option value="EN_PROCESO">En proceso</option>
          <option value="FINALIZADO">Finalizado</option>
        </select>
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de imagen (opcional)
        </label>
        <input
          type="text"
          name="imageInitUrl"
          value={formData.imageInitUrl}
          onChange={handleChange}
          placeholder="https://ejemplo.com/mueble.jpg"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
        />
      </div>

      {/* Botón */}
      <div className="pt-3">
        <ButtonActions
          label={buttonLabel}
          type="submit"
          icon={<FaSave />}
          className="w-full"
        />
      </div>
    </form>
  );
}
