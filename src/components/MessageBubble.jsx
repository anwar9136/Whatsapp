import React from 'react'

function TickIcon({ filled, blue }) {
  // simple double tick SVG. `filled` shows two ticks, `blue` colors them.
  return (
    <svg
      className={`w-4 h-4 ${blue ? 'text-blue-500' : 'text-gray-400'}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13l4 4L11 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13l4 4L21 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MessageBubble({ m, isMine }) {
  const containerClasses = isMine ? 'justify-end' : 'justify-start'
  const bubbleClasses = isMine
    ? 'bg-(--color-bubbleOutgoing) text-textPrimary rounded-2xl rounded-tr-sm'
    : 'bg-(--color-bubbleIncoming) text-textPrimary rounded-2xl rounded-tl-sm'

  // inline style for smoother padding and bubble expansion
  const bubbleStyle = {
    padding: '1px 13px',
    margin: '4px 0',
    maxWidth: '70%',
    fontSize: '15px',
    lineHeight: '1.6',
    wordBreak: 'break-word',
  }

  const timeStyle = {
    fontSize: '11px',
    marginTop: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '3px',
  }

  return (
    <div className={`w-full flex ${containerClasses} mb-3`}>
      <div className={`${bubbleClasses}`} style={bubbleStyle}>
        <div className="select-text">{m.body}</div>
        <div style={timeStyle}>
          <span className="text-textSecondary">
            {new Date(m.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isMine && (
            <span className="ml-1">
              {m.status === 'sent' && <TickIcon filled={false} blue={false} />}
              {m.status === 'delivered' && (
                <TickIcon filled={true} blue={false} />
              )}
              {m.status === 'read' && <TickIcon filled={true} blue={true} />}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
