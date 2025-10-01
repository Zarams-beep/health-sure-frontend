"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { MeetDoctorForm } from "@/types/auth";
import { meetDoctorSchema } from "@/features/meetSchema";
import { departments, doctors } from "@/assets/meetDoctorAsset";

export default function MeetDoctor() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<MeetDoctorForm>({
    resolver: zodResolver(meetDoctorSchema),
    mode: "onSubmit",
  });

  const selectedDepartment = watch("department");
  const selectedDoctor = watch("doctor");

  // Filter doctors based on selected department
  const filteredDoctors = selectedDepartment
    ? doctors.filter((doc) => doc.department === selectedDepartment)
    : doctors;

  // When doctor changes, update department accordingly
  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctors.find((doc) => doc.name === selectedDoctor);
      if (doctor && doctor.department !== selectedDepartment) {
        setValue("department", doctor.department);
      }
    }
  }, [selectedDoctor, selectedDepartment, setValue]);

  // When department changes, clear doctor if it doesn't belong to the selected department
  useEffect(() => {
    if (selectedDepartment) {
      const doctor = doctors.find((doc) => doc.name === selectedDoctor);
      if (doctor && doctor.department !== selectedDepartment) {
        setValue("doctor", "");
      }
    }
  }, [selectedDepartment, selectedDoctor, setValue]);

  const allFieldsFilled =
    watch("name") &&
    watch("phoneNumber") &&
    watch("email") &&
    watch("date") &&
    watch("department") &&
    watch("doctor") &&
    watch("message");

    const submitData = (data: MeetDoctorForm) => {
      if (!allFieldsFilled || (isSubmitted && Object.keys(errors).length > 0)) {
        setLoading(false);
        return;
      }
      setLoading(true);
      console.log("Form submitted:", data);
  
      // Simulate an async submission
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
        reset(); // Reset form after submission
      }, 1500);
    };

  return (
    <>
    <div className="dashboard-meet-doctor">
      <div className="dashboard-meet-doctor-small">
        <div className="dashboard-meet-doctor-img-container">
          <Image
            src="/img-8.jpg"
            alt="meet doctor"
            width={400}
            height={250}
            quality={100}
          />
        </div>
      </div>

      <div className="dashboard-meet-doctor-form-area">
       <div className="form-area-2">
       <div className="emergency-info">
          <h3>EMERGENCY CASES</h3>

<div className="meet-doctor-form-1">
          <div className="small-meet-doctor">
            <h5>Call Now:</h5>
            <p>45454322375</p>
          </div>

          <div className="small-meet-doctor">
            <h5>Address:</h5>
            <p>
              Harmony Crest Medical Centre, 12 Olorunfemi Crescent, Off Ajao
              Road, Ikeja, Lagos State, Nigeria.
            </p>
          </div>

          <div className="small-meet-doctor">
            <h5>Address:</h5>
            <p>
              Greenlife Specialist Hospital, Plot 87A Unity Avenue, GRA Phase 2,
              Port Harcourt, Rivers State, Nigeria.
            </p>
          </div>

          <div className="small-meet-doctor">
            <h5>Working Time:</h5>
            <p>Mon-Sat/07.00-17.00 Sun/08.00-11.00</p>
          </div>

          <div className="small-meet-doctor">
            <h5>Email:</h5>
            <p>support@healthsure.com</p>
          </div>
        </div></div>

        <div className="request-appointment">
          <h3>REQUEST APPOINTMENT</h3>
          <form onSubmit={handleSubmit(submitData)} className="meet-doctor-form">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}

            <input
              type="date"
              {...register("date")}
            />
            {errors.date && <p className="error">{errors.date.message}</p>}

            <select {...register("department")}>
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && <p className="error">{errors.department.message}</p>}

            <select {...register("doctor")}>
              <option value="">Select Doctor</option>
              {filteredDoctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
            {errors.doctor && <p className="error">{errors.doctor.message}</p>}

            <textarea
              placeholder="Your message"
              {...register("message")}
            />
            {errors.message && <p className="error">{errors.message.message}</p>}

            <div className="btn-meet">
              <button type="submit" disabled={loading || !allFieldsFilled}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            </div>
          </form>
        </div>
       </div>
      </div>
    </div>

       {/* Modal */}
       {showModal && (
        <div className="modal-overlay">
          <div className="modal-content meet-doctor-modal-content">
            <div className="thumb-icon"><BsFillHandThumbsUpFill/></div>
            <h2>Submitted!</h2>
            <p>Kindly wait for a response, please.</p>
            <div className="meet-modal-btn">
            <button onClick={() => setShowModal(false)}>Close</button></div>
          </div>
        </div>
      )}</>
  );
}
