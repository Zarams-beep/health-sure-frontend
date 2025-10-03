"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { ContactUsFormData } from "@/types/auth";
import { contactUsSchema } from "@/features/contactSchema";
import emailjs from "emailjs-com";

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsSchema),
    mode: "onSubmit",
  });

  // Watch all fields
  const watchedFields = watch();

  // Clear success message when user starts typing again
  useEffect(() => {
    if (
      watchedFields.firstName ||
      watchedFields.lastName ||
      watchedFields.email ||
      watchedFields.phoneNumber ||
      watchedFields.subject ||
      watchedFields.message
    ) {
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [watchedFields]);

  const submitData = async (data: ContactUsFormData) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // 🔑 Send via EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID
        {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phoneNumber: data.phoneNumber,
          title: data.subject,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Public Key
      );

      console.log("EmailJS result:", result.text);
      setSuccessMessage("Message sent successfully ✅");
      reset(); // clear form so user can type a new one
    } catch (error: unknown) {
      console.error("EmailJS error:", error);
      setErrorMessage("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  const allFieldsFilled =
    watchedFields.firstName &&
    watchedFields.lastName &&
    watchedFields.email &&
    watchedFields.phoneNumber &&
    watchedFields.subject &&
    watchedFields.message;

  return (
    <div className="contactUs-form-section">
      <div className="container">
        <div className="contactUs-form-body">
          <header className="firstHeader">
            <h2>Contact Us</h2>
            <h6>Any question or remarks? Just write us a message!</h6>
          </header>

          <div className="contactUs-body">
            {/* Side One */}
            <div className="contactUs-part-one">
              <header>
                <h3>Let’s talk with us</h3>
                <p>
                  Questions, comments, or suggestions? Simply fill in the form
                  and we’ll be in touch shortly.
                </p>
              </header>

              <div className="contactUs-details">
                <div className="contactUs-details-small">
                  <FaPhoneVolume />
                  <p>1234567890</p>
                </div>
                <div className="contactUs-details-small">
                  <MdOutlineMailOutline />
                  <p>support@healthsure.com</p>
                </div>
                <div className="contactUs-details-small">
                  <FaLocationDot />
                  <p>healthsure, Plot 200 Mountain West, Lagos State, Nigeria.</p>
                </div>
              </div>

              <div className="contactUs-socials">
                <button className="twitter"><FaTwitter /></button>
                <button><IoLogoInstagram className="instagram" /></button>
                <button><FaDiscord className="discord" /></button>
              </div>
            </div>

            {/* Side Two */}
            <div className="contactUs-part-two">
              <form className="contactUs-form" onSubmit={handleSubmit(submitData)}>
                {/* First Name */}
                <div className="contactUs-input">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="First Name"
                    className={`${errors.firstName ? "error-red-border" : "error-gray-border"}`}
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div className="contactUs-input">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className={`${errors.lastName ? "error-red-border" : "error-gray-border"}`}
                  />
                  {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>

                {/* Email */}
                <div className="contactUs-input">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className={`${errors.email ? "error-red-border" : "error-gray-border"}`}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="contactUs-input">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    placeholder="Enter your phone number"
                    className={`${errors.phoneNumber ? "error-red-border" : "error-gray-border"}`}
                  />
                  {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </div>

                {/* Select Subject */}
                <div className="contactUs-select">
                  <label>Select Subject?</label>
                  <div className="contactUs-subject">
                    {["general", "report", "comment", "suggestion"].map((value) => (
                      <label key={value}>
                        <input type="radio" value={value} {...register("subject")} />
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </label>
                    ))}
                  </div>
                  {errors.subject && <p>{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div className="contactUs-message">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    {...register("message")}
                    placeholder="Enter your message"
                    className={`${errors.message ? "error-red-border" : "error-gray-border"}`}
                  />
                  {errors.message && <p>{errors.message.message}</p>}
                </div>

                {/* Feedback */}
                {successMessage && <p className="success-text">{successMessage}</p>}
                {errorMessage && <p className="error-text">{errorMessage}</p>}

                {/* Submit */}
                <div className="contactUs-submit-container">
                  <button
                    className="contact-btn"
                    type="submit"
                    disabled={loading || !allFieldsFilled}
                  >
                    {loading ? "Loading..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
