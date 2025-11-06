import React, { useEffect, useRef, useState } from 'react'
import { Smile, Paperclip, Mic, Send } from 'lucide-react'


export default function MessageInput({ onSend }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const send = () => {
    const t = text.trim()
    if (!t) return
    onSend(t)
    setText('')
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [text])

  const hasText = !!text.trim()

  return (
    <div className="px-6 h-[70px] bg-(--color-panelElevated) border-t border-(--color-border) flex items-center gap-4">
      <div className="flex items-center gap-1">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          title="Emoji"
          style={{
            cursor: "pointer",
            color: "#b9b9b9",
            borderRadius: "50%",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#b9b9b9";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Smile size={20} />
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          title="Attach"
          style={{
            cursor: "pointer",
            color: "#b9b9b9",
            borderRadius: "50%",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#b9b9b9";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Paperclip size={20} />
        </button>
      </div>
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          className="w-full resize-none px-4 py-3 rounded-xl bg-(--color-inputBg) outline-none hide-scrollbar text-textPrimary placeholder:text-textSecondary text-[15px]"
          placeholder="Type a message"
        />
      </div>
      <button
        onClick={hasText ? send : undefined}
        className={`w-10 h-10 rounded-full grid place-items-center transition-all duration-200 ${hasText ? 'bg-whatsappGreen text-white' : ''}`}
        title={hasText ? 'Send' : 'Voice'}
        style={{
          cursor: "pointer",
          color: hasText ? "#fff" : "#b9b9b9",
          borderRadius: "50%",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          if (!hasText) {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1.05)";
          } else {
            e.currentTarget.style.transform = "scale(1.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!hasText) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#b9b9b9";
          }
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {hasText ? <Send size={18} /> : <Mic size={20} />}
      </button>
    </div>
  )
}