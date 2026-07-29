import { useState } from "react"
import { motion } from "framer-motion"
import { X, CloudRain, Waves, Wind, Trees, Flame, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    url: "https://orangefreesounds.com/wp-content/uploads/2022/07/Falling-rain-sound-effect.mp3"
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    icon: <Waves className="h-6 w-6" />,
    color: "bg-teal-500",
    bgGradient: "from-teal-900 via-cyan-800 to-blue-900",
    particleType: "ocean",
    url: "https://orangefreesounds.com/wp-content/uploads/2025/07/Gentle-relaxing-ocean-waves-hitting-the-shore-sound-effect.mp3"
  },
  {
    id: "wind",
    name: "Wind",
    icon: <Wind className="h-6 w-6" />,
    color: "bg-slate-400",
    bgGradient: "from-gray-400 via-slate-500 to-gray-600",
    particleType: "wind",
    url: "https://orangefreesounds.com/wp-content/uploads/2014/11/Wind-blowing.mp3"
  },
  {
    id: "forest",
    name: "Forest",
    icon: <Trees className="h-6 w-6" />,
    color: "bg-green-600",
    bgGradient: "from-green-900 via-emerald-800 to-teal-900",
    particleType: "forest",
    url: "https://orangefreesounds.com/wp-content/uploads/2026/01/Relaxing-summer-forest-ambience.mp3"
  },
  {
    id: "fire",
    name: "Fireplace",
    icon: <Flame className="h-6 w-6" />,
    color: "bg-orange-500",
    bgGradient: "from-orange-900 via-red-800 to-rose-900",
    particleType: "fire",
    url: "https://orangefreesounds.com/wp-content/uploads/2025/04/Realistic-fireplace-sound-effect.mp3"
  },
  {
    id: "stream",
    name: "Stream",
    icon: <Droplets className="h-6 w-6" />,
    color: "bg-cyan-500",
    bgGradient: "from-cyan-900 via-blue-800 to-slate-900",
    particleType: "stream",
    url: "https://orangefreesounds.com/wp-content/uploads/2025/06/Fountain-sound-effect.mp3"
  },
]

interface SoundTherapyProps {
  onClose: () => void
}

export function SoundTherapy({ onClose }: SoundTherapyProps) {
  const [activeSound, setActiveSound] = useState<Sound | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-linen">
          <div>
            <h2 className="font-display text-2xl text-text-primary">Sound Therapy</h2>
            <p className="text-sm text-text-muted mt-1">Select an ambient sound to help you relax</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {SOUNDS.map((sound) => (
              <motion.button
                key={sound.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSound(sound)}
                className={cn(
                  "flex flex-col items-center gap-2 p-5 rounded-2xl transition-all duration-300",
                  activeSound?.id === sound.id
                    ? `${sound.color} text-white shadow-lg`
                    : "bg-cream text-text-secondary hover:bg-linen"
                )}
              >
                <div className={cn(
                  "p-3 rounded-full",
                  activeSound?.id === sound.id ? "bg-white/20" : "bg-white shadow-sm"
                )}>
                  {sound.icon}
                </div>
                <span className="text-sm font-medium">{sound.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export { SOUNDS }
