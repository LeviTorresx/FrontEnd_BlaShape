import Banner from "./componentes/Banner";
import Reminder from "./componentes/Reminder";
import RecentFurniture from "./componentes/RecentFurniture";
import Statistics from "./componentes/Statistics";
import SummaryWorkshop from "./componentes/SummaryWorkshop";

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

const furnitureData = [
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    name: "Silla Escandinava de Roble",
    startDate: "01 Oct 2025",
    endDate: "05 Oct 2025",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    name: "Mesa de Comedor Minimalista",
    startDate: "28 Sep 2025",
    endDate: "03 Oct 2025",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    name: "Gabinete Moderno en Nogal",
    startDate: "22 Sep 2025",
    endDate: "01 Oct 2025",
  }
];

const summaryWorkshop = {
  name: "Taller BlasTorres",
  nit: "1111111111-3",
  phone: "+57 313 799 4143",
  address: "Carerra 19 #07-44, Caucasia-Antioquia, Colombia",
};

export default function HomeModule() {
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
          <SummaryWorkshop workshop={summaryWorkshop} />
        </div>
      </div>

      {/* Recordatorios */}
      <div className="col-span-4 md:col-span-1 md:row-start-3 md:row-span-2 rounded-2xl bg-white shadow-sm">
        <div className="h-full overflow-y-auto p-2">
          <Reminder />
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
          <RecentFurniture furnitureList={furnitureData} />
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

