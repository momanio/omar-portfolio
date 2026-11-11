import { Component, type ReactNode } from "react";
import { contact } from "@/constants/contact";

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <section className="recovery-page" role="alert" aria-labelledby="recovery-heading"><h1 id="recovery-heading">Let’s try that again.</h1><p>A part of the portfolio couldn’t load. You can reload it or contact me directly.</p><div><button type="button" className="button-primary" onClick={() => window.location.reload()}>Reload the portfolio</button><a className="button-secondary" href={`mailto:${contact.email}`}>Email Omar</a></div></section>;
    return this.props.children;
  }
}
