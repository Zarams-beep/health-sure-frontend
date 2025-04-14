"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notesSchema } from "@/features/noteSchema";
import { setNotes } from "@/store/slices/notes";
import { Notes } from "@/types/note";
import { Button, Box, CircularProgress } from "@mui/material";
interface Props {
  onNext: (isValid?: boolean) => void;
  onBack: () => void;
}

const defaultValues: Notes = {
  doctorNotes: [""],
  caregiverComments: [""],
};

export default function NoteEdit({ onNext, onBack }: Props) {
  const dispatch = useDispatch();
  const storedNotes = useSelector((state: RootState) => state.notes);
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<Notes>({
    resolver: zodResolver(notesSchema),
    mode: "onChange",
    defaultValues,
  });

  const doctorNotesArray = useFieldArray({ control, name: "doctorNotes"as unknown as never, });
  const caregiverCommentsArray = useFieldArray({ control, name: "caregiverComments"as unknown as never, });

  const formValues = watch();

  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(storedNotes));
  }, [formValues, storedNotes]);
  
 const { token,id } = useSelector((state: RootState) => state.auth);
  const userId = id;
  const handleFormSubmit = async (data: Notes) => {
    setIsLoading(true);

    try {
      const response = await fetch(`https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        mode: 'cors',
      credentials: 'include',
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save data");
      }
    dispatch(setNotes(data));
    onNext();}
    catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-basic-info">
      <h2>Edit Notes</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="form-health-container-main">
        <div className="form-health-container-2">
        {/* Doctor Notes */}

        <div className="form-health-sub">
          <label>Doctor&apos;s Notes</label>
          <div className="main-medication-container">
          {doctorNotesArray.fields.map((item, index) => (
            <div key={item.id} className="medication-container">
              <input type="text" {...register(`doctorNotes.${index}`)} placeholder="Enter doctor's note" />
              <div className="add-allergy-btn-container">
              <button className="btn-med" onClick={() => doctorNotesArray.remove(index)} disabled={doctorNotesArray.fields.length === 1}>
                Remove
              </button></div>
            </div>
          ))}</div>

<div className="add-allergy-btn-container">
          <button onClick={() => doctorNotesArray.append("")}>Add Note</button></div>
          {errors.doctorNotes && <p className="error">{errors.doctorNotes.message}</p>}
        </div>

        {/* Caregiver Comments */}
        <div className="form-health-sub">
          <label>Caregiver Comments</label>
          <div className="main-medication-container">
          {caregiverCommentsArray.fields.map((item, index) => (
            <div key={item.id} className="medication-container">
              <input type="text" {...register(`caregiverComments.${index}`)} placeholder="Enter caregiver comment" />
              <div className="add-allergy-btn-container">
              <button onClick={() => caregiverCommentsArray.remove(index)} disabled={caregiverCommentsArray.fields.length === 1}>
                Remove
              </button></div>
            </div>
          ))}</div>

<div className="add-allergy-btn-container">
          <button onClick={() => caregiverCommentsArray.append("")}>Add Comment</button></div>
          {errors.caregiverComments && <p className="error">{errors.caregiverComments.message}</p>}
        </div>
        </div>

        {/* Navigation Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onBack} variant="outlined">Back</Button>
          <Button type="submit" variant="contained" disabled={!isValid || !isModified || isLoading}>
            {isLoading ? <CircularProgress size={20} /> : "Finish"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
