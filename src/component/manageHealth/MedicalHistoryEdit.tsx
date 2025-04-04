"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMedicalHistory } from "@/store/slices/medicalHistory";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedicalHistory } from "@/types/medicalHistory";
import { medicalHistorySchema } from "@/features/medicalHistorySchema";
import { Button, Box, CircularProgress } from "@mui/material";

interface Props {
  onNext: (isValid?: boolean) => void;
  onBack: () => void;
}

const defaultValues: MedicalHistory = {
  pastDiagnoses: [""],
  surgeries: [""],
  medications: [{ name: "", dosage: "", frequency: "" }],
  familyHistory: [""],
};

export default function MedicalHistoryEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<MedicalHistory>({
    resolver: zodResolver(medicalHistorySchema),
    mode: "onChange",
    defaultValues,
  });

  const pastDiagnosesArray = useFieldArray({ control, name: "pastDiagnoses"  as unknown as never,});
  const surgeriesArray = useFieldArray({ control, name: "surgeries"  as unknown as never, });
  const medicationsArray = useFieldArray({ control, name: "medications" });
  const familyHistoryArray = useFieldArray({ control, name: "familyHistory" as unknown as never});

  const formValues = watch();

  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);

  const handleFormSubmit = (data: MedicalHistory) => {
    setIsLoading(true);
    dispatch(setMedicalHistory(data));
    setTimeout(() => {
      setIsLoading(false);
      onNext(true);
    }, 1000);
  };

  return (
    <div className="edit-basic-info">
      <h2>Edit Medical History</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="form-health-container-main">
        <div className="form-health-container-2">
        {/* Past Diagnoses */}
        <div className="form-health-sub">
          <label>Past Diagnoses</label>
          <div className="allergies-container">
          {pastDiagnosesArray.fields.map((item, index) => (
            <div key={item.id} className="allergy-input">
              <input type="text" {...register(`pastDiagnoses.${index}`)} placeholder={`Diagnosis ${index + 1}`} />
              <button onClick={() => pastDiagnosesArray.remove(index)} disabled={pastDiagnosesArray.fields.length === 1}>Remove</button>
            </div>
          ))}</div>
          <div className="add-allergy-btn-container">
          <button onClick={() => pastDiagnosesArray.append("")} className="add-allergy-btn">Add</button></div>
          {errors.pastDiagnoses && <p className="error">{errors.pastDiagnoses.message}</p>}
        </div>

        {/* Surgeries */}
        <div className="form-health-sub">
          <label>Surgeries</label>
          <div className="allergies-container">
          {surgeriesArray.fields.map((item, index) => (
            <div key={item.id} className="allergy-input">
              <input type="text" {...register(`surgeries.${index}`)} placeholder={`Surgery ${index + 1}`} />
              <button onClick={() => surgeriesArray.remove(index)} disabled={surgeriesArray.fields.length === 1}>Remove</button>
            </div>
          ))}</div>
          <div className="add-allergy-btn-container">
          <button onClick={() => surgeriesArray.append("")} className="add-allergy-btn">Add</button></div>
          {errors.surgeries && <p className="error">{errors.surgeries.message}</p>}
        </div>

        {/* Medications */}
        <div className="form-health-sub">
          <label>Medications</label>
          <div className="main-medication-container">
          {medicationsArray.fields.map((item, index) => (
            <div key={item.id} className="medication-container">
              <input type="text" {...register(`medications.${index}.name`)} placeholder="Medication Name" />
              <input type="text" {...register(`medications.${index}.dosage`)} placeholder="Dosage" />
              <input type="text" {...register(`medications.${index}.frequency`)} placeholder="Frequency" />
              <div className="add-allergy-btn-container">
              <button className="btn-med" onClick={() => medicationsArray.remove(index)} disabled={medicationsArray.fields.length === 1}>Remove</button></div>
            </div>
          ))}</div>
          <div className="add-allergy-btn-container">
          <button className="add-allergy-btn" onClick={() => medicationsArray.append({ name: "", dosage: "", frequency: "" })}>Add</button></div>
          {errors.medications && <p className="error">{errors.medications.message}</p>}
        </div>

        {/* Family History */}
        <div className="form-health-sub">
          <label>Family History</label>
          <div className="allergies-container">
          {familyHistoryArray.fields.map((item, index) => (
            <div key={item.id} className="allergy-input">
              <input type="text" {...register(`familyHistory.${index}`)} placeholder={`Condition ${index + 1}`} />
              <button onClick={() => familyHistoryArray.remove(index)} disabled={familyHistoryArray.fields.length === 1}>Remove</button>
            </div>
          ))}</div>
           <div className="add-allergy-btn-container">
          <button className="add-allergy-btn" onClick={() => familyHistoryArray.append("")}>Add</button></div>
          {errors.familyHistory && <p className="error">{errors.familyHistory.message}</p>}
        </div></div>

        {/* Navigation Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onBack} variant="outlined" className="back-btn">Back</Button>
          <Button type="submit" variant="contained" disabled={!isValid || !isModified || isLoading}>
            {isLoading ? <CircularProgress size={20} /> : "Next"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
