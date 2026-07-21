import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Dna, RotateCcw, ExternalLink, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { SYSTEM_PROMPT } from "./systemPrompt";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  sender: "ai" | "user";
  text: string;
  id: string;
}

// ─── Gemini API ───────────────────────────────────────────────────────────────
// API key is read from environment variable — set VITE_GEMINI_API_KEY in your .env file
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ─── Fallback KB (answers without API) ───────────────────────────────────────
const KB_FALLBACK: Array<{ patterns: string[]; answer: string }> = [
  {
    patterns: ["dark genome", "what is dark genome", "98%", "junk dna", "non-coding"],
    answer: `🧬 **The Dark Genome** is the 98% of DNA that doesn't code for proteins — long dismissed as "junk DNA". QCodon systematically converts this silent majority into first-in-class drug candidates.\n\n→ Learn more at [Research → Platform Overview](/research#platform)`,
  },
  {
    patterns: ["trep", "trep-18", "ic50", "leishmania", "leishmaniasis", "22nm"],
    answer: `🔬 **tREP-18** is a tRNA-derived peptide (Class II) derived from E. coli tRNA. It showed an IC50 of **22.13 nM** against *Leishmania donovani* while remaining safe for human macrophages — a breakthrough anti-leishmanial result.\n\n→ Full data at [Research Results](/research#results)`,
  },
  {
    patterns: ["alzheimer", "bace1", "86.7", "ecoi2", "amyloid"],
    answer: `🧠 For **Alzheimer's Disease**, the ECOI2 peptide (derived from intergenic sequences) achieved **86.7% BACE1 inhibition** at 1μM and reduced amyloid Aβ 1-40 and 1-42 in SH-SY5Y cells — a non-toxic lead candidate.\n\n→ See full results at [Research → Proof & Results](/research#results)`,
  },
  {
    patterns: ["malaria", "plasmodium", "anti-malarial", "60%", "parasite"],
    answer: `💊 For **Anti-Malarial** research, synthetic peptides from *S. cerevisiae* intergenic sequences (Class I) showed **>60% inhibition** of *P. falciparum* invasion into red blood cells, validated on clinical strains.\n\n→ [Research Results](/research#results)`,
  },
  {
    patterns: ["drug discovery", "drug", "service", "discovery"],
    answer: `💊 **Drug Discovery** is Quantum Codon's core service — computationally screening intergenic DNA, antisense sequences, and tREPs, then optimizing binding affinity via virtual docking.\n\n→ [Services → Drug Discovery](/services#drug-discovery)`,
  },
  {
    patterns: [
      "service",
      "services",
      "what do you offer",
      "analytical",
      "bio mmg",
      "bioinformatics",
      "regulatory",
    ],
    answer: `Quantum Codon offers **5 enterprise services**:\n1. 💊 [Drug Discovery](/services#drug-discovery)\n2. 🧫 [Bio MMG (Microbiology & Molecular Genetics)](/services#bio-mmg)\n3. 🔬 [Analytical Services](/services#analytical-services)\n4. 🖥️ [Bio Infactic (Bioinformatics)](/services#bio-infactic)\n5. 📋 [Regulatory & Complaints](/services#regulatory-complaints)`,
  },
  {
    patterns: ["class i", "class 1", "non-expressing", "intergenic", "antisense", "pseudogene"],
    answer: `**Class I — Non-Expressing DNA** (~40% of genome): DNA regions that are never transcribed naturally. This includes intergenic regions, antisense sequences, reverse ORFs, repetitive elements, and pseudogenes.\n\nPipeline: Bioinformatics → Synthetic cloning → Expression → AlphaFold → Lead optimisation\n\n→ [Research → Classes I & II](/research#classes)`,
  },
  {
    patterns: ["class ii", "class 2", "non-translating", "rna", "intron", "microrna", "treps"],
    answer: `**Class II — Non-Translating RNA** (~56% of genome): RNA molecules produced but never translated naturally. Includes introns, tREPs, ribosomal RNA, microRNA, and long non-coding RNA.\n\n→ [Research → Classes I & II](/research#classes)`,
  },
  {
    patterns: ["paper", "publication", "preprint", "doi", "2025", "landmark"],
    answer: `📄 **Landmark Publication (2025)**:\n"Recoding Genomic Elements with AI and Quantum Computation to Build the Next Generation Drug Discovery Platform"\nAuthors: Krishnan, Chugh, Niranjan, **Prof. Pawan K Dhar**\nDOI: 10.20944/preprints202505.1422.v1\n\n→ [Read the Paper](/research#paper)`,
  },
  {
    patterns: ["education", "training", "certification", "course", "learn", "program"],
    answer: `🎓 **Education & Training** programs by Quantum Codon:\n• Dark Genome Mapping & Annotation\n• AI Structure Prediction (AlphaFold)\n• Quantum Molecular Dynamics\n• Synthetic Expression Genetics\n\nNext cohort: **July 15, 2026** | Contact: contact@qcodon.com\n→ [Education Page](/education#academic-training)`,
  },
  {
    patterns: ["career", "job", "position", "hire", "apply", "work"],
    answer: `💼 **Open Positions at Quantum Codon**:\n• Computational Biologist (Full-Time · Amaravati)\n• Quantum Software Engineer (Full-Time/Hybrid)\n• Lead Regulatory Auditor (Full-Time/Hybrid)\n\nApply: contact@qcodon.com\n→ [Careers Page](/careers)`,
  },
  {
    patterns: ["contact", "email", "partner", "investor", "meeting", "reach"],
    answer: `📬 **Contact Quantum Codon**:\n• Email: contact@qcodon.com\n\nFor partnerships or investor enquiries → [Contact Page](/contact)`,
  },
  {
    patterns: ["about", "who", "founder", "pawan", "dhar", "company", "history"],
    answer: `**Quantum Codon Pvt Ltd** was founded by **Prof. Pawan K Dhar**, a pioneer with 15+ years of dark genome research (formerly JNU, New Delhi). The company is anchored in **Amaravati Quantum Valley**, designing quantum-computational simulations for drug discovery.\n\n→ [About Us](/about)`,
  },
  {
    patterns: ["alphafold", "ai", "artificial intelligence", "quantum", "simulation", "pipeline"],
    answer: `🤖 Quantum Codon's **Technology Pipeline** uses:\n1. Dark Genome Mapping (NCBI GEO)\n2. AI Prediction (AlphaFold, ADMET)\n3. Virtual Screening (docking vs GPCRs, kinases)\n4. Quantum Simulation (VQE, molecular dynamics)\n5. Experimental Validation (cell assays, Western blot)\n\n→ [Research → Platform Overview](/research#platform)`,
  },
  {
    patterns: ["result", "proof", "evidence", "disease", "validated"],
    answer: `🔬 Quantum Codon has **15 years of validated results** across 6 disease areas:\n• 2009: First dark genome expression (E. coli)\n• 2013-15: Anti-malarial (>60% P. falciparum inhibition)\n• 2015-23: Alzheimer's (86.7% BACE1 inhibition)\n• 2023: Anti-leishmanial tREP-18 (IC50=22nM)\n• 2024: Antiviral vaccine epitopes\n\n→ [Full Results](/research#results)`,
  },
];

function getFallbackResponse(query: string): string | null {
  const q = query.toLowerCase();
  for (const entry of KB_FALLBACK) {
    if (entry.patterns.some((p) => q.includes(p))) {
      return entry.answer;
    }
  }
  return null;
}

async function callGemini(history: Message[], userMessage: string): Promise<string> {
  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    {
      role: "model",
      parts: [
        {
          text: "Understood. I am QCodon, the AI assistant for Yellow.ai-styled interface. I'm ready to help.",
        },
      ],
    },
    ...history.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 800 },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } })?.error?.message || `API error ${res.status}`,
    );
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
  };
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    "I couldn't generate a response. Please try again."
  );
}

// ─── Simple Markdown & Link Parser ───────────────────────────────────────────
function RenderBotText({ text, onNavigate }: { text: string; onNavigate: (path: string) => void }) {
  const parts: React.ReactNode[] = [];
  let index = 0;

  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > index) {
      parts.push(text.slice(index, match.index));
    }

    if (match[1]) {
      const label = match[2];
      const href = match[3];
      const isInternal = href.startsWith("/");

      parts.push(
        isInternal ? (
          <button
            key={match.index}
            onClick={() => onNavigate(href)}
            className="inline-flex items-center gap-0.5 text-violet-600 dark:text-violet-400 hover:underline underline-offset-2 transition-colors font-semibold cursor-pointer text-xs align-baseline"
          >
            {label}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </button>
        ) : (
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 text-violet-600 dark:text-violet-400 hover:underline underline-offset-2 transition-colors font-semibold cursor-pointer text-xs align-baseline"
          >
            {label}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        ),
      );
    } else if (match[4]) {
      const boldText = match[5];
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {boldText}
        </strong>,
      );
    }

    index = match.index + match[0].length;
  }

  if (index < text.length) {
    parts.push(text.slice(index));
  }

  return <span className="whitespace-pre-wrap leading-relaxed block text-xs">{parts}</span>;
}

// ─── Dynamic Navigation Context Mapping ──────────────────────────────────────
function getRouteContext(pathname: string) {
  switch (pathname) {
    case "/":
      return { name: "Home Console", icon: "🧬" };
    case "/about":
      return { name: "Scientific Founder & Valley Lab", icon: "🏢" };
    case "/services":
      return { name: "Enterprise Services Platform", icon: "⚙️" };
    case "/research":
      return { name: "Platform & Scientific Research", icon: "🔬" };
    case "/education":
      return { name: "Academic Training & Cohorts", icon: "🎓" };
    case "/careers":
      return { name: "Careers & Open Positions", icon: "💼" };
    case "/contact":
      return { name: "Partnership & Investor Desk", icon: "📬" };
    default:
      return { name: "Global Application Navigator", icon: "🌐" };
  }
}

// Suppress unused warning — used in future expansions
void getRouteContext;

// ─── Dynamic Prompt Starters Map ─────────────────────────────────────────────
const ROUTE_STARTERS: Record<string, { label: string; query: string }[]> = {
  "/": [
    {
      label: "🧬 What is the Dark Genome?",
      query: "What is the dark genome and why is it important?",
    },
    {
      label: "🏢 Prof. Pawan K Dhar & Lab Story",
      query:
        "Tell me about the founder Prof. Pawan K Dhar, his academic background and where to read about the company",
    },
    { label: "🚀 Deep Codon Initiative overview", query: "What is the Deep Codon Initiative?" },
    {
      label: "📄 2025 Landmark Publication",
      query: "Where can I read your 2025 landmark publication? What is the DOI?",
    },
  ],
  "/about": [
    {
      label: "🏢 Scientific Anchors & Lab Locations",
      query: "Tell me about your Amaravati Quantum Valley laboratory and scientific anchors",
    },
    {
      label: "🏫 JNU Academic Heritage",
      query: "What is the company's scientific connection with JNU, New Delhi?",
    },
    {
      label: "🧬 Founder's 15-year Research",
      query: "Tell me about Prof. Pawan K Dhar's research journey in biotechnology",
    },
  ],
  "/services": [
    {
      label: "💊 Drug Discovery Services Details",
      query: "Where do I find details on the drug discovery services?",
    },
    {
      label: "🧫 Bio MMG Cloning Vector services",
      query: "Tell me about Bio MMG microbiology genetic engineering services",
    },
    {
      label: "🖥️ Bioinformatics & AlphaFold APIs",
      query:
        "What bioinformatics (Bio Infactic) algorithms and structure predictions do you offer?",
    },
    {
      label: "📋 FDA/EMA Regulatory dossier audits",
      query: "Where is the regulatory and GLP compliance audits service?",
    },
  ],
  "/research": [
    {
      label: "🔬 Alzheimer's BACE1 (86.7% inhibition)",
      query: "Show me Alzheimer's disease research results and ECOI2 peptide BACE1 details",
    },
    {
      label: "💊 Anti-Malarial red blood cell assays",
      query: "What are your yeast intergenic anti-malarial study details?",
    },
    {
      label: "🧬 Class I vs Class II DNA/RNA differences",
      query: "Explain Class I (non-expressing DNA) and Class II (non-translating RNA) sequences",
    },
    {
      label: "📍 tREP-18 IC50 (22.13 nM) results",
      query: "Where can I find details about tREP-18 IC50 against Leishmania?",
    },
  ],
  "/education": [
    {
      label: "🎓 Academic Trainings & next Cohort",
      query: "What academic training modules are offered and when is the next cohort?",
    },
    {
      label: "📅 Certification enrollment guidelines",
      query: "How do I enroll in the Dark Genome mapping or quantum dynamics courses?",
    },
    {
      label: "📧 Contact training department",
      query: "What is the email to contact for academic certificates?",
    },
  ],
  "/careers": [
    {
      label: "💼 Open jobs (Comp Bio / Quantum SW)",
      query: "What career opportunities and open positions are available at Quantum Codon?",
    },
    {
      label: "📍 Application & CV guidelines",
      query: "How do I apply for the Computational Biologist role? What is the careers email?",
    },
  ],
  "/contact": [
    {
      label: "📬 Request the Investor Pitch Deck",
      query: "How can I request the investor pitch deck or get contact emails?",
    },
    {
      label: "🔬 Schedule a Scientific consultation",
      query: "How do I schedule a scientific partnership discussion?",
    },
  ],
};

function getRouteStarters(pathname: string) {
  return ROUTE_STARTERS[pathname] || ROUTE_STARTERS["/"];
}

// Suppress unused warning — used in future expansions
void getRouteStarters;

// ─── Dynamic Welcome Greetings Map ───────────────────────────────────────────
const ROUTE_GREETINGS: Record<string, string> = {
  "/": "Hi there! I am QCodon. How can I help you explore Quantum Codon today?",
  "/about":
    "Hi! I am QCodon. How can I help you with our scientific anchors, founder, and lab locations?",
  "/services":
    "Hi! I am QCodon. How can I help you understand our computational and clinical services?",
  "/research":
    "Hi! I am QCodon. How can I help you explore our dark genome research and proof results?",
  "/education":
    "Hi! I am QCodon. How can I help you learn about our academic training modules and certifications?",
  "/careers": "Hi! I am QCodon. How can I help you check open positions at Quantum Codon?",
  "/contact": "Hi! I am QCodon. How can I help you get in touch or request the investor brief?",
};

function getRouteGreeting(pathname: string) {
  return ROUTE_GREETINGS[pathname] || ROUTE_GREETINGS["/"];
}

// ─── Custom DNA Mascot Header Circle ─────────────────────────────────────────
function MascotAvatar({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-md shrink-0 select-none",
        size === "md" ? "w-10 h-10" : "w-8 h-8",
      )}
    >
      <Dna
        className={cn(
          "text-white animate-[pulse_2.5s_infinite]",
          size === "md" ? "w-5.5 h-5.5" : "w-4.5 h-4.5",
        )}
        strokeWidth={2.5}
      />
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg, onNavigate }: { msg: Message; onNavigate: (path: string) => void }) {
  const isAI = msg.sender === "ai";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex flex-col max-w-[85%] group", isAI ? "self-start" : "self-end items-end")}
    >
      <div className="flex gap-2 items-start">
        {isAI && <MascotAvatar size="sm" />}
        <div className="flex flex-col">
          <div
            className={cn(
              "px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm transition-colors",
              isAI
                ? "bg-[#eef1f6] dark:bg-zinc-800 text-slate-800 dark:text-slate-100 rounded-tl-sm"
                : "bg-[#f9c349] text-zinc-950 rounded-tr-sm font-semibold",
            )}
          >
            {isAI ? (
              <RenderBotText text={msg.text} onNavigate={onNavigate} />
            ) : (
              <span className="whitespace-pre-wrap">{msg.text}</span>
            )}
          </div>
          <span
            className={cn(
              "text-[9px] text-slate-400 dark:text-zinc-500 mt-1 select-none",
              isAI ? "text-left" : "text-right",
            )}
          >
            Today
          </span>
        </div>
      </div>

      {/* Bot Message Toolbar */}
      {isAI && (
        <div className="flex items-center gap-2 mt-1 ml-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            title="Copy response"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 self-start max-w-[85%]"
    >
      <MascotAvatar size="sm" />
      <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-[#eef1f6] dark:bg-zinc-800 flex items-center gap-1.5 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400"
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Chat Panel ──────────────────────────────────────────────────────────
function ChatPanel({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [messages, setMessages] = useState<Message[]>([{ id: "init", sender: "ai", text: "" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync greeting to current route
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "init") {
        return [{ id: "init", sender: "ai", text: getRouteGreeting(pathname) }];
      }
      return prev;
    });
  }, [pathname]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleNavigate = (path: string) => {
    const [route, hash] = path.split("#");
    void navigate({ to: route || "/" });
    if (hash) {
      setTimeout(() => {
        const el = window.document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
    if (window.innerWidth < 640) {
      onClose();
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: `u-${Date.now()}`, sender: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await callGemini(
        messages.filter((m) => m.id !== "init"),
        text.trim(),
      );
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, sender: "ai", text: response }]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      console.warn("Gemini API unavailable, using knowledge base fallback:", errMsg);

      const fallback = getFallbackResponse(text.trim());
      if (fallback) {
        setMessages((prev) => [...prev, { id: `a-${Date.now()}`, sender: "ai", text: fallback }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            sender: "ai",
            text: `I'm having trouble connecting to my AI engine right now. Here is what I can help you with:\n\n• 🧬 [Dark Genome Research](/research#platform)\n• 💊 [Drug Discovery & Services](/services)\n• 🔬 [Research Results & Proof](/research#results)\n• 📄 [Publications](/research#paper)\n• 🎓 [Education Programs](/education)\n• 💼 [Careers](/careers)\n• 📬 [Contact Us](/contact)\n\nOr email us directly: contact@qcodon.com`,
          },
        ]);
      }
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "init",
        sender: "ai",
        text: `👋 Hi! I am **QCodon**, your AI-native copilot for Quantum Codon. Let me help you navigate this space.\n\n${getRouteGreeting(pathname)}`,
      },
    ]);
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-white dark:bg-zinc-900 overflow-hidden text-slate-800 dark:text-zinc-100">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-700 to-indigo-800 text-white shadow-md select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MascotAvatar size="md" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-indigo-800 animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">QCodon</span>
            <span className="text-[10px] text-white/70 mt-1">Ask me anything about QCodon</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 scrollbar-none relative z-10 bg-slate-50 dark:bg-zinc-900"
      >
        <div className="flex justify-center my-1 select-none">
          <span className="bg-slate-200/60 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-[10px] font-semibold px-3 py-0.5 rounded-full font-mono">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} onNavigate={handleNavigate} />
        ))}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col gap-2 select-none shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex-1 flex items-center gap-2 bg-[#f0f2f5] dark:bg-zinc-800 border border-transparent focus-within:border-slate-300 dark:focus-within:border-zinc-700 focus-within:bg-white dark:focus-within:bg-zinc-900 rounded-full px-4 py-2 transition-all">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent text-xs text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none leading-relaxed"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  void sendMessage(input);
                }
              }}
              disabled={isTyping}
            />
            {input.trim() && !isTyping && (
              <button
                onClick={() => void sendMessage(input)}
                className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-[9px] text-slate-400 dark:text-zinc-500 font-mono tracking-widest mt-0.5 select-none">
          Powered by{" "}
          <span className="font-semibold text-slate-500 dark:text-zinc-400">QCodon AI</span>
        </div>
      </div>
    </div>
  );
}

// ─── Root Export: Floating Launcher Widget ────────────────────────────────────
export default function QcChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Global keyboard shortcut: Ctrl + /
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="copilot-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-[1px] z-[9998] sm:hidden block pointer-events-auto"
            />
            <motion.div
              key="copilot-panel"
              initial={{ opacity: 0, scale: 0.3, y: 150, x: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 150, x: 100 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={cn(
                "fixed z-[9999] flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden",
                "w-full h-full inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[340px] sm:h-[620px] sm:rounded-2xl pointer-events-auto",
              )}
              style={{ transformOrigin: "bottom right" }}
            >
              <ChatPanel onClose={handleClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="copilot-launcher"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9997]"
          >
            <motion.button
              onClick={handleOpen}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-[1.06] transition-all cursor-pointer border border-white/10 select-none relative"
              whileTap={{ scale: 0.94 }}
            >
              <Dna className="w-7 h-7 text-white animate-[pulse_2.5s_infinite]" strokeWidth={2.2} />
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-zinc-950 animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
