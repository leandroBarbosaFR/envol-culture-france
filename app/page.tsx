import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Activities } from "@/components/activities";
import { News } from "@/components/news";
import { Contact } from "@/components/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <News />
      <Contact />
    </>
  );
}
