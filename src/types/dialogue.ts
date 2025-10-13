export type DialogueChoice = {
  label: "positiv" | "negativ" | "nachfragen" | "vorschlag";
  learner: string;
  partner: string;
};

export type DialogueStep = {
  step: number;
  examinerPrompt: string;
  choices: Record<
    "positive" | "negative" | "question" | "suggestion",
    DialogueChoice
  >;
};

export type Scenario = {
  id: string;
  number: number;
  title: string;
  theme: string;
  leitpunkte: string[];
  greeting: string;
  closing: string;
  steps: DialogueStep[];
};

export type Catalog = {
  meta: {
    version: string;
    level: string;
    tags: string[];
  };
  scenarios: Scenario[];
};
