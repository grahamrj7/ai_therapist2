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
import { motion, AnimatePresence } from "framer-motion"
import { Target, Plus, X, Trash2, Save, Loader2, ChevronLeft, Check, CalendarClock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { loadGoals, saveGoal, deleteGoal, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

function formatTargetDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toDateInputValue(timestamp: number | null): string {
  if (!timestamp) return ""
  return new Date(timestamp).toISOString().split("T")[0]
}

function fromDateInputValue(value: string): number | null {
  if (!value) return null
  return new Date(value + "T00:00:00").getTime()
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTargetDate, setEditTargetDate] = useState("")
  const [editProgress, setEditProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadAllGoals()
  }, [userId])

  async function loadAllGoals() {
    setLoading(true)
    const data = await loadGoals(userId)
    setGoals(data)
    setLoading(false)
  }

  const activeGoals = goals.filter((g) => !g.completed_at)
  const completedGoals = goals.filter((g) => g.completed_at)

  async function handleSave() {
    if (!editTitle.trim()) return

    setSaving(true)
    const wasComplete = !!selectedGoal?.completed_at
    const isNowComplete = editProgress >= 100
    const saved = await saveGoal(userId, {
      id: selectedGoal?.id,
      title: editTitle.trim(),
      description: editDescription.trim() || null,
      targetDate: fromDateInputValue(editTargetDate),
      progress: editProgress,
      completedAt: isNowComplete ? (wasComplete ? selectedGoal!.completed_at : Date.now()) : null,
    })

    if (saved) {
      await loadAllGoals()
      setIsEditing(false)
      setSelectedGoal(null)
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!selectedGoal) return

    setDeleting(true)
    const deleted = await deleteGoal(selectedGoal.id)

    if (deleted) {
      await loadAllGoals()
      setSelectedGoal(null)
      setIsEditing(false)
    }
    setDeleting(false)
  }

  async function handleQuickToggleComplete(goal: Goal, e: React.MouseEvent) {
    e.stopPropagation()
    const nowComplete = !goal.completed_at
    const saved = await saveGoal(userId, {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      targetDate: goal.target_date,
      progress: nowComplete ? 100 : goal.progress,
      completedAt: nowComplete ? Date.now() : null,
    })
    if (saved) {
      await loadAllGoals()
    }
  }

  function handleNewGoal() {
    setSelectedGoal(null)
    setEditTitle("")
    setEditDescription("")
    setEditTargetDate("")
    setEditProgress(0)
    setIsEditing(true)
  }

  function handleEditGoal(goal: Goal) {
    setSelectedGoal(goal)
    setEditTitle(goal.title)
    setEditDescription(goal.description || "")
    setEditTargetDate(toDateInputValue(goal.target_date))
    setEditProgress(goal.progress)
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setIsEditing(false)
    setSelectedGoal(null)
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
      </div>
    )
  }
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-white z-10 flex flex-col"
      >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancelEdit}
            className="rounded-full hover:bg-cream"
          >
            <ChevronLeft className="h-5 w-5 text-text-secondary" />
          </Button>
          <h2 className="font-semibold text-lg text-text-primary">
            {selectedGoal ? "Edit Goal" : "New Goal"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-lg mx-auto space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Goal</label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Practice a breathing exercise 3x a week"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Notes (optional)</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Why does this goal matter to you?"
                className="min-h-[100px] resize-none border-linen focus:border-terracotta focus:ring-terracotta/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Target date (optional)</label>
              <Input
                type="date"
                value={editTargetDate}
                onChange={(e) => setEditTargetDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">Progress</label>
                <span className="text-sm font-semibold text-terracotta">{editProgress}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editProgress}
                  onChange={(e) => setEditProgress(parseInt(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #C9897A 0%, #C9897A ${editProgress}%, #F0E6DD ${editProgress}%, #F0E6DD 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md border-2 border-terracotta pointer-events-none transition-transform"
                  style={{ left: `calc(${editProgress}% - 10px)` }}
                />
              </div>
              {editProgress >= 100 && (
                <p className="text-xs text-sage flex items-center gap-1 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  This goal will be marked complete
                </p>
              )}
            </div>
          </div>
        </div>
<div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50 flex gap-3">
          {selectedGoal && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !editTitle.trim()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col"
    >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Goals</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewGoal}
            className="rounded-full hover:bg-cream"
          >
            <Plus className="h-5 w-5 text-terracotta" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
      </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <Target className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">No goals yet</h3>
            <p className="text-sm text-text-muted mb-4">
              Set a goal to track your progress over time
            </p>
            <Button onClick={handleNewGoal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-6 max-w-lg mx-auto">
{activeGoals.length > 0 && (
              <div className="space-y-3">
                {activeGoals.map((goal) => {
                  const isOverdue = goal.target_date ? goal.target_date < Date.now() : false
                  return (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleEditGoal(goal)}
                      className="w-full text-left p-4 rounded-xl border border-linen hover:border-terracotta/30 hover:bg-cream/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary group-hover:text-terracotta">
                            {goal.title}
                          </h4>
                          {goal.description && (
                            <p className="text-sm text-text-muted mt-1 line-clamp-2">
                              {goal.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleQuickToggleComplete(goal, e)}
                          title="Mark complete"
                          className="shrink-0 w-6 h-6 rounded-full border-2 border-terracotta/40 hover:border-terracotta hover:bg-terracotta/10 transition-colors flex items-center justify-center"
                        >
                          <Check className="h-3.5 w-3.5 text-terracotta opacity-0 group-hover:opacity-60" />
                        </button>
                      </div>
<div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-linen rounded-full overflow-hidden">
                          <div
                            className="h-full bg-terracotta rounded-full transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-text-secondary tabular-nums">
                          {goal.progress}%
                        </span>
                      </div>

                      {goal.target_date && (
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-2 text-xs",
                            isOverdue ? "text-destructive" : "text-text-muted"
                          )}
                        >
                          <CalendarClock className="h-3 w-3" />
                          {isOverdue ? "Was due" : "Due"} {formatTargetDate(goal.target_date)}
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}
{completedGoals.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide px-1">
                  Completed
                </p>
                {completedGoals.map((goal) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleEditGoal(goal)}
                    className="w-full text-left p-4 rounded-xl border border-linen bg-cream/30 hover:bg-cream/60 transition-colors flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-secondary line-through decoration-text-muted/50">
                        {goal.title}
                      </h4>
                      {goal.completed_at && (
                        <p className="text-xs text-text-muted mt-0.5">
                          Completed {formatTargetDate(goal.completed_at)}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
{goals.length > 0 && (
        <div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50">
          <Button onClick={handleNewGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </div>
      )}
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Plus, X, Trash2, Save, Loader2, ChevronLeft, Check, CalendarClock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { loadGoals, saveGoal, deleteGoal, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

function formatTargetDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toDateInputValue(timestamp: number | null): string {
  if (!timestamp) return ""
  return new Date(timestamp).toISOString().split("T")[0]
}

function fromDateInputValue(value: string): number | null {
  if (!value) return null
  return new Date(value + "T00:00:00").getTime()
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTargetDate, setEditTargetDate] = useState("")
  const [editProgress, setEditProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadAllGoals()
  }, [userId])

  async function loadAllGoals() {
    setLoading(true)
    const data = await loadGoals(userId)
    setGoals(data)
    setLoading(false)
  }

  const activeGoals = goals.filter((g) => !g.completed_at)
  const completedGoals = goals.filter((g) => g.completed_at)

  async function handleSave() {
    if (!editTitle.trim()) return

    setSaving(true)
    const wasComplete = !!selectedGoal?.completed_at
    const isNowComplete = editProgress >= 100
    const saved = await saveGoal(userId, {
      id: selectedGoal?.id,
      title: editTitle.trim(),
      description: editDescription.trim() || null,
      targetDate: fromDateInputValue(editTargetDate),
      progress: editProgress,
      completedAt: isNowComplete ? (wasComplete ? selectedGoal!.completed_at : Date.now()) : null,
    })

    if (saved) {
      await loadAllGoals()
      setIsEditing(false)
      setSelectedGoal(null)
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!selectedGoal) return

    setDeleting(true)
    const deleted = await deleteGoal(selectedGoal.id)

    if (deleted) {
      await loadAllGoals()
      setSelectedGoal(null)
      setIsEditing(false)
    }
    setDeleting(false)
  }

  async function handleQuickToggleComplete(goal: Goal, e: React.MouseEvent) {
    e.stopPropagation()
    const nowComplete = !goal.completed_at
    const saved = await saveGoal(userId, {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      targetDate: goal.target_date,
      progress: nowComplete ? 100 : goal.progress,
      completedAt: nowComplete ? Date.now() : null,
    })
    if (saved) {
      await loadAllGoals()
    }
  }

  function handleNewGoal() {
    setSelectedGoal(null)
    setEditTitle("")
    setEditDescription("")
    setEditTargetDate("")
    setEditProgress(0)
    setIsEditing(true)
  }

  function handleEditGoal(goal: Goal) {
    setSelectedGoal(goal)
    setEditTitle(goal.title)
    setEditDescription(goal.description || "")
    setEditTargetDate(toDateInputValue(goal.target_date))
    setEditProgress(goal.progress)
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setIsEditing(false)
    setSelectedGoal(null)
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
      </div>
    )
  }
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-white z-10 flex flex-col"
      >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancelEdit}
            className="rounded-full hover:bg-cream"
          >
            <ChevronLeft className="h-5 w-5 text-text-secondary" />
          </Button>
          <h2 className="font-semibold text-lg text-text-primary">
            {selectedGoal ? "Edit Goal" : "New Goal"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-lg mx-auto space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Goal</label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Practice a breathing exercise 3x a week"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Notes (optional)</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Why does this goal matter to you?"
                className="min-h-[100px] resize-none border-linen focus:border-terracotta focus:ring-terracotta/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Target date (optional)</label>
              <Input
                type="date"
                value={editTargetDate}
                onChange={(e) => setEditTargetDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">Progress</label>
                <span className="text-sm font-semibold text-terracotta">{editProgress}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editProgress}
                  onChange={(e) => setEditProgress(parseInt(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #C9897A 0%, #C9897A ${editProgress}%, #F0E6DD ${editProgress}%, #F0E6DD 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md border-2 border-terracotta pointer-events-none transition-transform"
                  style={{ left: `calc(${editProgress}% - 10px)` }}
                />
              </div>
              {editProgress >= 100 && (
                <p className="text-xs text-sage flex items-center gap-1 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  This goal will be marked complete
                </p>
              )}
            </div>
          </div>
        </div>
<div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50 flex gap-3">
          {selectedGoal && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !editTitle.trim()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col"
    >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Goals</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewGoal}
            className="rounded-full hover:bg-cream"
          >
            <Plus className="h-5 w-5 text-terracotta" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
      </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <Target className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">No goals yet</h3>
            <p className="text-sm text-text-muted mb-4">
              Set a goal to track your progress over time
            </p>
            <Button onClick={handleNewGoal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-6 max-w-lg mx-auto">
{activeGoals.length > 0 && (
              <div className="space-y-3">
                {activeGoals.map((goal) => {
                  const isOverdue = goal.target_date ? goal.target_date < Date.now() : false
                  return (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleEditGoal(goal)}
                      className="w-full text-left p-4 rounded-xl border border-linen hover:border-terracotta/30 hover:bg-cream/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary group-hover:text-terracotta">
                            {goal.title}
                          </h4>
                          {goal.description && (
                            <p className="text-sm text-text-muted mt-1 line-clamp-2">
                              {goal.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleQuickToggleComplete(goal, e)}
                          title="Mark complete"
                          className="shrink-0 w-6 h-6 rounded-full border-2 border-terracotta/40 hover:border-terracotta hover:bg-terracotta/10 transition-colors flex items-center justify-center"
                        >
                          <Check className="h-3.5 w-3.5 text-terracotta opacity-0 group-hover:opacity-60" />
                        </button>
                      </div>
<div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-linen rounded-full overflow-hidden">
                          <div
                            className="h-full bg-terracotta rounded-full transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-text-secondary tabular-nums">
                          {goal.progress}%
                        </span>
                      </div>

                      {goal.target_date && (
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-2 text-xs",
                            isOverdue ? "text-destructive" : "text-text-muted"
                          )}
                        >
                          <CalendarClock className="h-3 w-3" />
                          {isOverdue ? "Was due" : "Due"} {formatTargetDate(goal.target_date)}
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}
{completedGoals.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide px-1">
                  Completed
                </p>
                {completedGoals.map((goal) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleEditGoal(goal)}
                    className="w-full text-left p-4 rounded-xl border border-linen bg-cream/30 hover:bg-cream/60 transition-colors flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-secondary line-through decoration-text-muted/50">
                        {goal.title}
                      </h4>
                      {goal.completed_at && (
                        <p className="text-xs text-text-muted mt-0.5">
                          Completed {formatTargetDate(goal.completed_at)}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
{goals.length > 0 && (
        <div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50">
          <Button onClick={handleNewGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </div>
      )}
    </motion.div>
  )
}
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Plus, X, Trash2, Save, Loader2, ChevronLeft, Check, CalendarClock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { loadGoals, saveGoal, deleteGoal, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

function formatTargetDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toDateInputValue(timestamp: number | null): string {
  if (!timestamp) return ""
  return new Date(timestamp).toISOString().split("T")[0]
}

function fromDateInputValue(value: string): number | null {
  if (!value) return null
  return new Date(value + "T00:00:00").getTime()
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTargetDate, setEditTargetDate] = useState("")
  const [editProgress, setEditProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadAllGoals()
  }, [userId])

  async function loadAllGoals() {
    setLoading(true)
    const data = await loadGoals(userId)
    setGoals(data)
    setLoading(false)
  }

  const activeGoals = goals.filter((g) => !g.completed_at)
  const completedGoals = goals.filter((g) => g.completed_at)

  async function handleSave() {
    if (!editTitle.trim()) return

    setSaving(true)
    const wasComplete = !!selectedGoal?.completed_at
    const isNowComplete = editProgress >= 100
    const saved = await saveGoal(userId, {
      id: selectedGoal?.id,
      title: editTitle.trim(),
      description: editDescription.trim() || null,
      targetDate: fromDateInputValue(editTargetDate),
      progress: editProgress,
      completedAt: isNowComplete ? (wasComplete ? selectedGoal!.completed_at : Date.now()) : null,
    })

    if (saved) {
      await loadAllGoals()
      setIsEditing(false)
      setSelectedGoal(null)
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!selectedGoal) return

    setDeleting(true)
    const deleted = await deleteGoal(selectedGoal.id)

    if (deleted) {
      await loadAllGoals()
      setSelectedGoal(null)
      setIsEditing(false)
    }
    setDeleting(false)
  }

  async function handleQuickToggleComplete(goal: Goal, e: React.MouseEvent) {
    e.stopPropagation()
    const nowComplete = !goal.completed_at
    const saved = await saveGoal(userId, {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      targetDate: goal.target_date,
      progress: nowComplete ? 100 : goal.progress,
      completedAt: nowComplete ? Date.now() : null,
    })
    if (saved) {
      await loadAllGoals()
    }
  }

  function handleNewGoal() {
    setSelectedGoal(null)
    setEditTitle("")
    setEditDescription("")
    setEditTargetDate("")
    setEditProgress(0)
    setIsEditing(true)
  }

  function handleEditGoal(goal: Goal) {
    setSelectedGoal(goal)
    setEditTitle(goal.title)
    setEditDescription(goal.description || "")
    setEditTargetDate(toDateInputValue(goal.target_date))
    setEditProgress(goal.progress)
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setIsEditing(false)
    setSelectedGoal(null)
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
      </div>
    )
  }
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-white z-10 flex flex-col"
      >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancelEdit}
            className="rounded-full hover:bg-cream"
          >
            <ChevronLeft className="h-5 w-5 text-text-secondary" />
          </Button>
          <h2 className="font-semibold text-lg text-text-primary">
            {selectedGoal ? "Edit Goal" : "New Goal"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-lg mx-auto space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Goal</label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Practice a breathing exercise 3x a week"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Notes (optional)</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Why does this goal matter to you?"
                className="min-h-[100px] resize-none border-linen focus:border-terracotta focus:ring-terracotta/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Target date (optional)</label>
              <Input
                type="date"
                value={editTargetDate}
                onChange={(e) => setEditTargetDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">Progress</label>
                <span className="text-sm font-semibold text-terracotta">{editProgress}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editProgress}
                  onChange={(e) => setEditProgress(parseInt(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #C9897A 0%, #C9897A ${editProgress}%, #F0E6DD ${editProgress}%, #F0E6DD 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md border-2 border-terracotta pointer-events-none transition-transform"
                  style={{ left: `calc(${editProgress}% - 10px)` }}
                />
              </div>
              {editProgress >= 100 && (
                <p className="text-xs text-sage flex items-center gap-1 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  This goal will be marked complete
                </p>
              )}
            </div>
          </div>
        </div>
<div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50 flex gap-3">
          {selectedGoal && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !editTitle.trim()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col"
    >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Goals</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewGoal}
            className="rounded-full hover:bg-cream"
          >
            <Plus className="h-5 w-5 text-terracotta" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
      </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <Target className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">No goals yet</h3>
            <p className="text-sm text-text-muted mb-4">
              Set a goal to track your progress over time
            </p>
            <Button onClick={handleNewGoal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-6 max-w-lg mx-auto">
{activeGoals.length > 0 && (
              <div className="space-y-3">
                {activeGoals.map((goal) => {
                  const isOverdue = goal.target_date ? goal.target_date < Date.now() : false
                  return (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleEditGoal(goal)}
                      className="w-full text-left p-4 rounded-xl border border-linen hover:border-terracotta/30 hover:bg-cream/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary group-hover:text-terracotta">
                            {goal.title}
                          </h4>
                          {goal.description && (
                            <p className="text-sm text-text-muted mt-1 line-clamp-2">
                              {goal.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleQuickToggleComplete(goal, e)}
                          title="Mark complete"
                          className="shrink-0 w-6 h-6 rounded-full border-2 border-terracotta/40 hover:border-terracotta hover:bg-terracotta/10 transition-colors flex items-center justify-center"
                        >
                          <Check className="h-3.5 w-3.5 text-terracotta opacity-0 group-hover:opacity-60" />
                        </button>
                      </div>
<div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-linen rounded-full overflow-hidden">
                          <div
                            className="h-full bg-terracotta rounded-full transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-text-secondary tabular-nums">
                          {goal.progress}%
                        </span>
                      </div>

                      {goal.target_date && (
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-2 text-xs",
                            isOverdue ? "text-destructive" : "text-text-muted"
                          )}
                        >
                          <CalendarClock className="h-3 w-3" />
                          {isOverdue ? "Was due" : "Due"} {formatTargetDate(goal.target_date)}
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}
{completedGoals.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide px-1">
                  Completed
                </p>
                {completedGoals.map((goal) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleEditGoal(goal)}
                    className="w-full text-left p-4 rounded-xl border border-linen bg-cream/30 hover:bg-cream/60 transition-colors flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-secondary line-through decoration-text-muted/50">
                        {goal.title}
                      </h4>
                      {goal.completed_at && (
                        <p className="text-xs text-text-muted mt-0.5">
                          Completed {formatTargetDate(goal.completed_at)}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
{goals.length > 0 && (
        <div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50">
          <Button onClick={handleNewGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </div>
      )}
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Plus, X, Trash2, Save, Loader2, ChevronLeft, Check, CalendarClock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { loadGoals, saveGoal, deleteGoal, type Goal } from "@/lib/db"

interface GoalTrackerProps {
  userId: string
  onClose: () => void
}

function formatTargetDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toDateInputValue(timestamp: number | null): string {
  if (!timestamp) return ""
  return new Date(timestamp).toISOString().split("T")[0]
}

function fromDateInputValue(value: string): number | null {
  if (!value) return null
  return new Date(value + "T00:00:00").getTime()
}

export function GoalTracker({ userId, onClose }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTargetDate, setEditTargetDate] = useState("")
  const [editProgress, setEditProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadAllGoals()
  }, [userId])

  async function loadAllGoals() {
    setLoading(true)
    const data = await loadGoals(userId)
    setGoals(data)
    setLoading(false)
  }

  const activeGoals = goals.filter((g) => !g.completed_at)
  const completedGoals = goals.filter((g) => g.completed_at)

  async function handleSave() {
    if (!editTitle.trim()) return

    setSaving(true)
    const wasComplete = !!selectedGoal?.completed_at
    const isNowComplete = editProgress >= 100
    const saved = await saveGoal(userId, {
      id: selectedGoal?.id,
      title: editTitle.trim(),
      description: editDescription.trim() || null,
      targetDate: fromDateInputValue(editTargetDate),
      progress: editProgress,
      completedAt: isNowComplete ? (wasComplete ? selectedGoal!.completed_at : Date.now()) : null,
    })

    if (saved) {
      await loadAllGoals()
      setIsEditing(false)
      setSelectedGoal(null)
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!selectedGoal) return

    setDeleting(true)
    const deleted = await deleteGoal(selectedGoal.id)

    if (deleted) {
      await loadAllGoals()
      setSelectedGoal(null)
      setIsEditing(false)
    }
    setDeleting(false)
  }

  async function handleQuickToggleComplete(goal: Goal, e: React.MouseEvent) {
    e.stopPropagation()
    const nowComplete = !goal.completed_at
    const saved = await saveGoal(userId, {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      targetDate: goal.target_date,
      progress: nowComplete ? 100 : goal.progress,
      completedAt: nowComplete ? Date.now() : null,
    })
    if (saved) {
      await loadAllGoals()
    }
  }

  function handleNewGoal() {
    setSelectedGoal(null)
    setEditTitle("")
    setEditDescription("")
    setEditTargetDate("")
    setEditProgress(0)
    setIsEditing(true)
  }

  function handleEditGoal(goal: Goal) {
    setSelectedGoal(goal)
    setEditTitle(goal.title)
    setEditDescription(goal.description || "")
    setEditTargetDate(toDateInputValue(goal.target_date))
    setEditProgress(goal.progress)
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setIsEditing(false)
    setSelectedGoal(null)
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
      </div>
    )
  }
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-white z-10 flex flex-col"
      >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancelEdit}
            className="rounded-full hover:bg-cream"
          >
            <ChevronLeft className="h-5 w-5 text-text-secondary" />
          </Button>
          <h2 className="font-semibold text-lg text-text-primary">
            {selectedGoal ? "Edit Goal" : "New Goal"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-lg mx-auto space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Goal</label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Practice a breathing exercise 3x a week"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Notes (optional)</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Why does this goal matter to you?"
                className="min-h-[100px] resize-none border-linen focus:border-terracotta focus:ring-terracotta/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Target date (optional)</label>
              <Input
                type="date"
                value={editTargetDate}
                onChange={(e) => setEditTargetDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">Progress</label>
                <span className="text-sm font-semibold text-terracotta">{editProgress}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editProgress}
                  onChange={(e) => setEditProgress(parseInt(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #C9897A 0%, #C9897A ${editProgress}%, #F0E6DD ${editProgress}%, #F0E6DD 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md border-2 border-terracotta pointer-events-none transition-transform"
                  style={{ left: `calc(${editProgress}% - 10px)` }}
                />
              </div>
              {editProgress >= 100 && (
                <p className="text-xs text-sage flex items-center gap-1 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  This goal will be marked complete
                </p>
              )}
            </div>
          </div>
        </div>
<div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50 flex gap-3">
          {selectedGoal && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !editTitle.trim()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col"
    >
<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Goals</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewGoal}
            className="rounded-full hover:bg-cream"
          >
            <Plus className="h-5 w-5 text-terracotta" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-cream"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </Button>
        </div>
      </div>
<div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <Target className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">No goals yet</h3>
            <p className="text-sm text-text-muted mb-4">
              Set a goal to track your progress over time
            </p>
            <Button onClick={handleNewGoal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-6 max-w-lg mx-auto">
{activeGoals.length > 0 && (
              <div className="space-y-3">
                {activeGoals.map((goal) => {
                  const isOverdue = goal.target_date ? goal.target_date < Date.now() : false
                  return (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleEditGoal(goal)}
                      className="w-full text-left p-4 rounded-xl border border-linen hover:border-terracotta/30 hover:bg-cream/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary group-hover:text-terracotta">
                            {goal.title}
                          </h4>
                          {goal.description && (
                            <p className="text-sm text-text-muted mt-1 line-clamp-2">
                              {goal.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleQuickToggleComplete(goal, e)}
                          title="Mark complete"
                          className="shrink-0 w-6 h-6 rounded-full border-2 border-terracotta/40 hover:border-terracotta hover:bg-terracotta/10 transition-colors flex items-center justify-center"
                        >
                          <Check className="h-3.5 w-3.5 text-terracotta opacity-0 group-hover:opacity-60" />
                        </button>
                      </div>
<div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-linen rounded-full overflow-hidden">
                          <div
                            className="h-full bg-terracotta rounded-full transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-text-secondary tabular-nums">
                          {goal.progress}%
                        </span>
                      </div>

                      {goal.target_date && (
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-2 text-xs",
                            isOverdue ? "text-destructive" : "text-text-muted"
                          )}
                        >
                          <CalendarClock className="h-3 w-3" />
                          {isOverdue ? "Was due" : "Due"} {formatTargetDate(goal.target_date)}
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}
{completedGoals.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide px-1">
                  Completed
                </p>
                {completedGoals.map((goal) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleEditGoal(goal)}
                    className="w-full text-left p-4 rounded-xl border border-linen bg-cream/30 hover:bg-cream/60 transition-colors flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-secondary line-through decoration-text-muted/50">
                        {goal.title}
                      </h4>
                      {goal.completed_at && (
                        <p className="text-xs text-text-muted mt-0.5">
                          Completed {formatTargetDate(goal.completed_at)}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
{goals.length > 0 && (
        <div className="px-4 sm:px-6 py-4 border-t border-linen bg-cream/50">
          <Button onClick={handleNewGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </div>
      )}
    </motion.div>
  )
}

GoalTracker.displayName = "GoalTracker"

