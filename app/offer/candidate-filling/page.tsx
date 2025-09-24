"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Share2, Edit, Copy, Check, Eye, Download, Send, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Candidate {
  id: string
  title?: string
  name: string
  email: string
  mobile: string
  universityRegNo?: string
  collegeName?: string
  collegeLocation?: string
  internDuration?: string
  status: "pending" | "filled"
  submittedAt?: Date
}

export default function CandidateFillingPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      title: "Mr",
      name: "John Doe",
      email: "john@example.com",
      mobile: "+1234567890",
      universityRegNo: "REG123456",
      collegeName: "MIT College of Engineering",
      collegeLocation: "Boston, MA",
      internDuration: "January 2025 to March 2025",
      status: "filled",
      submittedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Ms",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "+1234567891",
      universityRegNo: "REG789012",
      collegeName: "Stanford University",
      collegeLocation: "Stanford, CA",
      internDuration: "February 2025 to April 2025",
      status: "pending",
    },
  ])

  const [shareForm, setShareForm] = useState({
    name: "",
    email: "",
    mobile: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleShareLink = () => {
    if (!shareForm.name || !shareForm.email || !shareForm.mobile) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newCandidate: Candidate = {
      id: Date.now().toString(),
      title: "",
      name: shareForm.name,
      email: shareForm.email,
      mobile: shareForm.mobile,
      status: "pending",
    }

    setCandidates((prev) => [...prev, newCandidate])

    const shareableLink = `${window.location.origin}/candidate-form/${newCandidate.id}`

    navigator.clipboard.writeText(shareableLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)

    toast({
      title: "Link Generated!",
      description: "Candidate link has been copied to clipboard",
    })

    setShareForm({ name: "", email: "", mobile: "" })
    setIsDialogOpen(false)
  }

  const handleEdit = (candidateId: string) => {
    toast({
      title: "Edit Candidate",
      description: "Edit functionality will be implemented",
    })
  }

  const handleSendCertificate = (candidateId: string) => {
    toast({
      title: "Offer Sent",
      description: "Offer has been sent to the candidate",
    })
  }

  const handleViewData = () => {
    toast({
      title: "View Data",
      description: "Displaying all candidate data",
    })
  }

  const handleDownloadData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Title,Name,Email,Mobile,University Reg No,College Name,College Location,Intern Duration,Status,Submitted Date\n" +
      candidates
        .map(
          (candidate) =>
            `${candidate.title || ""},${candidate.name},${candidate.email},${candidate.mobile},${candidate.universityRegNo || ""},${candidate.collegeName || ""},${candidate.collegeLocation || ""},${candidate.internDuration || ""},${candidate.status},${candidate.submittedAt ? candidate.submittedAt.toLocaleDateString() : ""}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "candidate_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Complete",
      description: "Candidate data has been downloaded as CSV",
    })
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (a.submittedAt && b.submittedAt) {
      return b.submittedAt.getTime() - a.submittedAt.getTime()
    }
    if (a.submittedAt && !b.submittedAt) return -1
    if (!a.submittedAt && b.submittedAt) return 1
    return 0
  })

  const filteredCandidates = sortedCandidates.filter((candidate) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      (candidate.title && candidate.title.toLowerCase().includes(query)) ||
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.mobile.includes(query) ||
      (candidate.universityRegNo && candidate.universityRegNo.toLowerCase().includes(query)) ||
      (candidate.collegeName && candidate.collegeName.toLowerCase().includes(query)) ||
      (candidate.collegeLocation && candidate.collegeLocation.toLowerCase().includes(query)) ||
      (candidate.internDuration && candidate.internDuration.toLowerCase().includes(query)) ||
      candidate.status.toLowerCase().includes(query)
    )
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Softcopy Offer</h1>
            <p className="text-xl text-muted-foreground">Manage candidate applications and offer letters</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-lg px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Candidate Link</DialogTitle>
                <DialogDescription>
                  Enter candidate details to generate a personalized application link.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Candidate Name</Label>
                  <Input
                    id="name"
                    value={shareForm.name}
                    onChange={(e) => setShareForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter candidate name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shareForm.email}
                    onChange={(e) => setShareForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    value={shareForm.mobile}
                    onChange={(e) => setShareForm((prev) => ({ ...prev, mobile: e.target.value }))}
                    placeholder="Enter mobile number"
                  />
                </div>
                <Button
                  onClick={handleShareLink}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                >
                  {copiedLink ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Generate & Copy Link
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Candidate Records</h2>
              <div className="flex gap-3">
                <Button
                  onClick={handleViewData}
                  variant="outline"
                  size="sm"
                  className="text-sm px-3 py-2 rounded-full hover:bg-primary/10 transition-all duration-300 bg-transparent"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Data
                </Button>
                <Button
                  onClick={handleDownloadData}
                  size="sm"
                  className="text-sm px-3 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search candidates by title, name, email, college, status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full border-2 focus:border-primary/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>University Reg No</TableHead>
                    <TableHead>College Name</TableHead>
                    <TableHead>College Location</TableHead>
                    <TableHead>Intern Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.title || "-"}</TableCell>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>{candidate.mobile}</TableCell>
                      <TableCell>{candidate.universityRegNo || "-"}</TableCell>
                      <TableCell>{candidate.collegeName || "-"}</TableCell>
                      <TableCell>{candidate.collegeLocation || "-"}</TableCell>
                      <TableCell>{candidate.internDuration || "-"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            candidate.status === "filled"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {candidate.status === "filled" ? "Completed" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>{candidate.submittedAt ? candidate.submittedAt.toLocaleDateString() : "-"}</TableCell>
                      <TableCell className="text-right">
                        {candidate.status === "filled" && (
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(candidate.id)}
                              className="hover:bg-primary/10"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSendCertificate(candidate.id)}
                              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send Offer
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
