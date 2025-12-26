import { QuestionExplorer } from "./components/QuestionExplorer";
import { questions } from "./data/questions";

const heroHighlights = [
  {
    title: "Role-ready", 
    subtitle: "Scenario, concept, and behavioral prompts tuned for practitioners"
  },
  {
    title: "Multi-level",
    subtitle: "Entry to senior depth checks with interviewer guidance"
  },
  {
    title: "Follow-up probes",
    subtitle: "Use curated follow-ups to test judgment and experience"
  }
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 md:px-8">
      <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-blue-900/40 p-10">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-600/40 bg-blue-900/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
            Cybersecurity Interview Prep
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
            Lead confident interviews with curated cybersecurity question banks
          </h1>
          <p className="text-base text-slate-200 md:text-lg">
            Explore scenario-driven prompts, targeted follow-ups, and interviewer guidance spanning network security, AppSec, cloud, incident response, threat intel, and risk leadership roles.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-6 text-sm text-slate-200 md:grid-cols-3">
          {heroHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-lg font-semibold text-blue-200">{highlight.title}</h3>
              <p className="mt-2 text-slate-300">{highlight.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute -top-24 -left-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-6 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />
      </header>

      <QuestionExplorer questions={questions} />

      <footer className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 text-center text-xs text-slate-500">
        Built for cybersecurity interviewers and candidates. Adapt prompts to your organization, pair with tabletop drills, and iterate after every debrief.
      </footer>
    </main>
  );
}
