"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="pt-16 md:pt-24 pb-12 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-darkText leading-tight mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-base md:text-lg text-darkText/70 font-sans max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
};
