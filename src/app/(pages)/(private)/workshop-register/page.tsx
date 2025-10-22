'use client';
import Image from "next/image";
import WorkshopForm from "@/app/components/forms/WorkshopForm";
import PurpleStepper from "../../../components/ui/Stepper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateWorkshopMutation } from "@/app/services/workshopApi";
import { Workshop} from "@/app/types/Workshop";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setAuthState } from "@/app/store/slices/authSlice";
import { useLazyGetProfileQuery } from "@/app/services/authApi";
import { MdErrorOutline } from "react-icons/md";
import { SnackbarState } from "@/app/types/SnackBarState";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { FaRegCheckCircle } from "react-icons/fa";

export default function WorkshopRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const userAuth = useSelector((state: RootState) => state.auth.user);
  const [fetchProfile] = useLazyGetProfileQuery();
  const [createWorkshop, { isLoading, error }] = useCreateWorkshopMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleWorkshopSubmit = async (data: Workshop) => {
    try {
      const response = await createWorkshop(data).unwrap();

      const profileData = await fetchProfile().unwrap();
      dispatch(setAuthState({ user: profileData, isAuthenticated: true }));

      setSnackbar({
        open: true,
        severity: "success",
        message: response.message || "Taller registrado exitosamente",
        icon: <MdErrorOutline fontSize="inherit" />,
      });

      setActiveStep((prev) => prev + 1);
    } catch (err) {
      const errorMessage = getErrorMessage(err);

      setSnackbar({
        open: true,
        severity: "error",
        message: errorMessage || "Error al registrar el taller",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });

      console.error(err);
    }
  };

  const handleNext = () => {
    if (activeStep === 1) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleEnd = () => router.push("/dashboard");
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const steps = [
    {
      step: "Recomendación",
      content: (
        <p className="text-gray-800">
          Estimado usuario, para utilizar nuestros servicios, es necesario estar
          asociado a un taller según el Decreto 2242 de 2015.
        </p>
      ),
    },
    {
      step: "Registro de taller",
      content: (
        <WorkshopForm
          carpenterId={userAuth?.carpenterId}
          onSubmit={handleWorkshopSubmit}
          submitLabel={isLoading ? "Guardando..." : "Registrar Taller"}
        />
      ),
    },
    {
      step: "Finalizar",
      content: (
        <p className="text-gray-800">
          ¡El taller ha sido registrado exitosamente! Ve a tu perfil si
          necesitas modificar la información de tu taller en cualquier momento.
        </p>
      ),
    },
  ];

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
          {activeStep === 2
            ? "¡Estás listo para utilizar nuestros servicios!"
            : "¡Ya casi terminamos el proceso de registro!"}
        </h2>
      </div>

      {/* Stepper */}
      <div className="w-full max-w-xl bg-gray-200 rounded-xl shadow-md p-6">
        <PurpleStepper
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleEnd={handleEnd}
          disableNext={activeStep === 1 && isLoading} // desactiva botón mientras se guarda
        />
      </div>
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}
