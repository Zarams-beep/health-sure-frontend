"use client";

import { useState } from "react";
import BloodPressureChart from "@/component/BloodPressureChartPage";
import AnatomyDiagram from "@/component/DashboardAnatomy";
import CardsSection from "@/component/DashboardCard";
import DashboardLatestAppPage from "@/component/DashboardLatestAp";
import DiagnosisResultSection from "@/component/DiagnosisResult";
import HeartRateChart from "@/component/HeartRateChart";
import BloodSugarChart from "@/component/SugarLevelChart";
import BodyTemperatureChart from "@/component/BodyTemperature";
import CholesterolChart from "@/component/CholesterolChart";
import WeightBMIChart from "@/component/BMIChart";

export default function DashboardLandingPage() {
    const [selectedChart, setSelectedChart] = useState<"bloodPressure" | "heartRate" | "SugarLevel" | "BodyTemp" | "Cholesterol" | "BMI">("bloodPressure");

    return (
        <div className="dashboard-main-page-container">
            <CardsSection />
                <div className="dashboard-main-page-container-2">
                    <AnatomyDiagram />
                    <div className="dashboard-main-page-container-3">
                        <div className="dashboard-main-page-container-4">
                            <div className="chart-selector">
                                <button className={`chart-button ${selectedChart === "bloodPressure" ? "active" : ""}`} onClick={() => setSelectedChart("bloodPressure")}>
                                    Blood Pressure Chart
                                </button>
                                <button className={`chart-button ${selectedChart === "heartRate" ? "active" : ""}`} onClick={() => setSelectedChart("heartRate")}>
                                    Heart Rate Chart
                                </button>
                                <button className={`chart-button ${selectedChart === "SugarLevel" ? "active" : ""}`} onClick={() => setSelectedChart("SugarLevel")}>
                                    Sugar Level Chart
                                </button>
                                <button className={`chart-button ${selectedChart === "BodyTemp" ? "active" : ""}`} onClick={() => setSelectedChart("BodyTemp")}>
                                    Body Temp Chart
                                </button>
                                <button className={`chart-button ${selectedChart === "Cholesterol" ? "active" : ""}`} onClick={() => setSelectedChart("Cholesterol")}>
                                    Cholesterol Chart
                                </button>
                                <button className={`chart-button ${selectedChart === "BMI" ? "active" : ""}`} onClick={() => setSelectedChart("BMI")}>
                                    BMI Chart
                                </button>
                            </div>

                            <div className="chart-container">
                                {selectedChart === "bloodPressure" && <BloodPressureChart />}
                                {selectedChart === "heartRate" && <HeartRateChart />}
                                {selectedChart === "SugarLevel" && <BloodSugarChart />}
                                {selectedChart === "BodyTemp" && <BodyTemperatureChart />}
                                {selectedChart === "Cholesterol" && <CholesterolChart />}
                                {selectedChart === "BMI" && <WeightBMIChart />}
                            </div>
                        </div>
                        <div className="dashboard-main-page-container-5">
                            <DashboardLatestAppPage />
                            <DiagnosisResultSection />
                        </div>
                    </div>
                </div>
        </div>
    );
}
