import CursorSVG from "@/public/assets/CursorSVG"

type Props = {
  color: string,
  x: number,
  y: number,
  message: string
}
const Cursor = ({ color, x, y, message}: Props) => {
  return (
    <div className="pointer-events-none absolute" style={{ left: `${x}px`, top: `${y}px` }}>
      <CursorSVG color={color}/>

      {message && (
        <div 
          className="absolute left-2 top-5 px-4 py-2 text-sm leading-relaxed rounded-[20px]" 
          style={{ backgroundColor: color }}
        >
          <input
            className="z-10 w-60 border-none bg-transparent outline-none whitespace-nowrap"
            value={message}
            readOnly
            style={{ color: 'white' }}
          />
        </div>
      )}
    </div>
  )
}

export default Cursor