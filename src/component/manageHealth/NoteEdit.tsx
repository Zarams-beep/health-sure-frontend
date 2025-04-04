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
    defaultValues: storedNotes || defaultValues,
  });

  const doctorNotesArray = useFieldArray({ control, name: "doctorNotes"as unknown as never, });
  const caregiverCommentsArray = useFieldArray({ control, name: "caregiverComments"as unknown as never, });

  const formValues = watch();

  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(storedNotes));
  }, [formValues, storedNotes]);

  const handleFormSubmit = (data: Notes) => {
    setIsLoading(true);
    dispatch(setNotes(data));
    setTimeout(() => {
      setIsLoading(false);
      onNext(true);
    }, 1000);
  };

  return (
    <div className="edit-basic-info">
      <h2>Edit Notes</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="form-health-container-main">
        {/* Doctor Notes */}
        <div className="form-section">
          <label>Doctor's Notes</label>
          {doctorNotesArray.fields.map((item, index) => (
            <div key={item.id} className="note-input">
              <input type="text" {...register(`doctorNotes.${index}`)} placeholder="Enter doctor's note" />
              <button onClick={() => doctorNotesArray.remove(index)} disabled={doctorNotesArray.fields.length === 1}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={() => doctorNotesArray.append("")}>Add Note</button>
          {errors.doctorNotes && <p className="error">{errors.doctorNotes.message}</p>}
        </div>

        {/* Caregiver Comments */}
        <div className="form-section">
          <label>Caregiver Comments</label>
          {caregiverCommentsArray.fields.map((item, index) => (
            <div key={item.id} className="note-input">
              <input type="text" {...register(`caregiverComments.${index}`)} placeholder="Enter caregiver comment" />
              <button onClick={() => caregiverCommentsArray.remove(index)} disabled={caregiverCommentsArray.fields.length === 1}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={() => caregiverCommentsArray.append("")}>Add Comment</button>
          {errors.caregiverComments && <p className="error">{errors.caregiverComments.message}</p>}
        </div>

        {/* Navigation Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onBack} variant="outlined">Back</Button>
          <Button type="submit" variant="contained" disabled={!isValid || !isModified || isLoading}>
            {isLoading ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
