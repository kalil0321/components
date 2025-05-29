"use client";

import React from "react";

export default function Icon() {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-registry"
        >
            <defs>
                <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
            </defs>

            {/* Background circle with subtle animation */}
            <circle
                cx="16"
                cy="16"
                r="15"
                fill="url(#gradient1)"
                className="animate-pulse"
                opacity="0.1"
            />

            {/* Main geometric shape - representing components */}
            <g className="transform transition-transform duration-300 hover:scale-110">
                {/* Central cube/box */}
                <rect
                    x="10"
                    y="10"
                    width="12"
                    height="12"
                    rx="2"
                    fill="url(#gradient1)"
                    className="animate-pulse"
                />

                {/* Floating elements representing registry items */}
                <circle
                    cx="8"
                    cy="8"
                    r="2"
                    fill="url(#gradient2)"
                    className="animate-bounce"
                    style={{ animationDelay: "0s", animationDuration: "2s" }}
                />

                <rect
                    x="23"
                    y="6"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="url(#gradient2)"
                    className="animate-bounce"
                    style={{ animationDelay: "0.5s", animationDuration: "2s" }}
                />

                <circle
                    cx="24"
                    cy="24"
                    r="1.5"
                    fill="url(#gradient2)"
                    className="animate-bounce"
                    style={{ animationDelay: "1s", animationDuration: "2s" }}
                />

                <rect
                    x="6"
                    y="23"
                    width="2.5"
                    height="2.5"
                    rx="0.5"
                    fill="url(#gradient2)"
                    className="animate-bounce"
                    style={{ animationDelay: "1.5s", animationDuration: "2s" }}
                />
            </g>

            {/* Connection lines - representing registry connections */}
            <g
                stroke="url(#gradient2)"
                strokeWidth="1"
                opacity="0.6"
                className="animate-pulse"
            >
                <line x1="8" y1="8" x2="10" y2="10" />
                <line x1="24" y1="8" x2="22" y2="10" />
                <line x1="24" y1="24" x2="22" y2="22" />
                <line x1="8" y1="24" x2="10" y2="22" />
            </g>

            <style jsx>{`
                .icon-registry {
                    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-2px);
                    }
                }

                .icon-registry:hover {
                    filter: drop-shadow(0 8px 16px rgba(99, 102, 241, 0.3));
                }
            `}</style>
        </svg>
    );
}
