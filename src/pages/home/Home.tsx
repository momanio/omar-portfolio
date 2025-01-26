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
        <div className="">
          <About />
        </div>
        <div className="bg-experience bg-cover bg-center bg-no-repeat">
          <Experience />
        </div>

        <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
          <Tech />
        </div>
        <div className="bg-projects bg-cover bg-center bg-no-repeat">
          <Projects />
        </div>
        <div className="bg-contact bg-cover bg-center bg-no-repeat">
          <Contact />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
