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
  const components = [
    <BasicInfoSectionView key="basic" />,
    <HealthStatusView key="status" />,
    <MedicalHistoryView key="history" />,
    <TreatmentInfoView key="treatment" />,
    <LabResultsView key="lab" />,
    <NoteView key="note" />,
  ];

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        <BalanceMainSection />
        <div className="view-main-container">
          {components.map((Component, index) => (
            <div key={index} className="pinned-section">
              <div className="pinned-section-2">
                <MdNetworkPing className="pin"/>
              </div>
              {Component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
