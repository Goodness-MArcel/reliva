"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: "Identity" | "Academics" | "Finances" | "Application";
  completed: boolean;
  isCustom?: boolean;
}

interface PathwayChecklist {
  id: string;
  country: string;
  visaName: string;
  slug: string;
  officialUrl: string;
  items: ChecklistItem[];
}

const INITIAL_PATHWAYS: PathwayChecklist[] = [
  {
    id: "canada-study",
    country: "Canada",
    visaName: "Study Permit",
    slug: "/canada/study-permit",
    officialUrl:
      "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    items: [
      {
        id: "ca-1",
        title: "Get a valid international passport",
        description:
          "Ensure your passport is valid for the duration of your intended stay in Canada.",
        category: "Identity",
        completed: true,
      },
      {
        id: "ca-2",
        title: "Write IELTS or approved English test",
        description:
          "Take your language proficiency exam and achieve your institution's required band score.",
        category: "Academics",
        completed: true,
      },
      {
        id: "ca-3",
        title: "Gather academic transcripts & certificates",
        description:
          "Request official transcripts and degree/WAEC certificates from your previous schools.",
        category: "Academics",
        completed: false,
      },
      {
        id: "ca-4",
        title: "Secure Letter of Acceptance (LOA) from a DLI",
        description:
          "Apply to and receive an official acceptance letter from a Designated Learning Institution.",
        category: "Academics",
        completed: false,
      },
      {
        id: "ca-5",
        title: "Obtain Provincial Attestation Letter (PAL)",
        description:
          "Request your PAL through your Canadian school after paying your tuition deposit.",
        category: "Application",
        completed: false,
      },
      {
        id: "ca-6",
        title: "Prepare proof of financial support",
        description:
          "Gather 4–6 months of bank statements, sponsor letters, or GIC certificate showing tuition + living funds.",
        category: "Finances",
        completed: false,
      },
      {
        id: "ca-7",
        title: "Submit online study permit application ($150 CAD)",
        description:
          "Create your IRCC portal account, upload your documents, and pay the government filing fee.",
        category: "Application",
        completed: false,
      },
      {
        id: "ca-8",
        title: "Book biometrics appointment & medical exam",
        description:
          "Schedule your fingerprint/photo capture at VFS Global and complete an upfront medical exam.",
        category: "Identity",
        completed: false,
      },
    ],
  },
  {
    id: "uk-visitor",
    country: "United Kingdom",
    visaName: "Standard Visitor Visa",
    slug: "/canada",
    officialUrl: "https://www.gov.uk/standard-visitor",
    items: [
      {
        id: "uk-1",
        title: "Check passport validity (at least 1 blank page)",
        description: "Passport must be valid for the entire duration of your stay in the UK.",
        category: "Identity",
        completed: true,
      },
      {
        id: "uk-2",
        title: "Gather 6 months of bank statements & payslips",
        description: "Show steady income and enough funds to cover flights, accommodation, and daily costs.",
        category: "Finances",
        completed: false,
      },
      {
        id: "uk-3",
        title: "Obtain employer leave approval letter",
        description: "Official letter on company letterhead confirming your job role, salary, and approved vacation dates.",
        category: "Application",
        completed: false,
      },
      {
        id: "uk-4",
        title: "Complete online UK.GOV application & pay £115 fee",
        description: "Fill out the Standard Visitor form online and pay the visa application charge.",
        category: "Application",
        completed: false,
      },
      {
        id: "uk-5",
        title: "Book biometrics at TLScontact",
        description: "Attend your appointment with your appointment confirmation and passport.",
        category: "Identity",
        completed: false,
      },
    ],
  },
];

const CATEGORY_COLORS: Record<ChecklistItem["category"], string> = {
  Identity: "bg-ivory text-navy border-navy/15",
  Academics: "bg-gold/15 text-gold border-gold/30",
  Finances: "bg-confirm/10 text-confirm border-confirm/30",
  Application: "bg-navy/5 text-charcoal border-navy/15",
};

export default function VisaChecklistPage() {
  const [pathways, setPathways] = useState<PathwayChecklist[]>(INITIAL_PATHWAYS);
  const [activeId, setActiveId] = useState<string>(INITIAL_PATHWAYS[0].id);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const currentPathway =
    pathways.find((p) => p.id === activeId) || pathways[0];

  const totalCount = currentPathway.items.length;
  const completedCount = currentPathway.items.filter((i) => i.completed).length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Toggle a task's completion status
  const toggleTask = (itemId: string) => {
    setPathways((prev) =>
      prev.map((pathway) =>
        pathway.id === activeId
          ? {
              ...pathway,
              items: pathway.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : pathway
      )
    );
  };

  // Add a custom task to the current checklist
  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: "Personal reminder added to your checklist.",
      category: "Application",
      completed: false,
      isCustom: true,
    };

    setPathways((prev) =>
      prev.map((pathway) =>
        pathway.id === activeId
          ? { ...pathway, items: [...pathway.items, newItem] }
          : pathway
      )
    );
    setNewTaskTitle("");
  };

  // Delete a custom task
  const handleDeleteTask = (itemId: string) => {
    setPathways((prev) =>
      prev.map((pathway) =>
        pathway.id === activeId
          ? {
              ...pathway,
              items: pathway.items.filter((item) => item.id !== itemId),
            }
          : pathway
      )
    );
  };

  // Reset all tasks in the current pathway
  const handleResetProgress = () => {
    setPathways((prev) =>
      prev.map((pathway) =>
        pathway.id === activeId
          ? {
              ...pathway,
              items: pathway.items.map((item) => ({
                ...item,
                completed: false,
              })),
            }
          : pathway
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-charcoal">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-gold/30 text-xs font-semibold text-navy mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-gold" />
            <span>Actionable Visa Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
            Visa Checklist
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Work through your required documents and application milestones step by step.
          </p>
        </div>

        {/* Pathway Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {pathways.map((pathway) => {
            const isSelected = pathway.id === activeId;
            return (
              <button
                key={pathway.id}
                type="button"
                onClick={() => setActiveId(pathway.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white text-charcoal/70 hover:text-navy border border-navy/15"
                }`}
              >
                {pathway.country} • {pathway.visaName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Overview Card */}
      <div className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(11,37,69,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-navy">
              {currentPathway.country} {currentPathway.visaName}
            </h2>
            <p className="text-xs text-charcoal/70 mt-0.5">
              {completedCount} of {totalCount} steps completed
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={currentPathway.slug}
              className="text-xs font-semibold text-navy hover:text-gold transition-colors"
            >
              View visa guide →
            </Link>
            <button
              type="button"
              onClick={handleResetProgress}
              title="Reset checklist progress"
              className="inline-flex items-center gap-1 text-xs font-medium text-charcoal/50 hover:text-navy px-3 py-1.5 rounded-full bg-ivory border border-navy/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-ivory rounded-full overflow-hidden border border-navy/10">
          <div
            className="h-full bg-confirm transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2.5 text-xs">
          <span className="font-semibold text-confirm">
            {progressPercent}% Ready
          </span>
          {progressPercent === 100 && (
            <span className="inline-flex items-center gap-1 font-semibold text-gold">
              <Sparkles className="w-3.5 h-3.5" />
              All requirements gathered!
            </span>
          )}
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        {currentPathway.items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleTask(item.id)}
            className={`group flex items-start justify-between gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
              item.completed
                ? "bg-ivory/60 border-navy/10 opacity-75"
                : "bg-white border-navy/15 hover:border-gold shadow-[0_2px_10px_rgba(11,37,69,0.02)]"
            }`}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <button
                type="button"
                aria-label={
                  item.completed ? "Mark as incomplete" : "Mark as complete"
                }
                className="mt-0.5 shrink-0 text-navy cursor-pointer"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-confirm" />
                ) : (
                  <Circle className="w-5 h-5 text-charcoal/30 group-hover:text-gold transition-colors" />
                )}
              </button>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={`text-sm font-semibold leading-snug transition-colors ${
                      item.completed
                        ? "line-through text-charcoal/50"
                        : "text-navy"
                    }`}
                  >
                    {item.title}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      CATEGORY_COLORS[item.category]
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {item.isCustom && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(item.id);
                }}
                title="Remove custom task"
                className="p-1.5 rounded-full text-charcoal/40 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Custom Personal Task Form */}
      <form
        onSubmit={handleAddCustomTask}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white border border-navy/15 rounded-2xl p-4 shadow-[0_2px_10px_rgba(11,37,69,0.02)]"
      >
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a personal step (e.g., Translate birth certificate, Renew yellow fever card)..."
          className="flex-1 bg-ivory/60 border border-navy/10 rounded-full px-4 py-2.5 text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 bg-navy hover:bg-navy/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add task</span>
        </button>
      </form>

      {/* Official Portal Footer Banner */}
      <div className="bg-navy text-white rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            Finished gathering your documents?
          </h3>
          <p className="text-xs text-white/70 mt-1">
            Submit your application directly on the official {currentPathway.country} government portal.
          </p>
        </div>
        <a
          href={currentPathway.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-semibold text-xs py-3 px-5 rounded-full transition-colors shrink-0"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}