"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "5 Tips to Improve Your Health Savings",
    description:
      "Discover key strategies to maximize your health savings and plan for the future.",
    image: "/hero-img-2.jpg",
    link: "/blog/health-savings",
  },
  {
    title: "Mental Wellness: A Guide to Stress-Free Living",
    description:
      "Learn how to manage stress and maintain mental well-being in today's fast-paced world.",
    image: "/img-3.jpg",
    link: "/blog/mental-wellness",
  },
];

export default function BlogSectionComponent() {
  return (
    <section className="blog-section container">
      <motion.div
        className="blog-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Header animation */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="blog-title">Health & Wellness Insights</h2>
          <p>Trusted medical advice, simplified for you.</p>
        </motion.header>

        {/* Blog Cards */}
        <div className="blog-list">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="blog-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2, // staggered reveal
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                quality={100}
                className="blog-img"
              />
              <div className="blog-content">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {post.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  {post.description}
                </motion.p>
                <motion.div
                  className="read-more-container"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={post.link} className="read-more">
                    Read More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
