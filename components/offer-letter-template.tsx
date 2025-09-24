import type React from "react"

interface OfferLetterProps {
  candidate: {
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
}

export const OfferLetterTemplate: React.FC<OfferLetterProps> = ({ candidate }) => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-black p-12 font-serif leading-relaxed"
      style={{ minHeight: "297mm" }}
    >
      {/* Date aligned to right */}
      <div className="text-right mb-8">
        <p className="text-base">{currentDate}</p>
      </div>

      {/* Candidate Details */}
      <div className="mb-6">
        <p className="mb-1">
          {candidate.title}. {candidate.name}
        </p>
        <p className="mb-1">Reg. No. {candidate.universityRegNo || "N/A"}</p>
        <p className="mb-1">{candidate.collegeName || "College Name"},</p>
        <p className="mb-4">{candidate.collegeLocation || "Location"}.</p>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <p>
          Dear <span className="font-semibold">{candidate.name}</span>,
        </p>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <p className="font-semibold">Subject: Internship Confirmation</p>
      </div>

      {/* Letter Body - matching exact company template */}
      <div className="space-y-4 text-justify leading-relaxed">
        <p>
          We are delighted to offer you the opportunity to join <span className="font-semibold">VCODEZ</span> as an
          Intern. After thorough evaluation of your application and profile, we are pleased to confirm that you have met
          the eligibility criteria for this opportunity.
        </p>

        <p>
          Your internship will commence from <span className="font-semibold">October 2025</span> and conclude in{" "}
          <span className="font-semibold">December 2025</span>. During this period, you will work collaboratively with
          our <span className="font-semibold">Technical Team</span> and actively contribute to projects aligned with
          your field of study.
        </p>

        <p>
          At the end of the internship, your performance will be evaluated based on your contributions and learning
          outcomes. We are confident that this experience will provide you with significant professional growth and
          industry exposure.
        </p>

        <p>
          We are excited to have you as part of the <span className="font-semibold">VCODEZ</span> family and look
          forward to witnessing your growth as you innovate and contribute to meaningful projects.
        </p>
      </div>

      {/* Signature Section */}
      <div className="mt-15">
        <p className="mb-12">
          For <span className="font-semibold">VCODEZ</span>
        </p>

        <div className="mt-25">
          <p className="font-semibold">Vishnu S</p>
          <p>Manager – Human Resources</p>
        </div>
      </div>
    </div>
  )
}

export const generateOfferLetterPDF = async (candidate: OfferLetterProps["candidate"]) => {
  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Offer Letter - ${candidate.name}</title>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Times New Roman', serif; 
            line-height: 1.5; 
            color: #000; 
            background: white;
            padding: 60px;
            font-size: 15px;
          }
          .date-right { 
            text-align: right; 
            margin-bottom: 40px; 
          }
          .candidate-info { 
            margin-bottom: 30px; 
            line-height: 1.5;
          }
          .greeting { 
            margin-bottom: 30px; 
          }
          .subject { 
            margin-bottom: 30px; 
            font-weight: bold;
          }
          .content { 
            text-align: justify; 
            line-height: 1.5; 
            margin-bottom: 60px;
          }
          .content p { 
            margin-bottom: 20px; 
          }
          .signature-section { 
            margin-top: 80px; 
          }
          @media print {
            body { padding: 40px; }
          }
        </style>
      </head>
      <body>
        <div class="date-right">
          <p>${currentDate}</p>
        </div>

        <div class="candidate-info">
          <p>${candidate.title}. ${candidate.name}</p>
          <p>Reg. No. ${candidate.universityRegNo || "N/A"}</p>
          <p>${candidate.collegeName || "College Name"},</p>
          <p>${candidate.collegeLocation || "Location"}.</p>
        </div>

        <div class="greeting">
          <p>Dear <span style="font-weight: bold;">${candidate.name}</span>,</p>
        </div>

        <div class="subject">
          <p>Subject: Internship Confirmation</p>
        </div>

        <div class="content">
          <p>We are delighted to offer you the opportunity to join <span style="font-weight: bold;">VCODEZ</span> as an Intern. After thorough evaluation of your application and profile, we are pleased to confirm that you have met the eligibility criteria for this opportunity.</p>

          <p>Your internship will commence from <span style="font-weight: bold;">October 2025</span> and conclude in <span style="font-weight: bold;">December 2025</span>. During this period, you will work collaboratively with our <span style="font-weight: bold;">Technical Team</span> and actively contribute to projects aligned with your field of study.</p>

          <p>At the end of the internship, your performance will be evaluated based on your contributions and learning outcomes. We are confident that this experience will provide you with significant professional growth and industry exposure.</p>

          <p>We are excited to have you as part of the <span style="font-weight: bold;">VCODEZ</span> family and look forward to witnessing your growth as you innovate and contribute to meaningful projects.</p>
        </div>

        <div class="signature-section">
          <p style="margin-bottom: 60px;">For VCODEZ</p>
          <p style="font-weight: bold;">Vishnu S</p>
          <p>Manager – Human Resources</p>
        </div>
      </body>
    </html>
  `

  // Write content to the new window
  printWindow.document.write(htmlContent)
  printWindow.document.close()

  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }
}
