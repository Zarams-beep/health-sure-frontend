import HomePageHeroSection from "@/component/HomePage-First";
import HomePageSecondSection from "../component/HomePage-Second";
import FAQSection from "@/component/FAQ";
import BlogSectionComponent from "@/component/BlogSection";
import TalkToDoctorSection from "@/component/TalkDoctor";

export const metadata = {
  title: "Health Sure Home",
  description: "This is Home Page",
};

export default function Home() {
  return (    
    <>
<div className="">
          
        <HomePageHeroSection />
<HomePageSecondSection/>
<BlogSectionComponent/>
<FAQSection/>
<TalkToDoctorSection/>
</div>
    </>
  );
}
