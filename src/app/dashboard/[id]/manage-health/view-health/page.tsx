"use client";

import BalanceMainSection from "@/component/BalanceMain";
import BasicInfoSectionView from "@/component/manageHealth/BasicInfo";
import HealthStatusView from "@/component/manageHealth/HealthStatus";
import LabResultsView from "@/component/manageHealth/LabResult";
import MedicalHistoryView from "@/component/manageHealth/MedicalHistory";
import NoteView from "@/component/manageHealth/Note";
import TreatmentInfoView from "@/component/manageHealth/TreatmentInfo";
import { MdNetworkPing } from "react-icons/md";

export default function ViewHealthPage() {
  const healthSections = [
    { component: <BasicInfoSectionView />, title: "Basic Info" },
    { component: <HealthStatusView />, title: "Health Status" },
    { component: <MedicalHistoryView />, title: "Medical History" },
    { component: <TreatmentInfoView />, title: "Treatment Info" },
    { component: <LabResultsView />, title: "Lab Results" },
    { component: <NoteView />, title: "Note" },
  ];
  

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        <BalanceMainSection />
        <div className="view-main-container">
        {healthSections.map(({ component, title }, index) => (
  <div key={index} className="pinned-section">
    <h2>{title}</h2>
    <div className="pinned-section-2">
      <MdNetworkPing className="pin" />
    </div>
    {component}
  </div>
))}

        </div>
      </div>
    </div>
  );
}
