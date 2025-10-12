"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/app/components/layout/Sidebar";
import BottomMenu from "@/app/components/layout/ButtomMenu";

import HomeModule from "./modules/home/HomeModule";
import ClientsModule from "./modules/clients/ClientsModule";
import ReportsModule from "./modules/ReportsModule";
import ProfileModule from "./modules/ProfileModule";
import FurnitureModule from "./modules/furniture/FurnitureModule";
import WorkshopModule from "./modules/WorkshopModule";
import ShapeModule from "./modules/ShapeModule";
import ModuleSkeleton from "@/app/components/ui/ModuleSkeleton";

import { FaChartBar, FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShop } from "react-icons/fa6";
import { MdChair } from "react-icons/md";

interface SelectedModule {
  key: string;
  id: number| string;
}

const mainMenu = [
  { key: "home", label: "Inicio", icon: <FaHome size={20} /> },
  { key: "furniture", label: "Muebles", icon: <MdChair size={20} /> },
  { key: "clients", label: "Clientes", icon: <FaUsers size={20} /> },
  { key: "reports", label: "Reportes", icon: <FaChartBar size={20} /> },
  {
    key: "shape",
    label: "Zona de cortes",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
];

const accountMenu = [
  { key: "profile", label: "Perfil", icon: <FaUserCircle size={20} /> },
  { key: "workshop", label: "Taller", icon: <FaShop size={20} /> },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<SelectedModule>({
    key: "/",
    id: 0,
  });
  const [loading, setLoading] = useState(false);

  // Redirigir automáticamente si es /dashboard
 useEffect(() => {
  const segments = pathname.split("/");
  const lastSegment = segments.pop();
  const maybeModule = segments.pop();

  if (pathname === "/dashboard") {
    window.history.replaceState(null, "", "/dashboard/home");
    setSelected(prev => ({ ...prev, key: "home" }));
  } else if (lastSegment && isNaN(Number(lastSegment))) {
    // Es una ruta como /dashboard/shape → lastSegment = "shape"
    setSelected(prev => ({ ...prev, key: lastSegment, id: 0 }));
  } else if (maybeModule) {
    // Es una ruta con id: /dashboard/shape/1 → maybeModule = "shape"
    setSelected(prev => ({ ...prev, key: maybeModule, id: lastSegment || 0 }));
  }
}, [pathname]);


  // Cambiar de módulo sin recargar
  const handleSelect = (key: string, id?: number) => {
    setLoading(true);

    const newPath = id ? `/dashboard/${key}/${id}` : `/dashboard/${key}`;
    window.history.pushState(null, "", newPath);

    setSelected({ key, id: id || "0" });

    setTimeout(() => setLoading(false), 400);
  };

  // Manejo del botón "atrás"
  useEffect(() => {
    const handlePopState = () => {
      const lastSegment = window.location.pathname.split("/").pop();
      if (lastSegment) setSelected({ ...selected, key: lastSegment });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  //  Render dinámico con skeleton
  const renderModule = () => {
    if (loading) return <ModuleSkeleton />;
    console.log(selected);
    switch (selected.key) {
      case "home":
        return <HomeModule />;
      case "furniture":
        return <FurnitureModule onSelect={handleSelect} />;
      case "clients":
        return <ClientsModule />;
      case "reports":
        return <ReportsModule />;
      case "profile":
        return <ProfileModule />;
      case "workshop":
        return <WorkshopModule />;
      case "shape":
        return <ShapeModule shapeId={selected.id} />;
      default:
        return <ModuleSkeleton />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200 p-2 md:p-2 gap-4">
      {/* Sidebar (desktop) */}
      <Sidebar
        selected={selected.key}
        onSelect={handleSelect}
        mainMenu={mainMenu}
        bottomMenu={accountMenu}
      />

      {/* Contenido principal */}
      <main className="w-full p-2 bg-white rounded-2xl overflow-y-auto h-[calc(100vh-1rem)]">
        {renderModule()}
      </main>

      {/* Menú inferior (mobile) */}
      <div className="md:hidden">
        <BottomMenu
          selected={selected.key}
          onSelect={handleSelect}
          mainMenu={mainMenu}
          bottomMenu={accountMenu}
        />
      </div>
    </div>
  );
}
