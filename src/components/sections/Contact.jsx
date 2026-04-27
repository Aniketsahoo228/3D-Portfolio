// src/components/sections/Contact.jsx

import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { BackgroundBeams } from "../ui/background-beams";
import { ShootingStars } from "../ui/shooting-stars";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      formRef.current.reset();
      setStatus("Message sent successfully.");
    } catch {
      setStatus("Unable to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden"
    >
      <ShootingStars />
      <BackgroundBeams />

      <div className="relative z-10 w-full max-w-xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Contact Me
        </h2>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-10">
          Let's build something amazing together.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-black/10 bg-[rgba(255,255,255,0.72)] backdrop-blur-md p-6 dark:border-white/10 dark:bg-[rgba(3,0,20,0.72)]">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-indigo-400 dark:bg-black/30 dark:border-white/10 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-cyan-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-indigo-400 dark:bg-black/30 dark:border-white/10 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-cyan-400"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full rounded-xl bg-white/70 border border-black/10 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-indigo-400 resize-none dark:bg-black/30 dark:border-white/10 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-cyan-400"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3 font-semibold text-white transition hover:opacity-90 dark:from-cyan-500 dark:to-purple-600"
          >
            Send Message
          </button>

          {status && (
            <p className="text-center text-sm text-gray-700 dark:text-gray-300">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
