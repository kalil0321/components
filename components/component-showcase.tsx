import { ReactNode } from "react";
import { OpenInV0Button } from "./open-in-v0-button";
import { motion } from "motion/react";

interface ComponentShowcaseProps {
    title: string;
    description: string;
    componentName: string;
    children: ReactNode;
    minHeight?: string;
}

export function ComponentShowcase({
    title,
    description,
    componentName,
    children,
    minHeight = "min-h-[300px]",
}: ComponentShowcaseProps) {
    return (
        <motion.section
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                >
                    <OpenInV0Button name={componentName} />
                </motion.div>
            </div>
            <div className="border border-border rounded-lg p-8 bg-card">
                <div
                    className={`flex items-center justify-center ${minHeight}`}
                >
                    {children}
                </div>
            </div>
        </motion.section>
    );
}
