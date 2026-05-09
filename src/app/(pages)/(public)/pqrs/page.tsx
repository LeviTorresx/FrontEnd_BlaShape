"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCopy,
  FaExternalLinkAlt,
  FaSearch,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

import PqrsForm from "@/app/components/forms/PqrsForms";
import WorkshopSelector from "@/app/components/forms/WorkshopSelector";
import Button from "@/app/components/ui/Button";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";

import { useCreatePqrsMutation } from "@/app/services/pqrsApi";
import { useAppSelector } from "@/app/hooks/useRedux";
import { getErrorMessage } from "@/app/services/getErrorMessages";

import { PqrsCreateResponse, PqrsRequest } from "@/app/types/Pqrs";
import { WorkshopPublic } from "@/app/types/Workshop";
import { Carpenter } from "@/app/types/Carpenter";
import { SnackbarState } from "@/app/types/SnackBarState";

type Scope = "GENERAL" | "WORKSHOP";

export default function PqrsPublicPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [createPqrs, { isLoading }] = useCreatePqrsMutation();

  const [selectedWorkshop, setSelectedWorkshop] =
    useState<WorkshopPublic | null>(null);
  const [result, setResult] = useState<PqrsCreateResponse | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" /> as ReactNode,
  });

  const handleSubmit = async (data: PqrsRequest) => {
    try {
      const response = await createPqrs(data).unwrap();
      setResult(response);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: getErrorMessage(err) || "No pudimos radicar tu PQRS",
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
  };

  const handleCopyCode = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.trackingCode);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Código copiado al portapapeles",
        icon: <FaCheckCircle fontSize="inherit" />,
      });
    } catch {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "No se pudo copiar automáticamente",
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
  };

  const resetForm = () => {
    setResult(null);
    setSelectedWorkshop(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{
        backgroundImage: "url('/images/background-login.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-3xl mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-purple-900 hover:text-purple-700 transition-colors"
        >
          <FaArrowLeft />
          <span className="text-sm font-medium">Volver al inicio</span>
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
        {result ? (
          <SuccessPanel
            result={result}
            workshopName={selectedWorkshop?.name}
            onCopyCode={handleCopyCode}
            onReset={resetForm}
            onGoToTracking={() =>
              router.push(
                `/pqrs/seguimiento?token=${encodeURIComponent(
                  extractToken(result.trackingLink)
                )}`
              )
            }
          />
        ) : (
          <FormPanel
            user={user}
            isLoading={isLoading}
            selectedWorkshop={selectedWorkshop}
            onSelectWorkshop={setSelectedWorkshop}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {!result && (
        <Link
          href="/pqrs/seguimiento"
          className="mt-6 inline-flex items-center gap-2 text-sm text-purple-800 hover:text-purple-600 transition-colors"
        >
          <FaSearch />
          ¿Ya tienes un código de radicado? Consulta el estado aquí
        </Link>
      )}

      <NotificationSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}

/* ============================================================
 * Paneles
 * ============================================================ */

interface FormPanelProps {
  user: Carpenter | null;
  isLoading: boolean;
  selectedWorkshop: WorkshopPublic | null;
  onSelectWorkshop: (w: WorkshopPublic | null) => void;
  onSubmit: (data: PqrsRequest) => void | Promise<void>;
}

function FormPanel({ user, isLoading, selectedWorkshop, onSelectWorkshop, onSubmit }: FormPanelProps) {
  const [scope, setScope] = useState<Scope>("WORKSHOP");

  return (
    <>
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8">
        <p className="text-xs uppercase tracking-widest text-purple-200 mb-2">Atención al usuario</p>
        <h1 className="text-3xl font-bold">Radica una PQRS</h1>
        <p className="mt-2 text-sm text-purple-100 max-w-xl">
          Cuéntanos tu petición, queja, reclamo o sugerencia.
        </p>
      </div>

      <div className="px-8 pt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">¿A quién va dirigida?</p>
        <div className="inline-flex rounded-xl border border-purple-200 overflow-hidden">
          <button type="button" onClick={() => setScope("WORKSHOP")}
            className={`px-5 py-2 text-sm font-medium transition-colors ${scope === "WORKSHOP" ? "bg-purple-700 text-white" : "bg-white text-purple-800 hover:bg-purple-50"}`}>
            Taller específico
          </button>
          <button type="button" onClick={() => { setScope("GENERAL"); onSelectWorkshop(null); }}
            className={`px-5 py-2 text-sm font-medium transition-colors border-l border-purple-200 ${scope === "GENERAL" ? "bg-purple-700 text-white" : "bg-white text-purple-800 hover:bg-purple-50"}`}>
            PQRS general
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {scope === "WORKSHOP"
            ? "Tu solicitud será enviada directamente al taller que elijas."
            : "Tu solicitud será atendida por el equipo central de BlaShape."}
        </p>
      </div>

      <div className="p-8 pt-6 space-y-6">
        {scope === "WORKSHOP" && (
          <WorkshopSelector selected={selectedWorkshop} onSelect={onSelectWorkshop} />
        )}

        {scope === "GENERAL" || selectedWorkshop ? (
          <div className="border-t border-gray-100 pt-6">
            <PqrsForm
              scope={scope}
              workshopId={scope === "WORKSHOP" ? selectedWorkshop?.workshopId : undefined}
              carpenterId={scope === "WORKSHOP" ? selectedWorkshop?.carpenterId : undefined}
              initialGuestData={user ? {
                name: user.name, lastName: user.lastName, email: user.email, phone: user.phone,
              } : undefined}
              prefillNotice={user ? "Hemos prellenado tus datos automáticamente." : undefined}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-500">
            Selecciona un taller arriba para diligenciar tu PQRS.
          </div>
        )}
      </div>
    </>
  );
}

interface SuccessPanelProps {
  result: PqrsCreateResponse;
  workshopName?: string;
  onCopyCode: () => void;
  onReset: () => void;
  onGoToTracking: () => void;
}

function SuccessPanel({
  result,
  workshopName,
  onCopyCode,
  onReset,
  onGoToTracking,
}: SuccessPanelProps) {
  return (
    <div className="p-8 md:p-10 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
        <FaCheckCircle className="text-green-600 text-3xl" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        ¡Tu PQRS fue radicada!
      </h2>
      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        {workshopName
          ? `Tu solicitud fue enviada a ${workshopName}.`
          : "Hemos recibido tu solicitud."}{" "}
        Te enviamos un correo con un enlace de seguimiento.
      </p>

      <div className="mt-6 inline-flex items-stretch rounded-xl border border-purple-200 overflow-hidden shadow-sm">
        <div className="bg-purple-50 px-5 py-3 text-left">
          <p className="text-[10px] uppercase tracking-widest text-purple-700 font-semibold">
            Código de radicado
          </p>
          <p className="font-mono text-lg text-purple-900 font-bold">
            {result.trackingCode}
          </p>
        </div>
        <button
          onClick={onCopyCode}
          className="px-4 bg-white hover:bg-purple-50 transition-colors text-purple-700 border-l border-purple-200"
          title="Copiar código"
        >
          <FaCopy />
        </button>
      </div>

      {result.linkedToAccount && (
        <div className="mt-5 inline-block bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-xs text-purple-800">
          Hemos vinculado esta PQRS a tu cuenta. Podrás verla en tu panel
          cuando inicies sesión.
        </div>
      )}

      <div className="mt-8 text-left bg-gray-50 border border-gray-100 rounded-xl p-5 max-w-xl mx-auto">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Asunto</p>
        <p className="font-semibold text-gray-800">{result.pqrs.subject}</p>

        <p className="text-xs text-gray-400 uppercase tracking-wide mt-3">
          Mensaje
        </p>
        <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-4">
          {result.pqrs.message}
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          label="Ver seguimiento ahora"
          icon={<FaExternalLinkAlt />}
          onClick={onGoToTracking}
        />
        <Button
          label="Radicar otra PQRS"
          onClick={onReset}
          className="bg-white !text-purple-900 border border-purple-300 hover:bg-purple-50"
        />
      </div>
    </div>
  );
}

function InfoTip({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
      <span className="font-display text-[10px] font-bold tracking-widest text-purple-400">
        PASO {number}
      </span>
      <h3 className="font-semibold text-sm text-purple-900 mt-1">{title}</h3>
      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function extractToken(trackingLink: string): string {
  try {
    const url = new URL(trackingLink);
    return url.searchParams.get("token") ?? "";
  } catch {
    const idx = trackingLink.indexOf("token=");
    return idx >= 0 ? trackingLink.substring(idx + 6) : "";
  }
}