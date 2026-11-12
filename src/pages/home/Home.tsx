import { lazy } from "react";
import { Hero } from "../hero/Hero";
import { DeferredSection } from "@/components/DeferredSection";

const About = lazy(() => import("../about/About").then(({ About }) => ({ default: About })));
const Tech = lazy(() => import("../tech/Tech").then(({ Tech }) => ({ default: Tech })));
const Experience = lazy(() => import("../experience/Experience").then(({ Experience }) => ({ default: Experience })));
const Projects = lazy(() => import("../projects/Projects").then(({ Projects }) => ({ default: Projects })));
const Contact = lazy(() => import("../contact/Contact").then(({ Contact }) => ({ default: Contact })));

const Home = () => <div className="relative"><Hero />
  <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800"><DeferredSection id="about" title="About" kind="about"><About /></DeferredSection></div>
  <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 pb-10"><DeferredSection id="Tech" title="Technologies" kind="tech"><Tech /></DeferredSection></div>
  <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800"><DeferredSection id="experience" title="Experience" kind="experience"><Experience /></DeferredSection></div>
  <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800"><DeferredSection id="projects" title="Projects" kind="projects"><Projects /></DeferredSection></div>
  <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800"><DeferredSection id="contact" title="Contact" kind="contact"><Contact /></DeferredSection></div>
</div>;
export default Home;
