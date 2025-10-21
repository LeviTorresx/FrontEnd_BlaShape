"use client";

import { CarpenterDTO } from "@/app/types/Carpenter";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";

type UserFormProps = {
  initialData?: Partial<CarpenterDTO>;
  onSubmit: (data: CarpenterDTO & { confirmPassword?: string }) => void;
  submitLabel?: string;
};

export default function UserForm({
  initialData = {},
  onSubmit,
  submitLabel = "Guardar",
}: UserFormProps) {
  // 🔹 Estado inicial con todos los campos necesarios
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    lastName: initialData.lastName || "",
    dni: initialData.dni || "",
    rut: initialData.rut || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    onSubmit(dataToSend as CarpenterDTO);
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
          name="dni"
          value={formData.dni}
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

      {/* Correo y teléfono */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          required
        />
        <Input
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+57 300 000 0000"
          required
        />
      </div>

      {/* Contraseña y confirmación */}
      <PasswordInput
        label="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
        required
      />
      <PasswordInput
        label="Confirmar Contraseña"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="********"
        required
      />

      {/* Error */}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Botón */}
      <Button
        label={submitLabel}
        type="submit"
        className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
      />
    </form>
  );
}
