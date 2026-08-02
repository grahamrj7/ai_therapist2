import { motion } from "framer-motion"
import { ArrowLeft, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props { onClose: () => void }
export function EmotionScaleSliders({ onClose }: Props) {
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-white z-10 flex flex-col">
    <div className="flex items-center gap-3 p-4 border-b border-linen">
      <Button variant="ghost" size="icon" onClick={onClose}><ArrowLeft className="h-5 w-5" /></Button>
      <Sliders className="h-5 w-5 text-terracotta" /><h2>Emotion Check</h2>
    </div>
  </motion.div>
}
