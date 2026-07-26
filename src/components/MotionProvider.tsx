"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide reduced-motion guarantee for framer-motion.
 *
 * reducedMotion="user" makes every motion component honour the OS "reduce
 * motion" setting without each one having to call useReducedMotion itself.
 * Remove this wrapper and every animation in the app silently ignores that
 * setting again.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
