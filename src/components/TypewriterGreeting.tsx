'use client'

import { useEffect, useState } from 'react'

const PHRASES = [
  '/hassan',
  '/platform-engineer',
  '/writer',
  '/design-and-architecture-enthusiast',
]

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 1600
const PAUSE_AFTER_DELETE = 300

export default function TypewriterGreeting() {
  const [displayed, setDisplayed] = useState(PHRASES[0])
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(PHRASES[0].length)
  const [deleting, setDeleting] = useState(true)

  useEffect(() => {
    const current = PHRASES[phraseIndex]

    if (!deleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setCharIndex(i => i + 1)
          setDisplayed(current.slice(0, charIndex + 1))
        }, TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE)
        return () => clearTimeout(t)
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setCharIndex(i => i - 1)
          setDisplayed(current.slice(0, charIndex - 1))
        }, DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        const next = (phraseIndex + 1) % PHRASES.length
        const t = setTimeout(() => {
          setPhraseIndex(next)
          setDeleting(false)
        }, PAUSE_AFTER_DELETE)
        return () => clearTimeout(t)
      }
    }
  }, [charIndex, deleting, phraseIndex])

  return (
    <p className="text-[15px] font-medium font-mono mb-5 tracking-tight">
      <span className="text-[#111]">Hi, I&apos;m </span>
      <span className="text-[#4f7ef8]">{displayed}</span>
      <span className="inline-block w-[2px] h-[1em] bg-[#4f7ef8] ml-[1px] align-text-bottom cursor-blink" />
    </p>
  )
}
