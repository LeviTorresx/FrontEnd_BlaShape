import { ReactNode } from "react";
import Button from "./Button";
import { Stepper, Step, StepLabel, StepIconProps } from "@mui/material";

type StepItem = {
  step: string;
  content: ReactNode;
};

type Props = {
  steps: StepItem[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleEnd: () => void;
  disableNext?: boolean;
};

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold
        ${active ? "bg-white border-2 border-purple-950 text-purple-950" : ""}
        ${completed ? "bg-purple-950 text-white" : ""}
        ${!active && !completed ? "bg-gray-300 text-gray-700" : ""}
      `}
    >
      {icon}
    </div>
  );
}

export default function PurpleStepper({
  steps,
  activeStep,
  handleNext,
  handleBack,
  handleEnd,
  disableNext = false,
}: Props) {
  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-200 rounded-xl shadow-md">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ step }) => (
          <Step key={step}>
            <StepLabel slots={{ stepIcon: CustomStepIcon }}></StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* contenido dinámico */}
      <div className="mt-4">{steps[activeStep]?.content}</div>

      <div className="mt-6 flex gap-3 justify-center">
        {activeStep < steps.length && (
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="border border-gray-300 text-gray-700"
            label="atrás"
          />
        )}

        {activeStep === steps.length ? (
          <Button
            onClick={handleEnd}
            className="bg-purple-400 text-white hover:bg-purple-700"
            label="Ir al Dashboard"
          />
        ) : (
          <Button
            onClick={handleNext}
            disabled={disableNext}
            className="border border-gray-300 text-gray-700"
            label={steps.length - 1 === activeStep ? "Finalizar" : "Siguiente"}
          />
        )}
      </div>
    </div>
  );
}
