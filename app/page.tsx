'use client'

import { ElementRef, useEffect, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from 'split-type'

export default function Home() {
  const mainContainerRef = useRef<ElementRef<'main'>>(null)
  const titleRef = useRef<ElementRef<'h1'>>(null)
  const subtitleRef = useRef<ElementRef<'h2'>>(null)

  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const locomotiveScroll = new LocomotiveScroll()
    })()
  }, [])

  useGSAP(
    () => {
      if (subtitleRef.current !== null && titleRef.current !== null) {
        const subtitle = new SplitText(subtitleRef.current, {
          types: 'words',
          wordClass: 'opacity-0 translate-y-full'
        })
        const title = new SplitText(titleRef.current, {
          types: 'chars',
          charClass: 'opacity-0 translate-y-full'
        })
        const tl = gsap.timeline()
        tl.to(subtitle.words, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power4.out'
        })
        tl.to(
          title.chars,
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: 'power4.out'
          },
          0.5
        )
      }
    },
    { scope: mainContainerRef }
  )

  return (
    <main ref={mainContainerRef}>
      <section className="relative flex h-dvh h-screen w-full flex-col justify-end overflow-hidden em:p-4">
        <div className="">
          <h2
            ref={subtitleRef}
            className="overflow-hidden font-light uppercase italic fluid-3xl"
          >
            :break the wall - Edition
          </h2>
          <h1 ref={titleRef} className="fluid-wide">
            N&apos;BLAZE
          </h1>
        </div>
      </section>
      <div className="h-screen bg-red-200"></div>
      <div className="h-screen bg-red-200"></div>
    </main>
  )
}
