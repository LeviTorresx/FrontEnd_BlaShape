"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

export default function LoginPage() {
  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Correo:",
      loginRequest.email,
      "Contraseña:",
      loginRequest.password
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Correo */}
          <div>
            <label className="block text-gray-800 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={loginRequest.email}
              onChange={(e) =>
                setLoginRequest({ ...loginRequest, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-800 mb-1">Contraseña</label>
            <input
              type="password"
              value={loginRequest.password}
              onChange={(e) =>
                setLoginRequest({ ...loginRequest, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
              placeholder="********"
              required
            />
          </div>

          {/* Botón */}
          <Button
            label="Entrar"
            type="submit"
            className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
          ></Button>
        </form>

        {/* Link registro */}
        <p className="text-sm text-center text-gray-700 mt-4">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-purple-900 font-medium hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>

      {/* Logo abajo */}
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
