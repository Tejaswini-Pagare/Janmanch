import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-10">
      {/* Chatbox Toggle Button */}
      <button
        className="bg-slate-600 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Chatbox Container */}
      {isOpen && (
        <div className="relative h-[70vh] w-[25vw] min-w-[300px] border bg-white shadow-lg rounded-2xl flex flex-col mt-4">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-2xl text-orange-500 hover:text-orange-700"
            onClick={() => setIsOpen(false)}
            aria-label="Close Chatbox"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>

          {/* Full-size Iframe */}
          <iframe
            className="w-full h-full rounded-2xl"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/67237bdc-189b-4706-bd2f-fcf22679ea08"
            title="Chatbot"
            spellCheck="true"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
