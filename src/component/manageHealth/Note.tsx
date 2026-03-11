"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Notes } from "@/types/note";
import { setNotes } from "@/store/slices/notes";
import { CircularProgress } from "@mui/material";

export default function NoteView() {
  const dispatch = useDispatch();
  const storedNotes = useSelector((state: RootState) => state.notes);
  const { token, userId } = useAuth();
  const [noteDetails, setNoteDetails] = useState<Notes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        if (storedNotes?.doctorNotes?.length > 0 || storedNotes?.caregiverComments?.length > 0) {
          setNoteDetails(storedNotes);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}/manage-health/notes`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        if (response.status === 401 || response.status === 404) { setNoteDetails(null); return; }
        if (!response.ok) throw new Error(`Failed to fetch notes: ${response.status}`);
        const data = await response.json();
        const backendData = data.data || data;
        dispatch(setNotes(backendData));
        setNoteDetails(backendData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="loading-container"><CircularProgress size={28} /><p>Loading notes...</p></div>;
  if (error) return <div className="error-container"><p>Error: {error}</p><button onClick={() => setError(null)}>Retry</button></div>;

  const isInfoAvailable = noteDetails && (noteDetails.doctorNotes?.length > 0 || noteDetails.caregiverComments?.length > 0);

  return (
    <div className="health-status-container">
      {isInfoAvailable ? (
        <div className="health-status-container treatment-flex-info">
          {noteDetails!.doctorNotes?.length > 0 && (
            <div className="small-treatment-flex">
              <h3>DOCTOR&apos;S NOTES</h3>
              <ul>{noteDetails!.doctorNotes.map((note, i) => <li key={i}><div className="info-item"><h4>Note:</h4><p>{note}</p></div></li>)}</ul>
            </div>
          )}
          {noteDetails!.caregiverComments?.length > 0 && (
            <div className="small-treatment-flex">
              <h3>CAREGIVER COMMENTS</h3>
              <ul>{noteDetails!.caregiverComments.map((comment, i) => <li key={i}><div className="info-item"><h4>Comment:</h4><p>{comment}</p></div></li>)}</ul>
            </div>
          )}
        </div>
      ) : (
        <div className="missing-info">
          <p>No notes have been added yet.</p>
          <Link href={`/dashboard/${userId}/manage-health/edit-health`} className="info-link">Click here to add notes</Link>
        </div>
      )}
    </div>
  );
}
