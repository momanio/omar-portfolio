import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { IoMdSend } from "react-icons/io";
import { Section } from "../../components/Section";
import { slideIn } from "../../utils/motion";
interface FormState {
  name: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setMessageType("error");
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Omar",
          from_email: form.email,
          to_email: "o.a.momani@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setMessageType("success");
          setMessage("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setMessageType("error");
          setMessage("Something went wrong. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <Section idName="contact">
      <div className="-mt-[10rem] p-10 flex flex-col-reverse xl:flex-row gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "spring", 0.2, 1)}
          className="flex-[0.75] bg-jet p-8 rounded-2xl"
        >
          <p className="sm:text-[18px] text-[16px] text-taupe uppercase tracking-wider font-semibold font-poppins">
            Get in touch
          </p>
          <h3 className="text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins">
            Contact.
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6 font-poppins"
          >
            <label className="flex flex-col">
              <span className="text-timberWolf font-medium mb-4">
                Your Name
              </span>
              <input
                type="text"
                name="name"
                autoComplete="on"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-eerieBlack py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-timberWolf font-medium mb-4">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="on"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-eerieBlack py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-timberWolf font-medium mb-4">
                Your Message
              </span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's your message?"
                className="bg-eerieBlack py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium resize-none"
              />
            </label>

            <button
              type="submit"
              className="
                live-demo flex justify-center  
                sm:gap-4 gap-3 
                sm:text-[20px] text-[16px] 
                text-timberWolf font-bold font-beckman 
                items-center py-5 
                whitespace-nowrap 
                sm:w-[130px] sm:h-[50px] w-[100px] h-[45px] 
                rounded-[10px] bg-night 
                hover:bg-battleGray hover:text-eerieBlack 
                transition duration-[0.2s] ease-in-out
                group
              "
            >
              {loading ? "Sending..." : "Send"}
              <IoMdSend
                className="
                  contact-btn 
                  sm:w-[26px] sm:h-[26px] w-[23px] h-[23px] 
                  object-contain 
                  group-hover:brightness-110
                "
              />
            </button>
          </form>

          {message && (
            <div
              className={`
                mt-4 p-4 rounded-md text-center 
                ${
                  messageType === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
            >
              {message}
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
};
