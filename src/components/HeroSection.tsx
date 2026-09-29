"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download, MessageSquareText, MoveRight } from "lucide-react";
import Link from "next/link";
import { personalInfo, stats } from "@/data/portfolio";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? value : 0);
  const frame = useRef<number | null>(null);
  useEffect(() => {
    if (reduce) return;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1600, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [reduce, value]);
  return <>{count}{suffix}</>;
}

const nodes = [
  { label: "AGENTS", pos: "left-[6%] top-[18%]", delay: 0 },
  { label: "MCP", pos: "right-[5%] top-[15%]", delay: 0.5 },
  { label: "RAG", pos: "left-[1%] bottom-[20%]", delay: 1 },
  { label: "APIs", pos: "right-[1%] bottom-[22%]", delay: 1.5 },
];

export default function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden border-b border-border/70 pt-28 sm:pt-32">
      <div className="absolute inset-0 signal-grid opacity-70" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="container-narrow relative z-10 grid min-h-[calc(100svh-8rem)] items-center gap-14 pb-16 lg:grid-cols-[1.12fr_.88fr]">
        <div>
          <motion.div initial={reduce ? false : { y: 14 }} animate={{ y: 0 }} className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>
            Available for high-ownership AI roles
          </motion.div>

          <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="mb-3 font-mono text-sm text-primary">01 / APPLIED INTELLIGENCE</motion.p>
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .14 }} className="max-w-4xl text-[clamp(3.35rem,8.8vw,8.5rem)] font-black uppercase leading-[.82] tracking-[-.075em]">
            Yash<br /><span className="text-outline">Srivastava</span>
          </motion.h1>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }} className="mt-8 grid max-w-2xl gap-6 border-l-2 border-primary pl-5 sm:grid-cols-[auto_1fr] sm:items-start">
            <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">{personalInfo.role}</p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{personalInfo.tagline}</p>
          </motion.div>

          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="group inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 font-mono text-xs font-bold uppercase tracking-[.14em] text-primary-foreground transition-transform hover:-translate-y-1">
              Explore the systems <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a href={personalInfo.resumeUrl} download className="inline-flex items-center justify-center gap-3 border border-border bg-background/60 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[.14em] hover:border-primary/70">
              <Download className="h-4 w-4 text-primary" /> Resume
            </a>
            <a href="#ai-twin" className="inline-flex items-center justify-center gap-3 px-5 py-4 font-mono text-xs font-bold uppercase tracking-[.14em] text-muted-foreground hover:text-foreground">
              <MessageSquareText className="h-4 w-4 text-accent" /> Ask my AI twin
            </a>
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .8 }} className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-[8%] rounded-full border border-dashed border-primary/25 motion-safe:animate-[spin_28s_linear_infinite]" />
          <div className="absolute inset-[20%] rounded-full border border-accent/30 motion-safe:animate-[spin_18s_linear_infinite_reverse]" />
          <div className="absolute inset-[32%] rounded-full border border-primary/40" />
          <div className="absolute inset-[39%] grid place-items-center bg-foreground text-background shadow-[0_0_80px_hsl(var(--primary)/.22)]">
            <div className="text-center"><span className="block font-mono text-[10px] tracking-[.22em] opacity-60">SYSTEM</span><strong className="text-3xl tracking-[-.08em]">YS/AI</strong><span className="mt-1 block font-mono text-[9px] text-primary">ONLINE</span></div>
          </div>
          {nodes.map((node) => <motion.div key={node.label} className={`absolute ${node.pos} border border-border bg-background/90 px-3 py-2 font-mono text-[10px] font-bold tracking-[.2em] shadow-xl`} animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: node.delay }}><span className="mr-2 text-primary">●</span>{node.label}</motion.div>)}
          <div className="absolute inset-x-[14%] top-1/2 h-px bg-gradient-to-r from-primary/0 via-primary/45 to-primary/0" />
          <div className="absolute inset-y-[14%] left-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/45 to-accent/0" />
        </motion.div>

        <div className="grid border-y border-border/70 sm:grid-cols-4 lg:col-span-2">
          {stats.map((stat, index) => (
            <Link key={stat.label} href={stat.href} className="group relative flex items-end justify-between border-b border-border/70 px-4 py-5 last:border-b-0 hover:bg-primary/[.045] sm:border-b-0 sm:border-r sm:last:border-r-0">
              <span><span className="block text-3xl font-black tracking-[-.05em]"><Counter value={stat.value} suffix={stat.suffix} /></span><span className="mt-1 block max-w-[8rem] font-mono text-[9px] uppercase tracking-[.15em] text-muted-foreground">{stat.label}</span></span>
              <MoveRight className="h-4 w-4 text-border transition-colors group-hover:text-primary" />
              <span className="absolute right-2 top-2 font-mono text-[9px] text-muted-foreground/50">0{index + 1}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
