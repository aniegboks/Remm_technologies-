
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your API integration when ready.
    setTimeout(() => {
      setIsSubmitting(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      toast.success("Message sent successfully!");
    }, 1500);
  };

  const inputStyles =
    "w-full rounded-lg bg-white px-4 py-3 text-[13px] text-[#252525] placeholder:text-[#999] outline-none transition-all duration-200 focus:ring-1 focus:ring-[#034966]/40";

  const labelStyles =
    "mb-1.5 block text-[11px] font-medium text-[#333]";

  return (
    <div className="w-full pt-28 sm:pt-32 md:pt-36">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full rounded-2xl bg-[#F2F2F2] p-5 sm:p-7 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelStyles}>
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              autoComplete="name"
              className={inputStyles}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelStyles}>
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              autoComplete="email"
              className={inputStyles}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelStyles}>
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              autoComplete="tel"
              className={inputStyles}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelStyles}>
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write Your Message Here"
              rows={5}
              className={`${inputStyles} min-h-[120px] resize-none`}
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-[#252525] px-5 py-3 text-[12px] font-medium text-white transition-colors duration-300 hover:bg-[#034966] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Sending Message..."
                : "Send Message"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactForm;
