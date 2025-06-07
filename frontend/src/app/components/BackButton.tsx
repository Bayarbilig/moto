// app/(components)/BackButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
    >
      <ArrowLeft size={16} />
      Буцах
    </button>
  )
}
