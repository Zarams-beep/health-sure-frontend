"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Updated Appointment type with complaint and treatment
type Appointment = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  department: string;
  doctor: string;
  message: string;
  complaint: string; 
  treatment: string; 
};

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/appointment.json")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Failed to fetch appointments:", error));
  }, []);

  const handlePageChange = (_: unknown, newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (appointment: Appointment) => setSelectedAppointment(appointment);
  const handleCloseModal = () => setSelectedAppointment(null);

  const handlePrint = async () => {
    const printJSModule = (await import("print-js")).default;
    if (printRef.current) {
      printJSModule({
        printable: printRef.current.innerHTML,
        type: "raw-html",
        scanStyles: true,
        documentTitle: "Appointment Details",
      });
    }
  };

  return (
    <div className="appointment-history">
      <h2 className="">Appointment History</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Department</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table-body">
            {appointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.department}</TableCell>
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell className="btn-appoint">
                    <Button onClick={() => handleOpenModal(appt)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={appointments.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* Modal for appointment details */}
      <Dialog open={!!selectedAppointment} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent dividers>
          {selectedAppointment && (
            <div ref={printRef}>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Phone Number:</strong> {selectedAppointment.phoneNumber}</p>
              <p><strong>Date:</strong> {selectedAppointment.date}</p>
              <p><strong>Department:</strong> {selectedAppointment.department}</p>
              <p><strong>Doctor:</strong> {selectedAppointment.doctor}</p>
              <p><strong>Message:</strong> {selectedAppointment.message}</p>
              <p><strong>Complaint:</strong> {selectedAppointment.complaint}</p>
              <p><strong>Treatment:</strong> {selectedAppointment.treatment}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrint} variant="contained" color="primary">Print</Button>
          <Button onClick={handleCloseModal} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
