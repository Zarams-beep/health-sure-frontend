import Image from "next/image";
import AboutTableSection from "./About-Page-Table";
import { ImPushpin } from "react-icons/im";
import TeamSection from "./About-Meet-Team";
export default function AboutPage() {
  return (
    <div className="about-page-container">
      {/* Page Header */}
      <header className="about-header">
        <div className="about-first-header">
        <h1>About Health Sure</h1>
        </div>
        <div className="about-header-1-img">
        <Image src="/img-6.jpg" alt="About us" width={400} height={250} quality={100} />
        <ImPushpin className="pin-img"/>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="about-intro">
       <div className="">
       <h2>Why Choose Health Sure?</h2>
        <p>
          At <strong>Health Sure</strong>, we believe that healthcare should be 
          accessible, affordable, and stress-free. Our platform helps individuals 
          and families save for medical expenses in a structured and secure way. 
          With a focus on financial transparency and health security, your savings 
          are always available when you need them most—whether for routine checkups 
          or urgent medical care.
        </p>
       </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
      <div className="img-container">
        <Image src="/img-6.jpg" alt="About us" width={400} height={250} quality={100} />
        </div>
       <div className="about-mission-2">
       <h2>Our Mission</h2>
       <p>
          We bridge the gap between financial security and healthcare by providing 
          a savings platform that ensures peace of mind. Whether you&apos;re preparing 
          for future medical needs or managing ongoing health expenses, 
          <strong>Health Sure</strong> is here to support you every step of the way.
        </p>
       </div>
      </section>

      {/* Vison Section */}
      <section className="about-mission">
      <div className="about-mission-2">
       <h2>Our Vision</h2>
       <p>
       At Health Sure, we envision a future where financial stability and top-tier healthcare go hand in hand. We aspire to be the leading platform that empowers individuals to take charge of their health expenses, ensuring that every person is prepared for life&apos;s medical challenges. Through innovative solutions and unwavering commitment, we aim to transform the way people approach healthcare savings—making quality care accessible, affordable, and stress-free for everyone.
        </p>
       </div>
      <div className="img-container">
        <Image src="/img-3.jpg" alt="About us" width={400} height={250} quality={100} />
        </div>
      
      </section>

      {/* How We Work Section */}
     <AboutTableSection/>

      {/* Meet Our Team Section */}
      <TeamSection/>
    </div>
  );
}
