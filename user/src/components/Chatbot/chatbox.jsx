import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chatbox Toggle Button */}
      
        {/* <div className="relative h-[70vh] w-[25vw] min-w-[300px] border bg-white shadow-lg rounded-2xl flex flex-col mt-4">
          {/* Close Button */}
          

          {/* Dialogflow Messenger */}
          <df-messenger
            chat-icon="https://janmanch-deploys.netlify.app/chatbox_logo.png"
            intent="WELCOME"
            chat-title="CitizenBuddy"
            agent-id="67237bdc-189b-4706-bd2f-fcf22679ea08"
            language-code="en"
          ></df-messenger>
        {/* </div> */}
      )
    </div>
  );
};


export default Chatbox;
