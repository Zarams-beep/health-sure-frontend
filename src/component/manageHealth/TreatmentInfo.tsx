"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { TreatmentInfo } from "@/types/treatmentInfo";

export default function TreatmentInfoView() {
    const storedTreatmentInfo = useSelector((state: RootState) => state.treatmentInfo);
    const fullName = useSelector((state: RootState) => state.auth.fullName)||"Chizaram";

    const [treatmentInfo, setTreatmentInfo] = useState<TreatmentInfo>({
        assignedDoctor: {
            name: null,
            specialization: null,
            contact: null,
        },
        treatmentPlans: [],
        upcomingAppointments: [],
    });

    useEffect(() => {
        if (storedTreatmentInfo) {
            setTreatmentInfo({
                assignedDoctor: {
                    name: storedTreatmentInfo.assignedDoctor.name ?? null,
                    specialization: storedTreatmentInfo.assignedDoctor.specialization ?? null,
                    contact: storedTreatmentInfo.assignedDoctor.contact ?? null,
                },
                treatmentPlans: storedTreatmentInfo.treatmentPlans ?? [],
                upcomingAppointments: storedTreatmentInfo.upcomingAppointments ?? [],
            });
        }
    }, [storedTreatmentInfo]);

    // Check if any required field is missing
    const isInfoAvailable = 
        treatmentInfo.assignedDoctor.name !== null &&
        treatmentInfo.assignedDoctor.specialization !== null &&
        treatmentInfo.assignedDoctor.contact !== null &&
        treatmentInfo.treatmentPlans.length > 0 &&
        treatmentInfo.upcomingAppointments.length > 0;

    return (
        <>
            {isInfoAvailable ? (
                <div>
                    <h2>Assigned Doctor</h2>
                    <p>Name: {treatmentInfo.assignedDoctor.name}</p>
                    <p>Specialization: {treatmentInfo.assignedDoctor.specialization}</p>
                    <p>Contact: {treatmentInfo.assignedDoctor.contact}</p>

                    <h2>Treatment Plans</h2>
                    <ul>
                        {treatmentInfo.treatmentPlans.map((plan, index) => (
                            <li key={index}>{plan}</li>
                        ))}
                    </ul>

                    <h2>Upcoming Appointments</h2>
                    <ul>
                        {treatmentInfo.upcomingAppointments.map((appointment, index) => (
                            <li key={index}>
                                <p>Date: {appointment.date}</p>
                                <p>Time: {appointment.time}</p>
                                <p>Location: {appointment.location}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                 <div className="missing-info">
                            <p>No treatment information available.</p>
                          <Link href={`/dashboard/${fullName}/manage-health/edit-health`}className="info-link">
                            Click here to fill in your details
                          </Link>
                        </div>
              
            )}
        </>
    );
}