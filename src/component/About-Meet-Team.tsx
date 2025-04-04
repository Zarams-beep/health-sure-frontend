"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Amanda Lee",
      role: "Chief Medical Officer",
      bio: "With over 15 years of experience, Amanda leads our healthcare team with a passion for patient-centered care.",
      image: "/female1.jpg",
    },
    {
      name: "John Thompson",
      role: "Financial Strategist",
      bio: "John is a seasoned financial expert who crafts sustainable healthcare financing solutions.",
      image: "/male1.jpg",
    },
    {
      name: "Sarah Ahmed",
      role: "Tech Lead",
      bio: "A tech enthusiast, Sarah drives innovation with her expertise in healthtech systems.",
      image: "/female2.jpg",
    },
    {
      name: "Michael O'Connor",
      role: "Operations Manager",
      bio: "Michael ensures seamless operations and exceptional service delivery.",
      image: "/male2.jpg",
    },
    {
      name: "Emily Chen",
      role: "Customer Success Manager",
      bio: "Emily is dedicated to enhancing user experiences and building meaningful client relationships.",
      image: "/female1.jpg",
    },
  ];

  return (
    <section className="about-team">
      <header>
      <h2 className="">Meet Our Team</h2>
      <p className="">
        Our dedicated team of healthcare professionals, financial experts, and tech 
        innovators are committed to making healthcare financing seamless and stress-free.
      </p>

      </header>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="team-carousel"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="team-member">
              <Image 
                src={member.image} 
                alt={member.name} 
                width={400} 
                height={250} 
                quality={100} 
                className="for-team-img"
              />
              <div className="team-bio-data">
              <h3 className="">{member.name}</h3>
              <p className="">{member.role}</p>
              <p className="bio-p">{member.bio}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
