"use client";
import { useState } from "react";
import HomeModule from "./modules/HomeModule";
import ClientsModule from "./modules/ClientsModule";
import ReportsModule from "./modules/ReportsModule";
import Sidebar from "@/app/components/layout/Sidebar";
import ProfileModule from "./modules/ProfileModule";
import FurnitureModule from "./modules/FurnitureModule";
import WorkshopModule from "./modules/WorkshopModule";
import BottomMenu from "@/app/components/layout/ButtomMenu";

export default function DashboardContent() {
  const [selected, setSelected] = useState("home");

  const renderModule = () => {
    switch (selected) {
      case "home":
        return <HomeModule />;
      case "furniture":
        return <FurnitureModule />;
      case "clients":
        return <ClientsModule />;
      case "reports":
        return <ReportsModule />;
      case "profile":
        return <ProfileModule />;
      case "workshop":
        return <WorkshopModule />;
      case "logout":
        return <p className="text-gray-700">Cerrando sesión...</p>;

      default:
        return <HomeModule />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200 p-6 md:gap-4">
      {/* 🖥 Sidebar (solo desktop) */}
      <Sidebar selected={selected} onSelect={setSelected} />
      {/* 📱 Contenido principal */}
      <main className="flex-1 p-4 md:p-6 bg-white rounded-2xl">
        {renderModule()}
      </main>
      {/* 📱 Menú flotante (solo mobile) */}
      <div className="md:hidden">
        <BottomMenu selected={selected} onSelect={setSelected} />
      </div>
    </div>
  );
}
