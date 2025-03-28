import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
     });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: "",
       });
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
       });
    }
  }

  return (
    <div 
      className="absolute" 
      style={{ 
        left: `${cursor.x}px`, 
        top: `${cursor.y}px`,
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
      <>
        <CursorSVG color="#000"/>
        <div 
          className="absolute left-2 top-5 bg-[#3B82F6] px-4 py-2 text-sm leading-relaxed rounded-[20px]"
        >
          {cursorState.previousMessage && (
            <div>{cursorState.previousMessage}</div>
          )}
          <input
            className="z-10 w-60 border-none bg-transparent outline-none"
            autoFocus={true}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={cursorState.previousMessage ? "" : "your thoughts?"}
            value={cursorState.message}
            maxLength={50}
            style={{ color: 'white',
            caretColor:'white'
           }}
          />
        </div>
      </>
      )}
    </div>
  )
}

export default CursorChat