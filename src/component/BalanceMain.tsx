"use client";
import { useState, useEffect} from "react";
import Image from "next/image";
import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function BalanceMainSection (){
     const [showBalance, setShowBalance] = useState(false);
      const balance = 12000;
    
      const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price);
      };

        const storedFullName = useSelector((state: RootState) => state.auth.fullName);
        const [fullName, setFullName] = useState("Chizaram");
        
          useEffect(() => {
            if (storedFullName) {
              setFullName(storedFullName);
            }
          }, [storedFullName]);
          
    return(
        <>
         {/* Balance Section */}
                 <div className="balance-main">
                 <div className="welcome-msg">
                        <h3>Welcome {fullName}</h3>
                        <p>Spend wisely; Invest in yourself</p>
                      </div>
                 <div className="balance-container">
                     
                    <div className="left-side">
                      <section>
                        <Image
                          src="/wallet.png"
                          alt="wallet"
                          width={30}
                          height={30}
                          unoptimized
                        />
                        <p>Your balance</p>
                      </section>
                      <button onClick={() => setShowBalance(!showBalance)}>
                        {!showBalance ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </button>
                    </div>
                    <div className="right-side">
                      <h2>{showBalance ? `${formatPrice(balance)}` : "*******"}</h2>
                    </div></div>
        
                 </div>
        </>
    )
}