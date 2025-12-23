"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin, Check } from "lucide-react"
import { HashnodeIcon } from "@/components/icons/hashnode-icon"

const GitLabIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
  </svg>
)

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    honey: "", // honeypot
  })

  const isValid = useMemo(() => {
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.message.trim()) return false
    if (formValues.name.length > 80 || formValues.message.length > 2000) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(formValues.email)
  }, [formValues])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!isValid) {
      setErrorMessage("Please double-check your name, email, and message.")
      return
    }

    // basic honeypot check to deter bots
    if (formValues.honey) {
      setErrorMessage("Something went wrong. Please try again.")
      return
    }

    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set("_captcha", "true")
    formData.set("_replyto", formValues.email)

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch("https://formsubmit.co/ajax/marwanayman.shawky@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        setStatus("sent")
        setFormValues({ name: "", email: "", message: "", honey: "" })
        setTimeout(() => setStatus("idle"), 4000)
      } else {
        const bodyText = await response.text().catch(() => "")
        console.error("Form submission failed:", response.status, response.statusText, bodyText)
        setErrorMessage("Could not send right now. Please try again shortly.")
        setStatus("error")
      }
    } catch (err) {
      clearTimeout(timeoutId)
      if (err instanceof Error && err.name === "AbortError") {
        console.error("Form submission timed out")
      } else {
        console.error("Form submission error:", err)
      }
      setErrorMessage("Network timeout or error. Please retry.")
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-12 border-t content-auto">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          I'm always open to discussing new opportunities, interesting projects, or just having a
          conversation about DevOps and cloud technologies.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <Link href="mailto:marwanayman.shawky@gmail.com" className="hover:text-foreground transition-colors">
                marwanayman.shawky@gmail.com
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <Link href="tel:+201122889126" className="hover:text-foreground transition-colors">
                +201122889126
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Cairo, Egypt</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://github.com/maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://gitlab.com/maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitLabIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://hashnode.com/@maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HashnodeIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md" noValidate>
          {/* Formsubmit.co configuration */}
          <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="text"
            name="_honey"
            value={formValues.honey}
            onChange={(e) => setFormValues((v) => ({ ...v, honey: e.target.value }))}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div
            role="status"
            aria-live="polite"
            className={`text-sm flex items-center gap-2 ${status === "error" ? "text-red-600" : status === "sent" ? "text-green-600" : "text-muted-foreground"}`}
          >
            {status === "sent" && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-green-600 rounded-full animate-checkmark">
                <Check className="h-3 w-3 text-white" />
              </span>
            )}
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "Message sent! Thanks for reaching out."
                : status === "error"
                  ? errorMessage ?? "Something went wrong. Please try again."
                  : "I usually respond within a day."}
          </div>

          {/* Floating Label: Name */}
          <div className="floating-label-group">
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={80}
              placeholder=" "
              value={formValues.name}
              onChange={(e) => setFormValues((v) => ({ ...v, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <label htmlFor="name">Name</label>
          </div>

          {/* Floating Label: Email */}
          <div className="floating-label-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              inputMode="email"
              autoComplete="email"
              placeholder=" "
              value={formValues.email}
              onChange={(e) => setFormValues((v) => ({ ...v, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Floating Label: Message with Character Count */}
          <div className="floating-label-group">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={2000}
              placeholder=" "
              value={formValues.message}
              onChange={(e) => setFormValues((v) => ({ ...v, message: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <label htmlFor="message">Message</label>
            <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
              {formValues.message.length}/2000
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "sending" || !isValid}
            className="px-4 py-2 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {status === "sending" ? (
              <>
                <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                Sending...
              </>
            ) : status === "sent" ? (
              <>
                <Check className="h-4 w-4" />
                Sent!
              </>
            ) : status === "error" ? (
              "Error - Try Again"
            ) : !isValid ? (
              "Complete the form"
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

