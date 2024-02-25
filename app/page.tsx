'use client'

import { ElementRef, useEffect, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import Hero from '@/components/Hero'
import MembersGallery from '@/components/MembersGallery'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const wrapperRef = useRef<ElementRef<'div'>>(null)
  const mainContainerRef = useRef<ElementRef<'main'>>(null)

  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const locomotiveScroll = new LocomotiveScroll({})
    })()
  }, [])

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-bgcolor]')
      sections.forEach((section, i) => {
        const prevBg = i === 0 ? '' : sections[i - 1].dataset.bgcolor
        const prevText = i === 0 ? '' : sections[i - 1].dataset.textcolor
        gsap.to(section, {
          scrollTrigger: {
            immediateRender: false,
            trigger: section,
            scrub: true,
            start: 'top 50%',
            onEnter: () =>
              gsap.to(mainContainerRef.current, {
                backgroundColor: `oklch(var(${section.dataset.bgcolor}))`,
                color: `oklch(var(${section.dataset.textcolor}))`,
                overwrite: 'auto'
              }),
            onLeaveBack: () =>
              gsap.to(mainContainerRef.current, {
                backgroundColor: `oklch(var(${prevBg}))`,
                color: `oklch(var(${prevText}))`,
                overwrite: 'auto'
              })
          }
        })
      })
    },
    {
      scope: mainContainerRef,
      dependencies: [gsap]
    }
  )

  return (
    <div ref={wrapperRef} data-module-scroll="main">
      <main
        ref={mainContainerRef}
        data-scroll-container
        className="transition-colors duration-1000"
      >
        <Hero />
        <MembersGallery />
        <div
          className="h-screen"
          data-bgcolor="--color-accent"
          data-textcolor="--color-dark"
        ></div>
      </main>
    </div>
  )
}
