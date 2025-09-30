"use client";

import { CarpenterDTO } from "@/app/types/Carpenter";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";

type UserFormProps = {
  initialData?: {
    name?: string;
    lastName?: string;
    idNumber?: string;
    rut?: string;
    email?: string;
    password?: string;
    phone?: string;
  };
  onSubmit: (data: CarpenterDTO) => void;
  submitLabel?: string;
};

export default function UserForm({
  initialData = {},
  onSubmit,
  submitLabel = "Guardar",
}: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    lastName: initialData.lastName || "",
    idNumber: initialData.idNumber || "",
    rut: initialData.rut || "",
    email: initialData.email || "",
    password: initialData.password || "",
    confirmPassword: "",
    phone: initialData.phone || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
        />
        <Input
          label="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Tu apellido"
          required
        />
      </div>

      {/* Documento & RUT */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Cédula"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="Ej: 1234567890"
          required
        />
        <Input
          label="RUT"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
          placeholder="Ej: 12345678-9"
        />
      </div>

      {/* Correo */}
      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="ejemplo@correo.com"
        required
      />

      {/* Teléfono */}
      <Input
        label="Teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+57 300 000 0000"
        required
      />

      {/* Contraseña */}
      <PasswordInput
        label="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
        required
      />

      {/* Confirmar contraseña */}
      <PasswordInput
        label="Confirmar Contraseña"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="********"
        required
      />

      {/* Error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Botón */}
      <Button
        label={submitLabel}
        type="submit"
        className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
      />
    </form>
  );
}
