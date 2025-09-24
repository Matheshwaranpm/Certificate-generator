"use client"

import { Card } from "@/components/ui/card"
import { Award, Star, Medal as Seal } from "lucide-react"

interface CertificateData {
  recipientName: string
  courseName: string
  organizationName: string
  completionDate: string
  instructorName: string
  description: string
  template: string
}

interface CertificatePreviewProps {
  data: CertificateData
}

export function CertificatePreview({ data }: CertificatePreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTemplateStyles = () => {
    switch (data.template) {
      case "elegant":
        return {
          border: "border-amber-200 dark:border-amber-800",
          bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
          accent: "text-amber-600 dark:text-amber-400",
          pattern: "certificate-pattern",
        }
      case "modern":
        return {
          border: "border-blue-200 dark:border-blue-800",
          bg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
          accent: "text-blue-600 dark:text-blue-400",
          pattern: "",
        }
      case "classic":
        return {
          border: "border-green-200 dark:border-green-800",
          bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
          accent: "text-green-600 dark:text-green-400",
          pattern: "",
        }
      default: // professional
        return {
          border: "certificate-border",
          bg: "bg-gradient-to-br from-background to-muted/50 certificate-pattern",
          accent: "text-primary",
          pattern: "certificate-pattern",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <Card
      id="certificate-preview"
      className={`p-8 aspect-[4/3] ${styles.border} border-8 ${styles.bg} relative overflow-hidden print:shadow-none`}
    >
      {/* Decorative corners */}
      <div className="absolute top-4 left-4">
        <Star className={`h-6 w-6 ${styles.accent}`} />
      </div>
      <div className="absolute top-4 right-4">
        <Star className={`h-6 w-6 ${styles.accent}`} />
      </div>
      <div className="absolute bottom-4 left-4">
        <Seal className={`h-6 w-6 ${styles.accent}`} />
      </div>
      <div className="absolute bottom-4 right-4">
        <Seal className={`h-6 w-6 ${styles.accent}`} />
      </div>

      <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10`}>
            <Award className={`h-5 w-5 ${styles.accent}`} />
            <span className={`text-sm font-medium ${styles.accent}`}>CERTIFICATE OF COMPLETION</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 max-w-md">
          <p className="text-lg text-muted-foreground">This is to certify that</p>

          <h1 className={`text-3xl font-bold ${styles.accent} text-balance`}>{data.recipientName}</h1>

          <p className="text-base text-muted-foreground">has successfully completed</p>

          <h2 className="text-xl font-semibold text-foreground text-balance">{data.courseName}</h2>

          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{data.description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between w-full max-w-md pt-6 border-t border-border/50">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{data.organizationName}</p>
            <p className="text-xs text-muted-foreground">Organization</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{formatDate(data.completionDate)}</p>
            <p className="text-xs text-muted-foreground">Date</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{data.instructorName}</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
