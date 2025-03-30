import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <motion.div 
      className={`logo flex items-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo-icon relative overflow-hidden w-8 h-8 mr-2 rounded-lg flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-secondary opacity-90"></div>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg"></div>
        <motion.div 
          className="relative z-10 text-white font-bold text-lg"
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          N
        </motion.div>
      </div>
      <motion.div 
        className="text-xl font-orbitron font-bold gradient-text tracking-wider"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        NEXUS<span className="text-primary/80">NET</span>
      </motion.div>
    </motion.div>
  );
}