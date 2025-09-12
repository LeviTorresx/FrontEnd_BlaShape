"use client";

import { CarpenterDTO } from "@/app/types/Carpenter";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Button from "../ui/Button";

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

  const [showPassword, setShowPassword] = useState(false);
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
        <div>
          <label className="block text-gray-800 mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
            placeholder="Tu apellido"
            required
          />
        </div>
      </div>

      {/* Documento & RUT */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-800 mb-1">Cédula</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
            placeholder="Ej: 1234567890"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">RUT</label>
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
            placeholder="Ej: 12345678-9"
          />
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-gray-800 mb-1">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
          placeholder="ejemplo@correo.com"
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-gray-800 mb-1">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
          placeholder="+57 300 000 0000"
          required
        />
      </div>

      {/* Contraseña */}
      <div className="relative">
        <label className="block text-gray-800 mb-1">Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
          placeholder="********"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Confirmar contraseña */}
      <div className="relative">
        <label className="block text-gray-800 mb-1">Confirmar Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
          placeholder="********"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Botón */}
      <Button
      label={submitLabel}
        type="submit"
        className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
      >
      </Button>
    </form>
  );
}
