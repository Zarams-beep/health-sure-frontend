"use client"; // For Next.js

import { useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define TypeScript types
interface BloodSugarData {
  date: string;
  fasting: number;
  postMeal: number;
}

const bloodSugarData: Record<string, BloodSugarData[]> = {
  January: [
    { date: "Jan 1", fasting: 90, postMeal: 140 },
    { date: "Jan 5", fasting: 95, postMeal: 135 },
    { date: "Jan 10", fasting: 88, postMeal: 145 },
    { date: "Jan 15", fasting: 92, postMeal: 138 },
  ],
  February: [
    { date: "Feb 1", fasting: 94, postMeal: 142 },
    { date: "Feb 5", fasting: 89, postMeal: 137 },
    { date: "Feb 10", fasting: 96, postMeal: 144 },
    { date: "Feb 15", fasting: 91, postMeal: 139 },
  ],
  March: [
    { date: "Mar 1", fasting: 93, postMeal: 141 },
    { date: "Mar 5", fasting: 87, postMeal: 136 },
    { date: "Mar 10", fasting: 98, postMeal: 146 },
    { date: "Mar 15", fasting: 90, postMeal: 140 },
  ],
};

export default function BloodSugarChart() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof bloodSugarData>("January");
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
        <h2 className="">Blood Sugar Levels</h2>
        
        {/* Month Filter */}
        <select
          className=""
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as keyof typeof bloodSugarData)}
        >
          {Object.keys(bloodSugarData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
        <BarChart data={bloodSugarData[selectedMonth]} className="line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" 
          tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <YAxis 
          tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: isSmallScreen ? "10px" : "14px" }}/>
          
          {/* Blood Sugar Bars */}
          <Bar dataKey="fasting" fill="#FBC02D" name="Fasting" barSize={isSmallScreen ? 20 : 40} />
          <Bar dataKey="postMeal" fill="#372D25" name="Post-Meal" barSize={isSmallScreen ? 20 : 40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
