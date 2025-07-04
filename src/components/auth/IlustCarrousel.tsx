import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ilustracion1 from "../../../public/ilust/ilust1.png";
import ilustracion2 from "../../../public/ilust/ilust2.png";
import ilustracion3 from "../../../public/ilust/ilust3.png";

const slides = [
  {
    image: ilustracion1,
    title: "pomodoro Technique",
    subtitle: "improve your focus with timed work intervals",
  },
  {
    image: ilustracion2,
    title: "natural cycles",
    subtitle: "connect with lunar phases and seasons",
  },
  {
    image: ilustracion3,
    title: "personalized Insights",
    subtitle: "discover your unique productivity patterns",
  },
];

const variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const IlustCarrousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearTimeout(timer);
  }, [index]);

  const currentSlide = slides[index];

  if (!currentSlide) {
    return null;
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="relative h-72 w-full mb-6">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={currentSlide.image}
            alt={currentSlide.title}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full object-contain"
          />
        </AnimatePresence>
      </div>

      <div className="relative h-28 w-full text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "_text"}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute w-full"
          >
            <h2 className="text-2xl font-cabinetGrotesk font-bold text-primaryDark mb-2">
              {currentSlide.title}
            </h2>
            <p className="text-secondaryText font-cabinetGrotesk font-light text-base">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center space-x-3 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === i
                ? "bg-primaryDark w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a la diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default IlustCarrousel;
