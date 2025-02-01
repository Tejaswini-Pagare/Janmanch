import React, { useState, useEffect } from "react";
import ganeshtalav from "../images/ganesh-talav-2193564.webp";
import pccoe from "../images/PCCOE.png";
import ganeshtalav2 from "../images/GaneshTalav2.jpg";
import wardmap from "../images/Final_Ward15_Map_page-0001.jpg";
import Navbar from "../components/Navigation/Navbar";

// ImageSlider Component
const ImageSlider = () => {
  const images = [ganeshtalav, pccoe, ganeshtalav2];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    
    <div className="relative w-full max-w-3xl mx-auto mt-8">
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-[500px] object-cover rounded-lg"
        />
      </div>
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
      >
        &#10094;
      </div>
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
      >
        &#10095;
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-4 h-4 rounded-full bg-white opacity-60 cursor-pointer ${
              currentIndex === index ? "opacity-100" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
    
  );
};

// WardDetailsTab Component
const ward15BDetails = {
  name: "Ward 15 B",
  representative: "Alice Johnson",
  contact: "1122334455",
  population: "18,500",
  facilities: ["Hospital", "Public Library", "Community Park", "Sports Complex"],
  map: wardmap,
};

const WardDetailsTab = () => {
  const [isImageSliderVisible, setIsImageSliderVisible] = useState(true);

  const openMapInNewTab = () => {
    setIsImageSliderVisible(false);
    window.open(ward15BDetails.map, "_blank");
    setIsImageSliderVisible(true);
  };

  return (
    <div>
      {/* <Navbar/> */}
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ward Details</h2>
      <div className="p-8 bg-gray-100 rounded-lg shadow-lg space-y-6">
        <h4 className="text-3xl font-semibold mb-6">{ward15BDetails.name}</h4>
        <p className="text-xl">
          <span className="font-bold">Representative:</span> {ward15BDetails.representative}
        </p>
        <p className="text-xl">
          <span className="font-bold">Contact:</span>{" "}
          <a href={`tel:${ward15BDetails.contact}`} className="text-blue-600 hover:underline">
            {ward15BDetails.contact}
          </a>
        </p>
        <p className="text-xl">
          <span className="font-bold">Population:</span> {ward15BDetails.population}
        </p>
        <p className="text-xl">
          <span className="font-bold">Facilities:</span> {ward15BDetails.facilities.join(", ")}
        </p>
        <button
          onClick={openMapInNewTab}
          className="px-6 py-3 bg-teal-500 text-white text-lg rounded-lg hover:bg-teal-600"
        >
          View Map
        </button>
        {isImageSliderVisible && <ImageSlider />}
      </div>
    </div>
    </div>
    
  );
};

export default WardDetailsTab;
