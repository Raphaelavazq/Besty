import { useEffect, useMemo, useState } from "react";
import type { Catalog, Scenario } from "../../types/dialogue";

export function useChatEngine(initialId?: string) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    fetch("/data/sprechen/dialogues-catalog.json")
      .then((r) => r.json())
      .then((c: Catalog) => {
        setCatalog(c);
        let s =
          (initialId &&
            c.scenarios.find((x: Scenario) => x.id === initialId)) ??
          c.scenarios[0];
        if (!s || typeof s !== "object" || !("greeting" in s)) return;
        setScenario(s);
        setMessages([s.greeting]);
        setStepIndex(0);
      });
  }, [initialId]);

  const choose = (
    kind: "positive" | "negative" | "question" | "suggestion"
  ) => {
    if (!scenario) return;
    const step = scenario.steps[stepIndex];
    if (!step) return;
    const ch = step.choices[kind];
    const next = [...messages, ch.learner, ch.partner];
    const isLast = stepIndex >= scenario.steps.length - 1;
    if (isLast) {
      next.push(scenario.closing);
    }
    setMessages(next);
    setStepIndex((prev) => Math.min(prev + 1, scenario.steps.length - 1));
  };

  const reset = (id?: string) => {
    if (!catalog) return;
    let s =
      (id && catalog.scenarios.find((x: Scenario) => x.id === id)) ??
      scenario ??
      catalog.scenarios[0];
    if (!s || typeof s !== "object" || !("greeting" in s)) return;
    setScenario(s);
    setMessages([s.greeting]);
    setStepIndex(0);
  };

  const setScenarioById = (id: string) => reset(id);

  const themes = useMemo(() => {
    if (!catalog) return {};
    return catalog.scenarios.reduce(
      (acc: Record<string, Scenario[]>, s: Scenario) => {
        (acc[s.theme] ??= []).push(s);
        return acc;
      },
      {}
    );
  }, [catalog]);

  return {
    catalog,
    scenario,
    messages,
    stepIndex,
    choose,
    reset,
    setScenarioById,
    themes,
  };
}
