/**
 * useChatEngine Hook (Updated for new dialogue structure)
 * Manages dialogue flow for DTZ Sprechen Teil 3
 * Handles natural conversation progression with 4 choice types
 */

import { useEffect, useState } from "react";

export function useChatEngine(scenarioId) {
  const [catalog, setCatalog] = useState(null);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load catalog on mount
  useEffect(() => {
    setLoading(true);
    fetch("/data/sprechen/dialogues-catalog.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load catalogue");
        return res.json();
      })
      .then((data) => {
        setCatalog(data);

        // Find and set the current scenario
        const scenario = data.scenarios.find((s) => s.id === scenarioId);
        if (scenario) {
          setCurrentScenario(scenario);
          // Initialize with greeting
          if (scenario.dialogue && scenario.dialogue.greeting) {
            setMessageHistory([
              {
                role: "examiner",
                content: scenario.dialogue.greeting,
              },
            ]);
          }
        } else {
          setError("Scenario not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading dialogues:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [scenarioId]);

  // Get current choices based on step
  const currentChoices =
    currentScenario &&
    currentScenario.dialogue &&
    currentStep < currentScenario.dialogue.steps.length
      ? currentScenario.dialogue.steps[currentStep].choices
      : null;

  // Check if dialogue is complete
  const isComplete =
    currentScenario &&
    currentStep >= (currentScenario.dialogue?.steps?.length || 0);

  // Handle user choice
  const handleChoice = (choiceType) => {
    if (!currentScenario || !currentScenario.dialogue) return;

    const step = currentScenario.dialogue.steps[currentStep];
    if (!step) return;

    const userResponse = step.choices[choiceType];

    // Add examiner's question and user's response to history
    const newMessages = [
      ...messageHistory,
      {
        role: "examiner",
        content: step.text,
      },
      {
        role: "user",
        content: userResponse,
      },
    ];

    setMessageHistory(newMessages);

    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    // If complete, add closing message
    if (nextStep >= currentScenario.dialogue.steps.length) {
      setTimeout(() => {
        setMessageHistory((prev) => [
          ...prev,
          {
            role: "examiner",
            content: currentScenario.dialogue.closing,
          },
        ]);
      }, 500);
    }
  };

  // Restart dialogue
  const restart = () => {
    if (currentScenario && currentScenario.dialogue) {
      setMessageHistory([
        {
          role: "examiner",
          content: currentScenario.dialogue.greeting,
        },
      ]);
      setCurrentStep(0);
    }
  };

  return {
    catalog,
    currentScenario,
    messageHistory,
    currentChoices,
    isComplete,
    handleChoice,
    restart,
    loading,
    error,
  };
}
