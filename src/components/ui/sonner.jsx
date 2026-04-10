import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

import { 
  CircleCheck, 
  Info, 
  CircleAlert, 
  CircleX, 
  Loader2 
} from "lucide-react";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: (
          <CircleCheck strokeWidth={2} className="size-4" />
        ),
        info: (
          <Info strokeWidth={2} className="size-4" />
        ),
        warning: (
          <CircleAlert strokeWidth={2} className="size-4" />
        ),
        error: (
          <CircleX strokeWidth={2} className="size-4" />
        ),
        loading: (
          <Loader2 strokeWidth={2} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        }
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props} />
  );
}

export { Toaster }
