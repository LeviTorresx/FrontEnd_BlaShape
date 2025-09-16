"use client";

import CarpenterForm from "@/app/components/forms/CarpenterForm";
import { CarpenterDTO } from "@/app/types/Carpenter";
import Image from "next/image";

export default function RegisterPage() {
  const handleRegister = (data: CarpenterDTO) => {
    console.log("Registro:", data);
    // Aquí haces el POST a tu backend
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4"
      style={{
        backgroundImage: "url('/images/background-login.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-gray-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Registrarse
        </h2>

        <CarpenterForm onSubmit={handleRegister} submitLabel="Registrarse" />

        <p className="text-sm text-center text-gray-700 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-purple-900 font-medium hover:underline"
          >
            Iniciar Sesión
          </a>
        </p>
      </div>

      {/* Logo */}
      <div className="mt-10">
        <Image
          src="/images/logo1CB.webp"
          alt="Logo Blashape"
          width={180}
          height={80}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
