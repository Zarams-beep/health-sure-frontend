"use client";
// import { GoArrowLeft } from "react-icons/go";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayViaCard, payViaCardSchema} from "@/features/pay-via-card-schema";
// import { useRouter } from "next/navigation";
import { LuLock } from "react-icons/lu";
import ModalSection from "@/component/modal-container";
import React, { useState } from "react";
export default function PayViaCardSection() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PayViaCard>({
    resolver: zodResolver(payViaCardSchema),
  });

//   const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSubmit = (data: PayViaCard) => {
    console.log("Payment Details:", data);
    setIsModalOpen(true);
  };

  return (
    <div className="">
      <div className="pay-via-card-section">
        <header className="">
          {/* <GoArrowLeft className="back-arrow" /> */}
          <div>
            <h2 className="">Pay via Card</h2>
            <h5 className="">Your details are safe</h5>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="">
            {/* Card Number */}
            <div className="input-section">
              <label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </label>
              <input
    type="text"
    placeholder="**** - **** - **** - ****"
    {...register("cardNumber", {
      onChange: (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        value = value.replace(/(.{4})/g, "$1-").trim(); // Add dash every 4 digits
        if (value.endsWith("-")) value = value.slice(0, -1); // Remove trailing dash
        setValue("cardNumber", value); // Update form value
      },
    })}
    maxLength={19} // 16 digits + 3 dashes
    className="border border-gray-300 rounded-md p-2"
  />
              {errors.cardNumber && (
                <p className="error">{errors.cardNumber.message}</p>
              )}
            </div>

            {/* Expiry & CVV */}
            <div className="expiry-cvv">
              <div className="input-section">
                <label htmlFor="expiry" className="">
                  Expiry
                </label>
                <input
  type="text"
  placeholder="MM/YY"
  {...register("expiry", {
    onChange: (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4); // Insert slash after first 2 digits
      }
      setValue("expiry", value); // Update form value
    },
  })}
  maxLength={5} // MM/YY format (2 digits + 1 slash + 2 digits)
  className="border border-gray-300 rounded-md p-2"
/>
                {errors.expiry && (
                  <p className="error">{errors.expiry.message}</p>
                )}
              </div>

              <div className="input-section">
                <label htmlFor="cvv" className="">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="***"
                  {...register("cvv")}
                  className=""
                />
                {errors.cvv && (
                  <p className="error">{errors.cvv.message}</p>
                )}
              </div>
            </div>

            {/* Save Card */}
            <div className="save-card">
              <input type="checkbox" {...register("saveCard")} id="saveCard" />
              <label htmlFor="saveCard" className="">Save card details</label>
            </div>

            {/* Secured by Paystack */}
            <div className="secure-paystack">
              <LuLock />
              <p>Secured by Paystack</p>
            </div>
          </section>

          {/* Pay Now Button */}
          <div className="getStartedBtn">
            <button type="submit" className="">
              Pay Now
            </button>
          </div>
        </form>
      </div>

       {isModalOpen && 
                <ModalSection/>
                }
    </div>
  );
}
