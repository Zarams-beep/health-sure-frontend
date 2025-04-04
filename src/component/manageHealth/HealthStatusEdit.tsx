"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHealthStatus } from "@/store/slices/healthStatus";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HealthStatus } from "@/types/healthSure";
import { healthStatusSchema } from "@/features/healthStatus";
import { Button, Box, CircularProgress } from "@mui/material";
import { useFieldArray } from "react-hook-form";
interface Props {
  onNext: (isValid?: boolean) => void; 
  onBack: () => void;
}
const defaultValues: HealthStatus = {
  healthCondition: "",
  vitalSigns: {
    bloodPressure: 0,
    heartRate: 0, 
    temperature: 0,
    sugar: 0,
    oxygen: 0,
    cholesterol: 0,
    BMI: 0,
  },
  allergies: [],
};


export default function HealthStatusEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
  } = useForm<HealthStatus>({
    resolver: zodResolver(healthStatusSchema),
    mode: "onChange",
    defaultValues,
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "allergies" as unknown as never, // Trick TS into recognizing it
  });
  
  
  
  // Watching the form values
  const formValues = watch();

  // ✅ Compare form values with default values
  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);

  // Form submission logic
  const handleFormSubmit = (data: HealthStatus) => {
    setIsLoading(true);
    dispatch(setHealthStatus(data));
    setIsLoading(false);
    onNext(); // Move to the next step
  };

  // ✅ Fix: Explicitly define the fields to avoid TS2345 error
  const vitalSignFields: { label: string; name: keyof HealthStatus["vitalSigns"] }[] = [
    { label: "Blood Pressure", name: "bloodPressure" },
    { label: "Heart Rate", name: "heartRate" },
    { label: "Temperature", name: "temperature" },
    { label: "Sugar Level", name: "sugar" },
    { label: "Oxygen Level", name: "oxygen" },
    { label: "Cholesterol", name: "cholesterol" },
    { label: "BMI", name: "BMI" },
  ];

  return (
    <div className="edit-basic-info">
      <h2>Edit Health Status</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}  className="form-health-container-main">
     <div className="form-health-container-2">
     <div className="form-health-sub">
          <label>Health Condition:</label>
          <input {...register("healthCondition")} />
          {errors.healthCondition && <p className="red-error">{errors.healthCondition.message}</p>}
        </div>

       
        <div className="form-health-sub">
            <label>Allergies:</label>
            <div className="allergies-main-container">
            <div className="allergies-container">
              {fields.map((field, index) => (
                <div key={field.id} className="allergy-input">
                  <input {...register(`allergies.${index}`)} />
                  <button type="button" onClick={() => remove(index)}>Remove</button>
                </div>
              ))}
             
            </div>
            
            <div className="add-allergy-btn-container">
             <button type="button" onClick={() => append("")} className="add-allergy-btn">Add Allergy</button>
             </div>
             {errors.allergies && <p className="error">{errors.allergies.message}</p>}
            </div>
          </div>
     </div>

     {/* form container 2 */}
     <div className="form-health-container-2">
       <h3>Vital Signs</h3>
        <div className="form-health-vital">
        {vitalSignFields.map(({ label, name }) => (
  <div key={name} className="form-health-vital-2">
    <label>{label}:</label>
    <input 
      type="number" 
      {...register(`vitalSigns.${name}`, { valueAsNumber: true })} // ✅ Ensure values are numbers
    />
    {errors.vitalSigns?.[name] && <p className="red-error">{errors.vitalSigns[name]?.message}</p>}
  </div>
))}

        </div>

       </div>
          {/* Navigation Buttons */}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button onClick={onBack} variant="outlined">Back</Button>
                  <Button type="submit" variant="contained" disabled={!isValid || !isModified || isLoading}>
                    {isLoading ? <CircularProgress size={20} /> : "Next"}
                  </Button>
                </Box>
      </form>
    </div>
  );
}
