"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CertificatePreview } from "@/components/certificate-preview"
import { Download, Award, Sparkles } from "lucide-react"

interface CertificateData {
  recipientName: string
  courseName: string
  organizationName: string
  completionDate: string
  instructorName: string
  description: string
  template: string
}

export function CertificateGenerator() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: "John Smith",
    courseName: "Advanced Web Development",
    organizationName: "TechCorp Academy",
    completionDate: new Date().toISOString().split("T")[0],
    instructorName: "Dr. Sarah Johnson",
    description:
      "Has successfully completed the comprehensive course requirements and demonstrated exceptional proficiency in modern web development technologies.",
    template: "professional", // Set professional template as default as requested
  })

  const handleInputChange = (field: keyof CertificateData, value: string) => {
    setCertificateData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    const element = document.getElementById("certificate-preview")
    if (element) {
      // This is a simplified version - in production you'd use a library like jsPDF or html2canvas
      window.print()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-balance">Certificate Generator</h1>
          <div className="p-3 rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Create professional certificates in minutes. Perfect for courses, achievements, and recognition programs.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certificate Details
            </CardTitle>
            <CardDescription>Fill in the information to generate your certificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  value={certificateData.recipientName}
                  onChange={(e) => handleInputChange("recipientName", e.target.value)}
                  placeholder="Enter recipient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={certificateData.completionDate}
                  onChange={(e) => handleInputChange("completionDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">Course/Achievement Name</Label>
              <Input
                id="courseName"
                value={certificateData.courseName}
                onChange={(e) => handleInputChange("courseName", e.target.value)}
                placeholder="Enter course or achievement name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  value={certificateData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  placeholder="Enter organization name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructorName">Instructor/Issuer Name</Label>
                <Input
                  id="instructorName"
                  value={certificateData.instructorName}
                  onChange={(e) => handleInputChange("instructorName", e.target.value)}
                  placeholder="Enter instructor name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Certificate Template</Label>
              <Select value={certificateData.template} onValueChange={(value) => handleInputChange("template", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={certificateData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter certificate description"
                rows={3}
              />
            </div>

            <Button onClick={handleDownload} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Live Preview</h2>
            <div className="text-sm text-muted-foreground">Template: {certificateData.template}</div>
          </div>
          <CertificatePreview data={certificateData} />
        </div>
      </div>
    </div>
  )
}
