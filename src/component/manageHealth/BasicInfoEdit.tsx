"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBasicInfo } from "@/store/slices/basicInfo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInfo } from "@/types/basicInfo";
import { basicInfoSchema } from "@/features/basicInfoSchema";
import { Button, Box, CircularProgress } from "@mui/material";

interface Props {
  onNext: () => void;
}

const defaultValues: BasicInfo = {
  fullName: "",
  DOB: "",
  Age: "",
  Gender: "Male", 
  phoneNumber: "",
  email: "",
  HouseAddress: "",
  EmergencyNumber: "",
  NextOfKinName: "",
  NextOfKinGender: "Male", 
  NextOfKinPhoneNumber: "",
  NextOfKinEmailAddress: "",
};


export default function BasicInfoEditSection({ onNext }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    mode: "onChange",
  });

  // Watch form values
  const formValues = watch();

  // Check if form is modified
  useEffect(() => {
    const initialValues = {
      fullName: "",
      DOB: "",
      Age: "",
      Gender: null,
      phoneNumber: "",
      email: "",
      HouseAddress: "",
      EmergencyNumber: "",
      NextOfKinName: "",
      NextOfKinGender: null,
      NextOfKinPhoneNumber: "",
      NextOfKinEmailAddress: "",
    };
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(initialValues));
  }, [formValues]);

  const onSubmit = (data: BasicInfo) => {
    setIsLoading(true);
    dispatch(setBasicInfo(data));
    setIsLoading(false);
    onNext(); // Move to the next step
  };

  return (
    <div className="edit-basic-info">
      <h2>Edit Basic Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-health-container-main">
        <div className="form-health-container">
        {/* Full Name */}
        <div className="form-health-sub">
          <label>Full Name</label>
          <input type="text" {...register("fullName")} placeholder="Kindly Enter Name"/>
          {errors.fullName && <p className="red-error" >{errors.fullName.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="form-health-sub">
          <label>Date of Birth</label>
          <input type="date" {...register("DOB")} className="date-input"/>
          {errors.DOB && <p className="red-error" >{errors.DOB.message}</p>}
        </div>

        {/* Age */}
        <div className="form-health-sub">
          <label>Age</label>
          <input type="number" {...register("Age")} placeholder="Kindly Enter Age"/>
          {errors.Age && <p className="red-error" >{errors.Age.message}</p>}
        </div>

        {/* Gender */}
        <div className="form-health-sub">
          <label>Gender</label>
          <select {...register("Gender")}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.Gender && <p className="red-error" >{errors.Gender.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-health-sub">
          <label>Phone Number</label>
          <input type="text" {...register("phoneNumber")} />
          {errors.phoneNumber && <p className="red-error" >{errors.phoneNumber.message}</p>}
        </div>

        {/* Email */}
        <div className="form-health-sub">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p className="red-error" >{errors.email.message}</p>}
        </div>

        {/* House Address */}
        <div className="form-health-sub">
          <label>House Address</label>
          <input type="text" {...register("HouseAddress")} />
          {errors.HouseAddress && <p className="red-error" >{errors.HouseAddress.message}</p>}
        </div>

        {/* Emergency Number */}
        <div className="form-health-sub">
          <label>Emergency Number</label>
          <input type="text" {...register("EmergencyNumber")} />
          {errors.EmergencyNumber && <p className="red-error" >{errors.EmergencyNumber.message}</p>}
        </div>

        {/* Next of Kin Name */}
        <div className="form-health-sub">
          <label>Next of Kin Name</label>
          <input type="text" {...register("NextOfKinName")} />
          {errors.NextOfKinName && <p className="red-error" >{errors.NextOfKinName.message}</p>}
        </div>

        {/* Next of Kin Gender */}
        <div className="form-health-sub">
          <label>Next of Kin Gender</label>
          <select {...register("NextOfKinGender")}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.NextOfKinGender && <p className="red-error" >{errors.NextOfKinGender.message}</p>}
        </div>

        {/* Next of Kin Phone Number */}
        <div className="form-health-sub">
          <label>Next of Kin Phone Number</label>
          <input type="text" {...register("NextOfKinPhoneNumber")} />
          {errors.NextOfKinPhoneNumber && <p className="red-error" >{errors.NextOfKinPhoneNumber.message}</p>}
        </div>

        {/* Next of Kin Email Address */}
        <div className="form-health-sub">
          <label>Next of Kin Email Address</label>
          <input type="email" {...register("NextOfKinEmailAddress")} />
          {errors.NextOfKinEmailAddress && <p className="red-error" >{errors.NextOfKinEmailAddress.message}</p>}
        </div></div>

        {/* Submit & Next Button */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || !isModified || isLoading}
            className={!isValid || !isModified || isLoading ? "disable" : "active"}
          >
            {isLoading ? <CircularProgress size={20} /> : "Next"}
          </Button>
        </Box>
      </form>
    </div>
  );
}