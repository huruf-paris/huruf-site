'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleHoverEnter = () => cursorRef.current?.classList.add('hovering')
    const handleHoverLeave = () => cursorRef.current?.classList.remove('hovering')

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t

    const animate = () => {
      if (cursorRef.current) {
        currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.18)
        currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.18)
        cursorRef.current.style.left = `${currentRef.current.x}px`
        cursorRef.current.style.top = `${currentRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter)
      el.addEventListener('mouseleave', handleHoverLeave)
    })

    document.addEventListener('mousemove', handleMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}
