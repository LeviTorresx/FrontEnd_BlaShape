"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { Workshop } from "@/app/types/Workshop";

type WorkshopFormProps = {
  initialData?: Partial<Workshop>;
  carpenterId?: number;
  onSubmit: (data: Workshop) => void;
  submitLabel?: string;
};

export default function WorkshopForm({
  initialData = {},
  onSubmit,
  carpenterId,
  submitLabel = "Guardar",
}: WorkshopFormProps) {
  const [formData, setFormData] = useState<Workshop>({
    workshopId: initialData.workshopId,
    name: initialData.name || "",
    address: initialData.address || "",
    email: initialData.email || "",
    nit: initialData.nit || "",
    phone: initialData.phone || "",
    carpenterId: initialData.carpenterId || carpenterId || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      nit: formData.nit.trim() === "" ? "No aplica" : formData.nit,
    };

    onSubmit(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Nombre */}
      <Input
        label="Nombre del Taller"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ej: Taller Los Pinos"
        required
        className="w-full"
      />

      {/* Dirección */}
      <Input
        label="Dirección"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Ej: Calle 123 #45-67 Caucasia, Antioquia"
        required
        className="w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NIT */}
        <div className="w-full">
          <Input
            label="NIT"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
            placeholder="Ej: 900123456-7"
            required
            className="w-full"
          />
          <p className="text-sm text-red-500 mt-1">
            *Si es persona natural "No aplica"
          </p>
        </div>

        {/* Teléfono */}
        <Input
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+57 300 000 0000"
          required
          className="w-full"
        />
      </div>

      {/* Botón */}
      <Button
        label={submitLabel}
        type="submit"
        className="w-full py-3 rounded-md bg-purple-950 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
      />
    </form>
  );
}
