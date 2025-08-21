import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import Button from "../../components/reusable/Button";

type FormData = {
  name: string;
  email: string;
  category: string;
  subject: string;
  phone: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    subject: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      category: "",
      subject: "",
      phone: "",
      message: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#333333] mb-6">
        Send us a Message
      </h2>

      <div className="flex flex-col gap-5">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F89216] focus:ring-2 focus:ring-[#F89216] outline-none transition"
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="youremail@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F89216] focus:ring-2 focus:ring-[#F89216] outline-none transition"
        />

        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+234"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F89216] focus:ring-2 focus:ring-[#F89216] outline-none transition"
        />

        <input
          type="text"
          id="category"
          name="category"
          placeholder="e.g. Technical Support"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F89216] focus:ring-2 focus:ring-[#F89216] outline-none transition"
        />

        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Brief description of your inquiry"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F89216] focus:ring-2 focus:ring-[#F89216] outline-none transition"
        />

        <textarea
          id="message"
          name="message"
          placeholder="Please provide details about your inquiry or issue..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F89216] focus:ring-2 focus:ring-[#F89216] outline-none transition resize-none"
        />

        <Button
          type="submit"
          name={
            <span className="flex items-center gap-2">
              <BsSend size={18} /> Send Message
            </span>
          }
          bgColor="#F89216"
          hoverBgColor="#f89216"
          textColor="white"
          hoverTextColor="white"
        />
      </div>
    </form>
  );
};

export default ContactForm;
