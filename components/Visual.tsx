import {
  motion,
  useTime,
  useTransform,
  useSpring,
  useScroll,
  easeInOut,
} from "framer-motion";
import Planets from "./images/planets";
import useScrollSize from "../hooks/useScrollSize";
export default function Visual() {
  const [visualRef, { width, height }] = useScrollSize();
  const { scrollY } = useScroll();
  const time = useTime();
  const warpTime = useTransform(time, (t) => t % 8000);
  const warpScrollY = useTransform(scrollY, [0, height], [0, 1]);
  const springScrollY = useSpring(warpScrollY, {
    damping: 50,
    stiffness: 400,
  });
  const vw = width / 100;
  const logoY = useTransform(warpScrollY, [0, 1], [0, 70]);
  const catX = useTransform(springScrollY, [0, 1], [0, -10 * vw]);
  const catY = useTransform(springScrollY, [0, 1], [0, 25]);
  const astronautX = useTransform(springScrollY, [0, 1], [0, 10 * vw]);
  const astronautY = useTransform(springScrollY, [0, 1], [0, 50]);
  const planetY = useTransform(warpTime, [0, 4000, 8000], [0, 25, 0], {
    ease: easeInOut,
  });
  const infoY = useTransform(warpScrollY, [0, 1], [0, -70]);

  return (
    <div className="w-full h-[100vh]  overflow-hidden " ref={visualRef}>
      <div className="container relative">
        {/* <motion.img
          drag
          whileDrag={{ scale: 0.8, rotate: -5 }}
          whileTap={{ scale: 0.8, rotate: -5 }}
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          dragElastic={0.2}
          style={{ y: logoY }}
          className="absolute top-[12.5vh] w-40 md:w-60 left-0 right-0 m-auto cursor-grab active:cursor-grabbing"
          src="/2024/visual/logo.svg"
          alt="logo"
        /> */}
        <Planets
          style={{ y: planetY }}
          className="absolute top-[15vh] md:top-[35vh] w-[250px] sm:w-[450px] md:w-[400px] left-0 right-0 m-auto"
        />
        <motion.img
          drag
          whileDrag={{ scale: 1.2, rotate: -5 }}
          whileTap={{ scale: 1.2, rotate: -5 }}
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          style={{ x: catX, y: catY }}
          className="absolute top-[20vh] w-[150px] sm:w-[180px] md:w-[300px] right-0 m-auto cursor-grab active:cursor-grabbing"
          src="/2024/visual/cat.png"
          alt="cat"
        />
        <motion.img
          drag
          whileDrag={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 1.2, rotate: 5 }}
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          style={{ x: astronautX, y: astronautY }}
          className="absolute top-[20vh] w-[160px] sm:w-[200px] md:w-[320px] left-0 m-auto cursor-grab active:cursor-grabbing"
          src="/2024/visual/ramen.png"
          alt="ramen"
        />
        <motion.div
          style={{ y: infoY }}
          className="absolute top-[75vh] m-auto w-full flex flex-col items-start gap-1 lg:gap-2 text-white leading-4"
        >
          <motion.div className="lg:text-xl bg-[#012637] bg-opacity-80 backdrop-blur-xl rounded p-1">
            日期
          </motion.div>
          <motion.div className="text-2xl font-bold lg:text-4xl bg-[#012637] bg-opacity-80 backdrop-blur-xl rounded p-1">
            <span className="hidden lg:inline">07/17 ~ 07/21</span>
            <span className="lg:hidden">7/17 ~ 7/21</span>
          </motion.div>
          <div className="lg:text-xl bg-[#012637] bg-opacity-80 backdrop-blur-xl rounded mt-2 p-1">
            地點
          </div>
          <div className="text-2xl font-bold lg:text-4xl bg-[#012637] bg-opacity-80 backdrop-blur-xl rounded p-1">
            陽明交通大學 光復校區
          </div>
        </motion.div>
      </div>
    </div>
  );
}
