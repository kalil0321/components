"use client";

import * as React from "react";
import ParticleImage, {
    ParticleForce,
    ParticleOptions,
    forces,
} from "react-particle-image";

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

export default function Particles({
    image = "https://github.com/github.png",
}: {
    image: string;
}) {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        // Check if window.matchMedia is available (client-side only)
        if (typeof window !== "undefined") {
            // Get initial system preference
            const darkModeQuery = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            setIsDarkMode(darkModeQuery.matches);

            // Listen for changes in system preference
            const handler = (e: MediaQueryListEvent) =>
                setIsDarkMode(e.matches);
            darkModeQuery.addEventListener("change", handler);

            // Cleanup
            return () => darkModeQuery.removeEventListener("change", handler);
        }
    }, []);

    const scale = 1 / 3;
    return (
        <div className="justify-center items-center p-4">
            <ParticleImage
                src={image}
                scale={scale}
                entropy={30}
                width={100 * scale}
                height={100 * scale}
                maxParticles={20_000}
                particleOptions={
                    isDarkMode
                        ? darkModeParticleOptions
                        : lightModeParticleOptions
                }
                backgroundColor="black"
                mouseMoveForce={motionForce}
                mouseDownForce={motionForceDown}
            />
        </div>
    );
}
