"use client";

import clsx from "clsx";
import { useMemo } from "react";
import type { CyberQuestion, Difficulty, QuestionType } from "../data/questions";

export interface FilterState {
  search: string;
  category: CyberQuestion["category"] | "All";
  difficulty: Difficulty | "All";
  type: QuestionType | "All";
}

interface FilterBarProps {
  value: FilterState;
  onChange: (value: FilterState) => void;
  questions: CyberQuestion[];
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function FilterBar({ value, onChange, questions }: FilterBarProps) {
  const categories = useMemo(
    () => ["All", ...unique(questions.map((q) => q.category))] as FilterState["category"][],
    [questions]
  );

  const difficulties = useMemo(
    () => ["All", ...unique(questions.map((q) => q.difficulty))] as FilterState["difficulty"][],
    [questions]
  );

  const questionTypes = useMemo(
    () => ["All", ...unique(questions.map((q) => q.type))] as FilterState["type"][],
    [questions]
  );

  return (
    <section className="backdrop-blur-sm bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-lg text-slate-100">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-300">Search</span>
          <input
            type="text"
            value={value.search}
            onChange={(event) => onChange({ ...value, search: event.target.value })}
            placeholder="e.g. zero trust, ransomware"
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-300">Category</span>
          <select
            value={value.category}
            onChange={(event) => onChange({ ...value, category: event.target.value as FilterState["category"] })}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-300">Difficulty</span>
          <select
            value={value.difficulty}
            onChange={(event) => onChange({ ...value, difficulty: event.target.value as FilterState["difficulty"] })}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-300">Question Type</span>
          <select
            value={value.type}
            onChange={(event) => onChange({ ...value, type: event.target.value as FilterState["type"] })}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {questionTypes.map((questionType) => (
              <option key={questionType} value={questionType}>
                {questionType}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
        <span className="rounded-full border border-slate-700 px-3 py-1">
          {questions.length} curated prompts
        </span>
        <span className="rounded-full border border-slate-700 px-3 py-1">
          Updated for defensive & leadership tracks
        </span>
        <span className="rounded-full border border-slate-700 px-3 py-1">
          Use follow-ups to probe depth
        </span>
      </div>
    </section>
  );
}

export function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-300",
        className
      )}
    >
      {children}
    </span>
  );
}
