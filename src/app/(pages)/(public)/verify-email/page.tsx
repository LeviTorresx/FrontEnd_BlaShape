"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLazyVerifyEmailQuery } from "@/app/services/authApi";
import Button from "@/app/components/ui/Button";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [verifyEmail, { isLoading }] = useLazyVerifyEmailQuery();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token inválido");
      return;
    }

    verifyEmail(token)
      .unwrap()
      .then((res) => {
        setStatus("success");
        setMessage(res || "Correo verificado correctamente");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Token inválido o expirado");
      });
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6 text-center">

        {status === "loading" && (
          <p className="text-gray-700">Verificando correo...</p>
        )}

        {status === "success" && (
          <>
            <FaRegCheckCircle className="text-green-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              ¡Correo verificado!
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>

            <Button
              label="Ir al login"
              onClick={() => router.push("/login")}
              className="w-full py-2 bg-purple-900 text-white"
            />
          </>
        )}

        {status === "error" && (
          <>
            <MdErrorOutline className="text-red-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Error de verificación
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>

            <Button
              label="Volver al login"
              onClick={() => router.push("/login")}
              className="w-full py-2 bg-purple-900 text-white"
            />
          </>
        )}
      </div>
    </div>
  );
}