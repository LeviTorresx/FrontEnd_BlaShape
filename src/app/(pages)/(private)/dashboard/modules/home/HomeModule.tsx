import Banner from "./componentes/Banner";
import Calender from "./componentes/Calender";
import RecentFurniture from "./componentes/RecentFurniture";
import Statistics from "./componentes/Statistics";
import SummaryWorkshop from "./componentes/SummaryWorkshop";

const StatisticsList = [
  {
    label: "Clientes",
    value: "24",
    color: "from-purple-900 to-blue-900",
  },
  {
    label: "Pedidos",
    value: "12",
    color: "from-blue-900 to-emerald-900",
  },
  {
    label: "Cortes",
    value: "5",
    color: "from-emerald-900 to-purple-900",
  },
  {
    label: "Reportes",
    value: "8",
    color: "from-purple-900 to-orange-800",
  },
];

const furnituresList = [1, 2, 3, 4, 5, 6];

const summaryWorkshop = {
  name: "Taller Central",
  nit: "123",
  phone: "+57 300 123 4567",
  address: "Calle 123 #45-67, Ciudad",
};

export default function HomeModule() {
  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Banner */}
      <Banner />

      {/* Contenido principal dividido (ocupa todo el espacio vertical sobrante) */}
      <section className="flex-1 grid md:grid-cols-3 gap-6 overflow-hidden">
        {/* Columna izquierda (muebles recientes) */}
        <RecentFurniture furnitureIds={furnituresList} />

        {/* Columna derecha */}
        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* Resumen taller */}
          <SummaryWorkshop workshop={summaryWorkshop} />

          {/* Calendario */}
          <Calender />
        </div>
      </section>

      {/* Footer / estadísticas */}
      <section className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Statistics stats={StatisticsList} />
      </section>
    </div>
  );
}
