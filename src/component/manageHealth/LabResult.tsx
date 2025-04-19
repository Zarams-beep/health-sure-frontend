"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LabResults } from "@/types/labResult";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

export default function LabResultsView() {
  const storedLabResults = useSelector((state: RootState) => state.labResults);
  const { token, id } = useSelector((state: RootState) => state.auth);
  const userId = id;
  const [labResultDetails, setLabResultsDetails] = useState<LabResults>({
    testResults: [],
    medicalReports: [],
  });
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(userId);
    const fetchLabResults = async () => {
      try {
        // Always check Redux first
        if (storedLabResults?.testResults?.length > 0 || storedLabResults?.medicalReports?.length > 0) {
          return;
        }

        // Fetch from backend if no data in Redux
        const response = await fetch(
          `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/lab-results`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch lab results: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle both { data: {...} } and direct response structures
        const backendData = data.data || data;
        
        if (!backendData.testResults || !backendData.medicalReports) {
          throw new Error('Invalid data structure from server');
        }

        setLabResultsDetails({
          testResults: backendData.testResults || [],
          medicalReports: backendData.medicalReports || []
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLabResults();
  }, [userId, token]); // Removed storedLabResults from dependencies to prevent loops

  useEffect(() => {
    // Update local state whenever Redux state changes
    if (storedLabResults) {
      setLabResultsDetails({
        testResults: storedLabResults.testResults || [],
        medicalReports: storedLabResults.medicalReports || []
      });
      setLoading(false);
    }
  }, [storedLabResults]);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading lab results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
        <Link href={`/dashboard/${userId}/manage-health/edit-health`}>
          Or add new lab results
        </Link>
      </div>
    );
  }

  // Debugging output - remove in production
  console.log('Current lab results:', labResultDetails);

  const hasTestResults = labResultDetails.testResults?.length > 0;
  const hasMedicalReports = labResultDetails.medicalReports?.length > 0;

  return (
    <div className="basic-info-container">
      <h2>Lab Results</h2>

      {/* Test Results Section */}
      <div className="view-section">
        <h3>Test Results</h3>
        {hasTestResults ? (
          <ul className="results-list">
            {labResultDetails.testResults.map((test, index) => (
              <li key={index} className="test-item">
                <div className="test-name">{test.testName || "Not specified"}</div>
                <div className="test-result">Result: {test.result || "Not specified"}</div>
                {test.date && (
                  <div className="test-date">
                    Date: {new Date(test.date).toLocaleDateString()}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No test results available</p>
        )}
      </div>

      {/* Medical Reports Section */}
      <div className="view-section">
        <h3>Medical Reports</h3>
        {hasMedicalReports ? (
          <ul className="reports-list">
            {labResultDetails.medicalReports.map((report, index) => (
              <li key={index} className="report-item">
                <a
                  href={report.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="report-link"
                >
                  {report.title || "Untitled report"}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No medical reports available</p>
        )}
      </div>

      <Link
        href={`/dashboard/${userId}/manage-health/edit-health`}
        className="edit-link"
      >
        {hasTestResults || hasMedicalReports ? "Edit Lab Results" : "Add Lab Results"}
      </Link>
    </div>
  );
}