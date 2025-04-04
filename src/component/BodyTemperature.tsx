"use client"; // For Next.js

import { useState, useEffect} from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define TypeScript types
interface BodyTemperatureData {
  date: string;
  temperature: number;
}

const bodyTemperatureData: Record<string, BodyTemperatureData[]> = {
  January: [
    { date: "Jan 1", temperature: 98.6 },
    { date: "Jan 5", temperature: 99.1 },
    { date: "Jan 10", temperature: 100.4 },
    { date: "Jan 15", temperature: 97.8 },
  ],
  February: [
    { date: "Feb 1", temperature: 98.9 },
    { date: "Feb 5", temperature: 99.5 },
    { date: "Feb 10", temperature: 100.2 },
    { date: "Feb 15", temperature: 98.2 },
  ],
  March: [
    { date: "Mar 1", temperature: 98.7 },
    { date: "Mar 5", temperature: 99.3 },
    { date: "Mar 10", temperature: 100.1 },
    { date: "Mar 15", temperature: 97.9 },
  ],
};

export default function BodyTemperatureChart() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof bodyTemperatureData>("January");
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
        <h2 className="">Body Temperature Trends</h2>
        
        {/* Month Filter */}
        <select
          className=""
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as keyof typeof bodyTemperatureData)}
        >
          {Object.keys(bodyTemperatureData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
        <AreaChart data={bodyTemperatureData[selectedMonth]} className="line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <YAxis tick={{ fontSize: isSmallScreen ? 10 : 14 }}/>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: isSmallScreen ? "10px" : "14px" }}/>
          
          {/* Body Temperature Area Chart */}
          <Area type="monotone" dataKey="temperature" stroke="#FF7043" fill="#FFCCBC" strokeWidth={isSmallScreen ? 2 : 3} dot={{ r: isSmallScreen ? 4 : 6 }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
