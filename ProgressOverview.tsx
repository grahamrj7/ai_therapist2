import { motion } from "framer-motion"
import { TrendingUp, X } from "lucide-react"

interface ProgressOverviewProps {
  userId: string
  onClose: () => void
}

export function ProgressOverview({
  userId,
  onClose,
}: ProgressOverviewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-terracotta" />

          <h2 className="font-semibold text-lg text-text-primary">
            Progress
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-text-secondary" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-text-muted">
            Your progress will appear here.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, X } from "lucide-react"
import { type Goal, type JournalEntry } from "@/lib/db"

interface ProgressOverviewProps {
  userId: string
  onClose: () => void
}

export function ProgressOverview({ onClose }: ProgressOverviewProps) {
  const [goals] = useState<Goal[]>([])
  const [journalEntries] = useState<JournalEntry[]>([])
  const [sessionDates] = useState<string[]>([])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Progress</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-cream rounded-lg transition-colors">
          <X className="h-5 w-5 text-text-secondary" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-lg mx-auto space-y-2">
          <p className="text-sm text-text-muted">Goals: {goals.length}</p>
          <p className="text-sm text-text-muted">Journal entries: {journalEntries.length}</p>
          <p className="text-sm text-text-muted">Sessions: {sessionDates.length}</p>
        </div>
      </div>
    </motion.div>
  )
}

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, X, Loader2 } from "lucide-react"
import { loadGoals, loadJournalEntries, loadSessions, type Goal, type JournalEntry } from "@/lib/db"

interface ProgressOverviewProps {
  userId: string
  onClose: () => void
}

export function ProgressOverview({ userId, onClose }: ProgressOverviewProps) {
  const [loading, setLoading] = useState(true)
  const [goals, setGoals] = useState<Goal[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [sessionDates, setSessionDates] = useState<string[]>([])

  useEffect(() => {
    async function loadAll() {
      setLoading(true)
      const [goalsData, journalData, sessionsData] = await Promise.all([
        loadGoals(userId),
        loadJournalEntries(userId),
        loadSessions(userId),
      ])
      setGoals(goalsData)
      setJournalEntries(journalData)
      setSessionDates(sessionsData.map((s) => s.date))
      setLoading(false)
    }
    loadAll()
  }, [userId])

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-linen">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-terracotta" />
          <h2 className="font-semibold text-lg text-text-primary">Progress</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-cream rounded-lg transition-colors">
          <X className="h-5 w-5 text-text-secondary" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-lg mx-auto space-y-2">
          <p className="text-sm text-text-muted">Goals loaded: {goals.length}</p>
          <p className="text-sm text-text-muted">Journal entries loaded: {journalEntries.length}</p>
          <p className="text-sm text-text-muted">Sessions loaded: {sessionDates.length}</p>
        </div>
      </div>
    </motion.div>
  )
}
