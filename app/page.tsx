'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const locomotiveScroll = new LocomotiveScroll()
    })()
  }, [])

  return (
    <main className="space-y-2">
      <div className="h-screen bg-red-200"></div>
      <div className="h-screen bg-red-200"></div>
      <div className="h-screen bg-red-200"></div>
    </main>
  )
}
