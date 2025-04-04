"use client"; // For Next.js

import { useState, useEffect} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define TypeScript types
interface BloodPressureData {
  date: string;
  systolic: number;
  diastolic: number;
}

const bloodPressureData: Record<string, BloodPressureData[]> = {
  January: [
    { date: "Jan 1", systolic: 130, diastolic: 85 },
    { date: "Jan 5", systolic: 125, diastolic: 80 },
    { date: "Jan 10", systolic: 140, diastolic: 90 },
    { date: "Jan 15", systolic: 120, diastolic: 75 },
  ],
  February: [
    { date: "Feb 1", systolic: 128, diastolic: 83 },
    { date: "Feb 5", systolic: 132, diastolic: 87 },
    { date: "Feb 10", systolic: 118, diastolic: 79 },
    { date: "Feb 15", systolic: 145, diastolic: 95 },
  ],
  March: [
    { date: "Mar 1", systolic: 135, diastolic: 88 },
    { date: "Mar 5", systolic: 127, diastolic: 82 },
    { date: "Mar 10", systolic: 142, diastolic: 91 },
    { date: "Mar 15", systolic: 119, diastolic: 77 },
  ],
};

export default function BloodPressureChart() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof bloodPressureData>("January");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <div className="blood-pressure-container">
      <div className="blood-pressure-container-header">
      <h2 className="">Blood Pressure Trends</h2>

      {/* Month Filter */}
      <select
        className=""
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value as keyof typeof bloodPressureData)}
      >
        {Object.keys(bloodPressureData).map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      </div>
      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
        <LineChart data={bloodPressureData[selectedMonth]} className="line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <YAxis tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: isSmallScreen ? "10px" : "14px" }}/>

          {/* Fancy Curved Lines */}
          <Line type="monotone" dataKey="systolic" stroke="#FBC02D" strokeWidth={isSmallScreen ? 2 : 3} dot={{ r: isSmallScreen ? 4 : 6 }} />
          <Line type="monotone" dataKey="diastolic" stroke="#372D25" strokeWidth={isSmallScreen ? 2 : 3} dot={{ r: isSmallScreen ? 4 : 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
