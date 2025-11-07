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
    <div 
      className="flex items-center gap-2 px-4 py-2.5 bg-(--color-inputBg) shadow-xl border border-(--color-border) mx-3 md:mx-5 mb-3"
      style={{
        borderRadius: "24px",
        minHeight: "48px",
      }}
    >
      <div className="flex items-center gap-1">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
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
          <Smile size={18} />
        </button>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
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
          <Paperclip size={18} />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          className="w-full resize-none px-2 py-1 bg-transparent outline-none hide-scrollbar text-textPrimary placeholder:text-textSecondary text-[15px] leading-5"
          placeholder="Type a message"
          style={{ maxHeight: "120px" }}
        />
      </div>
      <button
        onClick={hasText ? send : undefined}
        className={`w-9 h-9 rounded-full grid place-items-center transition-all duration-200 ${hasText ? 'bg-whatsappGreen text-white' : ''}`}
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
        {hasText ? <Send size={16} /> : <Mic size={18} />}
      </button>
    </div>
  )
}