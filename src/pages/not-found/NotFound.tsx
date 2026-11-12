import { Link } from "react-router";
import { contact } from "@/constants/contact";

export function NotFound() {
  return <section className="recovery-page" aria-labelledby="not-found-heading"><h1 id="not-found-heading">Page not found.</h1><p>This address doesn’t lead to a page in my portfolio.</p><div><Link to="/" className="button-primary">Back to the portfolio</Link><a href={`mailto:${contact.email}`} className="button-secondary">Email Omar</a></div></section>;
}
