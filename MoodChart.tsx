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
