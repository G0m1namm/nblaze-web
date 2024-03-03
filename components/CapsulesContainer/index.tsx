import { ElementRef, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import CapsulePhysics from '@/components/CapsulePhysics'

gsap.registerPlugin(ScrollTrigger)

export default function CapsulesContainer() {
  const capsuleContainerRef = useRef<ElementRef<'div'>>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
    delay: 1
  })

  return (
    <section
      ref={inViewRef}
      className="relative h-dvh"
      data-bgcolor="--color-primary"
      data-textcolor="--color-accent"
    >
      <div
        ref={capsuleContainerRef}
        className="mx-auto h-full overflow-hidden rounded-[50px]"
      >
        {capsuleContainerRef.current && (
          <CapsulePhysics
            containerElement={capsuleContainerRef.current}
            inView={inView}
          />
        )}
      </div>
    </section>
  )
}
