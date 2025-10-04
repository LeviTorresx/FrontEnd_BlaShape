"use client";
import { useState } from "react";
import HomeModule from "./modules/HomeModule";
import ClientsModule from "./modules/ClientsModule";
import ReportsModule from "./modules/ReportsModule";
import Sidebar from "@/app/components/layout/Sidebar";
import ProfileModule from "./modules/ProfileModule";
import FurnitureModule from "./modules/FurnitureModule";
import WorkshopModule from "./modules/WorkshopModule";

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
    <div className="flex bg-gray-200 min-h-screen p-8 gap-2">
      <Sidebar selected={selected} onSelect={setSelected} />
      <main className="flex-1 p-6 bg-white rounded-2xl">{renderModule()}</main>
    </div>
  );
}
