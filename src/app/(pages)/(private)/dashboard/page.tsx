"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import Sidebar from "@/app/components/layout/Sidebar";
import BottomMenu from "@/app/components/layout/ButtomMenu";
import { motion, AnimatePresence } from "framer-motion";
import HomeModule from "./modules/home/HomeModule";
import ClientsModule from "./modules/customers/ClientsModule";
import ReportsModule from "./modules/ReportsModule";
import ProfileModule from "./modules/profile/ProfileModule";
import FurnitureModule from "./modules/furniture/FurnitureModule";
import WorkshopModule from "./modules/workshop/WorkshopModule";
import ShapeModule from "./modules/shape/ShapeModule";
import ModuleSkeleton from "@/app/components/ui/ModuleSkeleton";
import { FaChartBar, FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShop } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { useLogoutMutation } from "@/app/services/authApi";
import { clearAuthState } from "@/app/store/slices/authSlice";
import { useGetCustomersQuery } from "@/app/services/customersApi";

interface SelectedModule {
  key: string;
  id: number | string;
}

const mainMenu = [
  { key: "home", label: "Inicio", icon: <FaHome size={20} /> },
  { key: "clients", label: "Clientes", icon: <FaUsers size={20} /> },
  { key: "furniture", label: "Muebles", icon: <MdChair size={20} /> },
  {
    key: "shape",
    label: "Zona de cortes",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  { key: "reports", label: "Reportes", icon: <FaChartBar size={20} /> },
];

const accountMenu = [
  { key: "profile", label: "Perfil", icon: <FaUserCircle size={20} /> },
  { key: "workshop", label: "Taller", icon: <FaShop size={20} /> },
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const { data: customers } = useGetCustomersQuery();

  const [selected, setSelected] = useState<SelectedModule>({
    key: "home",
    id: 0,
  });
  const [loading, setLoading] = useState(false);

  // Actualiza selected según la ruta actual
  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    // Ejemplo: ['dashboard', 'shape', '1']
    const key = segments[1] || "home"; // segundo segmento
    const id = segments[2] || 0; // tercer segmento (si existe)

    setSelected({ key: key, id });
  }, [pathname]);

  // Cambiar de módulo sin recargar
  const handleSelect = (key: string, id?: number) => {
    setLoading(true);
    const newPath = id ? `/dashboard/${key}/${id}` : `/dashboard/${key}`;
    router.push(newPath);
    setSelected({ key, id: id || 0 });
    setTimeout(() => setLoading(false), 400);
  };

  // Render dinámico con skeleton
  const renderModule = () => {
    if (loading) return <ModuleSkeleton />;

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

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearAuthState());
      router.push("/login");
    } catch (err) {
      console.error("Error al cerrar sesión: ", err);
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
        onLogout={handleLogout}
      />

      {/* Contenido principal */}
      <main className="w-full p-2 bg-white rounded-2xl overflow-y-auto h-[calc(100vh-1rem)] scroll-smooth relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.key}
            initial={{ opacity: 2, y: 4 }}
            animate={{ opacity: 2, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1], // curva suave tipo Material Design
            }}
            className="h-full"
          >
            {renderModule()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Menú inferior (mobile) */}
      <div className="md:hidden">
        <BottomMenu
          selected={selected.key}
          onSelect={handleSelect}
          mainMenu={mainMenu}
          bottomMenu={accountMenu}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
