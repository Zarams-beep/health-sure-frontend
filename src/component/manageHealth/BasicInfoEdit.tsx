"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBasicInfo } from "@/store/slices/basicInfo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInfo } from "@/types/basicInfo";
import { basicInfoSchema } from "@/features/basicInfoSchema";
import { Button, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
interface Props {
  onNext: () => void;
}



export default function BasicInfoEditSection({ onNext }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const { fullName, email, token,id } = useSelector((state: RootState) => state.auth);
  const displayName = fullName || "Guest";
  const displayEmail = email || "noemail@example.com";
  // const decodedToken = token;
  const userId = id;

  const defaultValues: BasicInfo = {
    fullName: displayName,
    DOB: "",
    Age: "",
    Gender: "Male",
    phoneNumber: "",
    email: displayEmail,
    HouseAddress: "",
    EmergencyNumber: "",
    NextOfKinName: "",
    NextOfKinGender: "Male",
    NextOfKinPhoneNumber: "",
    NextOfKinEmailAddress: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    mode: "onChange",
    defaultValues,
  });

  const formValues = watch();

  useEffect(() => {
    setValue("fullName", displayName);
    setValue("email", displayEmail);
  }, [displayName, displayEmail, setValue]);

  useEffect(() => {
    const initialValues = {
      ...defaultValues,
    };
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(initialValues));
  }, [formValues, defaultValues]);
  

  
  const onSubmit = async (data: BasicInfo) => {
    setIsLoading(true);
   
    try {
      const response = await fetch(`https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/basic-info `, {
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
  
      dispatch(setBasicInfo(data));
      onNext(); // Move to the next step
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="edit-basic-info">
      <h2>Edit Basic Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-health-container-main">
        <div className="form-health-container">
        {/* Full Name */}
        <div className="form-health-sub">
          <label>Full Name</label>
          <input  type="text" 
  value={displayName} 
  readOnly 
  className="readonly-field"/>
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
          <input type="email" 
  value={displayEmail} 
  readOnly 
  className="readonly-field" />
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