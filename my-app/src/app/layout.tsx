import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Location Map",
  description: "Track locations and death counts on an interactive map",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

