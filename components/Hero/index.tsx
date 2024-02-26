import { ElementRef, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SplitText from 'split-type'

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
        const subtitleGsap = gsap.to(subtitle.words, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power4.out'
        })
        const titleGsap = gsap.to(title.chars, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power4.out'
        })

        const playHomeTextAnimation = () => {
          titleGsap.play()
          subtitleGsap.play()
        }
        const reverseHomeTextAnimation = () => {
          titleGsap.reverse()
          subtitleGsap.reverse()
        }

        gsap.to(sectionRef.current, {
          delay: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 20%',
            end: 'bottom 70%',
            onEnter: playHomeTextAnimation,
            onLeave: reverseHomeTextAnimation,
            onEnterBack: playHomeTextAnimation,
            onLeaveBack: reverseHomeTextAnimation
          }
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-dvh w-full flex-col justify-end overflow-hidden transition-[padding] em:p-16 sm:em:p-8 md:em:p-4"
      data-bgcolor="--color-dark"
      data-textcolor="--color-accent"
    >
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
