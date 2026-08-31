import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MoodChartProps {
  userId: string
  onClose?: () => void
}

export function MoodChart({ userId, onClose }: MoodChartProps) {
  return (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis domain={[0, 10]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import { loadEmotionHistory, type EmotionCheckin } from "@/lib/db"

interface MoodChartProps {
  userId: string
  onClose?: () => void
}

export function MoodChart({ userId, onClose }: MoodChartProps) {
  const [data, setData] = useState<EmotionCheckin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const history = await loadEmotionHistory(userId)
      setData(history)
      setLoading(false)
    }
    fetchData()
  }, [userId])

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-terracotta" /></div>
  }

  return <div className="space-y-6"><p className="text-sm text-text-muted">{data.length} check-ins</p></div>
}

