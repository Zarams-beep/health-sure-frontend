"use client";
// import { GoArrowLeft } from "react-icons/go";
import Image from "next/image";
import { useState } from "react";
import ModalSection from "@/component/modal-container";
export default function BankUssdSection() {
  const [selectedBank, setSelectedBank] = useState(""); // State for selected bank
  const [copied, setCopied] = useState(false); // State for copy action

  // USSD codes for different banks
  const bankUssdCodes: Record<string, string> = {
    "Zenith Bank": "*966*amount#",
    "GTB": "*737*amount#",
    "UBA": "*919*amount#",
    "Moniepoint": "*888*amount#",
  };

  // Get the USSD code for the selected bank, or show a default
  const accountNumber = selectedBank ? bankUssdCodes[selectedBank] : "Select a bank";

  // Handle bank selection
  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(e.target.value);
  };

  // Copy USSD code function
  const handleCopy = async () => {
    if (!selectedBank) return; // Prevent copying if no bank is selected

    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide copied message after 2 seconds
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
          <h2 className="">Pay via Transfer</h2>
        </header>

        <section className="bank-transfer-section">
          {/* Bank Selection Dropdown */}
          <div className="drop-down-section">
            <label htmlFor="bank-select" className="font-medium">Select a Bank</label>
            <select 
              id="bank-select" 
              value={selectedBank} 
              onChange={handleBankChange} 
              className=""
            >
              <option value="">Choose Bank</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="GTB">GTB</option>
              <option value="UBA">UBA</option>
              <option value="Moniepoint">Moniepoint</option>
            </select>
          </div>

          {/* USSD Code Section */}
          <div className="transfer-details-2">
            <div>
              <h6 className="">Dial</h6>
              <p className="">{accountNumber}</p>
            </div>

            {/* Copy Button */}
            {selectedBank && (
              <div onClick={handleCopy} className="copy-container">
                <Image src="/copy.png" alt="Copy" width={30} height={30} />
                {copied && (
                  <span className="">
                    Copied!
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pay Now Button */}
          <div className="getStartedBtn">
            <button type="submit" className="" onClick={onSubmit}>
              Pay Now
            </button>
          </div>
        </section>
      </div>
      
       {isModalOpen && 
                <ModalSection/>
                }
    </div>
  );
}
