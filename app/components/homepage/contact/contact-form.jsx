"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

const initialInput = { name: "", email: "", message: "" };

function ContactForm() {
  const [userInput, setUserInput] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!userInput.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!userInput.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(userInput.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!userInput.message.trim()) {
      nextErrors.message = "Please enter a message.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setUserInput((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSendMail = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/contact`,
        {
          name: userInput.name.trim(),
          email: userInput.email.trim(),
          message: userInput.message.trim(),
        }
      );

      if (response.data?.success === false) {
        throw new Error(response.data?.message || "The message could not be sent.");
      }

      toast.success("Message sent successfully!");
      setUserInput(initialInput);
      setErrors({});
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to send your message. Please email me directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white md:text-xl">Send me a message</h3>
      <p className="mt-2 text-sm leading-6 text-gray-400">
        Share a little context about the opportunity or collaboration. I&apos;ll get back to you
        using the email address you provide.
      </p>

      <form onSubmit={handleSendMail} className="mt-6 space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-200">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            value={userInput.name}
            onChange={(event) => handleChange("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-white/10 bg-[#10172d] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#16f2b3]"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-200">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={100}
            required
            value={userInput.email}
            onChange={(event) => handleChange("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            placeholder="name@example.com"
            className="w-full rounded-lg border border-white/10 bg-[#10172d] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#16f2b3]"
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-200">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={1000}
            rows={5}
            required
            value={userInput.message}
            onChange={(event) => handleChange("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            placeholder="Tell me about the role, project or opportunity..."
            className="w-full resize-y rounded-lg border border-white/10 bg-[#10172d] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#16f2b3]"
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>
          ) : null}
          <p className="mt-1 text-right text-xs text-gray-500">{userInput.message.length}/1000</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Sending message..." : "Send message"}
          {!isLoading ? <TbMailForward size={19} /> : null}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
