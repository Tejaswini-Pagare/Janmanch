// import React, { useState, useEffect } from "react";
// import ganeshtalav from "../images/ganesh-talav-2193564.webp";
// import pccoe from "../images/PCCOE.png";
// import ganeshtalav2 from "../images/GaneshTalav2.jpg";
// import wardmap from "../images/Final_Ward15_Map_page-0001.jpg";
// import Navbar from "../components/Navigation/Navbar";

// const images = [ganeshtalav, pccoe, ganeshtalav2];

// const ImageSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full max-w-3xl mx-auto mt-8 rounded-lg overflow-hidden shadow-2xl border-2 border-gray-300">
//       <div className="overflow-hidden rounded-lg">
//         <img
//           src={images[currentIndex]}
//           alt={`Slide ${currentIndex}`}
//           className="w-full h-[450px] object-cover rounded-lg transition-transform duration-700 ease-in-out transform scale-105 hover:scale-100"
//         />
//       </div>
//       {/* Previous Button */}
//       <button
//         className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-80 transition-all shadow-lg"
//         onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
//       >
//         &#10094;
//       </button>
//       {/* Next Button */}
//       <button
//         className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-80 transition-all shadow-lg"
//         onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
//       >
//         &#10095;
//       </button>
//       {/* Indicator Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`w-4 h-4 rounded-full bg-white opacity-60 cursor-pointer transition-all duration-300 ${
//               currentIndex === index ? "opacity-100 scale-125 bg-teal-500 shadow-md" : ""
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// const ward15BDetails = {
//   name: "Ward 15 B",
//   representative: "Shailajatai More",
//   contact: "1122334455",
//   population: "18,500",
//   facilities: ["Hospital", "Public Library", "Community Park", "Sports Complex"],
//   map: wardmap,
// };

// const WardDetailsTab = () => {
//   const openMapInNewTab = () => {
//     window.open(ward15BDetails.map, "_blank");
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* <Navbar /> */}
//       <div className="p-8 font-sans max-w-6xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">Ward Details</h2>
//         <div className="p-8 bg-white rounded-lg shadow-2xl space-y-6 border border-gray-200">
//           <h4 className="text-3xl font-bold text-gray-700">{ward15BDetails.name}</h4>
//           <p className="text-lg text-gray-600">
//             <span className="font-bold text-gray-800">Representative:</span> {ward15BDetails.representative}
//           </p>
//           <p className="text-lg text-gray-600">
//             <span className="font-bold text-gray-800">Contact:</span>{" "}
//             <a href={`tel:${ward15BDetails.contact}`} className="text-blue-600 hover:underline">
//               {ward15BDetails.contact}
//             </a>
//           </p>
//           <p className="text-lg text-gray-600">
//             <span className="font-bold text-gray-800">Population:</span> {ward15BDetails.population}
//           </p>
//           <p className="text-lg text-gray-600">
//             <span className="font-bold text-gray-800">Facilities:</span> {ward15BDetails.facilities.join(", ")}
//           </p>
//           <button
//             onClick={openMapInNewTab}
//             className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-lg rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
//           >
//             View Map
//           </button>
//           <ImageSlider />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WardDetailsTab;


import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ganeshtalav from "../images/ganesh-talav-2193564.webp";
import pccoe from "../images/PCCOE.png";
import ganeshtalav2 from "../images/GaneshTalav2.jpg";
import pccoe_gate from "../images/Pccoe_gate.jpg";
import csk2 from "../images/CSK2.avif";
import wardmap from "../images/Final_Ward15_Map_page-0001.jpg";
import Navbar from "../components/Navigation/Navbar";

const ImageSlider = () => {
  const images = [
    ganeshtalav,
    pccoe,
    ganeshtalav2,
    pccoe_gate,
    csk2,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 rounded-xl overflow-hidden shadow-lg border border-teal-300">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-[400px] flex justify-center items-center">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const ward15BDetails = {
  name: "Ward 15 B",
  representative: "Shailajatai More",
  contact: "1122334455",
  population: "30,000",
  facilities: ["Hospital", "Public Library", "Community Park", "Sports Complex"],
  map: "Images__/Final_Ward15_Map_page-0001.jpg",
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
      <h1 className="text-4xl text-center font-bold text-gray-800 mt-6 mb-6">Ward Details</h1>
      <div className="p-8 font-sans max-w-6xl mx-auto rounded-xl border border-teal-600 text-center shadow-[10px_0_20px_rgba(128,128,128,0.5),inset_10px_0_20px_rgba(128,128,128,0.3)]">
     
      <div className="p-10 bg-white text-gray-800 rounded-xl bg-gradient-to-r from-teal-800/80 to-teal-200/60 shadow-lg border border-gray-300">

        <h4 className="text-3xl font-bold mb-6 text-gray-800">{ward15BDetails.name}</h4>
        <p className="text-xl mb-4">
          <span className="font-semibold text-gray-800">Representative:</span> {ward15BDetails.representative}
        </p>
        <p className="text-xl mb-4">
          <span className="font-semibold text-gray-800">Contact:</span>
          <a href={`tel:${ward15BDetails.contact}`} className="text-gray-800 hover:underline ml-2">
            {ward15BDetails.contact}
          </a>
        </p>
        <p className="text-xl mb-4">
          <span className="font-semibold text-gray-800">Population:</span> {ward15BDetails.population}
        </p>
        <p className="text-xl mb-6">
          <span className="font-semibold text-gray-800">Facilities:</span> {ward15BDetails.facilities.join(", ")}
        </p>
        <button
          onClick={openMapInNewTab}
          className="px-6 py-3 bg-teal-500 text-white text-lg font-semibold rounded-lg hover:bg-teal-600 transition duration-300 shadow-md"
        >
          View Map
        </button>
      </div>
      {isImageSliderVisible && <ImageSlider />}
    </div>
    </div>
  );
};

export default WardDetailsTab;
