import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FloatingContactButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revealedEmail, setRevealedEmail] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const revealEmail = (e) => {
    e.preventDefault();
    setRevealedEmail("janmanch.web@gmail.com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/contact/insert", formData);
      console.log(response.data);
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  
    // Optionally clear the form after submit
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    toast.info("Form reset successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <>
      {/* Floating Contact Button */}
      <button title="contact us!"
        className=" bg-red-600 bottom-4 right-4 hover:bg-red-700 text-white z-10 rounded-full w-24 shadow-lg flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <AiOutlineMail size={32} className="m-3" />
      </button>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-teal-300 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="text-center pb-6">
                <h1 className="text-3xl text-black">Contact Us!</h1>
                <p className="text-black">Fill up the form below to send us a message.</p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit}>
                <input
                  className="shadow mb-4 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  className="shadow mb-4 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  className="shadow mb-4 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <textarea
                  className="shadow mb-4 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  placeholder="Type your message here..."
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ height: "121px" }}
                  required
                ></textarea>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Send ➤
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="shadow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Reset
                  </button>
                </div>
              </form>

              {/* Reveal Email */}
              {revealedEmail ? (
                <p className="font-medium text-black mt-4">{revealedEmail}</p>
              ) : (
                <a
                  href="#"
                  onClick={revealEmail}
                  className="font-medium text-black hover:underline block mt-4"
                >
                  Or click here to reveal our protected email address
                </a>
              )}

              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-black text-white p-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default FloatingContactButton;
