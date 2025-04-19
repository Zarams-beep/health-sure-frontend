"use client";
import BalanceMainSection from "@/component/BalanceMain";
import BasicInfoSectionView from "@/component/manageHealth/BasicInfo";
import HealthStatusView from "@/component/manageHealth/HealthStatus";
import LabResultsView from "@/component/manageHealth/LabResult";
import MedicalHistoryView from "@/component/manageHealth/MedicalHistory";
import NoteView from "@/component/manageHealth/Note";
import TreatmentInfoView from "@/component/manageHealth/TreatmentInfo";
export default function ViewHealthPage(){
   return(
    <>
    <div className="main-wallet-container">
         <div className="wallet-container">
           <BalanceMainSection />
           <div className="view-main-container">
            <BasicInfoSectionView/>
            <HealthStatusView/>
            <MedicalHistoryView/>
            <TreatmentInfoView/>
            <LabResultsView/>
            <NoteView/>
           </div>
           </div>
    </div>
</>
   )
}