import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CloudRain,
  Waves,
  Wind,
  Trees,
  Flame,
  Droplets,
  Maximize2,
  Minimize2,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Howl } from "howler"

interface Sound {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgGradient: string
  particleType: "rain" | "ocean" | "wind" | "forest" | "fire" | "stream"
  url: string
}

const SOUNDS: Sound[] = [
  {
    id: "rain",
    name: "Rain",
    icon: <CloudRain className="h-6 w-6" />,
    color: "bg-blue-500",
    bgGradient: "from-slate-600 via-blue-800 to-slate-900",
    particleType: "rain",
    url: "https://orangefreesounds.com/wp-content/uploads/2022/07/Falling-rain-sound-effect.mp3",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    icon: <Waves className="h-6 w-6" />,
    color: "bg-teal-500",
    bgGradient: "from-teal-900 via-cyan-800 to-blue-900",
    particleType: "ocean",
    url: "https://orangefreesounds.com/wp-content/uploads/2025/07/Gentle-relaxing-ocean-waves-hitting-the-shore-sound-effect.mp3",
  },
  {
    id: "wind",
    name: "Wind",
    icon: <Wind className="h-6 w-6" />,
    color: "bg-slate-400",
    bgGradient: "from-gray-400 via-slate-500 to-gray-600",
    particleType: "wind",
    url: "https://orangefreesounds.com/wp-content/uploads/2014/11/Wind-blowing.mp3",
  },
  {
    id: "forest",
    name: "Forest",
    icon: <Trees className="h-6 w-6" />,
    color: "bg-green-600",
    bgGradient: "from-green-900 via-emerald-800 to-teal-900",
    particleType: "forest",
    url: "https://orangefreesounds.com/wp-content/uploads/2026/01/Relaxing-summer-forest-ambience.mp3",
  },
  {
    id: "fire",
    name: "Fireplace",
    icon: <Flame className="h-6 w-6" />,
    color: "bg-orange-500",
    bgGradient: "from-orange-900 via-red-800 to-rose-900",
    particleType: "fire",
    url: "https://orangefreesounds.com/wp-content/uploads/2025/04/Realistic-fireplace-sound-effect.mp3",
  },
  {
    id: "stream",
    name: "Stream",
    icon: <Droplets className="h-6 w-6" />,
    color: "bg-cyan-500",
    bgGradient: "from-cyan-900 via-blue-800 to-slate-900",
    particleType: "stream",
    url: "https://orangefreesounds.com/wp-content/uploads/2025/06/Fountain-sound-effect.mp3",
  },
]

interface ParticleCanvasProps {
  type: Sound["particleType"]
  isActive: boolean
}

function ParticleCanvas({ type, isActive }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
      opacity: number
    }>
  >([])

  const animationRef = useRef<number>()
