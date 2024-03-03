'use client'

import { ElementRef, useEffect, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'

import Hero from '@/components/Hero'
import MembersGallery from '@/components/MembersGallery'
import VideoSection from '@/components/VideoSection'

import RedMoon from '../public/images/red-moon.webp'

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
      dependencies: [gsap, wrapperRef.current]
    }
  )

  return (
    <div ref={wrapperRef} data-module-scroll="main">
      <main
        ref={mainContainerRef}
        data-scroll-container
        className="relative transition-colors duration-1000"
      >
        <div
          className="absolute left-1/2 top-[50vh] aspect-square w-full -translate-x-1/2 opacity-0 transition-opacity duration-500 md:top-[40vh] md:w-2/3 xl:top-[10vh] 2xl:w-1/2"
          data-scroll
          data-scroll-repeat
          data-scroll-class="opacity-100"
        >
          <Image
            data-scroll
            data-scroll-speed="-0.3"
            className="mask-fade"
            src={RedMoon}
            alt="Red Moon"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 70vw, 100vw"
            fill
          />
        </div>
        <Hero />
        <MembersGallery />
        <VideoSection />
      </main>
    </div>
  )
}
