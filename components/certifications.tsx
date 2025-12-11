"use client"

import { getCertifications } from "@/lib/certifications"
import { PaginatedList } from "@/components/ui/paginated-list"

export function Certifications() {
  const certifications = getCertifications()

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-8">Certifications</h2>
        <PaginatedList
          items={certifications}
          itemsPerPage={10}
          threshold={20}
          className="space-y-4"
        >
          {(cert, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-0">
              <p className="font-medium">{cert.title}</p>
              <p className="text-sm text-muted-foreground">{cert.provider}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Issued: {cert.issued}
                {cert.expires && ` · Expires: ${cert.expires}`}
                {cert.credentialId && ` · ID: ${cert.credentialId}`}
              </p>
            </div>
          )}
        </PaginatedList>
      </div>
    </section>
  )
}
