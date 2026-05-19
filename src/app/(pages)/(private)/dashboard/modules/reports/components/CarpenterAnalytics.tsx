"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetFurnituresByTypeQuery,
  useGetTopCustomersQuery,
  useGetMostUsedMaterialsQuery,
  useGetFurnituresByDateQuery,
} from "@/app/services/analyticsApi";
import { mock_INVENTORY_MATERIALS } from "@/app/mocks/mockInventoryMaterials";
import { MostUsedMaterial } from "@/app/types/Analytics";
import StatCard from "./StatCard";
import FurnitureTypeChart from "./FurnitureTypeChart";
import MaterialsChart from "./MaterialsChart";
import TopCustomersTable from "./TopCustomersTable";
import SectionCard from "./SectionCard";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import {
  FaChair,
  FaUsers,
  FaLayerGroup,
  FaCalendarAlt,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";
import { GiWoodBeam } from "react-icons/gi";

// El back persiste el material como string (ej: "1", "Melamina", "melamina").
// Este helper lo resuelve contra el mock buscando por id o por nombre (case-insensitive).
function resolveMaterialName(raw: string): string {
  if (!raw || raw.trim() === "") return "Sin especificar";

  const asNumber = Number(raw);
  if (!isNaN(asNumber)) {
    const found = mock_INVENTORY_MATERIALS.find(
      (m) => m.inventoryMaterialId === asNumber
    );
    if (found) return found.name;
  }
  const byName = mock_INVENTORY_MATERIALS.find(
    (m) => m.name.toLowerCase() === raw.toLowerCase()
  );
  return byName?.name ?? raw; // si no matchea, muestra el string tal cual
}

function resolveMaterials(data: MostUsedMaterial[]): MostUsedMaterial[] {
  return data.map((item) => ({
    ...item,
    material: resolveMaterialName(item.material),
  }));
}

export default function CarpenterAnalytics() {
  const carpenterId = useSelector(
    (state: RootState) => state.auth.user?.carpenterId
  );

  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);
  const [activeDateFilter, setActiveDateFilter] = useState({
    startDate: thirtyDaysAgo,
    endDate: today,
  });

  const skip = !carpenterId;

  const { data: typeData = [], isFetching: typeLoading } =
    useGetFurnituresByTypeQuery(carpenterId!, { skip });

  const { data: topCustomers = [], isFetching: customersLoading } =
    useGetTopCustomersQuery({ carpenterId: carpenterId!, limit: 5 }, { skip });

  const { data: rawMaterials = [], isFetching: materialsLoading } =
    useGetMostUsedMaterialsQuery({ carpenterId: carpenterId! }, { skip });

  // Cruzamos los datos del back con el mock para mostrar el nombre legible
  const materials = resolveMaterials(rawMaterials);

  const { data: furnituresByDate = [], isFetching: dateLoading } =
    useGetFurnituresByDateQuery(
      {
        carpenterId: carpenterId!,
        startDate: activeDateFilter.startDate,
        endDate: activeDateFilter.endDate,
      },
      { skip }
    );

  const handleApplyFilter = () => {
    setActiveDateFilter({ startDate, endDate });
  };

  const totalByType = typeData.reduce((acc, t) => acc + t.count, 0);
  const topMaterial = materials[0]?.material ?? "—";

  return (
    // Layout en dos columnas para evitar scroll vertical
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* ── Columna izquierda ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {/* KPI Cards — apiladas 2×2 en esta columna */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Tipos de mueble"
            value={typeData.length}
            icon={<FaLayerGroup />}
            subtitle="categorías activas"
            loading={typeLoading}
          />
          <StatCard
            title="Total muebles"
            value={totalByType}
            icon={<FaChair />}
            subtitle="en todos los tipos"
            loading={typeLoading}
          />
          <StatCard
            title="Clientes top"
            value={topCustomers.length}
            icon={<FaUsers />}
            subtitle="más frecuentes"
            loading={customersLoading}
            colorClass="text-violet-700"
            bgClass="bg-violet-50"
          />
          <StatCard
            title="Material líder"
            value={topMaterial}
            icon={<GiWoodBeam />}
            subtitle={
              materials[0] ? `${materials[0].count} usos` : "sin datos"
            }
            loading={materialsLoading}
            colorClass="text-emerald-700"
            bgClass="bg-emerald-50"
          />
        </div>

        {/* Gráfica de tipos de mueble */}
        <SectionCard title="Muebles por tipo" icon={<FaChair />}>
          <FurnitureTypeChart data={typeData} loading={typeLoading} />
        </SectionCard>

        {/* Gráfica de materiales */}
        <SectionCard title="Materiales más usados" icon={<GiWoodBeam />}>
          <MaterialsChart data={materials} loading={materialsLoading} />
        </SectionCard>
      </div>

      {/* ── Columna derecha ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {/* Top clientes */}
        <SectionCard title="Top 5 clientes más frecuentes" icon={<FaUsers />}>
          <TopCustomersTable data={topCustomers} loading={customersLoading} />
        </SectionCard>

        {/* Muebles por rango de fechas */}
        <SectionCard
          title="Muebles creados en un período"
          icon={<FaCalendarAlt />}
          className="flex-1"
        >
          {/* Filtro */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <Input
                label="Desde"
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Hasta"
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                label="Buscar"
                icon={<FaSearch className="text-sm" />}
                onClick={handleApplyFilter}
                disabled={dateLoading}
              />
            </div>
          </div>

          {/* Resultado */}
          {dateLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : furnituresByDate.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-gray-400 gap-2">
              <FaBoxOpen className="text-3xl" />
              <p className="text-sm italic">
                No hay muebles en el rango seleccionado
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="p-3 text-left font-semibold">Nombre</th>
                    <th className="p-3 text-left font-semibold">Tipo</th>
                    <th className="p-3 text-left font-semibold">Estado</th>
                    <th className="p-3 text-left font-semibold">Creación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {furnituresByDate.map((f) => (
                    <tr
                      key={f.furnitureId}
                      className="bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {f.name}
                      </td>
                      <td className="p-3 text-gray-600">{f.type ?? "—"}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-200 text-purple-800">
                          {f.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(f.creationDate).toLocaleDateString("es-CO")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-right">
                {furnituresByDate.length} resultado
                {furnituresByDate.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}