"use client"

import { Button } from "@/components/ui/button"
import { File, Users } from "lucide-react"
import Link from "next/link"

export default function OfferPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Offer Letter</h1>
          <p className="text-xl text-muted-foreground">Choose your offer letter type</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/offer/candidate-filling">
            <Button
              size="lg"
              className="w-full h-40 text-xl flex flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 text-white shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <File className="h-10 w-10 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 font-semibold">Softcopy Offer</span>
            </Button>
          </Link>

          <Link href="/offer/physical-offer">
            <Button
              size="lg"
              className="w-full h-40 text-xl flex flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Users className="h-10 w-10 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10 font-semibold">Physical Offer</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
