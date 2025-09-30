'use client';
import { useState, ReactNode } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";

type StepItem = {
  step: string;
  content: ReactNode;
};

type Props = {
  steps: StepItem[];
};

export default function PurpleStepper({ steps }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ step }) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* contenido dinámico */}
      <div className="mt-4">{steps[activeStep]?.content}</div>

      <div className="mt-6 flex gap-3">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="border border-gray-300 text-gray-700"
        >
          Atrás
        </Button>
        {activeStep === steps.length ? (
          <Button
            onClick={handleReset}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Reiniciar
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
          </Button>
        )}
      </div>
    </div>
  );
}
