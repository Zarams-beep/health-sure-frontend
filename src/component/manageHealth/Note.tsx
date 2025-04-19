"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { Notes } from "@/types/note";
import { setNotes } from "@/store/slices/notes";
import { CircularProgress } from "@mui/material";

export default function NoteView() {
  const dispatch = useDispatch();

  const storedNotes = useSelector((state: RootState) => state.notes) || {
    doctorNotes: [],
    caregiverComments: [],
  };

  const { id: userId, token } = useSelector((state: RootState) => state.auth);

  const [noteDetails, setNoteDetails] = useState<Notes>({
    doctorNotes: [],
    caregiverComments: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        if (
          storedNotes?.doctorNotes?.length > 0 ||
          storedNotes?.caregiverComments?.length > 0
        ) {
          setNoteDetails(storedNotes);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://health-sure-backend.onrender.com/dashboard/${userId}/manage-health/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch note results: ${response.status}`);
        }

        const data = await response.json();
        const backendData = data.data || data;

        if (
          !backendData.doctorNotes ||
          !backendData.caregiverComments
        ) {
          throw new Error("Invalid data structure from server");
        }

        dispatch(setNotes(backendData));
        setNoteDetails(backendData);
      } catch (err) {
        console.error("Error fetching note info:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetails();
  }, [userId, token, dispatch, storedNotes]);

  const isInfoAvailable = Object.values(noteDetails).some(
    (value) => value.length > 0
  );

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading note info...</p>
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
    <div className="notes-container">
      {isInfoAvailable ? (
        <>
          <h2>Notes</h2>

          {/* Doctor Notes Section */}
          {noteDetails.doctorNotes.length > 0 && (
            <div className="view-section">
              <h3>Doctor&apos;s Notes</h3>
              <ul>
                {noteDetails.doctorNotes.map((note, index) => (
                  <li key={index} className="note-item">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Caregiver Comments Section */}
          {noteDetails.caregiverComments.length > 0 && (
            <div className="view-section">
              <h3>Caregiver Comments</h3>
              <ul>
                {noteDetails.caregiverComments.map((comment, index) => (
                  <li key={index} className="comment-item">
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="missing-info">
          <p>No notes have been added yet.</p>
          <Link
            href={`/dashboard/${userId}/manage-health/edit-health`}
            className="info-link"
          >
            Click here to add notes
          </Link>
        </div>
      )}
    </div>
  );
}
