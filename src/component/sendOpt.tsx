"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OPTEmailData, OptSchemaEmail } from "@/features/auth";
import { MdOutlineMail } from "react-icons/md";
import Image from "next/image";
export default function SendOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid},
    reset,
  } = useForm<OPTEmailData>({
    resolver: zodResolver(OptSchemaEmail),
  });

  const onSubmit = async (data: OPTEmailData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://health-sure-backend.onrender.com/auth/send-otp",
       {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send OTP");
      }

      setSuccess("OTP sent successfully! Check your email.");
      reset();

      // Optional: Redirect to OTP verification page after 2 seconds
      setTimeout(() => {
        window.location.href = `/verify-otp?email=${encodeURIComponent(
          data.email
        )}`;
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-container">
      <div className="login-left">
              <Image
                src={"/hero-img-2.jpg"}
                alt="login image"
                width={470}
                height={470}
                quality={100}
                className="login-image"
              />
            </div>
      <div className="auth-form">
        <h1>Send OPT</h1>
        <p>We'll send a verification code to your email</p>
        <div className="sub-auth-form login-sub-auth">
          {/* Email Input */}
          <div className="input-container">
            <label htmlFor="email" className="">
              Email Address
            </label>
            <div className="input-sub-container">
              <span className="">
                <MdOutlineMail />
              </span>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(onSubmit)();
                  }
                }}
              />
            </div>
            {errors.email && (
              <p className="error-msg">
                {errors.email.message}
              </p>
            )}
          </div>

         <div className="error-message">
        {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}
</div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className={`submit-btn send-opt-btn ${
                isLoading || !isValid
                  ? "not-submit"
                  : "submit-met"
              }`}
          >
            {isLoading ? (
              <span className="loading-container">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
