"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { LabResults } from "@/types/labResult";
import { CircularProgress } from "@mui/material";

export default function LabResultsView() {
  const storedLabResults = useSelector((state: RootState) => state.labResults);
  const { token, userId } = useAuth();
  const [labResults, setLabResults] = useState<LabResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    const fetchLabResults = async () => {
      setLoading(true);
      setError(null);
      try {
        if (storedLabResults?.testResults?.length > 0 || storedLabResults?.medicalReports?.length > 0) {
          setLabResults(storedLabResults);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}/manage-health/lab-results`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        if (response.status === 401 || response.status === 404) { setLabResults(null); return; }
        if (!response.ok) throw new Error(`Failed to fetch lab results: ${response.status}`);
        const data = await response.json();
        setLabResults(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchLabResults();
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="loading-container"><CircularProgress size={28} /><p>Loading lab results...</p></div>;
  if (error) return <div className="error-container"><p>Error: {error}</p><button onClick={() => setError(null)}>Retry</button></div>;

  const isInfoAvailable = labResults && (labResults.testResults?.length > 0 || labResults.medicalReports?.length > 0);

  return (
    <div className="basic-info-container">
      {isInfoAvailable ? (
        <div className="treatment-info-container treatment-flex-info">
          <div className="small-treatment-flex">
            <h3>TEST RESULTS</h3>
            <ul>
              {labResults!.testResults.map((test, i) => (
                <li key={i}>
                  <div className="test-name">{test.testName || "Not specified"}</div>
                  <div className="info-item"><h4>Result:</h4><p>{test.result || "Not specified"}</p></div>
                  {test.date && <div className="info-item"><h4>Date:</h4><p>{new Date(test.date).toLocaleDateString()}</p></div>}
                </li>
              ))}
            </ul>
          </div>
          <div className="small-treatment-flex">
            <h3>MEDICAL REPORTS</h3>
            <ul>
              {labResults!.medicalReports.map((report, i) => (
                <li key={i}>
                  <div className="info-item">
                    <h4>Report:</h4>
                    <a href={report.url || "#"} target="_blank" rel="noopener noreferrer" className="info-link">
                      {report.title || "Untitled report"}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="missing-info">
          <p>No lab result information available.</p>
          <Link href={`/dashboard/${userId}/manage-health/edit-health`} className="info-link">Click here to fill in your details</Link>
        </div>
      )}
    </div>
  );
}
