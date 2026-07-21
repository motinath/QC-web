import { toast as sonnerToast } from "sonner";

type ToastArgs = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastArgs) => {
      const message = title ?? "";
      if (variant === "destructive") {
        sonnerToast.error(message, { description });
      } else {
        sonnerToast(message, { description });
      }
    },
  };
}

export const toast = (args: ToastArgs) => {
  if (args.variant === "destructive") {
    sonnerToast.error(args.title, { description: args.description });
  } else {
    sonnerToast(args.title, { description: args.description });
  }
};
