"use client"
import { Sun, Fish, Zap, Leaf, Dumbbell, Moon, Heart, Brain, Shield, Flame } from "lucide-react"

const getSupplementIcon = (iconName: string) => {
  const icons = {
    Sun,
    Fish,
    Zap,
    Leaf,
    Dumbbell,
    Moon,
    Heart,
    Brain,
    Shield,
    Flame,
  }
  const IconComponent = icons[iconName as keyof typeof icons] || Zap
  return IconComponent
}

interface DragPreviewProps {
  supplement: {
    name: string
    dosage: string
    icon: string
    color: string
  }
  isMultiple?: boolean
  count?: number
}

export function DragPreview({ supplement, isMultiple = false, count = 1 }: DragPreviewProps) {
  const IconComponent = getSupplementIcon(supplement.icon)

  if (isMultiple) {
    return (
      <div className="bg-slate-800 border-2 border-slate-600 rounded-xl p-3 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="p-2 bg-slate-700 rounded-lg">
              <IconComponent className="w-5 h-5 text-slate-300" />
            </div>
            <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {count}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-sm">Multiple Supplements</div>
            <div className="text-xs text-slate-400">{count} items selected</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${supplement.color} border-2 rounded-xl p-3 shadow-2xl backdrop-blur-sm transform scale-90 opacity-95`}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white/20 rounded-lg">
          <IconComponent className="w-5 h-5 text-slate-800" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-800 text-sm truncate">{supplement.name}</div>
          <div className="text-xs text-slate-600">{supplement.dosage}</div>
        </div>
      </div>
    </div>
  )
}

// Create drag preview element
export function createDragPreview(supplement: any, isMultiple = false, count = 1) {
  const previewElement = document.createElement("div")
  previewElement.style.position = "absolute"
  previewElement.style.top = "-1000px"
  previewElement.style.pointerEvents = "none"
  previewElement.style.zIndex = "9999"

  const IconComponent = getSupplementIcon(supplement.icon)

  if (isMultiple) {
    previewElement.innerHTML = `
      <div class="bg-slate-800 border-2 border-slate-600 rounded-xl p-3 shadow-2xl backdrop-blur-sm transform scale-75">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="p-2 bg-slate-700 rounded-lg">
              <svg class="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              ${count}
            </div>
          </div>
          <div>
            <div class="font-semibold text-white text-sm">Multiple Supplements</div>
            <div class="text-xs text-slate-400">${count} items selected</div>
          </div>
        </div>
      </div>
    `
  } else {
    previewElement.innerHTML = `
      <div class="${supplement.color} border-2 rounded-xl p-3 shadow-2xl backdrop-blur-sm transform scale-75 opacity-95">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <svg class="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-slate-800 text-sm truncate">${supplement.name}</div>
            <div class="text-xs text-slate-600">${supplement.dosage}</div>
          </div>
        </div>
      </div>
    `
  }

  return previewElement
}
