import { motion } from "framer-motion"
import { Target, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

export function GoalTracker({ onClose }: GoalTrackerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Goals</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5 text-text-secondary" />
        </Button>
      </div>
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"
