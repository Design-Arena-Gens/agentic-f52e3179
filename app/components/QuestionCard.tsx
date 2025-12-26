"use client";

import { useState } from "react";
import { Pill } from "./FilterBar";
import type { CyberQuestion } from "../data/questions";

interface QuestionCardProps {
  question: CyberQuestion;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-400">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="hidden text-slate-400 md:inline">●</span>
          <span>{question.category}</span>
        </div>
        <div className="flex gap-2">
          <Pill className="border-blue-500/40 text-blue-300">{question.difficulty}</Pill>
          <Pill className="border-emerald-500/30 text-emerald-200">{question.type}</Pill>
        </div>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-slate-100">{question.prompt}</h3>
      <p className="mt-3 text-sm text-slate-300">{question.framing}</p>

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:text-blue-200"
      >
        {expanded ? "Hide interviewer guide" : "Show interviewer guide"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <section>
            <h4 className="text-sm font-semibold text-slate-200">Follow-up probes</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              {question.followUps.map((followUp) => (
                <li key={followUp} className="flex gap-2">
                  <span className="text-blue-500">▹</span>
                  <span>{followUp}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-200">Signals you assess</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {question.skills.map((skill) => (
                <Pill key={skill} className="border-violet-500/40 text-violet-200">
                  {skill}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-200">Answer guidance</h4>
            <p className="mt-2 text-sm text-slate-300">{question.answerNotes}</p>
          </section>
        </div>
      )}

      <div className="pointer-events-none absolute -top-32 -right-32 h-48 w-48 rounded-full bg-blue-700/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />
    </article>
  );
}
