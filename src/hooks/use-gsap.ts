import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap() {
  const comp = useRef<HTMLDivElement>(null);

  return { comp, gsap, ScrollTrigger };
}
