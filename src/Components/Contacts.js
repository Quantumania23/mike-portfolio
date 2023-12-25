import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';
import AnimatedText from './AnimatedText';

const PopupContent = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Optionally, you can reset the form data here: setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmissionStatus("er ror");
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-20 bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
          >
            <BsX size={24} />
          </button>
        </div>
        <AnimatedText
          text={submissionStatus === "success" ? "Thank you for contacting me!" : "Got a problem to solve, get your space suit ready and tell me what you need"}
          className="!text-sm !text-black !flex !flex-wrap !mb-4"
        />
        {submissionStatus === "success" ? (
          <p className="text-green-500">I&apos;ll get back to you as soon as possible.</p>
        ) : (
          <>
          <form action="https://formsubmit.com/mikepeace981@gmail.com" method="POST" 
         className="flex flex-col gap-6 mt-0" onSubmit={handleSubmit}>
        <div className="grid flex-wrap grid-cols-1 gap-2">
          <input type="text" placeholder="Full Name..." required
          className="border" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="border"
          />
          <input type="hidden" name="_subject" value="new" />
        </div>
        <br />
        <textarea
        className="border"
          name=""
          id=""
          cols="5"
          rows="5"
          placeholder="Your Message"
        ></textarea>
        <input type="submit" value="Cognize now" className="cursor-pointer mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"/>
        <input
          type="hidden"
          name="_next"
          value="https://mk-eta.vercel"
        />
      </form>
            {submissionStatus === "error" && <p className="text-red-500">Form submission failed. Please try again later.</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default PopupContent;
