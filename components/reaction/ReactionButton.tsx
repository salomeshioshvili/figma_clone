import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
};

const ReactionSelector = ({ setReaction }: Props) => (
  <div 
    style={{
      position: 'absolute',
      bottom: '5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      borderRadius: '9999px',
      padding: '0.5rem 1rem',
      display: 'flex',
      gap: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 9999,
    }}
  >
    <ReactionButton reaction="👍" onSelect={setReaction} />
    <ReactionButton reaction="🔥" onSelect={setReaction} />
    <ReactionButton reaction="😍" onSelect={setReaction} />
    <ReactionButton reaction="👀" onSelect={setReaction} />
    <ReactionButton reaction="😱" onSelect={setReaction} />
    <ReactionButton reaction="🙁" onSelect={setReaction} />
  </div>
);

type ReactionButtonProps = {
  reaction: string;
  onSelect: (reaction: string) => void;
};

const ReactionButton = ({ reaction, onSelect }: ReactionButtonProps) => (
  <button
    style={{
      padding: '0.5rem',
      fontSize: '1.25rem',
      transition: 'transform 0.2s ease',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.3)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
    onPointerDown={(e) => {
      e.stopPropagation();
      onSelect(reaction);
    }}
  >
    {reaction}
  </button>
);

export default ReactionSelector;