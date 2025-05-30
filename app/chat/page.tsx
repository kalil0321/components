"use client";

import * as React from "react";
import { PageHeader } from "@/components/header";
import { ComponentShowcase } from "@/components/component-showcase";
import { PageFooter } from "@/registry/new-york/footer/footer";
import { motion } from "framer-motion";
import TextWithTooltip from "@/registry/new-york/text-with-tooltip/text-with-tooltip";
import HomeFooter from "@/registry/new-york/home-footer/home-footer";
import { ModeToggle } from "@/registry/new-york/mode-toggle/mode-toggle";
import HomeHeader from "@/registry/new-york/home-header/home-header";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader className="z-50" />

      <motion.main
        id="components"
        className="max-w-4xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="space-y-16">
          <ComponentShowcase
            title="Header"
            description="Header"
            componentName="header"
          >
            {/* TODO: make it mock so it's not a real header with functionally */}
            <PageHeader />
          </ComponentShowcase>

          <ComponentShowcase
            title="Mode Toggle"
            description="Mode Toggle"
            componentName="mode-toggle"
          >
            <ModeToggle />
          </ComponentShowcase>

          <ComponentShowcase
            title="Footer"
            description="Footer"
            componentName="footer"
          >
            {/* TODO: make it mock so it's not a real footer with functionality */}
            <PageFooter />
          </ComponentShowcase>

          <ComponentShowcase
            title="Text with Tooltip"
            description="Text with tooltip"
            componentName="text-with-tooltip"
            minHeight="min-h-[400px]"
          >
            <TextWithTooltip />
          </ComponentShowcase>

          <ComponentShowcase
            title="Home Header"
            description="Home Header"
            componentName="home-header"
          >
            <HomeHeader />
          </ComponentShowcase>

          <ComponentShowcase
            title="Main Footer"
            description="Footer"
            componentName="footer"
            minHeight="min-h-[200px]"
          >
            <HomeFooter />
          </ComponentShowcase>
        </div>
      </motion.main>

      <PageFooter />
    </motion.div>
  );
}
