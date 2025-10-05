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
    <div className="grid grid-cols-4 md:grid-cols-4 grid-rows-7 md:grid-rows-5 gap-2 md:gap-2 h-full">
      <div className="col-start-1 row-start-2 col-span-4 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2  rounded-2xl ">
        <div className="h-full overflow-y-auto">
          <SummaryWorkshop workshop={summaryWorkshop} />
        </div>
      </div>
      <div className="col-start-1 row-start-3 col-span-4 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-2  rounded-2xl ">
        <div className="h-full overflow-y-auto">
          <Reminder />
        </div>
      </div>
      <div className="col-start-1 row-start-1 col-span-4 md:col-start-2 md:row-start-1 md:col-span-3 md:row-span-1  rounded-2xl ">
        <div className="h-full overflow-y-auto">
          <Banner />
        </div>
      </div>
      <div className="col-start-1 row-start-4 col-span-4 row-span-3 md:col-start-2 md:row-start-2 md:col-span-3 md:row-span-3  rounded-2xl">
        <div className="h-full overflow-y-auto">
          <RecentFurniture furnitureList={furnitureData} />
        </div>
      </div>
      <div className="col-start-1 row-start-7 col-span-4 md:col-start-1 md:row-start-5 md:col-span-4 md:row-span-1rounded-2xl ">
        <div className="h-full overflow-y-auto">
          <Statistics stats={StatisticsList} />
        </div>
      </div>
    </div>
  );
}
