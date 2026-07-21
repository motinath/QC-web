import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "./ContactForm.types";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      botField: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // If honeypot is filled, silent reject
    if (data.botField) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Form submission failed. Please try again later.");
        }
      } else {
        // Local simulation / standard form acceptance delay
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="w-full">
      {/* Hidden Static Form for Netlify Crawler Parsing */}
      <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="text" name="subject" />
        <textarea name="message" />
        <input type="text" name="bot-field" />
      </form>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center backdrop-blur-md">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <h3 className="mt-4 text-xl font-bold text-foreground">Message Sent Successfully!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you for reaching out to Quantum Codon. Our team will review your inquiry and get
            back to you shortly.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {status === "error" && (
            <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Honeypot Input Field (Hidden) */}
          <div className="hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" {...register("botField")} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Dr. Eleanor Vance"
                {...register("name")}
                className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Work Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="eleanor@biotech.com"
                {...register("email")}
                className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Organization / Institution
              </label>
              <input
                id="company"
                type="text"
                placeholder="Genomics Labs Inc."
                {...register("company")}
                className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Partnership / Platform Inquiry"
                {...register("subject")}
                className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your project, target therapeutic area, or biocomputing needs..."
              {...register("message")}
              className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Inquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
