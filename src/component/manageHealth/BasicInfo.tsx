"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { BasicInfo } from "@/types/basicInfo";
export default function BasicInfoSectionView() {
  const storedBasicInfo = useSelector((state: RootState) => state.basicInfo);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
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
  });

  useEffect(() => {
    if (storedBasicInfo) {
      setBasicInfo({
        fullName: storedBasicInfo.fullName ?? "Chizaram",
        DOB: storedBasicInfo.DOB ?? "",
        Age: storedBasicInfo.Age ?? "",
        Gender: storedBasicInfo.Gender ?? "Male",
        phoneNumber: storedBasicInfo.phoneNumber ?? "",
        email: storedBasicInfo.email ?? "",
        HouseAddress: storedBasicInfo.HouseAddress ?? "",
        EmergencyNumber: storedBasicInfo.EmergencyNumber ?? "",
        NextOfKinName: storedBasicInfo.NextOfKinName ?? "",
        NextOfKinGender: storedBasicInfo.NextOfKinGender ?? "Male",
        NextOfKinPhoneNumber: storedBasicInfo.NextOfKinPhoneNumber ?? "",
        NextOfKinEmailAddress: storedBasicInfo.NextOfKinEmailAddress ?? "",
      });
    }
  }, [storedBasicInfo]);

  // Check if any required field is missing
  const isInfoAvailable = Object.values(basicInfo).every((value) => value);

  
  return (
    <div className="basic-info-container">
      {isInfoAvailable ? (
        <>
          <div className="info-item">
            <h4>Full Name:</h4>
            <p>{basicInfo.fullName}</p>
          </div>
          <div className="info-item">
            <h4>Date of Birth:</h4>
            <p>{basicInfo.DOB}</p>
          </div>
          <div className="info-item">
            <h4>Age:</h4>
            <p>{basicInfo.Age}</p>
          </div>
          <div className="info-item">
            <h4>Gender:</h4>
            <p>{basicInfo.Gender}</p>
          </div>
          <div className="info-item">
            <h4>Phone Number:</h4>
            <p>{basicInfo.phoneNumber}</p>
          </div>
          <div className="info-item">
            <h4>Email:</h4>
            <p>{basicInfo.email}</p>
          </div>
          <div className="info-item">
            <h4>House Address:</h4>
            <p>{basicInfo.HouseAddress}</p>
          </div>
          <div className="info-item">
            <h4>Emergency Number:</h4>
            <p>{basicInfo.EmergencyNumber}</p>
          </div>
          <div className="info-item">
            <h4>Next of Kin Name:</h4>
            <p>{basicInfo.NextOfKinName}</p>
          </div>
          <div className="info-item">
            <h4>Next of Kin Gender:</h4>
            <p>{basicInfo.NextOfKinGender}</p>
          </div>
          <div className="info-item">
            <h4>Next of Kin Phone Number:</h4>
            <p>{basicInfo.NextOfKinPhoneNumber}</p>
          </div>
          <div className="info-item">
            <h4>Next of Kin Email Address:</h4>
            <p>{basicInfo.NextOfKinEmailAddress}</p>
          </div>
        </>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your basic information yet.</p>
          <Link href={`/dashboard/${basicInfo.fullName}/manage-health/edit-health`}className="info-link">
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
