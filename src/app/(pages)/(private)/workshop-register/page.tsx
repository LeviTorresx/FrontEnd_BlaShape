"use client";
import Image from "next/image";
import WorkshopForm from "@/app/components/forms/WorkshopForm";
import Stepper from "../../../components/ui/Stepper";

const steps = [
  {
    step: "Recomendacion",
    content: (
      <p>
        Estimado usuario, para utilizar nuestros servicios, es necesario estar
        asociado a un taller para realizar la debida factuación a los clientes
        según el Decreto 2242 de 2015.
      </p>
    ),
  },
  {
    step: "Registro de taller",
    content: (
      <WorkshopForm
        onSubmit={(data) => console.log("Datos del taller:", data)}
      />
    ),
  },
  {
    step: "Finalizar",
    content: (
      <p>
        ¡El taller ha sido registrado exitosamente! Ve a tu perfil si necesitas
        modificar la información de tu taller en cualquier momento.
      </p>
    ),
  },
];

export default function WorkshopRegister() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"
      style={{
        backgroundImage: "url('/images/background-landing.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo arriba */}
      <div className="mb-8 flex flex-col items-center">
        <Image
          src="/images/logo1CB.webp"
          alt="Maderas Blashape"
          width={180}
          height={100}
          priority
        />
        <h2 className="mt-2 text-lg font-medium text-gray-800 text-center">
          ¡Ya casi terminamos el proceso de registro!
        </h2>
      </div>

      {/* Stepper */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <Stepper steps={steps} />
      </div>
    </div>
  );
}
