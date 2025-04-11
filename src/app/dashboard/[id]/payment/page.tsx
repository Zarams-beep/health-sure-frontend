"use client";
import { useState } from "react";
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import BalanceMainSection from "@/component/BalanceMain";

// Import step components
import BankTransferSection from "@/component/BankTransfer";
import PayViaCardSection from "@/component/TopUp";
import BankUssdSection from "@/component/BankUssd";

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState<null | string>(null);


  const quickActions = [
    {
      id: "bank-transfer",
      emoji: "/deposit.png",
      name: "Bank Transfer",
      description: "Add money via mobile or internet banking",
    },
    {
      id: "top-up",
      emoji: "/TopUp.png",
      name: "Top-Up with Card",
      description: "Add money directly from your bank card or account",
    },
    {
      id: "bank-ussd",
      emoji: "/phone.png",
      name: "Bank USSD",
      description: "With other banks’ USSD code",
    },
  ];

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        <BalanceMainSection />

        {currentStep === null ? (
          <div className="wallet-quick-actions-container">
            <h3>Add Money</h3>
            <div className="wallet-quick-actions-container-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setCurrentStep(action.id)} // Set step instead of navigation
                  className="wallet-quick-action"
                >
                  <div className="wallet-quick-action-2">
                    <div className="wallet-quick-action-image">
                      <Image
                        src={action.emoji}
                        alt={action.name}
                        width={30}
                        height={30}
                        unoptimized
                      />
                    </div>
                    <div className="wallet-quick-action-text">
                      <h4>{action.name}</h4>
                      <p>{action.description}</p>
                    </div>
                  </div>
                  <RiArrowRightSLine className="wallet-quick-action-arrow" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="wallet-action-step">
            <button className="back-button" onClick={() => setCurrentStep(null)}>
              ← Back
            </button>
            {/* Render step based on currentStep */}
            {currentStep === "bank-transfer" && <BankTransferSection />}
            {currentStep === "top-up" && <PayViaCardSection />}
            {currentStep === "bank-ussd" && <BankUssdSection />}
          </div>
        )}
      </div>
    </div>
  );
}
