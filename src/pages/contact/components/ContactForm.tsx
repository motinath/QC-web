import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PillButton } from "./PillButton";
import { Reveal } from "@/components/shared/Reveal";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(500),
});

const MAX = 500;

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks — we'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
      setMessage("");
    }, 600);
  }

  return (
    <section id="form" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-12 px-6">
        <Reveal>
          <div className="md:sticky md:top-24">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Send a message
            </p>
            <h2 className="text-4xl font-semibold text-foreground sm:text-5xl">
              Get in
              <span className="font-serif-italic ml-3" style={{ color: "#2563eb" }}>
                touch
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Share a few details about your project or question, and the right person on our team
              will reach back out personally.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" required placeholder="Jane Doe" />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                placeholder="jane@company.com"
              />
            </div>
            <div className="mt-5">
              <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
              <textarea
                name="message"
                required
                maxLength={MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Tell us a little about your project..."
                className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="mt-2 text-right text-xs text-muted-foreground">
                {message.length}/{MAX} characters
              </div>
            </div>
            <div className="mt-8">
              <PillButton type="submit" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending message...</span>
                  </span>
                ) : (
                  "Submit now"
                )}
              </PillButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      <input
        {...rest}
        className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}
