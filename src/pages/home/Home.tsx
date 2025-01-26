import { lazy, Suspense } from "react";
import { Contact } from "../contact/Contact";
import { Navbar } from "../../components/Navbar";
import { Experience } from "../experience/Experience";
import { About } from "../about/About";

const Hero = lazy(() =>
  import("../hero/Hero").then(({ Hero }) => ({
    default: Hero,
  }))
);

const Projects = lazy(() =>
  import("../projects/Projects").then(({ Projects }) => ({
    default: Projects,
  }))
);

const Tech = lazy(() =>
  import("../tech/Tech").then(({ Tech }) => ({
    default: Tech,
  }))
);

const Home = () => {
  return (
    <div className="relative z-0">
      <div>
        <Navbar />
        <Hero />
      </div>

      <Suspense fallback={<div>Loading content...</div>}>
        <div className="bg-cover bg-center bg-no-repeat bg-gradient-to-b from-white to-zinc-950">
          <About />
        </div>
        <div className="bg-gradient-to-tl from-white via-black to-zinc-900 bg-cover bg-center bg-no-repeat">
          <Experience />
        </div>

        <div className="bg-gradient-to-tl from-white via-black to-zinc-900 bg-cover bg-center bg-no-repeat pb-10">
          <Tech />
        </div>
        <div className="bg-gradient-to-tl from-white via-black to-zinc-900 bg-cover bg-center bg-no-repeat">
          <Projects />
        </div>
        <div className="bg-gradient-to-tl from-white via-black to-zinc-900 bg-cover bg-center bg-no-repeat text-white">
          <Contact />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
