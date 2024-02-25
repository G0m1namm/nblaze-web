import Image from 'next/image'

import { MEMBERS_DATA } from '@/lib/member-data'

export default function MembersGallery() {
  return (
    <section
      className="relative em:mt-52"
      data-bgcolor="--color-primary"
      data-textcolor="--color-dark"
    >
      <div className="grid grid-cols-[repeat(8,1fr)] em:px-5">
        {MEMBERS_DATA.map((member) => (
          <picture
            key={`member-${member.row}-${member.col}`}
            style={{ gridRow: member.row, gridColumn: member.col }}
            className="relative block aspect-[3/4] w-full bg-dark will-change-transform"
            data-scroll
            data-scroll-speed={Math.random() * 0.3 - 0.1}
          >
            <Image
              className="object-cover will-change-[transform,opacity]"
              src={`/images/members/${member.src}`}
              alt={`${member.alt} Nblaze member`}
              sizes="20vw"
              fill
            />
          </picture>
        ))}
      </div>
    </section>
  )
}
