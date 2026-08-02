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
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
export interface EmotionScale { id:string; label:string; minLabel:string; maxLabel:string; value:number; color:string }
interface Props { onClose:()=>void }
const DEFAULT_EMOTIONS: Omit<EmotionScale,"value">[]=[
{id:"anxiety",label:"Anxiety",minLabel:"Calm",maxLabel:"Very Anxious",color:"#D4A574"},
{id:"mood",label:"Mood",minLabel:"Low",maxLabel:"Great",color:"#A8B5A0"},
{id:"stress",label:"Stress",minLabel:"Relaxed",maxLabel:"Very Stressed",color:"#C9897A"},
{id:"energy",label:"Energy",minLabel:"Exhausted",maxLabel:"Energized",color:"#C9B8C8"}]
export function EmotionScaleSliders({onClose}:Props){const [emotions]=useState(()=>DEFAULT_EMOTIONS.map(e=>({...e,value:5})));return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-white z-10 flex flex-col"><div className="flex items-center gap-3 p-4 border-b"><Button variant="ghost" size="icon" onClick={onClose}><ArrowLeft className="h-5 w-5"/></Button><Sliders className="h-5 w-5"/><h2>Emotion Check</h2></div><div className="p-6">{emotions.map(e=><div key={e.id}>{e.label}</div>)}</div></motion.div>}
export {DEFAULT_EMOTIONS}

