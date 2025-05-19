"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { labResultsSchema } from "@/features/labResult";
import { setLabResults } from "@/store/slices/labResults";
import { Button, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  onNext: (isValid?: boolean) => void;
  onBack: () => void;
}

const defaultValues: LabResults = {
  testResults: [{ testName: "", result: "", date: "" }],
  medicalReports: [{ title: "", url: "" }],
};

type LabResults = z.infer<typeof labResultsSchema>;

export default function LabResultsEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();
  const { token, id } = useSelector((state: RootState) => state.auth);
  const userId = id;

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

  const testResultsArray = useFieldArray({
    control,
    name: "testResults",
  });

  const medicalReportsArray = useFieldArray({
    control,
    name: "medicalReports",
  });

  const formValues = watch();

  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);

  const handleFormSubmit = async (data: LabResults) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/lab-results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save data");
      }

      dispatch(setLabResults(data));
      onNext();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-basic-info">
      <h2>Edit Lab Results</h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="form-health-container-main"
      >
        <div className="form-health-container-2">
          {/* Test Results */}
          <div className="form-health-sub">
            <label>Test Results</label>
            <div className="main-medication-container">
              {testResultsArray.fields.map((item, index) => (
                <div key={item.id} className="medication-container">
                  <input
                    key={item.id}
                    {...register(`testResults.${index}.testName`)}
                    placeholder="Enter test name or 'none'"
                  />

                  <input
                    {...register(`testResults.${index}.result`)}
                    placeholder="Enter result or 'none'"
                  />

                  <input
                    type="date"
                    {...register(`testResults.${index}.date`)}
                  />
                  <div className="add-allergy-btn-container">
                    <button
                      type="button"
                      className="btn-med"
                      onClick={() => testResultsArray.remove(index)}
                      disabled={testResultsArray.fields.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-allergy-btn-container">
              <button
                type="button"
                className="add-allergy-btn"
                onClick={() =>
                  testResultsArray.append({
                    testName: "",
                    result: "",
                    date: "",
                  })
                }
              >
                Add Test Result
              </button>
            </div>
          </div>

          {/* Medical Reports */}
          <div className="form-health-sub">
            <label>Medical Reports</label>
            <div className="main-medication-container">
              {medicalReportsArray.fields.map((item, index) => (
                <div key={item.id} className="medication-container">
                  <input
                    {...register(`medicalReports.${index}.title`)}
                    placeholder="Enter title or 'none'"
                    className="input-group"
                  />

                  <input
                    {...register(`medicalReports.${index}.url`)}
                    placeholder="Enter URL or 'none'"
                    className="input-group"
                  />

                  <div className="add-allergy-btn-container">
                    <button
                      className="btn-med"
                      type="button"
                      onClick={() => medicalReportsArray.remove(index)}
                      disabled={medicalReportsArray.fields.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-allergy-btn-container">
              <button
                type="button"
                className="add-allergy-btn"
                onClick={() =>
                  medicalReportsArray.append({ title: "", url: "" })
                }
              >
                Add Medical Report
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onBack} variant="outlined" className="back-btn">
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || !isModified || isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : "Next"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
