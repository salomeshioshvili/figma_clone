import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursor from "./cursor/LiveCursor"
import { useCallback, useEffect, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState, Reaction } from "@/types/type";
import ReactionSelector from "./reaction/ReactionButton";
import FlyingReaction from "./reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";

const REACTION_TIMEOUT = 4000; 

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  })

  const [reactions, setReactions] = useState<Reaction[]>([]);

  useInterval(() => {
    if(cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );
    }
  }, 100);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setReactions((reactions) => 
        reactions.filter((reaction) => now - reaction.timestamp < REACTION_TIMEOUT)
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
  
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
  
      updateMyPresence({ cursor: { x, y } });
    }
  }, [cursor, cursorState.mode, updateMyPresence]);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, [updateMyPresence]);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });

    setCursorState((state: CursorState) =>
      state.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
    );
  }, [updateMyPresence]);

  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      state.mode === CursorMode.Reaction ? { ...state, isPressed: false } : state
    );
  }, []);

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (event.key === "Escape") {
        updateMyPresence({ message: null });
        setCursorState({
          mode: CursorMode.Hidden,
        });
      } else if (event.key === "e") {
        setCursorState({
          mode: CursorMode.ReactionSelector,
        });
      }
    }
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
      }
    }
    
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    }
  }, [updateMyPresence]);

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ 
      mode: CursorMode.Reaction, 
      reaction, 
      isPressed: false 
    });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="w-full h-screen flex justify-center items-center text-center relative"
    >
      <h1 className="text-2xl text-black">Figma Clone</h1>

      <div className="absolute inset-0 pointer-events-none">
        {reactions.map((reaction) => (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        ))}
      </div>

      {cursor && cursorState.mode === CursorMode.Chat && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector
          setReaction={setReaction}
        />
      )}
      
      <LiveCursor others={others} />
    </div>
  )
}

export default Live;