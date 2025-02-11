import { lazy, Suspense } from "react";
import { Contact } from "../contact/Contact";
import { Navbar } from "../../components/Navbar";
import { Experience } from "../experience/Experience";
import { About } from "../about/About";
import { Footer } from "@/components/Footer";
import { Spinner } from "@/components/Spinner";

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

      <Suspense fallback={<Spinner />}>
        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 bg-cover bg-center bg-no-repeat">
          <About />
        </div>

        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 bg-cover bg-center bg-no-repeat pb-10">
          <Tech />
        </div>

        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 bg-cover bg-center bg-no-repeat">
          <Experience />
        </div>

        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 bg-cover bg-center bg-no-repeat">
          <Projects />
        </div>
        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 bg-cover bg-center bg-no-repeat text-white">
          <Contact />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
