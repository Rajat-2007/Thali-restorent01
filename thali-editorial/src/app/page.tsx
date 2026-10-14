'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { HeroSection } from '@/components/sections/HeroSection'
import { EditorialStory } from '@/components/sections/EditorialStory'
import { SamosaSection } from '@/components/sections/SamosaSection'
import { SpicesSection } from '@/components/sections/SpicesSection'
import { CraftProcess } from '@/components/sections/CraftProcess'
import { SignatureSauces } from '@/components/sections/SignatureSauces'
import { DiningExperience } from '@/components/sections/DiningExperience'
import { ReservationCTA } from '@/components/sections/ReservationCTA'
import { NavBar } from '@/components/layout/NavBar'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <NavBar />
      <main id="main-content" role="main">
        <HeroSection />
        <EditorialStory />
        <SamosaSection />
        <SpicesSection />
        <CraftProcess />
        <SignatureSauces />
        <DiningExperience />
        <ReservationCTA />
      </main>
    </>
  )
}
