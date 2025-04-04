import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTreatmentInfo } from "@/store/slices/treatmentInfo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TreatmentInfo } from "@/types/treatmentInfo";
import { treatmentInfoSchema } from "@/features/treatmentInfo";
import { Button, Box, CircularProgress } from "@mui/material";

interface Props {
  onNext: (isValid?: boolean) => void;
  onBack: () => void;
}

const defaultValues: TreatmentInfo = {
  assignedDoctor: {
    name: null,
    specialization: null,
    contact: null,
  },
  treatmentPlans: [],
  upcomingAppointments: [],
};

export default function TreatmentInfoEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<TreatmentInfo>({
    resolver: zodResolver(treatmentInfoSchema),
    mode: "onChange",
    defaultValues,
  });

  const formValues = watch();

  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);

  const handleFormSubmit = (data: TreatmentInfo) => {
    setIsLoading(true);
    dispatch(setTreatmentInfo(data));
    setTimeout(() => {
      setIsLoading(false);
      onNext(true);
    }, 1000);
  };

  return (
    <div className="edit-basic-info">
        <h2>Edit Treatment Info</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="form-health-container-main">
        <div className="form-health-container">
        <div className="form-health-sub">
            <label htmlFor="Doctor Name">Doctor Name</label>
          <input
            placeholder="Doctor's Name"
            {...register("assignedDoctor.name")}
          />
          {errors.assignedDoctor?.name && (
            <p className="red-error">{errors.assignedDoctor.name.message}</p>
          )}
        </div>
        <div className="form-health-sub">
            <label htmlFor="Specialization">Specialization</label>
          <input
            placeholder="Specialization"
            {...register("assignedDoctor.specialization")}
          />
          {errors.assignedDoctor?.specialization && (
            <p className="red-error">
              {errors.assignedDoctor.specialization.message}
            </p>
          )}
        </div>
        <div className="form-health-sub">
            <label htmlFor="Doctor Contact">Doctor Contact</label>
          <input
            placeholder="Contact"
            {...register("assignedDoctor.contact")}
          />
          {errors.assignedDoctor?.contact && (
            <p className="red-error">{errors.assignedDoctor.contact.message}</p>
          )}
        </div>

        <div className="form-health-sub">
            <label htmlFor="Treatment Plan">Treatment Plan</label>
          <input
            placeholder="Treatment Plan"
            {...register("treatmentPlans.0")}
          />
          {errors.treatmentPlans && (
            <p className="red-error">{errors.treatmentPlans.message}</p>
          )}
        </div>

        <div className="form-health-sub">
            <label htmlFor="Upcoming Appointment">Upcoming Appointment</label>
          <input
            placeholder="Appointment Date"
            {...register("upcomingAppointments.0.date")}
          />
          {errors.upcomingAppointments?.[0]?.date && (
            <p className="red-error">
              {errors.upcomingAppointments[0].date.message}
            </p>
          )}
        </div>
        <div className="form-health-sub">
            <label htmlFor="Appointment Time">Appointment Time</label>
          <input
            placeholder="Appointment Time"
            {...register("upcomingAppointments.0.time")}
          />
          {errors.upcomingAppointments?.[0]?.time && (
            <p className="red-error">
              {errors.upcomingAppointments[0].time.message}
            </p>
          )}
        </div>
        <div className="form-health-sub">
            <label htmlFor="Location">Location</label>
          <input
            placeholder="Location"
            {...register("upcomingAppointments.0.location")}
          />
          {errors.upcomingAppointments?.[0]?.location && (
            <p className="red-error">
              {errors.upcomingAppointments[0].location.message}
            </p>
          )}
        </div></div>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={onBack} disabled={isLoading}  className={isLoading ? "disable" : "back-active"}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isModified || !isValid || isLoading}
            className={!isValid || !isModified || isLoading ? "disable" : "active"}
          >
            {isLoading ? <CircularProgress size={24} /> : "Next"}
          </Button>
        </Box>
      </form>
    </div>
  );
}