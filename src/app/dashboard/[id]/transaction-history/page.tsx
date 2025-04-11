"use client";
import React, { useState, useRef, useEffect } from "react";
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
} from "@mui/material";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import Image from "next/image";
import BalanceMainSection from "@/component/BalanceMain";

// Define Transaction Type
interface Transaction {
  bankPicture: string;
  bankName: string;
  accountNumber: string;
  transactionType: "Debit" | "Credit";
  amount: string;
  description: string;
  date: string;
  myBankPicture: string;
  myBankName: string;
  myAccountNumber: string;
}

export default function TransactionHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/transactions.json")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  const handlePageChange = (_event: unknown, newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRowsPerPage(parseInt(event.target.value, 10));
  const handleOpenModal = (transaction: Transaction) => setSelectedTransaction(transaction);
  const handleCloseModal = () => setSelectedTransaction(null);

  const handlePrint = async () => {
    const printJSModule = (await import("print-js")).default;
    if (printRef.current) {
      printJSModule({
        printable: printRef.current.innerHTML,
        type: "raw-html",
        scanStyles: true,
        documentTitle: "Transaction Details",
      });
    }
  };

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        <BalanceMainSection />
        <Paper sx={{ padding: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Bank</TableCell>
                  <TableCell className="removeAmount">Account</TableCell>
                  <TableCell className="removeType">Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleOpenModal(transaction)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <div className="table-cell">
                        <Image src={transaction.bankPicture} alt={transaction.bankName} width={30} height={30} quality={100} />
                        <p>{transaction.bankName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="removeAmount">{transaction.accountNumber}</TableCell>
                    <TableCell className="removeType">
                      <div className="table-cell">
                        {transaction.transactionType}
                        {transaction.transactionType === "Credit" ? (
                          <IoMdArrowRoundUp color="green" />
                        ) : (
                          <IoMdArrowRoundDown color="red" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                className="text-sm md:text-base"
              />
            </div>
          </div>

          {/* Modal for transaction details */}
          {selectedTransaction && (
            <Dialog
              open={Boolean(selectedTransaction)}
              onClose={handleCloseModal}
              maxWidth="xs"
              className="modal-transaction"
              fullWidth
            >
              <DialogTitle className="transaction-header">Transaction Details</DialogTitle>
              <DialogContent ref={printRef} className="modal-transaction-2">
                <p className="transaction-text">
                  <strong>Bank:</strong>
                  <Image src={selectedTransaction.bankPicture} alt="Bank" width={30} height={30} quality={100} />{" "}
                  {selectedTransaction.bankName}
                </p>
                <p><strong>Account Number:</strong> {selectedTransaction.accountNumber}</p>
                <p><strong>Type:</strong> {selectedTransaction.transactionType}</p>
                <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                <p><strong>Description:</strong> {selectedTransaction.description}</p>
                <p><strong>Date:</strong> {selectedTransaction.date}</p>
                <p className="transaction-text">
                  <strong>My Bank:</strong>
                  <Image src={selectedTransaction.myBankPicture} alt="My Bank" width={30} height={30} quality={100} />{" "}
                  {selectedTransaction.myBankName}
                </p>
                <p><strong>My Account Number:</strong> {selectedTransaction.myAccountNumber}</p>
              </DialogContent>
              <DialogActions className="btn-modal-container">
                <button onClick={handlePrint} className="print-btn">Print</button>
                <button onClick={handleCloseModal} className="close-btn">Close</button>
              </DialogActions>
            </Dialog>
          )}
        </Paper>
      </div>
    </div>
  );
}
