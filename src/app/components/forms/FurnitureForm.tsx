"use client";
import { useState, ChangeEvent } from "react";
import { Furniture } from "@/app/types/Furniture";
import { Customer } from "@/app/types/Customer";
import { useRouter } from "next/navigation";
import { FaFilePdf, FaImage, FaUser } from "react-icons/fa";
import Image from "next/image";
import Input from "../ui/Input";

interface FurnitureFormProps {
  data?: Furniture;
  onSubmit: (furniture: Furniture) => void;
  customers?: Customer[];
}

export default function FurnitureForm({
  data,
  onSubmit,
  customers = [],
}: FurnitureFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(data);

  const [formData, setFormData] = useState<Furniture>(
    data || {
      furnitureId: 0,
      carpenterId: 0,
      customerId: 0,
      creationDate: new Date().toISOString().split("T")[0], // formato YYYY-MM-DD
      endDate: "",
      imageInitUrl: "",
      imageEndUrl: "",
      documentUrl: "",
      name: "",
      pieces: [],
      status: "INICIAL",
    }
  );

  const [previews, setPreviews] = useState({
    imageInit: data?.imageInitUrl || "",
    imageFinal: data?.imageEndUrl || "",
    document: data?.documentUrl || "",
  });

  /** Manejo genérico de cambios */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Carga de imágenes o documentos */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setFormData((prev) => ({ ...prev, [key]: url }));
      setPreviews((prev) => ({ ...prev, [key]: url }));
    };
    reader.readAsDataURL(file);
  };

  /** Guardar sin redirigir */
  const handleSave = () => {
    onSubmit(formData);
  };

  /** Guardar y redirigir al módulo de piezas */
  const handleSaveAndAddPieces = () => {
    onSubmit(formData);
    router.push("/dashboard/shape");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 space-y-8">
      {/* Header */}
      <div className="border-b pb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? "Editar mueble" : "Nuevo mueble"}
        </h2>
        <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          {isEditMode ? "Modo edición" : "Modo creación"}
        </span>
      </div>

      {/* Nombre del mueble */}
      <Input
        label="Nombre del mueble"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ej: Mesa de comedor"
      />

      {/* Cliente asociado */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <FaUser className="text-purple-500" />
          Cliente asociado
        </label>
        <select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white 
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        >
          <option value={0}>Seleccionar cliente...</option>
          {customers.length > 0 ? (
            customers.map((c) => (
              <option key={c.customerId} value={c.customerId}>
                {c.name} {c.lastName} — CC: {c.dni}
              </option>
            ))
          ) : (
            <option disabled>No hay clientes disponibles</option>
          )}
        </select>
      </div>

      {/* Fechas */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Fecha de creación"
          name="creationDate"
          type="date"
          value={formData.creationDate}
          onChange={handleChange}
        />
        <Input
          label="Fecha de entrega"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      {/* Imagen inicial */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FaImage size={18} className="text-purple-500" />
          Imagen inicial (Referencia)
        </label>

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "imageInitUrl")}
            className="text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md 
                       file:border file:border-purple-200 file:bg-purple-50 
                       file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
          />
          {previews.imageInit && (
            <Image
              src={previews.imageInit}
              alt="Inicial"
              width={64}
              height={64}
              className="rounded-xl object-cover border border-gray-300 shadow-sm w-16 h-16"
            />
          )}
        </div>
      </div>

      {/* Imagen final y documento (solo en modo edición) */}
      {isEditMode && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaImage className="text-purple-500" />
              Imagen final
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "imageEndUrl")}
                className="text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md 
                           file:border file:border-purple-200 file:bg-purple-50 
                           file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
              />
              {previews.imageFinal && (
                <Image
                  src={previews.imageFinal}
                  alt="Final"
                  width={64}
                  height={64}
                  className="rounded-xl object-cover border border-gray-300 shadow-sm w-16 h-16"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaFilePdf className="text-purple-500" />
              Documento final
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "documentUrl")}
                className="text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md 
                           file:border file:border-purple-200 file:bg-purple-50 
                           file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
              />
              {previews.document && (
                <a
                  href={previews.document}
                  target="_blank"
                  className="text-purple-600 underline text-sm hover:text-purple-800 transition"
                >
                  Ver documento
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
        >
          <option value="INICIAL">INICIAL</option>
          <option value="EN_PROGRESO">EN PROGRESO</option>
          <option value="TERMINADO">TERMINADO</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-3 pt-5 border-t border-gray-100">
        {isEditMode ? (
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 
                       font-medium shadow-sm transition-all"
          >
            Guardar cambios
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 
                         font-medium shadow-sm transition-all"
            >
              Guardar
            </button>
            <button
              onClick={handleSaveAndAddPieces}
              className="bg-purple-50 text-purple-700 border border-purple-200 
                         px-5 py-2.5 rounded-xl hover:bg-purple-100 font-medium 
                         shadow-sm transition-all"
            >
              Ir a agregar piezas
            </button>
          </>
        )}
      </div>
    </div>
  );
}
