import { motion } from "framer-motion";
import logoIcon from "@/img/in-social-icon.png";

interface BrandedLoaderProps {
  size?: "small" | "default" | "large";
  className?: string;
}

export const BrandedLoader = ({ size = "default", className = "" }: BrandedLoaderProps) => {
  const sizeClasses = {
    small: { logo: "h-10 w-10", glow: "w-14 h-14", dots: "h-1.5 w-1.5", gap: "gap-3" },
    default: { logo: "h-16 w-16", glow: "w-20 h-20", dots: "h-2 w-2", gap: "gap-4" },
    large: { logo: "h-20 w-20", glow: "w-28 h-28", dots: "h-2 w-2", gap: "gap-5" },
  };

  const s = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${s.gap} ${className}`}>
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl ${s.glow}`}
          style={{ margin: "-12px" }}
        />
        <motion.img
          src={logoIcon}
          alt="Loading"
          className={`relative z-10 ${s.logo} object-contain drop-shadow-md`}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${s.dots} rounded-full bg-gradient-to-r from-indigo-600 to-purple-600`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandedLoader;
