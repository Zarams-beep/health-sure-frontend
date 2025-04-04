"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LabResults } from "@/types/labResult";
import Link from "next/link"; // Import Link if needed

export default function LabResultsView() {
  const storedLabResults = useSelector((state: RootState) => state.labResults);
  const fullName =
    useSelector((state: RootState) => state.auth.fullName) || "Chizaram";
  const [labResultDetails, setLabResultsDetails] = useState<LabResults>({
    testResults: [],
    medicalReports: [],
  });

  useEffect(() => {
    if (storedLabResults) {
      setLabResultsDetails({
        testResults: storedLabResults.testResults.map((test) => ({
          testName: test.testName ?? "",
          result: test.result ?? "",
          date: test.date ?? "",
        })),
        medicalReports: storedLabResults.medicalReports.map((report) => ({
          title: report.title ?? "",
          url: report.url ?? "",
        })),
      });
    }
  }, [storedLabResults]);

  const isInfoAvailable =
    labResultDetails.testResults.length > 0 ||
    labResultDetails.medicalReports.length > 0;

  return (
    <div className="basic-info-container">
      {isInfoAvailable ? (
        <>
          <h2>Lab Results</h2>

          {/* Test Results Section */}
          <div className="view-section">
            <h3>Test Results</h3>
            <ul>
              {labResultDetails.testResults.map((test, index) => (
                <li key={index} className="test-item">
                  <strong>{test.testName}</strong>: {test.result} <br />
                  <small>Date: {test.date}</small>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Reports Section */}
          <div className="view-section">
            <h3>Medical Reports</h3>
            <ul>
              {labResultDetails.medicalReports.map((report, index) => (
                <li key={index} className="report-item">
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {report.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="missing-info">
          <p>You haven&apos;t added your lab results yet.</p>
          <Link
            href={`/dashboard/${fullName}/manage-health/edit-health`}
            className="info-link"
          >
            Click here to fill in your details
          </Link>
        </div>
      )}
    </div>
  );
}
