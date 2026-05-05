"use client";

import { useEffect, useState } from "react";
import {
  FaCommentDots,
  FaUser,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { PqrsRequest, PqrsType, PqrsTypeLabels } from "@/app/types/Pqrs";

export interface GuestPrefill {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface PqrsFormProps {
  carpenterId: number;
  /** Datos a precargar en los campos guest (ej: del carpintero logueado) */
  initialGuestData?: GuestPrefill;
  /** Mensaje opcional que aparece arriba si los datos vienen precargados */
  prefillNotice?: string;
  onSubmit: (data: PqrsRequest) => void | Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function PqrsForm({
  carpenterId,
  initialGuestData,
  prefillNotice,
  onSubmit,
  submitLabel = "Enviar PQRS",
  isLoading = false,
}: PqrsFormProps) {
  const [formData, setFormData] = useState<PqrsRequest>({
    subject: "",
    message: "",
    type: "PETICION",
    carpenterId,
    guestName: initialGuestData?.name ?? "",
    guestLastName: initialGuestData?.lastName ?? "",
    guestEmail: initialGuestData?.email ?? "",
    guestPhone: initialGuestData?.phone ?? "",
  });

  const [error, setError] = useState<string | null>(null);

  // Si cambia el prefill (ej: el usuario inicia sesión mientras está en la página)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      guestName: initialGuestData?.name ?? prev.guestName,
      guestLastName: initialGuestData?.lastName ?? prev.guestLastName,
      guestEmail: initialGuestData?.email ?? prev.guestEmail,
      guestPhone: initialGuestData?.phone ?? prev.guestPhone,
    }));
  }, [initialGuestData]);

  // Si cambia el carpenterId (cuando el usuario cambia de taller en el selector)
  useEffect(() => {
    setFormData((prev) => ({ ...prev, carpenterId }));
  }, [carpenterId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      setError("El asunto es obligatorio");
      return;
    }
    if (!formData.message.trim()) {
      setError("El mensaje es obligatorio");
      return;
    }
    if (!formData.guestName?.trim()) {
      setError("Debes ingresar tu nombre");
      return;
    }
    if (!formData.guestEmail?.trim()) {
      setError("Debes ingresar tu correo");
      return;
    }
    if (!formData.guestEmail.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)) {
      setError("El formato del correo no es válido");
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {prefillNotice && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-sm text-purple-800 flex items-start gap-2">
          <FaInfoCircle className="text-purple-600 mt-0.5 shrink-0" />
          <span>{prefillNotice}</span>
        </div>
      )}

      {/* Tipo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de solicitud
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-900"
        >
          {(Object.keys(PqrsTypeLabels) as PqrsType[]).map((t) => (
            <option key={t} value={t}>
              {PqrsTypeLabels[t]}
            </option>
          ))}
        </select>
      </div>

      {/* Asunto */}
      <Input
        label="Asunto"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Resumen breve de tu solicitud"
        required
      />

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Mensaje
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe tu solicitud con el mayor detalle posible..."
          rows={5}
          required
          maxLength={2000}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900 resize-y"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {formData.message.length}/2000
        </p>
      </div>

      {/* Datos de contacto */}
      <div className="border-t border-gray-200 pt-5 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUser className="text-purple-600" />
          <span>Tus datos de contacto</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            name="guestName"
            value={formData.guestName ?? ""}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
          <Input
            label="Apellido"
            name="guestLastName"
            value={formData.guestLastName ?? ""}
            onChange={handleChange}
            placeholder="Tu apellido"
          />
        </div>

        <Input
          label="Correo electrónico"
          name="guestEmail"
          type="email"
          value={formData.guestEmail ?? ""}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          required
        />

        <Input
          label="Teléfono (opcional)"
          name="guestPhone"
          value={formData.guestPhone ?? ""}
          onChange={handleChange}
          placeholder="+57 300 000 0000"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600 leading-relaxed">
          <p className="flex items-start gap-2">
            <FaEnvelope className="text-purple-600 mt-0.5 shrink-0" />
            Recibirás en tu correo un enlace de seguimiento para consultar el
            estado de tu PQRS sin necesidad de crear una cuenta.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <Button
        label={isLoading ? "Enviando..." : submitLabel}
        type="submit"
        icon={<FaCommentDots />}
        disabled={isLoading}
        className="w-full"
      />
    </form>
  );
}