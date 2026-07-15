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
