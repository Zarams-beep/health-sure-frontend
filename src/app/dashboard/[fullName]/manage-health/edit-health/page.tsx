"use client";
import { useState } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import BalanceMainSection from "@/component/BalanceMain";
import BasicInfoEditSection from "@/component/manageHealth/BasicInfoEdit";
import HealthStatusEdit from "@/component/manageHealth/HealthStatusEdit";
import MedicalHistoryEdit from "@/component/manageHealth/MedicalHistoryEdit";
import TreatmentInfoEdit from "@/component/manageHealth/TreatmentInfoEdit";
import LabResultsEdit from "@/component/manageHealth/LabResultEdit";
import NoteEdit from "@/component/manageHealth/NoteEdit";

const steps = ["Basic Info", "Health Status", "Medical History", "Treatment Info", "Lab Result", "Notes"];

export default function EditHealthPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (isValid: boolean = true) => {
    if (isValid) setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));
  };

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        <BalanceMainSection />

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={3}>
          {/* Step Components */}
          {activeStep === 0 && <BasicInfoEditSection onNext={handleNext} />}
          {activeStep === 1 && <HealthStatusEdit onNext={handleNext} onBack={handleBack} />}
          {activeStep === 2 && <MedicalHistoryEdit onNext={handleNext} onBack={handleBack} />}
          {activeStep === 3 && <TreatmentInfoEdit onNext={handleNext} onBack={handleBack} />}
          {activeStep === 4 && <LabResultsEdit onNext={handleNext} onBack={handleBack} />}
          {activeStep === 5 && <NoteEdit onNext={handleNext} onBack={handleBack} />}
          
        </Box>
      </div>
    </div>
  );
}