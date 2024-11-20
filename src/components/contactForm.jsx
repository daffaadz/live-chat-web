import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await emailjs.send(
        "service_rcmr5yg", // Ganti dengan Service ID dari EmailJS
        "template_rw5q8ps", // Ganti dengan Template ID dari EmailJS
        formData,
        "iP-csQnNlMjSj4D7A" // Ganti dengan Public Key Anda dari EmailJS
      );

      setSuccessMessage("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl mb-4 font-bold">Send us a message</h3>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
        rows="5"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-800"
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
