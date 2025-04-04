"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/slices/authSlices";
import Image from "next/image";
import Link from "next/link";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaRegCircle } from "react-icons/fa";
import { RiMentalHealthFill, RiInformationLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "@/types/auth";
import { loginSchema } from "@/features/LoginSchema";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const email = watch("email");
  const password = watch("password");
  const allFieldsFilled = email && password;

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const result = await response.json();
  
      dispatch(setUserData({
        fullName: result.user.fullName,
        image: result.user.image
      }));
  
      router.push(`/dashboard/${result.user.fullName}/landing-page`);
      
    } catch (error) {
      alert(error instanceof Error ? error.message : "Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="login-container">
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

      <div className="login-form-container">
        <div className="form-header">
          <h2 className="form-title">Hi, Welcome back</h2>
          <p className="form-subtitle">
            Don’t have an account?&nbsp;&nbsp;
            <Link href={"/auth/sign-up"} className="linking-auth">
              Sign Up
            </Link>
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

        {/* email */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <div className="input-wrapper">
            <span className="input-icon">
                <CiMail
                  color={errors.email ? "#f65252" : "#59676e"}
                  size={18}
                />
              </span>
              <input
                className={`input-field ${
                  errors.email ? "input-error" : "input-normal"
                }`}
                type="email"
                id="full-email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <div className="error-message">
                <RiInformationLine size={"18px"} />
                <p className="error-text">{errors.email.message}</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Choose Password
            </label>
            <div className="input-wrapper">
            <span className="input-icon">
                <CiLock
                  color={errors.password ? "#f65252" : "#59676e"}
                  size={18}
                />
              </span>
             
              <div className="input-second">
              <input
                className={`input-field ${
                  errors.password ? "input-error" : "input-normal"
                }`}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                {...register("password")}
              />
             <button
                type="button"
                className="show-password-toggle"
                onClick={handleShowPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash
                    color={errors.password ? "#f65252" : "#59676e"}
                    size={18}
                  />
                ) : (
                  <FaEye
                    color={errors.password ? "#f65252" : "#59676e"}
                    size={18}
                  />
                )}
              </button>
              </div>
            </div>
            {errors.password && (
              <div className="error-message">
                <RiInformationLine size={"18px"} />
                <p className="error-text">{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="save-details"
              id="save-details"
              className="checkbox"
            />
            <label htmlFor="save-details" className="checkbox-label">
              Save details
            </label>
            
          </div>
          <Link href={"/auth/forgot-password"} className="forgot-password-link">
              Forgot password
            </Link>
          <button
            className={`submit-button ${
              allFieldsFilled ? "active-button" : "disabled-button"
            }`}
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <FaRegCircle className="spinner-icon" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
