"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/app/components/layout/Sidebar";
import BottomMenu from "@/app/components/layout/ButtomMenu";

import HomeModule from "./modules/home/HomeModule";
import ClientsModule from "./modules/ClientsModule";
import ReportsModule from "./modules/ReportsModule";
import ProfileModule from "./modules/ProfileModule";
import FurnitureModule from "./modules/FurnitureModule";
import WorkshopModule from "./modules/WorkshopModule";
import ShapeModule from "./modules/ShapeModule";
import ModuleSkeleton from "@/app/components/ui/ModuleSkeleton";

import { FaChartBar, FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShop } from "react-icons/fa6";
import { MdChair } from "react-icons/md";

const mainMenu = [
  { key: "home", label: "Inicio", icon: <FaHome size={20} /> },
  { key: "furniture", label: "Muebles", icon: <MdChair size={20} /> },
  { key: "clients", label: "Clientes", icon: <FaUsers size={20} /> },
  { key: "reports", label: "Reportes", icon: <FaChartBar size={20} /> },
  { key: "shape", label: "Zona de cortes", icon: <TbLayoutDashboardFilled size={20} /> },
];

const accountMenu = [
  { key: "profile", label: "Perfil", icon: <FaUserCircle size={20} /> },
  { key: "workshop", label: "Taller", icon: <FaShop size={20} /> },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const [selected, setSelected] = useState("/");
  const [loading, setLoading] = useState(false);

  // Redirigir automáticamente si es /dashboard
  useEffect(() => {
    const lastSegment = pathname.split("/").pop();

    if (pathname === "/dashboard") {
      window.history.replaceState(null, "", "/dashboard/home");
      setSelected("home");
    } else if (lastSegment && lastSegment !== selected) {
      setSelected(lastSegment);
    }
  }, [pathname]);

  // Cambiar de módulo sin recargar
  const handleSelect = (key: string) => {
    if (key === selected) return;
    setLoading(true);
    setSelected(key);
    window.history.pushState(null, "", `/dashboard/${key}`);
    setTimeout(() => setLoading(false), 400);
  };

  // Manejo del botón "atrás"
  useEffect(() => {
    const handlePopState = () => {
      const lastSegment = window.location.pathname.split("/").pop();
      if (lastSegment) setSelected(lastSegment);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  //  Render dinámico con skeleton
  const renderModule = () => {
    if (loading) return <ModuleSkeleton />;

    switch (selected) {
      case "home": return <HomeModule />;
      case "furniture": return <FurnitureModule />;
      case "clients": return <ClientsModule />;
      case "reports": return <ReportsModule />;
      case "profile": return <ProfileModule />;
      case "workshop": return <WorkshopModule />;
      case "shape": return <ShapeModule />;
      default: return <ModuleSkeleton />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200 p-4 md:p-2 gap-4">
      {/* Sidebar (desktop) */}
      <Sidebar
        selected={selected}
        onSelect={handleSelect}
        mainMenu={mainMenu}
        bottomMenu={accountMenu}
      />

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p- bg-white rounded-2xl transition-all duration-300 ease-in-out">
        {renderModule()}
      </main>

      {/* Menú inferior (mobile) */}
      <div className="md:hidden">
        <BottomMenu
          selected={selected}
          onSelect={handleSelect}
          mainMenu={mainMenu}
          bottomMenu={accountMenu}
        />
      </div>
    </div>
  );
}
