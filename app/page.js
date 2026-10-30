import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Certifications from "./components/homepage/certifications";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return data
      .filter((item) => item?.cover_image)
      .sort(
        (a, b) =>
          new Date(b.published_at || 0).getTime() -
          new Date(a.published_at || 0).getTime()
      );
  } catch (error) {
    console.error("Unable to load blog articles:", error.message);
    return [];
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      {blogs.length > 0 ? <Blog blogs={blogs} /> : null}
      <ContactSection />
    </div>
  );
}
