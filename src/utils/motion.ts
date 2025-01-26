import { Variants } from "framer-motion"; // Import Variants from Framer Motion

// Type definitions
type Direction = "left" | "right" | "up" | "down";
type TransitionType = "tween" | "spring";

interface DirectionOffsets {
  x: number;
  y: number;
}

interface Transition {
  type: TransitionType;
  delay: number;
  duration: number;
  ease: string;
}

// Use Variants from Framer Motion for compatibility
export type AnimationVariant = Variants;

// Helper function to determine x, y offsets based on direction
const getDirectionOffsets = (direction: Direction): DirectionOffsets => {
  switch (direction) {
    case "left":
      return { x: 100, y: 0 };
    case "right":
      return { x: -100, y: 0 };
    case "up":
      return { x: 0, y: 100 };
    case "down":
      return { x: 0, y: -100 };
    default:
      return { x: 0, y: 0 };
  }
};

// Common transition defaults
const createTransition = (
  type: TransitionType = "tween",
  delay = 0,
  duration = 1,
  ease = "easeOut"
): Transition => ({
  type,
  delay,
  duration,
  ease,
});

export const textVariant = (delay = 0): AnimationVariant => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: createTransition("spring", delay, 1.25),
  },
});

export const fadeIn = (
  direction: Direction = "up",
  type: TransitionType = "tween",
  delay = 0,
  duration = 1,
  ease = "easeOut"
): AnimationVariant => {
  const { x, y } = getDirectionOffsets(direction);
  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: createTransition(type, delay, duration, ease),
    },
  };
};

export const zoomIn = (
  delay = 0,
  duration = 1,
  ease = "easeOut"
): AnimationVariant => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: createTransition("tween", delay, duration, ease),
  },
});

export const slideIn = (
  direction: Direction = "left",
  type: TransitionType = "tween",
  delay = 0,
  duration = 1,
  ease = "easeOut"
): AnimationVariant => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: createTransition(type, delay, duration, ease),
    },
  };
};

export const staggerContainer = (
  staggerChildren = 0.25,
  delayChildren = 0.25
): AnimationVariant => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
