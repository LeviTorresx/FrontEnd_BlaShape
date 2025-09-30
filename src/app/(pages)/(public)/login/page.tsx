"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import PasswordInput from "@/app/components/ui/PasswordInput";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
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
      {/* Card */}
      <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Correo */}
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            value={loginRequest.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />

          {/* Contraseña */}
          <PasswordInput
            label="Contraseña"
            name="password"
            value={loginRequest.password}
            onChange={handleChange}
            placeholder="********"
            required
          />

          {/* Botón */}
          <Button
            label="Entrar"
            type="submit"
            className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
          />
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
