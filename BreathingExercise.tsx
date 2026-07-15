import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Wind,
  Play,
  Pause,
  ArrowLeft,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BreathingExerciseProps {
  onClose: () => void;
  voiceName?: string;
}

type BreathingPhase = "inhale" | "hold" | "exhale" | "hold2";

const PHASE_LENGTH = 4;

const PHASES: BreathingPhase[] = [
  "inhale",
  "hold",
  "exhale",
  "hold2",
];

export function BreathingExercise({
  onClose,
  voiceName,
}: BreathingExerciseProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>("inhale");
  const [timeLeft, setTimeLeft] = useState(PHASE_LENGTH);
  const [cycles, setCycles] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const countdownTimer = useRef<NodeJS.Timeout | null>(null);
  const phaseTimer = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }

    if (phaseTimer.current) {
      clearTimeout(phaseTimer.current);
      phaseTimer.current = null;
    }
  };

  const resetCountdown = () => {
    setTimeLeft(PHASE_LENGTH);

    countdownTimer.current = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          return PHASE_LENGTH;
        }

        return previous - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!isRunning) {
      clearTimers();
      return;
    }

    resetCountdown();

    phaseTimer.current = setTimeout(() => {
      const currentIndex = PHASES.indexOf(phase);
      const nextPhase = PHASES[(currentIndex + 1) % PHASES.length];

      if (nextPhase === "inhale") {
        setCycles((previous) => previous + 1);
      }

      setPhase(nextPhase);
    }, PHASE_LENGTH * 1000);

    return () => {
      clearTimers();
    };
  }, [phase, isRunning]);

  useEffect(() => {
    return () => {
      clearTimers();

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const previousPhase = useRef<BreathingPhase | null>(null);

  const phaseLabel = (current: BreathingPhase) => {
    switch (current) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "hold2":
        return "Hold";
    }
  };

  const phaseInstruction = (current: BreathingPhase) => {
    switch (current) {
      case "inhale":
        return "Inhale slowly through your nose.";
      case "hold":
        return "Hold your breath comfortably.";
      case "exhale":
        return "Slowly breathe out through your mouth.";
      case "hold2":
        return "Pause before your next breath.";
    }
  };

  const phaseColour = (current: BreathingPhase) => {
    switch (current) {
      case "inhale":
        return "bg-terracotta";
      case "hold":
      case "hold2":
        return "bg-terracotta-dark";
      case "exhale":
        return "bg-sage";
    }
  };

  const speechText = (current: BreathingPhase) => {
    switch (current) {
      case "inhale":
        return "Breathe in slowly";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe out slowly";
      case "hold2":
        return "Hold";
    }
  };

  const speak = (current: BreathingPhase) => {
    if (isMuted) return;

    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      speechText(current)
    );

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 0.9;

    if (voiceName) {
      const voices = window.speechSynthesis.getVoices();

      const chosen = voices.find(
        (voice) => voice.name === voiceName
      );

      if (chosen) {
        utterance.voice = chosen;
      }
    }

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (previousPhase.current !== phase) {
      speak(phase);
      previousPhase.current = phase;
    }
  }, [phase, isRunning]);

  const toggleExercise = () => {
    if (isRunning) {
      clearTimers();

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      previousPhase.current = null;
      setIsRunning(false);
      return;
    }

    previousPhase.current = null;
    setPhase("inhale");
    setTimeLeft(PHASE_LENGTH);
    setIsRunning(true);
  };

  const toggleMute = () => {
    if (!isMuted && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsMuted((previous) => !previous);
  };


  // Returns the text shown inside the breathing circle
const getPhaseTitle = (current: BreathingPhase): string => {
  switch (current) {
    case "inhale":
      return "Breathe In"

    case "hold":
      return "Hold"

    case "exhale":
      return "Breathe Out"

    case "hold2":
      return "Hold"

    default:
      return ""
  }
}

// Returns the instruction displayed below the breathing circle
const getPhaseInstruction = (current: BreathingPhase): string => {
  switch (current) {
    case "inhale":
      return "Take a slow, deep breath through your nose."

    case "hold":
      return "Hold your breath gently without straining."

    case "exhale":
      return "Slowly breathe out through your mouth."

    case "hold2":
      return "Pause briefly before starting your next breath."

    default:
      return ""
  }
}

// Background colour for each breathing phase
const getPhaseColor = (current: BreathingPhase): string => {
  switch (current) {
    case "inhale":
      return "bg-terracotta"

    case "hold":
    case "hold2":
      return "bg-terracotta-dark"

    case "exhale":
      return "bg-sage"

    default:
      return "bg-terracotta"
  }
}

// Animation scale for the breathing circle
const getCircleScale = (current: BreathingPhase): number => {
  switch (current) {
    case "inhale":
      return 1.3

    case "hold":
    case "hold2":
      return 1.15

    case "exhale":
      return 1

    default:
      return 1
  }
}

// Voice prompt spoken during each phase
const getSpeechPrompt = (current: BreathingPhase): string => {
  switch (current) {
    case "inhale":
      return "Breathe in slowly"

    case "hold":
      return "Hold"

    case "exhale":
      return "Breathe out slowly"

    case "hold2":
      return "Hold"

    default:
      return ""
  }
}
