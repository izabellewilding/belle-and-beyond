"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          result.message ||
            "Thank you for your message! We'll get back to you soon."
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
          newsletter: false,
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-white py-24 md:py-32 px-4 md:px-10 lg:px-14 w-full"
    >
      {/* Header with top rule */}
      <div className="mb-12 md:mb-16">
        <div className="border-t border-neutral-400/70" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left side - Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-neutral-900 leading-tight">
            Let's Keep In Touch
          </h2>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-neutral-700 mb-8 leading-relaxed">
            Ready to see how compelling visuals can elevate your story? Reach
            out for a complimentary consultation, and let's discuss the moments
            you want to capture.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Name (required)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Email (required)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
              />
            </div>

            {/* Newsletter checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
              />
              <label className="text-sm text-neutral-600">
                Sign up for news and updates
              </label>
            </div>

            {/* Subject field */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Subject (required)
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What can we help you with?"
                required
                className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
              />
            </div>

            {/* Message field */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Message (required)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project..."
                required
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Status message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-full bg-neutral-900 text-white px-8 py-4 text-base hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
