"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabResults } from "@/types/labResult";
import { labResultsSchema } from "@/features/labResult";
import { setLabResults } from "@/store/slices/labResults";
import { Button, Box, CircularProgress } from "@mui/material";

interface Props {
  onNext: (isValid?: boolean) => void;
  onBack: () => void;
}

const defaultValues: LabResults = {
  testResults: [{ testName: "", result: "", date: "" }],
  medicalReports: [{ title: "", url: "" }],
};

export default function LabResultsEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<LabResults>({
    resolver: zodResolver(labResultsSchema),
    mode: "onChange",
    defaultValues,
  });

  const testResultsArray = useFieldArray({ control, name: "testResults" });
  const medicalReportsArray = useFieldArray({ control, name: "medicalReports" });

  const formValues = watch();

  useEffect(() => {
    console.log("Form Values:", formValues);
    console.log("Default Values:", defaultValues);
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);
  

  const handleFormSubmit = (data: LabResults) => {
    setIsLoading(true);
    dispatch(setLabResults(data));
    setTimeout(() => {
      setIsLoading(false);
      onNext(true);
    }, 1000);
  };

  return (
    <div className="edit-basic-info">
      <h2>Edit Lab Results</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="form-health-container-main">
        <div className="form-health-container-2">

        {/* Test Results */}
        <div className="form-health-sub">
          <label>Test Results</label>
          <div className="main-medication-container">
          {testResultsArray.fields.map((item, index) => (
            <div key={item.id} className="medication-container">
              <input type="text" {...register(`testResults.${index}.testName`)} placeholder="Test Name" />
              <input type="text" {...register(`testResults.${index}.result`)} placeholder="Result" />
              <input type="date" {...register(`testResults.${index}.date`)} />
              <div className="add-allergy-btn-container">
              <button type="button" className="btn-med" onClick={() => testResultsArray.remove(index)} disabled={testResultsArray.fields.length === 1}>Remove</button></div>
            </div>
          ))}</div>
          <div className="add-allergy-btn-container">
          <button className="add-allergy-btn" type="button" onClick={() => testResultsArray.append({ testName: "", result: "", date: "" })}>Add Test Result</button></div>
          {errors.testResults && <p className="error">{errors.testResults.message}</p>}
        </div>

        {/* Medical Reports */}
        <div className="form-lab-section">
          <label>Medical Reports</label>
          <div className="main-medication-container">
          {medicalReportsArray.fields.map((item, index) => (
            <div key={item.id} className="medication-container">
              <input type="text" {...register(`medicalReports.${index}.title`)} placeholder="Report Title" />
              <input type="url" {...register(`medicalReports.${index}.url`)} placeholder="Report URL" />
              <div className="add-allergy-btn-container">
              <button className="btn-med" type="button" onClick={() => medicalReportsArray.remove(index)} disabled={medicalReportsArray.fields.length === 1}>Remove</button></div>
            </div>
          ))}</div>
          <div className="add-allergy-btn-container">
          <button className="add-allergy-btn" type="button" onClick={() => medicalReportsArray.append({ title: "", url: "" })}>Add Medical Report</button></div>
          {errors.medicalReports && <p className="error">{errors.medicalReports.message}</p>}
        </div></div>

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
