import Banner from "./componentes/Banner";
import Reminder from "./componentes/Reminder";
import RecentFurniture from "./componentes/RecentFurniture";
import Statistics from "./componentes/Statistics";
import SummaryWorkshop from "./componentes/SummaryWorkshop";
import { useGetWorkshopQuery } from "@/app/services/mockWorkshopApi";
import { useGetFurnitureQuery } from "@/app/services/mockFurnituresApi";
import { useGetAlertsQuery } from "@/app/services/mockAlertsApi";
import AppModal from "@/app/components/ui/AppModal";
import AlertForm from "@/app/components/forms/AlertForm";
import { Alert } from "@/app/types/Alert";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaChartLine, FaCouch, FaCut, FaUsers } from "react-icons/fa";

const StatisticsList = [
  {
    label: "Clientes",
    value: "24",
    color: "from-purple-50 to-purple-400",
  },
  {
    label: "Muebles",
    value: "12",
    color: "from-purple-50 to-purple-400",
  },
  {
    label: "Cortes",
    value: "5",
    color: "from-purple-50 to-purple-400",
  },
  {
    label: "Reportes",
    value: "8",
    color: "from-purple-50 to-red-200",
  },
];

export default function HomeModule() {
  const { data: workshop, isLoading } = useGetWorkshopQuery();
  const { data: furnitureList = [] } = useGetFurnitureQuery();
  const { data: reminders = [] } = useGetAlertsQuery();
  const workshopInfo = useSelector(
    (state: RootState) => state.auth.user?.workshop
  );
  const customersCount = useSelector(
    (state: RootState) => state.customers.list.length
  );
  const [open, setOpen] = useState(false);

  if (isLoading) return <p>Cargando información del taller...</p>;
  if (!workshop) return <p>No se encontró información del taller.</p>;

  const handleAddAlert = () => {
    setOpen(true);
  };

  const handleSubmitAlert = (alert: Alert) => {
    console.log("Alerta guardada:", alert);
    setOpen(false);
  };

  const StatisticsList = [
    {
      label: "Clientes",
      value: customersCount.toString(),
      color: "from-purple-50 to-purple-300",
      icon: <FaUsers />,
    },
    {
      label: "Muebles",
      value: furnitureList.length.toString(),
      color: "from-purple-50 to-purple-300",
      icon: <FaCouch />,
    },
    {
      label: "Cortes",
      value: "0",
      color: "from-purple-50 to-purple-300",
      icon: <FaCut />,
    },
    {
      label: "Reportes",
      value: reminders.length.toString(),
      color: "from-purple-50 to-purple-300",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div
      className="
        grid grid-cols-4 md:grid-cols-4 
        grid-rows-[auto_auto_auto_auto_auto_auto_auto] md:grid-rows-[repeat(5,1fr)]
        gap-2 md:gap-3 
        h-full
      "
    >
      {/* Taller */}
      <div className="col-span-4 md:col-span-1 md:row-span-2 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-y-auto p-2">
          <SummaryWorkshop workshop={workshopInfo || workshop} />
        </div>
      </div>

      {/* Recordatorios */}
      <div className="col-span-4 md:col-span-1 md:row-start-3 md:row-span-2 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-y-auto p-2">
          <Reminder reminders={reminders} onAdd={handleAddAlert} />
          <div>
            <AppModal
              open={open}
              onClose={() => setOpen(false)}
              title="Crear nuevo recordatorio"
              confirmText="Guardar"
              cancelText="Cancelar"
            >
              <AlertForm onSubmit={handleSubmitAlert} />
            </AppModal>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="col-span-4 md:col-span-3 md:row-span-1 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-hidden p-2">
          <Banner />
        </div>
      </div>

      {/* Muebles recientes */}
      <div className="col-span-4 md:col-span-3 md:row-start-2 md:row-span-3 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-y-auto p-2">
          <RecentFurniture furnitureList={furnitureList} />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="col-span-4 md:col-span-4 md:row-start-5 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-y-auto p-2">
          <Statistics stats={StatisticsList} />
        </div>
      </div>
    </div>
  );
}
