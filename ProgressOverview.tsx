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

import {
  type Goal,
  type JournalEntry,
} from "@/lib/db"

