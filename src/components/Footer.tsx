import { FaGithub, FaLinkedin, FaFacebookF, FaInstagram } from "react-icons/fa";
import { SectionLink } from "./navigation/SectionLink";

export const Footer = () => <footer className="site-footer">
  <div className="footer-content"><p className="footer-name">Omar Momani</p><nav aria-label="Footer navigation"><ul><li><SectionLink id="projects">Projects</SectionLink></li><li><SectionLink id="about">About</SectionLink></li><li><SectionLink id="contact">Contact</SectionLink></li></ul></nav>
    <div className="social-links"><a href="https://github.com/momanio" target="_blank" rel="noopener noreferrer" aria-label="Omar on GitHub (opens in a new tab)"><FaGithub aria-hidden="true" /></a><a href="https://linkedin.com/in/momanio" target="_blank" rel="noopener noreferrer" aria-label="Omar on LinkedIn (opens in a new tab)"><FaLinkedin aria-hidden="true" /></a><a href="https://web.facebook.com/oamomani" target="_blank" rel="noopener noreferrer" aria-label="Omar on Facebook (opens in a new tab)"><FaFacebookF aria-hidden="true" /></a><a href="https://www.instagram.com/momanio" target="_blank" rel="noopener noreferrer" aria-label="Omar on Instagram (opens in a new tab)"><FaInstagram aria-hidden="true" /></a></div>
  </div><p className="footer-copyright">© {new Date().getFullYear()} Omar Momani. All rights reserved.</p>
</footer>;
