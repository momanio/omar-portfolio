import { useEffect, useRef, useState, type FormEvent } from "react";
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Section } from "@/components/Section";
import { contact } from "@/constants/contact";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
const formConfigured = Boolean(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID && import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
const emptyForm = { name: "", email: "", message: "" };

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Enter your name (at least 2 characters).";
    const emailInput = formRef.current?.elements.namedItem("email");
    if (!form.email.trim() || !(emailInput instanceof HTMLInputElement) || emailInput.validity.typeMismatch) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Add a little more detail (at least 10 characters).";
    setErrors(next); setFeedback("");
    const first = (["name", "email", "message"] as const).find((key) => next[key]);
    if (first) { (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus(); return; }
    const honeypot = formRef.current?.elements.namedItem("company_website");
    if (honeypot instanceof HTMLInputElement && honeypot.value) return;
    const service = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey) { setFeedback("The form is temporarily unavailable. Email me directly using the link alongside it."); return; }
    setSending(true);
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(service, template, { from_name: form.name.trim(), to_name: "Omar", from_email: form.email.trim(), to_email: contact.email, message: form.message.trim() }, { publicKey });
      setFeedback("Message sent. Thank you — I’ll get back to you as soon as possible."); setForm(emptyForm);
    } catch {
      setFeedback("Your message could not be sent. Please retry, or email me directly; your draft is still here.");
    } finally { setSending(false); }
  };
  const copyEmail = async () => {
    window.clearTimeout(copyTimer.current);
    try { await navigator.clipboard.writeText(contact.email); setCopied(true); setCopyFeedback("Email address copied."); }
    catch { setCopied(false); setCopyFeedback("Copy is unavailable. Select the email address or open your email app."); }
    copyTimer.current = window.setTimeout(() => setCopyFeedback(""), 5000);
  };
  return <Section idName="contact" labelledBy="contact-heading" className="text-white">
    <h2 id="contact-heading" className="section-heading">Let’s work together.</h2>
    <div className="contact-layout">
      <div className="contact-details"><p>Have a project in mind? Send a message or contact me directly.</p>
        <a className="contact-email" href={`mailto:${contact.email}`}><FiMail aria-hidden="true" /><span>{contact.email}</span></a>
        <button type="button" onClick={() => void copyEmail()} className="button-secondary copy-email">{copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}Copy email</button>
        {copyFeedback && <p className="copy-toast" role="status">{copyFeedback}</p>}
        <div className="contact-socials"><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin aria-hidden="true" />LinkedIn<span className="sr-only"> (opens in a new tab)</span></a><a href={contact.github} target="_blank" rel="noopener noreferrer"><FiGithub aria-hidden="true" />GitHub<span className="sr-only"> (opens in a new tab)</span></a>{contact.phone && <a href={`tel:${contact.phone}`}>Call me</a>}{contact.whatsapp && <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>}</div>
      </div>
      {formConfigured ? <form ref={formRef} onSubmit={(event) => void send(event)} noValidate className="contact-form" aria-busy={sending}>
        <p className="form-required-note">All fields are required.</p>
        <label htmlFor="contact-name">Your name</label><input id="contact-name" disabled={sending} name="name" autoComplete="name" required maxLength={80} value={form.name} dir="auto" onChange={(event) => setForm({ ...form, name: event.target.value })} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        <label htmlFor="contact-email">Your email</label><input id="contact-email" disabled={sending} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} spellCheck={false} dir="ltr" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        <label htmlFor="contact-message">Your message</label><textarea id="contact-message" disabled={sending} name="message" rows={5} required maxLength={5000} dir="auto" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
        <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="company_website" tabIndex={-1} autoComplete="off" /></div>
        <button className="button-primary" type="submit" disabled={sending}>{sending ? "Sending…" : "Send message"}</button>
        <p className="form-feedback" role="status">{feedback}</p>
      </form> : <div className="contact-form contact-direct"><h3>Send an email.</h3><p>Tell me about your project using your email app.</p><a className="button-primary" href={`mailto:${contact.email}`}>Write an email</a></div>}
    </div>
  </Section>;
};
