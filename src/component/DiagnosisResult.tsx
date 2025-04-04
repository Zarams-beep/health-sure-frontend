export default function DiagnosisResultSection() {
    const currentDiagnosis = {
      condition: "Hypertension",
      symptoms: ["Headache", "Dizziness", "Fatigue"],
      doctorNote: "Patient has elevated blood pressure and needs lifestyle adjustments.",
      medications: ["Lisinopril", "Amlodipine"],
      nextSteps: "Monitor BP daily and follow up in 2 weeks.",
    };
  
    const pastDiagnoses = [
      {
        condition: "Migraine",
        date: "Nov 2023",
        status: "Treated",
        doctor: "Dr. Amanda Lee",
      },
      {
        condition: "Flu",
        date: "Jan 2024",
        status: "Resolved",
        doctor: "Dr. Michael O'Connor",
      },
    ];
  
    return (
      <div className="diagnosis-result-container semi-appointment-container">
        {/* Current Diagnosis */}
        <div className="current-diagnosis-container">
          <h4>Current Diagnosis</h4>
          <div className="current-diagnosis-box">
            <h5>{currentDiagnosis.condition}</h5>
            <p><strong>Symptoms:</strong> {currentDiagnosis.symptoms.join(", ")}</p>
            <p><strong>Doctor’s Note:</strong> {currentDiagnosis.doctorNote}</p>
            <p><strong>Medications:</strong> {currentDiagnosis.medications.join(", ")}</p>
            <p><strong>Next Steps:</strong> {currentDiagnosis.nextSteps}</p>
          </div>
        </div>
  
        {/* Past Diagnosis */}
        <div className="past-diagnosis-container">
          <h4>Past Diagnoses</h4>
          {pastDiagnoses.map((diagnosis, index) => (
            <div key={index} className="past-diagnosis-box">
              <h5>{diagnosis.condition}</h5>
              <p><strong>Date:</strong> {diagnosis.date}</p>
              <p><strong>Status:</strong> {diagnosis.status}</p>
              <p><strong>Doctor:</strong> {diagnosis.doctor}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  