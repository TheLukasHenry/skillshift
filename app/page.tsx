'use client'
import 'regenerator-runtime/runtime'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MicrophoneComponent from '@/components/MicrophoneComponent'
import Dictaphone from '@/components/Dictaphone'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-gray-100">
      <MicrophoneComponent />
      {/* <Dictaphone /> */}
    </main>
  )
}
