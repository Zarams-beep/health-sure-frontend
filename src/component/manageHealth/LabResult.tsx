"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LabResults } from "@/types/labResult";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

export default function LabResultsView() {
  const storedLabResults = useSelector((state: RootState) => state.labResults);
  const { id: userId, token } = useSelector((state: RootState) => state.auth);

  const [labResultDetails, setLabResultsDetails] = useState<LabResults>({
    testResults: [],
    medicalReports: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        // Use Redux if available
        if (
          storedLabResults?.testResults?.length > 0 ||
          storedLabResults?.medicalReports?.length > 0
        ) {
          setLabResultsDetails(storedLabResults);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/lab-results`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch lab results: ${response.status}`);
        }

        const data = await response.json();
        const backendData = data.data || data;

        if (!backendData.testResults && !backendData.medicalReports) {
          throw new Error("Invalid data structure from server");
        }

        setLabResultsDetails({
          testResults: backendData.testResults || [],
          medicalReports: backendData.medicalReports || [],
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLabResults();
  }, [userId, token, storedLabResults]);

  // ✅ Corrected check — just like in your previous fix
  const isInfoAvailable =
    labResultDetails.testResults.length > 0 ||
    labResultDetails.medicalReports.length > 0;

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading health info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="basic-info-container">
      {isInfoAvailable ? (
        <div className="treatment-info-container treatment-flex-info">
          {/* Test Results Section */}
          <div className="small-treatment-flex">
            <h3>TEST RESULTS</h3>
            <ul className="">
              {labResultDetails.testResults.map((test, index) => (
                <li key={index} className="test-item">
                  <div className="test-name">{test.testName || "Not specified"}</div>
                  <div className="info-item">
                    <h4>Result:</h4> 
                    <p>{test.result || "Not specified"}</p></div>
                  {test.date && (
                    <div className="info-item">
                      <h4>Date:</h4> 
                      <p>{new Date(test.date).toLocaleDateString()}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Reports Section */}
          <div className="small-treatment-flex">
            <h3>MEDICAL REPORTS</h3>
            <ul className="reports-list">
              {labResultDetails.medicalReports.map((report, index) => (
                <li key={index} className="report-item">
                 <div className="info-item">
                  <h4>Lab Link:</h4>
                   <a
                    href={report.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="report-link"
                  >
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
          <Link
            href={`/dashboard/${userId}/manage-health/edit-health`}
            className="edit-link"
          >
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
