"use client"

import { useState, useMemo } from "react"
import { Copy, Wand2, X, Check } from "lucide-react"

// --- Definición de las opciones ---
const OPTIONS = {
  layout: [
    { label: "1:1 Square (Ig, Profile)", value: "--ar 1:1" },
    { label: "16:9 Wide (Desktop, YT)", value: "--ar 16:9" },
    { label: "9:16 Vertical (Stories, Reels)", value: "--ar 9:16" },
    { label: "4:3 Standard", value: "--ar 4:3" },
    { label: "3:2 Photography", value: "--ar 3:2" }
  ],
  style: [
    "Photorealistic",
    "Editorial photo",
    "Cinematic",
    "Studio photography",
    "3D render",
    "Isometric illustration",
    "Flat vector",
    "Line art",
    "Pixel art",
    "Watercolor",
    "Oil painting",
    "Digital painting",
    "Anime"
  ],
  composition: [
    "POV",
    "First-person view",
    "Over-the-shoulder",
    "Top-down",
    "Close-up",
    "Medium shot",
    "Wide shot",
    "Isometric",
    "Bird's-eye view",
    "Low angle"
  ],
  lighting: [
    "Soft natural light",
    "Golden hour",
    "Studio lighting",
    "High key",
    "Low key",
    "Neon cyberpunk lighting",
    "Backlit",
    "Rim light",
    "Dramatic shadows"
  ],
  mood: [
    "Cozy",
    "Corporate",
    "Playful",
    "Dark",
    "Futuristic",
    "Minimalist",
    "Romantic",
    "Dramatic"
  ],
  colorPalette: [
    "Pastel colors",
    "Monochrome",
    "Teal and orange",
    "Vibrant colors",
    "Muted tones",
    "Black and white",
    "Neon colors"
  ]
}

export function ImagePromptBuilder() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Estado del prompt
  const [selections, setSelections] = useState({
    style: OPTIONS.style[0],
    subject: "",
    action: "",
    environment: "",
    lighting: OPTIONS.lighting[0],
    mood: OPTIONS.mood[0],
    composition: OPTIONS.composition[0],
    colorPalette: OPTIONS.colorPalette[0],
    extras: "",
    layout: OPTIONS.layout[0].value
  })

  // Ensamblaje de la frase final
  const finalPrompt = useMemo(() => {
    const parts = []

    // [style/medium] image of [subject]
    if (selections.style) {
        parts.push(`${selections.style} image`)
    }
    
    // Sujeto (obligatorio o placeholder)
    const subjectFinal = selections.subject.trim() || "[subject]"
    parts[0] = parts.length > 0 ? `${parts[0]} of ${subjectFinal}` : `Image of ${subjectFinal}`

    // Action
    if (selections.action.trim()) parts.push(selections.action.trim())
    
    // Environment
    if (selections.environment.trim()) parts.push(`in ${selections.environment.trim()}`)

    // Modifiers (Lighting, Mood, Composition, Color)
    if (selections.composition) parts.push(`${selections.composition} shot`)
    if (selections.lighting) parts.push(selections.lighting)
    if (selections.mood) parts.push(`${selections.mood} mood`)
    if (selections.colorPalette) parts.push(`${selections.colorPalette} palette`)
    
    // Extras
    if (selections.extras.trim()) parts.push(selections.extras.trim())

    // Juntar con comas
    let promptStr = parts.join(", ")

    // Layout/Aspect Ratio (al final, sin coma)
    if (selections.layout) {
      promptStr += ` ${selections.layout}`
    }

    return promptStr.trim()
  }, [selections])

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSelectChange = (key: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }))
  }

  // --- UI Components ---
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors text-sm font-medium"
      >
        <Wand2 className="w-4 h-4" />
        Image Prompt Builder
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100 font-semibold text-lg">
            <Wand2 className="w-5 h-5 text-blue-500" />
            Image Prompt Builder
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENIDO (Formulario) */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Sujeto & Actividad */}
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">1. Core (Subject & Action)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Subject (Who/What)*</label>
                <input 
                  type="text" 
                  placeholder="e.g. young professional woman, a cute dog..." 
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selections.subject}
                  onChange={(e) => handleSelectChange("subject", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Action (Doing what)</label>
                <input 
                  type="text" 
                  placeholder="e.g. working on a laptop, jumping in a puddle..." 
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selections.action}
                  onChange={(e) => handleSelectChange("action", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Environment / Context</label>
              <input 
                type="text" 
                placeholder="e.g. cozy modern office with plants, neon city street..." 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.environment}
                onChange={(e) => handleSelectChange("environment", e.target.value)}
              />
            </div>
          </div>

          {/* Desplegables de Estética */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">2. Aesthetics</h3>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Style / Medium</label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.style}
                onChange={(e) => handleSelectChange("style", e.target.value)}
              >
                {OPTIONS.style.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Lighting</label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.lighting}
                onChange={(e) => handleSelectChange("lighting", e.target.value)}
              >
                {OPTIONS.lighting.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Color Palette</label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.colorPalette}
                onChange={(e) => handleSelectChange("colorPalette", e.target.value)}
              >
                {OPTIONS.colorPalette.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Composición y Extras */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">3. Camera & Format</h3>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Composition</label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.composition}
                onChange={(e) => handleSelectChange("composition", e.target.value)}
              >
                {OPTIONS.composition.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Mood / Vibe</label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.mood}
                onChange={(e) => handleSelectChange("mood", e.target.value)}
              >
                {OPTIONS.mood.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Aspect Ratio (Layout)</label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selections.layout}
                onChange={(e) => handleSelectChange("layout", e.target.value)}
              >
                {OPTIONS.layout.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Extras */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-zinc-500 mb-1">Extras (Custom modifiers, cameras, --v 6.0, etc.)</label>
            <input 
              type="text" 
              placeholder="e.g. 8k resolution, highly detailed, octane render..." 
              className="w-full px-3 py-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selections.extras}
              onChange={(e) => handleSelectChange("extras", e.target.value)}
            />
          </div>

        </div>

        {/* FOOTER (Preview del Prompt) */}
        <div className="p-5 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Final Prompt Preview</label>
          <div className="relative">
            <div className="w-full p-4 pr-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-mono text-zinc-800 dark:text-zinc-200 min-h-[80px] break-words shadow-inner">
              {finalPrompt}
            </div>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-md transition-colors flex items-center gap-1 text-xs font-medium border border-blue-200 dark:border-blue-800 shadow-sm"
            >
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
