"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

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
    <section className="about-team container">
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="">Meet Our Team</h2>
        <p>
          Our dedicated team of healthcare professionals, financial experts, and
          tech innovators are committed to making healthcare financing seamless
          and stress-free.
        </p>
      </motion.header>

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
            <motion.div
              className="team-member"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="for-team"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={250}
                  quality={100}
                  
                />
              </motion.div>

              <motion.div
                className="team-bio-data"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio-p">{member.bio}</p>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
