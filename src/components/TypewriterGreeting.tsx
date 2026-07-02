'use client'

import { useEffect, useState } from 'react'

const DEFAULT_PHRASES = [
  '/hassan',
  '/platform-engineer',
  '/writer',
  '/design-and-architecture-enthusiast',
]

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 1600
const PAUSE_AFTER_DELETE = 300

export default function TypewriterGreeting({
  prefix = "Hi, I'm ",
  phrases: phrasesProp,
}: {
  prefix?: string
  phrases?: string[]
}) {
  const phrases = phrasesProp && phrasesProp.length > 0 ? phrasesProp : DEFAULT_PHRASES
  const [displayed, setDisplayed] = useState(phrases[0])
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(phrases[0].length)
  const [deleting, setDeleting] = useState(true)

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length]

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
        const next = (phraseIndex + 1) % phrases.length
        const t = setTimeout(() => {
          setPhraseIndex(next)
          setDeleting(false)
        }, PAUSE_AFTER_DELETE)
        return () => clearTimeout(t)
      }
    }
  }, [charIndex, deleting, phraseIndex, phrases])

  return (
    <p className="text-[15px] font-medium font-mono mb-5 tracking-tight">
      <span className="text-[#111]">{prefix}</span>
      <span className="text-(--accent)">{displayed}</span>
      <span className="inline-block w-[2px] h-[1em] bg-(--accent) ml-[1px] align-text-bottom cursor-blink" />
    </p>
  )
}
