import { ElementRef, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import SplitText from 'split-type'

import { MEMBERS_DATA } from '@/lib/member-data'

gsap.registerPlugin(ScrollTrigger)

export default function MembersGallery() {
  const sectionRef = useRef<ElementRef<'section'>>(null)
  const titleRef = useRef<ElementRef<'div'>>(null)

  useGSAP(
    () => {
      if (sectionRef.current && titleRef.current) {
        const title = new SplitText(titleRef.current, {
          types: 'chars',
          charClass: 'opacity-0 translate-y-full'
        })
        const items = sectionRef.current.querySelectorAll('picture')
        items.forEach((item) => {
          const image = item.querySelector('img')
          gsap.to(image, {
            scrollTrigger: {
              trigger: item
            }
          })
          gsap.to(item, {
            ease: 'none',
            opacity: 0,
            scrollTrigger: {
              trigger: item,
              start: '-50% top',
              end: 'bottom top',
              scrub: true
            }
          })
        })

        gsap.to(title.chars, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            toggleActions: 'play reverse play reverse'
          }
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative isolate mt-[25vh] md:mt-[40vh] xl:mt-[80vh]"
      data-bgcolor="--color-dark"
      data-textcolor="--color-accent"
    >
      <div className="fixed bottom-0 left-0 z-10 flex h-screen max-h-dvh flex-col justify-end em:p-16 sm:em:p-8 md:em:p-4">
        <h2
          ref={titleRef}
          className="overflow-hidden uppercase  fluid-4xl sm:fluid-6xl"
        >
          Miembros
        </h2>
      </div>
      <div className="grid grid-cols-[repeat(4,1fr)] em:px-16 md:em:px-28 xl:em:px-[10vw] ">
        {MEMBERS_DATA.map((member) => (
          <picture
            key={`member-${member.row}-${member.col}`}
            style={{ gridRow: member.row, gridColumn: member.col }}
            className="relative block aspect-[3/4] w-full bg-dark will-change-transform"
            data-scroll
            data-scroll-speed={member.speed}
          >
            <div className="absolute -top-[25px] left-0 transition-transform duration-500 md:-top-[30px] lg:-top-[4vh]">
              <span className="uppercase fluid-sm md:fluid-base lg:fluid-lg">
                {member.alt}
              </span>
            </div>
            <Image
              className="object-cover "
              src={`/images/members/${member.src}`}
              alt={`${member.alt} Nblaze member`}
              sizes="(max-width: 768px) 200px, (max-width: 1200px) 400px, 500px"
              fill
              data-scroll
              data-scroll-repeat
            />
          </picture>
        ))}
      </div>
    </section>
  )
}
