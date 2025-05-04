// components/WhatsappChat.jsx
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappChat = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/919833260705", "_blank"); // Replace with your number
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {showPopup && (
        <div className="mb-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg text-sm transition-opacity duration-300">
          Chat with us on WhatsApp
        </div>
      )}
      <button
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
        onClick={handleClick}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        aria-label="WhatsApp Chat"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default WhatsappChat;
