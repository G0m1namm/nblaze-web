'use client'

import { ElementRef, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import GuerrillaVideoPoster from '../../public/images/video_thumbnail.webp'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
  const sectionRef = useRef<ElementRef<'section'>>(null)
  const videoContainerRef = useRef<ElementRef<'div'>>(null)
  const {
    ref: inViewRef,
    inView,
    entry
  } = useInView({
    threshold: 0.7
  })

  useGSAP(
    () => {
      if (sectionRef.current && videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          ease: 'none',
          borderRadius: 10,
          width: '100%',
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: true
          }
        })
      }
    },
    {
      scope: sectionRef,
      dependencies: [sectionRef.current, videoContainerRef.current]
    }
  )

  useEffect(() => {
    const poster = entry?.target as HTMLVideoElement
    if (!poster) return
    if (inView) {
      poster.muted = true
      poster.play()
      poster.muted = false
    } else {
      poster.pause()
    }
  }, [inView, entry?.target])

  return (
    <section
      ref={sectionRef}
      className="relative mt-[10vh] flex h-dvh items-center em:p-16 sm:em:p-8 md:mt-[20vh] md:em:p-4 xl:mt-[40vh]"
      data-bgcolor="--color-accent"
      data-textcolor="--color-primary"
    >
      <div
        ref={videoContainerRef}
        className="mx-auto aspect-video w-full origin-center translate-y-2/3 overflow-hidden rounded-[50px] border border-accent md:w-10/12"
      >
        <video
          ref={inViewRef}
          width="100%"
          height="100%"
          controls
          preload="true"
          poster={GuerrillaVideoPoster.src}
          autoPlay={false}
        >
          <source
            src={require('../../videos/Guerrilla.mp4')}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
