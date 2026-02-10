"use client";

import { useState } from "react";
import Button from "./button";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <div className="w-full h-full max-w-full bg-transparent p-6 sm:p-8 rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-body font-medium text-white my-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300  focus:outline-none text-white bg-transparent font-body text-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-body font-medium text-white my-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 font-body text-sm focus:outline-none text-white bg-transparent"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm  font-body font-medium text-white mb-2 mt-16">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border-b border-gray-300 font-body text-sm focus:outline-none focus:ring-1 focus:ring-white-500 text-white bg-transparent"
            required
          />
        </div>

        {/* Submit */}
        <div className="flex justify-start">
          <Button
            variant="secondary"
            type="submit"
            disabled={isSubmitting}
            className={`hover:bg-blue-800 text-white mt-4 font-bold py-2 font-body text-sm px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
