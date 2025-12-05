import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, children, loading = false, loadingText, disabled, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "relative transition-all duration-200",
          loading && "cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner className="h-5 w-5" />
            <span>{loadingText || "Processing..."}</span>
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton, LoadingSpinner };
