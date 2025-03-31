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
  const [userName, setUserName] = useState("User");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreetingMessage = () => {
      const hours = new Date().getHours();
      return hours < 12 ? "Good morning," : hours < 18 ? "Good afternoon," : "Good evening,";
    };
    setGreeting(getGreetingMessage());

    const fetchUserName = async () => {
      try {
        let response = await fetch("https://janmanch-cep.onrender.com/api/corps/me", { credentials: "include" });

        if (response.ok) {
          let data = await response.json();
          if (data?.name) {
            setUserName(data.name);
            return;
          }
        }

        response = await fetch("https://janmanch-cep.onrender.com/api/users/me", { credentials: "include" });
        if (response.ok) {
          let data = await response.json();
          if (data?.name) {
            setUserName(data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  const defaultFrom = { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,-50px,0)" };
  const defaultTo = [
    { filter: "blur(5px)", opacity: 0.5, transform: "translate3d(0,5px,0)" },
    { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
  ];

  const springs = useSprings(1, [
    {
      from: defaultFrom,
      to: inView ? async (next) => { for (const step of defaultTo) await next(step); } : defaultFrom,
      config: { easing: "easeOutCubic" },
    },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    }, { threshold: 0.1, rootMargin: "0px" });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 text-black rounded-3xl w-full">
      <div ref={ref} style={springs[0]} className="container mx-auto px-4 md:px-16 pt-10 md:pt-20 pb-20 md:pb-32 text-center md:-ml-52">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {greeting} <span className="text-violet-700">{userName}!!</span>
          </h1>
          <p className="text-lg md:text-xl font-light">Bridging the gap between citizens and their representatives.</p>
        </div>

        <div className="grid grid-cols-2 md:flex md:justify-center items-center mb-8 gap-4">
          {["🚀Explore", "🔗Connect", "👥Engage", "🤝Contribute"].map((word, index) => (
            <animated.div key={index} style={springs[0]} className="text-3xl font-semibold text-black text-center p-6 flex justify-center items-center font-[Poppins]">
              <BlurText text={word} delay={200} direction="top" className="text-center" />
            </animated.div>
          ))}
        </div>
      </div>

      {/* Image (ensure path is correct) */}
      <div className="absolute top-0 right-0 w-1/3 h-full hidden md:block overflow-hidden rounded-tl-2xl">
        <img src="/voting.png" alt="Voting" className="object-cover w-full h-full rounded-3xl opacity-80"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%)' }} />
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
};

export default WelcomeCard;
