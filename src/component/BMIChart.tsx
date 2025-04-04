"use client"; // For Next.js

import { useState, useEffect} from "react";
import { Line,  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";

// Define TypeScript types
interface WeightBMIData {
  date: string;
  weight: number;
  bmi: number;
}

const weightBMIData: Record<string, WeightBMIData[]> = {
  January: [
    { date: "Jan 1", weight: 160, bmi: 24.5 },
    { date: "Jan 5", weight: 162, bmi: 24.8 },
    { date: "Jan 10", weight: 158, bmi: 24.2 },
    { date: "Jan 15", weight: 165, bmi: 25.1 },
  ],
  February: [
    { date: "Feb 1", weight: 161, bmi: 24.6 },
    { date: "Feb 5", weight: 163, bmi: 24.9 },
    { date: "Feb 10", weight: 159, bmi: 24.3 },
    { date: "Feb 15", weight: 166, bmi: 25.2 },
  ],
  March: [
    { date: "Mar 1", weight: 160, bmi: 24.5 },
    { date: "Mar 5", weight: 162, bmi: 24.8 },
    { date: "Mar 10", weight: 157, bmi: 24.0 },
    { date: "Mar 15", weight: 164, bmi: 25.0 },
  ],
};

export default function WeightBMIChart() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof weightBMIData>("January");
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
        <h2 className="">Weight & BMI Trends</h2>
        
        {/* Month Filter */}
        <select
          className=""
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as keyof typeof weightBMIData)}
        >
          {Object.keys(weightBMIData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
        <ComposedChart data={weightBMIData[selectedMonth]} className="line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <YAxis tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: isSmallScreen ? "10px" : "14px" }} />
          
          {/* Weight Bar Chart */}
          <Bar dataKey="weight" fill="#372D25" name="Weight (lbs)" barSize={isSmallScreen ? 20 : 40} />
          
          {/* BMI Line Chart */}
          <Line type="monotone" dataKey="bmi" stroke="#FFB300" strokeWidth={isSmallScreen ? 2 : 3} dot={{ r: isSmallScreen ? 4 : 6 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}