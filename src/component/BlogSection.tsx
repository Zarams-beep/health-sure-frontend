"use client";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "5 Tips to Improve Your Health Savings",
    description: "Discover key strategies to maximize your health savings and plan for the future.",
    image: "/hero-img-2.jpg",
    link: "/blog/health-savings"
  },
  {
    title: "Mental Wellness: A Guide to Stress-Free Living",
    description: "Learn how to manage stress and maintain mental well-being in today's fast-paced world.",
    image: "/img-3.jpg",
    link: "/blog/mental-wellness"
  }
];

export default function BlogSectionComponent() {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <header>
        <h2 className="blog-title">Health & Wellness Insights</h2>
        <p className="">Trusted medical advice, simplified for you.</p>
        </header>
        <div className="blog-list">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card">
              <Image src={post.image} alt={post.title} width={400} height={250} quality={100} className="blog-img" />
              <div className="blog-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="read-more-container">
                <Link href={post.link} className="read-more">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
