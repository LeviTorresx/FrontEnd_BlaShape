"use client";
import { useState, ReactNode } from "react";
import Button from "./Button";
import { Stepper, Step, StepLabel, StepIconProps } from "@mui/material";
type StepItem = {
  step: string;
  content: ReactNode;
};

type Props = {
  steps: StepItem[];
};

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold
        ${active ? "bg-white border-2 border-purple-950 text-purple-950" : ""}
        ${completed ? "bg-purple-950 text-white" : ""}
        ${!active && !completed ? "bg-gray-300 text-gray-700" : ""}
      `}
    >
      {icon}
    </div>
  );
}

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
            <StepLabel slots={{ stepIcon: CustomStepIcon }}>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* contenido dinámico */}
      <div className="mt-4">{steps[activeStep]?.content}</div>

      <div className="mt-6 flex gap-3 justify-center">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="border border-gray-300 text-gray-700"
          label="atrás"
        />
        {activeStep === steps.length ? (
          <Button
            onClick={handleReset}
            className="bg-purple-400 text-white hover:bg-purple-700"
            label="Reiniciar"
          />
        ) : (
          <Button
            onClick={handleNext}
            className="bg-purple-950 text-white hover:bg-purple-700"
            label={activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
          />
        )}
      </div>
    </div>
  );
}
