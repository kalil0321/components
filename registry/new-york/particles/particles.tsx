"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import ParticleImage, {
    ParticleForce,
    ParticleOptions,
    forces,
} from "react-particle-image";

const particleOptions: ParticleOptions = {
    color: ({ x, y, image }) => {
        const pixel = image.get(x, y);
        return `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
    },
};

const motionForce = (x: number, y: number): ParticleForce => {
    return forces.disturbance(x, y, 25);
};

const motionForceDown = (x: number, y: number): ParticleForce => {
    return forces.disturbance(x, y, 100);
};

export default function Particles({
    image = "https://avatars.githubusercontent.com/u/92564081",
    maxParticles = 10_000,
    width = 500,
    height = 500,
    scale = 1,
    backgroundColor,
}: {
    image: string;
    maxParticles: number;
    width: number;
    height: number;
    scale: number;
    backgroundColor: string;
}) {
    const { setTheme, resolvedTheme } = useTheme();

    const bgColor =
        backgroundColor || (resolvedTheme === "dark" ? "transparent" : "black");

    return (
        <div className="justify-center items-center p-4">
            <ParticleImage
                src={image}
                scale={scale}
                entropy={30}
                width={width * scale}
                height={height * scale}
                maxParticles={maxParticles}
                particleOptions={particleOptions}
                backgroundColor={bgColor}
                mouseMoveForce={motionForce}
                mouseDownForce={motionForceDown}
            />
        </div>
    );
}
