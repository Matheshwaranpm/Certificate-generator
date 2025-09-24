"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, CreditCard } from "lucide-react"
import Link from "next/link"

const motivationalQuotes = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  },
  {
    text: "The only way to do great work is to love what you do.",
  },
  {
    text: "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.",
  },
  {
    text: "Your limitation—it's only your imagination.",
  },
  {
    text: "Great things never come from comfort zones.",
  },
  {
    text: "Dream it. Wish it. Do it.",
  },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
  },
]

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">VCODEZ</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional certificates, offer letters, and ID cards with ease. Streamline your document generation
            process with our powerful tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/certificates">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <FileText className="mr-2 h-5 w-5" />
                Create Certificate
              </Button>
            </Link>
            <Link href="/offer">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
              >
                <Users className="mr-2 h-5 w-5" />
                Offer Letter
              </Button>
            </Link>
            <Link href="/id-card">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <CreditCard className="mr-2 h-5 w-5" />
                ID Card
              </Button>
            </Link>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto mb-16 transform scale-75">
          <CardContent className="p-8 text-center">
            <blockquote className="text-lg font-medium text-gray-700 mb-4 transition-all duration-1000 ease-in-out">
              "{motivationalQuotes[currentQuote].text}"
            </blockquote>

            <div className="flex justify-center gap-2">
              {motivationalQuotes.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentQuote ? "bg-green-500 w-8" : "bg-gray-300 w-2"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Certificates</h3>
              <p className="text-gray-600">
                Design and generate beautiful certificates for achievements, courses, and awards.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Offer Letters</h3>
              <p className="text-gray-600">
                Create professional offer letters and manage candidate applications efficiently.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center">
              <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ID Cards</h3>
              <p className="text-gray-600">
                Generate professional ID cards for employees, students, and organization members.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
