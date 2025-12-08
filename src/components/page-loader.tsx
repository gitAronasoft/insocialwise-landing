import { useState, useEffect, createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";
import logoIcon from "@/img/in-social-icon.png";

declare global {
  interface Window {
    hideAppPreloader?: () => void;
  }
}

interface PageLoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(undefined);

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    throw new Error("usePageLoader must be used within PageLoaderProvider");
  }
  return context;
};

interface PageLoaderProviderProps {
  children: React.ReactNode;
}

export const PageLoaderProvider = ({ children }: PageLoaderProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const initialLoadDone = useRef(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    const finishLoading = () => {
      setTimeout(() => {
        if (window.hideAppPreloader) {
          window.hideAppPreloader();
        }
        setIsLoading(false);
      }, 600);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      return () => window.removeEventListener("load", finishLoading);
    }
  }, []);

  return (
    <PageLoaderContext.Provider value={{ isLoading, setIsLoading, showLoader, hideLoader }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </PageLoaderContext.Provider>
  );
};

const PageLoaderOverlay = () => {
  return (
    <motion.div
      key="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/50"
    >
      <BrandedLogoAnimation />
    </motion.div>
  );
};

export const BrandedLogoAnimation = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: { logo: "h-12 w-12", glow: "w-16 h-16 -m-2", dots: "h-1.5 w-1.5", gap: "gap-3" },
    default: { logo: "h-20 w-20", glow: "w-[120px] h-[120px] -m-5", dots: "h-2 w-2", gap: "gap-6" },
    large: { logo: "h-24 w-24", glow: "w-[140px] h-[140px] -m-6", dots: "h-2.5 w-2.5", gap: "gap-8" },
  };

  const s = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center ${s.gap}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl ${s.glow}`}
        />
        <motion.img
          src={logoIcon}
          alt="insocialwise"
          className={`relative z-10 ${s.logo} object-contain drop-shadow-lg`}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1"
      >
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
      </motion.div>
    </div>
  );
};

export const RouteChangeLoader = () => {
  const { showLoader, hideLoader } = usePageLoader();

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export const SuspenseFallback = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/50">
      <BrandedLogoAnimation />
    </div>
  );
};

export default PageLoaderProvider;
