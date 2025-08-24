"use client"; // for Next.js client component
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

export default function ContactForm() {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_t71r3hz",   // your service ID
        "template_suuor5x",  // your template ID
        formRef.current,
        "kCoag6Kq8nKvvS18Q" // your public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully!");
          formRef.current.reset();
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
          setStatus("Failed to send message. Try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="max-w-lg w-full p-8 bg-gray-800/40 border border-gray-700 rounded-2xl backdrop-blur-sm shadow-2xl animate-fade-in">
        <h2 className="text-4xl font-bold text-white text-center mb-6">Contact Us</h2>
        <p className="text-gray-300 mb-8 text-center">
          Have questions or feedback? Send us a message and we'll get back to you!
        </p>

        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="border border-gray-600 bg-gray-900/30 placeholder-gray-400 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="border border-gray-600 bg-gray-900/30 placeholder-gray-400 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="border border-gray-600 bg-gray-900/30 placeholder-gray-400 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className={`flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.includes("successfully") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </section>
  );
}
