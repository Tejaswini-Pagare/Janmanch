// import { useState } from "react";
// import Facts from "../Facts/Facts";

// // Gradient Button for animation
// const GradientButton = ({
//   children,
//   className = "",
//   colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
//   animationSpeed = 8,
//   showBorder = false,
//   onClick,
// }) => {
//   const gradientStyle = {
//     backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
//     animationDuration: `${animationSpeed}s`,
//   };

//   return (
//     <button
//       className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
//       onClick={onClick}
//     >
//       {showBorder && (
//         <div
//           className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
//           style={{
//             ...gradientStyle,
//             backgroundSize: "300% 100%",
//           }}
//         >
//           <div
//             className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
//             style={{
//               width: "calc(100% - 2px)",
//               height: "calc(100% - 2px)",
//               left: "50%",
//               top: "50%",
//               transform: "translate(-50%, -50%)",
//             }}
//           ></div>
//         </div>
//       )}
//       <div
//         className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
//         style={{
//           ...gradientStyle,
//           backgroundClip: "text",
//           WebkitBackgroundClip: "text",
//           backgroundSize: "300% 100%",
//         }}
//       >
//         {children}
//       </div>
//     </button>
//   );
// };

// // WelcomeCard Component
// const WelcomeCard = () => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   const handleButtonClick = () => {
//     setIsPopupVisible(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupVisible(false);
//   };

//   return (
//     <div className="relative w-full">
//       {/* SVG Divider */}
//       <div className="relative w-full rotate-180">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//           className="relative block w-full h-[150px]"
//         >
//           <path
//             d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
//             className="fill-white"
//           ></path>
//         </svg>
//       </div>

//       {/* Card Content */}
//       <div className="p-8 text-center bg-teal-700 text-white">
//         <h2 className="text-4xl font-bold mb-4">Welcome User!</h2>
//         <p className="mb-4">
//           Imagine a platform where your voice matters, your opinions shape the
//           future, and staying informed about your community is just a tap away.
//         </p>

//         {/* The 4 words in grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//           <div className="p-4 bg-teal-800 rounded-lg shadow-lg">
//             <h4 className="text-2xl font-bold">Explore</h4>
//             <p>Track ongoing government projects and their progress.</p>
//           </div>
//           <div className="p-4 bg-teal-800 rounded-lg shadow-lg">
//             <h4 className="text-2xl font-bold">Connect</h4>
//             <p>Stay updated on your local representatives' initiatives.</p>
//           </div>
//           <div className="p-4 bg-teal-800 rounded-lg shadow-lg">
//             <h4 className="text-2xl font-bold">Engage</h4>
//             <p>Participate in polls and share your ideas for change.</p>
//           </div>
//           <div className="p-4 bg-teal-800 rounded-lg shadow-lg">
//             <h4 className="text-2xl font-bold">Contribute</h4>
//             <p>Raise grievances and suggestions that matter to your community.</p>
//           </div>
//         </div>

//         {/* GradientButton */}
//         <div className="mt-6">
//           <GradientButton
//             onClick={handleButtonClick}
//             colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
//             animationSpeed={3}
//             showBorder={true}
//             className="px-8 py-3 text-xl"
//           >
//             Fun Facts
//           </GradientButton>
//         </div>
//       </div>

//       {/* Facts Popup */}
//       {isPopupVisible && (
//         <div
//           className="absolute top-0 right-0 z-50 bg-white p-6 rounded-lg shadow-lg w-96 transition-all transform translate-x-16 opacity-100"
//           style={{
//             boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
//             transition: "transform 0.3s ease, opacity 0.3s ease-in-out",
//           }}
//         >
//           <button
//             onClick={handleClosePopup}
//             className="absolute top-2 right-2 text-xl font-bold text-black"
//           >
//             ×
//           </button>
//           <Facts />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WelcomeCard;
import React, { useState, useEffect, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  // Default animations based on direction
  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
            for (const step of (animationTo || defaultTo)) {
              await next(step);
            }
            animatedCount.current += 1;
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block transition-transform will-change-[transform,filter,opacity]"
        >
          {elements[index] === ' ' ? ' ' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </animated.span>
      ))}
    </p>
  );
};

const WelcomeCard = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  // Default animation styles for the entire card
  const defaultFrom = {
    filter: 'blur(10px)',
    opacity: 0,
    transform: 'translate3d(0,-50px,0)',
  };
  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: 'translate3d(0,5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  const springs = useSprings(
    1,
    [
      {
        from: defaultFrom,
        to: inView
          ? async (next) => {
              for (const step of defaultTo) {
                await next(step);
              }
            }
          : defaultFrom,
        config: { easing: 'easeOutCubic' },
      },
    ]
  );

  // Intersection observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 text-black rounded-3xl">
      <div
        ref={ref}
        style={springs[0]}
        className="container mx-auto pr-64 md:pr-96 pt-10 md:pt-20 pb-20 md:pb-32 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Hey, <span className="text-violet-700">Harshvardhan!!</span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-8">
          Bridging the gap between citizens and their representatives.
        </p>

        {/* Container for the 4 words with animation applied to the entire box */}
        <div className="flex justify-center items-center mb-8 mx-auto w-2/3 ">
          {/* Box for each word */}
          <animated.div
            style={springs[0]}
            className="flex-1 text-3xl font-semibold text-white text-center p-6 mx-2 flex justify-center items-center rounded-full bg-slate-500 bg-opacity-50"
          >
            <BlurText
              text="Explore"
              delay={200}
              direction="top"
              className="text-center"
            />
          </animated.div>

          <animated.div
            style={springs[0]}
            className="flex-1 text-3xl font-semibold text-white text-center p-6 mx-2 flex justify-center items-center rounded-full bg-slate-500 bg-opacity-50"
          >
            <BlurText
              text="Connect"
              delay={200}
              direction="top"
              className="text-center"
            />
          </animated.div>

          <animated.div
            style={springs[0]}
            className="flex-1 text-3xl font-semibold text-white text-center p-6 mx-2 flex justify-center items-center rounded-full bg-slate-500 bg-opacity-50"
          >
            <BlurText
              text="Engage"
              delay={200}
              direction="top"
              className="text-center"
            />
          </animated.div>

          <animated.div
            style={springs[0]}
            className="flex-1 text-3xl font-semibold text-white text-center p-6 mx-2 flex justify-center items-center rounded-full bg-slate-500 bg-opacity-50"
          >
            <BlurText
              text="Contribute"
              delay={200}
              direction="top"
              className="text-center"
            />
          </animated.div>
        </div>
      </div>

      {/* Image with clip-path on the right side */}
      <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden rounded-tl-2xl">
        <div
          className="w-full h-full"
          style={{
            clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',
            overflow: 'hidden',
          }}
        >
          <img
            src="src\images\voting.png" // Replace with your image URL
            alt="Image"
            className="object-cover w-full h-full rounded-3xl opacity-80"
          />
        </div>
      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-0 w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <div className="w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
