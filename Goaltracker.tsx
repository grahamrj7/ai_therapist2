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

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadGoals, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllGoals() {
      setLoading(true)
      const data = await loadGoals(userId)
      setGoals(data)
      setLoading(false)
    }
    loadAllGoals()
  }, [userId])

  if (loading) {
    return <div className="absolute inset-0 bg-white z-10 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-terracotta" /></div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2"><Target className="h-5 w-5 text-terracotta" /><h2 className="font-semibold text-lg">Goals</h2></div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>
      <div className="p-4 sm:p-6 text-sm text-text-muted">{goals.length} goals</div>
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadGoals, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllGoals() {
      setLoading(true)
      const data = await loadGoals(userId)
      setGoals(data)
      setLoading(false)
    }
    loadAllGoals()
  }, [userId])

  if (loading) {
    return <div className="absolute inset-0 bg-white z-10 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-terracotta" /></div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2"><Target className="h-5 w-5 text-terracotta" /><h2 className="font-semibold text-lg">Goals</h2></div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <Target className="h-8 w-8 text-text-muted mx-auto mb-4" />
            <h3 className="font-medium text-text-primary mb-2">No goals yet</h3>
            <p className="text-sm text-text-muted">Set a goal to track your progress over time</p>
          </div>
        ) : (
          <div className="space-y-3 max-w-lg mx-auto">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 rounded-xl border border-linen">{goal.title}</div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadGoals, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    async function loadAllGoals() {
      setLoading(true)
      const data = await loadGoals(userId)
      setGoals(data)
      setLoading(false)
    }
    loadAllGoals()
  }, [userId])

  if (loading) {
    return <div className="absolute inset-0 bg-white z-10 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-terracotta" /></div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2"><Target className="h-5 w-5 text-terracotta" /><h2 className="font-semibold text-lg">Goals</h2></div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <Target className="h-8 w-8 text-text-muted mx-auto mb-4" />
            <h3 className="font-medium text-text-primary mb-2">No goals yet</h3>
            <p className="text-sm text-text-muted">Set a goal to track your progress over time</p>
          </div>
        ) : (
          <div className="space-y-3 max-w-lg mx-auto">
            {goals.map((goal) => (
              <button key={goal.id} onClick={() => { setSelectedGoal(goal); setIsEditing(true) }} className="w-full text-left p-4 rounded-xl border border-linen">{goal.title}</button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"

