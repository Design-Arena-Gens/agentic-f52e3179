"use client";

import { useMemo, useState } from "react";
import type { CyberQuestion } from "../data/questions";
import { FilterBar, type FilterState } from "./FilterBar";
import { QuestionCard } from "./QuestionCard";

interface QuestionExplorerProps {
  questions: CyberQuestion[];
}

const defaultFilter: FilterState = {
  search: "",
  category: "All",
  difficulty: "All",
  type: "All"
};

export function QuestionExplorer({ questions }: QuestionExplorerProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilter);

  const filteredQuestions = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesCategory = filters.category === "All" || question.category === filters.category;
      const matchesDifficulty = filters.difficulty === "All" || question.difficulty === filters.difficulty;
      const matchesType = filters.type === "All" || question.type === filters.type;

      const inText =
        query.length === 0 ||
        [
          question.prompt,
          question.framing,
          question.followUps.join(" "),
          question.skills.join(" "),
          question.answerNotes
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesDifficulty && matchesType && inText;
    });
  }, [filters, questions]);

  return (
    <div className="space-y-8">
      <FilterBar value={filters} onChange={setFilters} questions={questions} />

      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>
          Showing <strong>{filteredQuestions.length}</strong> of {questions.length} interview prompts
        </span>
        <button
          onClick={() => setFilters(defaultFilter)}
          className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-blue-500 hover:text-blue-200"
        >
          Reset filters
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredQuestions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <p className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">
          No questions match your filters yet. Try clearing search terms or switching categories.
        </p>
      )}
    </div>
  );
}
