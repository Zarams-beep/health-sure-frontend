"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

export default function NoteView() {
  // Get stored notes from Redux
  const storedNotes = useSelector((state: RootState) => state.notes) || {
    doctorNotes: [],
    caregiverComments: [],
  };

  // Get full name from Redux
  const fullName = useSelector((state: RootState) => state.auth.fullName) || "Chizaram";

  // Check if any notes exist
  const isInfoAvailable = [storedNotes.doctorNotes, storedNotes.caregiverComments].some(
    (notes) => notes.length > 0
  );

  return (
    <div className="notes-container">
      {isInfoAvailable ? (
        <>
          <h2>Notes</h2>

          {/* Doctor Notes Section */}
          {storedNotes.doctorNotes.length > 0 && (
            <div className="view-section">
              <h3>Doctor's Notes</h3>
              <ul>
                {storedNotes.doctorNotes.map((note, index) => (
                  <li key={index} className="note-item">{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Caregiver Comments Section */}
          {storedNotes.caregiverComments.length > 0 && (
            <div className="view-section">
              <h3>Caregiver Comments</h3>
              <ul>
                {storedNotes.caregiverComments.map((comment, index) => (
                  <li key={index} className="comment-item">{comment}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="missing-info">
          <p>No notes have been added yet.</p>
          <Link href={`/dashboard/${fullName}/manage-health/edit-health`} className="info-link">
            Click here to add notes
          </Link>
        </div>
      )}
    </div>
  );
}
