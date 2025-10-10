"use client";

import { useState, useEffect } from "react";
import { Alert } from "@/app/types/Alert";
import { FaExclamationTriangle, FaSave } from "react-icons/fa";
import ButtonActions from "../ui/ButtonActions";

type AlertFormProps = {
  data?: Alert;
  onSubmit: (alert: Alert) => void;
  buttonLabel?: string;
};

export default function AlertForm({
  data,
  onSubmit,
  buttonLabel = "Guardar",
}: AlertFormProps) {
  const [formData, setFormData] = useState<Alert>({
    alertId: data?.alertId || 0,
    mensaje: data?.mensaje || "",
    date: data?.date || "",
    time: data?.time || "",
    severity: data?.severity || "LOW",
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
    if (!formData.mensaje.trim()) return alert("El mensaje es obligatorio");
    onSubmit(formData);
  };

  const severityStyles = {
    HIGH: "bg-red-50 border-red-300 ring-red-400/30",
    MEDIUM: "bg-yellow-50 border-yellow-300 ring-yellow-400/30",
    LOW: "bg-green-50 border-green-300 ring-green-400/30",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-md mx-auto space-y-5 p-6 rounded-2xl shadow-md border transition-all duration-300 ${
        severityStyles[formData.severity]
      }`}
    >
      {/* Título */}
      <div className="flex items-center gap-2 mb-2">
        <FaExclamationTriangle
          className={`text-lg ${
            formData.severity === "HIGH"
              ? "text-red-600"
              : formData.severity === "MEDIUM"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        />
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {data ? "Editar alerta" : "Nueva alerta"}
        </h2>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje
        </label>
        <input
          type="text"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full p-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
          placeholder="Ej. Revisar entrega de muebles"
        />
      </div>

      {/* Fecha y hora */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>
      </div>

      {/* Severidad */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Severidad
        </label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className={`w-full p-2.5 text-sm md:text-base rounded-lg border font-medium focus:ring-2 focus:ring-purple-400 outline-none ${
            formData.severity === "HIGH"
              ? "border-red-400 bg-red-50 text-red-700"
              : formData.severity === "MEDIUM"
              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
              : "border-green-400 bg-green-50 text-green-700"
          }`}
        >
          <option value="HIGH">Alta</option>
          <option value="MEDIUM">Media</option>
          <option value="LOW">Baja</option>
        </select>
      </div>

      {/* Botón */}
      <div className="pt-3 flex justify-center w-full">
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
