import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { X } from "lucide-react";

type ContactModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactModal />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (ctx) return ctx;
  return { isOpen: false, open: () => {}, close: () => {} };
}

function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => close(), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={close} />
      <div className="relative w-full max-w-2xl rounded-3xl border bg-card text-card-foreground shadow-2xl animate-scale-in">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground hover:text-foreground transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 pt-10 pb-6 sm:px-10 sm:pt-12 sm:pb-8">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent-emerald font-semibold">
              Quantum Codon
            </p>
            <h2 id="contact-modal-title" className="font-serif-display text-3xl md:text-4xl mt-2">
              Get in touch
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We typically reply within one business day.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 mb-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-emerald/15 text-accent-emerald text-xl">
                ✓
              </div>
              <p className="mt-4 text-base font-medium">Thanks! Your message is on its way.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" name="firstName" placeholder="Jane" required />
                <Field label="Last Name" name="lastName" placeholder="Doe" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                />
                <Field label="Phone Number" name="phone" type="tel" placeholder="+1 555 000 0000" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your project or question…"
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-accent-blue px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-accent-blue/20"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition"
      />
    </div>
  );
}
