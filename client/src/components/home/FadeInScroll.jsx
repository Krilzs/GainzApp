import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function FadeInOnScroll({
  children,
  delay = 0.2,
  y = 50,
  duration = 2,
  ease = "power2.out",
  triggerStart = "top 70%",
}) {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      gsap.fromTo(
        componentRef.current,
        { y: y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          ease: ease,
          delay: delay,
          scrollTrigger: {
            trigger: componentRef.current,
            start: triggerStart,
          },
        }
      );
    }
  }, [delay, y, duration, ease, triggerStart]); // Dependencias para que se re-ejecute si cambian las props

  return (
    <div ref={componentRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
