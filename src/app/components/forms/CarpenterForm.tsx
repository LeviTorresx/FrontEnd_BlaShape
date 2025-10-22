"use client";

import { Carpenter, CarpenterDTO } from "@/app/types/Carpenter";
import { use, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import { Workshop } from "@/app/types/Workshop";

type UserFormProps = {
  initialData?: Partial<Carpenter>;
  onSubmit: (data: Carpenter) => void;
  submitLabel?: string;
  mode?: "create" | "edit";
};

const defaultWorkshop: Workshop = {
  workshopId: 0,
  name: "",
  address: "",
  phone: "",
  carpenterId: 0,
  email: "",
  nit: "",
};

export default function UserForm({
  initialData = {},
  onSubmit,
  submitLabel = "Guardar",
  mode = "create",
}: UserFormProps) {
  const [formData, setFormData] = useState<Carpenter>({
    carpenterId: initialData.carpenterId,
    name: initialData.name || "",
    lastName: initialData.lastName || "",
    dni: initialData.dni || "",
    rut: initialData.rut || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    password: "",
    furnitureListIds: initialData.furnitureListIds || [],
    workshop: initialData.workshop || defaultWorkshop,
  });

  const [confirmPassword, setConfirmPasswoerd] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPasswoerd(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de contraseñas solo en modo "create"
    if (mode === "create" && formData.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Se llama la función del padre con los datos
    const dataToSend: CarpenterDTO = {
      ...formData,
      password: formData.password || initialData.password || "",
    };
    onSubmit(dataToSend as Carpenter);
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
          disabled={mode === "edit"}
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
          disabled={mode === "edit"}
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

      {/* Contraseñas solo en modo creación */}
      {mode === "create" && (
        <>
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
            value={confirmPassword}
            onChange={handleChange}
            placeholder="********"
            required
          />
        </>
      )}

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
