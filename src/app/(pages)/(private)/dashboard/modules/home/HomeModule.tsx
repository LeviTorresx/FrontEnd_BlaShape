import Banner from "./componentes/Banner";
import Reminder from "./componentes/Reminder";
import RecentFurniture from "./componentes/RecentFurniture";
import Statistics from "./componentes/Statistics";
import SummaryWorkshop from "./componentes/SummaryWorkshop";
import { useGetWorkshopQuery } from "@/app/services/mockWorkshopApi";
import { useGetFurnitureQuery } from "@/app/services/mockFurnituresApi";
import { useGetAlertsQuery } from "@/app/services/mockAlertsApi";

const StatisticsList = [
  {
    label: "Clientes",
    value: "24",
    color: "from-purple-950 to-purple-600",
  },
  {
    label: "Pedidos",
    value: "12",
    color: "from-purple-950 to-purple-600",
  },
  {
    label: "Cortes",
    value: "5",
    color: "from-purple-950 to-purple-600",
  },
  {
    label: "Reportes",
    value: "8",
    color: "from-purple-950 to-red-900",
  },
];

export default function HomeModule() {
  const { data: workshop, isLoading } = useGetWorkshopQuery();
  const { data: furnitureList = [] } = useGetFurnitureQuery();
  const {data: reminders = []} = useGetAlertsQuery();

  if (isLoading) return <p>Cargando información del taller...</p>;
  if (!workshop) return <p>No se encontró información del taller.</p>;

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
          <SummaryWorkshop workshop={workshop} />
        </div>
      </div>

      {/* Recordatorios */}
      <div className="col-span-4 md:col-span-1 md:row-start-3 md:row-span-2 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-y-auto p-2">
          <Reminder reminders={reminders} />
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
