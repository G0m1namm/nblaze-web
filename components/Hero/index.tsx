import { ElementRef, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Image from 'next/image'
import SplitText from 'split-type'

import RedMoon from '../../public/images/red-moon.webp'

export default function Hero() {
  const sectionRef = useRef<ElementRef<'h1'>>(null)
  const titleRef = useRef<ElementRef<'h1'>>(null)
  const subtitleRef = useRef<ElementRef<'h2'>>(null)

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
          ease: 'power4.out',
          onUpdate: console.log
        }).to(title.chars, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power4.out',
          onUpdate: console.log
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-dvh h-screen w-full flex-col justify-end overflow-x-hidden transition-[padding] em:p-16 sm:em:p-8 md:em:p-4 "
      data-bgcolor="--color-dark"
      data-textcolor="--color-accent"
    >
      <div
        className="absolute bottom-0 left-1/2 z-[0] aspect-square w-full -translate-x-1/2 opacity-0 transition-opacity duration-500 md:w-2/3 2xl:-bottom-[5%] 2xl:w-1/2"
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
      <div>
        <h2
          ref={subtitleRef}
          className="overflow-hidden font-light uppercase italic fluid-sm sm:fluid-xl lg:fluid-3xl"
        >
          :break the wall - Edition
        </h2>
        <h1 ref={titleRef} className="sm:fluid-wide fluid-5xl">
          N&apos;BLAZE
        </h1>
      </div>
    </section>
  )
}
