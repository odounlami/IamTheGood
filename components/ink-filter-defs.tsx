// Shared SVG filter that roughens the edges of stamp elements so they read
// as hand-stamped ink rather than a clean vector circle. Rendered once,
// referenced everywhere via `filter: url(#ink-roughen)`.
export function InkFilterDefs() {
  return (
    <svg aria-hidden className="pointer-events-none absolute size-0 overflow-hidden">
      <filter id="ink-roughen" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
