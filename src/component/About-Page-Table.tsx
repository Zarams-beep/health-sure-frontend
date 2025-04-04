"use client";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    backgroundColor: "#372D25",
    color: "#FEF8EF",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AboutTableSection() {
  return (
    <section className="about-how-we-work">
      <div>
        <h2>How We Work</h2>
        <p>Our health-saving model ensures full transparency and security:</p>
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Feature</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>Secure Deposits</StyledTableCell>
                  <StyledTableCell>
                    Funds are stored securely with real-time tracking and full visibility.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Medical-Only Withdrawals</StyledTableCell>
                  <StyledTableCell>
                    Funds can only be used for medical care at registered hospitals.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Beneficiary Claims</StyledTableCell>
                  <StyledTableCell>
                    In case of unforeseen circumstances, designated beneficiaries can access the savings.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>No Hidden Charges</StyledTableCell>
                  <StyledTableCell>
                    We ensure complete transparency with zero hidden fees.
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </section>
  );
}
