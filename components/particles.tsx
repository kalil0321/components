"use client";

import * as React from "react";
import ParticleImage, {
  ParticleForce,
  ParticleOptions,
  forces,
} from "react-particle-image";
import astronautNoBg from "public/profile_picture_no_bg.png";

const darkModeParticleOptions: ParticleOptions = {
  color: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Return the color of the pixel
    return `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
  },
};

const lightModeParticleOptions: ParticleOptions = {
  color: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Invert colors - make white pixels black and black pixels white
    return `rgb(${255 - pixel.r}, ${255 - pixel.g}, ${255 - pixel.b})`;
  },
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 25);
};

const motionForceDown = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 100);
};

export default function Particles() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Check if window.matchMedia is available (client-side only)
    if (typeof window !== "undefined") {
      // Get initial system preference
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeQuery.matches);

      // Listen for changes in system preference
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      darkModeQuery.addEventListener("change", handler);

      // Cleanup
      return () => darkModeQuery.removeEventListener("change", handler);
    }
  }, []);

  const scale = 1 / 3;
  return (
    <div className="hidden justify-center items-center p-4 sm:flex">
      <ParticleImage
        src={astronautNoBg.src}
        scale={scale}
        entropy={30}
        width={astronautNoBg.width * scale}
        height={astronautNoBg.height * scale}
        maxParticles={20_000}
        particleOptions={
          isDarkMode ? darkModeParticleOptions : lightModeParticleOptions
        }
        backgroundColor="transparent"
        mouseMoveForce={motionForce}
        mouseDownForce={motionForceDown}
      />
    </div>
  );
}
