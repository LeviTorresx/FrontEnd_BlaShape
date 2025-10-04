import Banner from "./componentes/Banner";
import Calender from "./componentes/Reminder";
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
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    name: "Cama Doble de Madera Oscura",
    startDate: "18 Sep 2025",
    endDate: "26 Sep 2025",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    name: "Escritorio Industrial de Acero",
    startDate: "10 Sep 2025",
    endDate: "20 Sep 2025",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    name: "Estantería Modular",
    startDate: "02 Sep 2025",
    endDate: "12 Sep 2025",
  },
];

const summaryWorkshop = {
  name: "Taller Central",
  nit: "12312121212-3",
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
        <RecentFurniture furnitureList={furnitureData} />

        {/* Columna derecha */}
        <div className="flex flex-col gap-6">
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
