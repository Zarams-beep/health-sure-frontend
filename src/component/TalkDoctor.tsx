"use client";
import Image from "next/image";
import { IoCallSharp } from "react-icons/io5";
export default function TalkToDoctor() {
  return (
    <section className="talk-to-doctor-section">

        <div className="talk-to-doctor-section-img">
            <Image src="/img-7.jpg" alt="Doctor" width={400} height={250} className="blog-img" quality={100}/>
        </div>
      <div className="talk-to-doctor-content">
        <h2>
          Talk to a Medical Doctor Anytime, Anywhere  
        </h2>
        <p>
          Can’t visit the hospital in person? Unsure if your symptoms require urgent attention?  
          No worries—we’ve got you covered. Get medical advice from certified doctors 24/7 through our app.
        </p>

        <div className="list-items">
          <h3 className="">
            Our doctors can assist you with:
          </h3>
          <ul className="">
            <li>✔ Quick and accurate diagnosis</li>
            <li>✔ Prescription for medications</li>
            <li>✔ Emergency and first-aid guidance</li>
            <li>✔ Personalized health tips</li>
            <li>✔ Seamless hospital referrals</li>
            <li>✔ And much more...</li>
          </ul>
        </div>

        <div className="btn-talk-doctor-container">
          <button className="">
            <IoCallSharp/>
            Talk to a Doctor Now
          </button>
        </div>
      </div>
      
    </section>
  );
}
