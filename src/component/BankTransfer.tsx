"use client";
// import { GoArrowLeft } from "react-icons/go";
import Image from "next/image";
import { useState } from "react";
import ModalSection from "@/component/modal-container";
export default function BankTransferSection() {
  const accountNumber = "2086121202";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

   const [isModalOpen, setIsModalOpen] = useState(false);
     const onSubmit = () => {
       setIsModalOpen(true);
     };

  return (
    <div className="">
      <div className="bank-transfer-container">
        <header className="">
          {/* <GoArrowLeft className="back-arrow" /> */}
          <div>
            <h2>Pay via Transfer</h2>
          </div>
        </header>

        <section className="bank-transfer-section">
          <div className="transfer-details">
            <h6>Account Name</h6>
            <p>Utility</p>
          </div>

          <div className="transfer-details-2">
            <div className="">
              <h6>Account Number</h6>
              <p>{accountNumber}</p>
            </div>
            {/* Copy Button */}
            <div onClick={handleCopy} className="copy-container">
              <Image src="/copy.png" alt="Copy" width={30} height={30} />
              {copied && (
                <span className="">
                  Copied!
                </span>
              )}
            </div>
          </div>

          <div className="transfer-details">
            <h6>Bank Name</h6>
            <p>Moniepoint</p>
          </div>

          <div className="getStartedBtnTransfer">
            <button type="submit" className="" onClick={onSubmit}>Pay Now</button>
          </div>
        </section>
      </div>

      {isModalOpen && 
                <ModalSection/>
                }
    </div>
  );
}
