"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MedicalHistory } from "@/types/medicalHistory";

export default function MedicalHistoryView() {
  const storedMedicalHistory = useSelector(
    (state: RootState) => state.medicalHistory
  );
  const fullName =
    useSelector((state: RootState) => state.auth.fullName) || "Chizaram";
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    pastDiagnoses: [],
    surgeries: [],
    medications: [],
    familyHistory: [],
  });

  useEffect(() => {
    if (storedMedicalHistory) {
      setMedicalHistory({
        pastDiagnoses: storedMedicalHistory.pastDiagnoses ?? [],
        surgeries: storedMedicalHistory.surgeries ?? [],
        medications: storedMedicalHistory.medications ?? [],
        familyHistory: storedMedicalHistory.familyHistory ?? [],
      });
    }
  }, [storedMedicalHistory]);

  // Check if any required field is missing
  const isInfoAvailable =
    medicalHistory.pastDiagnoses.length > 0 ||
    medicalHistory.surgeries.length > 0 ||
    medicalHistory.medications.length > 0 ||
    medicalHistory.familyHistory.length > 0;

  return (
    <div className="medical-history-container">
      {isInfoAvailable ? (
        <>
          <div className="info-item">
            <h4>Past Diagnoses:</h4>
            <ul>
              {medicalHistory.pastDiagnoses.map((diagnosis, index) => (
                <li key={index}>{diagnosis}</li>
              ))}
            </ul>
          </div>

          <div className="info-item">
            <h4>Surgeries:</h4>
            <ul>
              {medicalHistory.surgeries.map((surgery, index) => (
                <li key={index}>{surgery}</li>
              ))}
            </ul>
          </div>

          <div className="info-item">
            <h4>Medications:</h4>
            <ul>
              {medicalHistory.medications.map((med, index) => (
                <li key={index}>
                  {med.name} - {med.dosage}, {med.frequency}
                </li>
              ))}
            </ul>
          </div>

          <div className="info-item">
            <h4>Family History:</h4>
            <ul>
              {medicalHistory.familyHistory.map((history, index) => (
                <li key={index}>{history}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your medical history yet.</p>
          <Link
            href={`/dashboard/${fullName}/manage-health/edit-health`}
            className="info-link"
          >
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
