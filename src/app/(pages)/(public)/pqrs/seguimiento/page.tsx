"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  useLazyTrackByMagicLinkQuery,
  useLazyTrackByCodeQuery,
} from "@/app/services/pqrsApi";
import { Pqrs } from "@/app/types/Pqrs";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { formatDate } from "@/app/utils/formatDate";
import {
  PqrsStatusBadge,
  PqrsTypeBadge,
} from "@/app/components/ui/PqrsBadges";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

export default function PqrsTrackingPage() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");

  const [trackByMagicLink, { isFetching: loadingMagic }] =
    useLazyTrackByMagicLinkQuery();
  const [trackByCode, { isFetching: loadingCode }] = useLazyTrackByCodeQuery();

  const [pqrs, setPqrs] = useState<Pqrs | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Búsqueda manual
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  // Resolución automática del magic link
  useEffect(() => {
    if (!tokenParam) return;
    setError(null);
    trackByMagicLink(tokenParam)
      .unwrap()
      .then((res) => setPqrs(res))
      .catch((err) => setError(getErrorMessage(err)));
  }, [tokenParam, trackByMagicLink]);

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPqrs(null);
    try {
      const res = await trackByCode({ code: code.trim(), email: email.trim() }).unwrap();
      setPqrs(res);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const isLoading = loadingMagic || loadingCode;

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{
        backgroundImage: "url('/images/background-login.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-2xl mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-purple-900 hover:text-purple-700 transition-colors"
        >
          <FaArrowLeft />
          <span className="text-sm font-medium">Volver al inicio</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Seguimiento de PQRS
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {tokenParam
            ? "Mostramos los detalles de tu solicitud."
            : "Consulta el estado de tu PQRS con tu código de radicado y correo."}
        </p>

        {/* Búsqueda manual: solo si no hay token o si el token falló */}
        {!pqrs && (
          <form
            onSubmit={handleManualSearch}
            className="space-y-4 border-t border-gray-100 pt-4"
          >
            <Input
              label="Código de radicado"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej: PQRS-A3F7B2C9"
              required
            />
            <Input
              label="Correo asociado"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
            <Button
              type="submit"
              label={isLoading ? "Buscando..." : "Consultar estado"}
              icon={<FaSearch />}
              disabled={isLoading}
              className="w-full"
            />
          </form>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Resultado */}
        {pqrs && (
          <div className="mt-2 space-y-4 border-t border-gray-100 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Radicado
                </p>
                <p className="text-lg font-bold text-purple-900">
                  {pqrs.trackingCode}
                </p>
              </div>
              <div className="flex gap-2">
                <PqrsTypeBadge type={pqrs.type} />
                <PqrsStatusBadge status={pqrs.status} />
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Asunto
              </p>
              <p className="font-semibold text-gray-800">{pqrs.subject}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Tu mensaje
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 border border-gray-100 rounded-xl p-4 mt-1">
                {pqrs.message}
              </p>
            </div>

            <div className="text-xs text-gray-500 flex flex-wrap gap-4">
              <span>Recibida: {formatDate(pqrs.createdAt)}</span>
              {pqrs.respondedAt && (
                <span>Respondida: {formatDate(pqrs.respondedAt)}</span>
              )}
            </div>

            {pqrs.response ? (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-xs text-purple-700 uppercase tracking-wide font-semibold mb-1">
                  Respuesta
                </p>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  {pqrs.response}
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                Tu solicitud aún no ha sido respondida. Te notificaremos por
                correo en cuanto recibamos novedades.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}