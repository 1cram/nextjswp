"use client"

import { useEffect, useState } from "react"
import { processHtmlContent } from "@/lib/content-processor"

interface WordPressContentProps {
  content: string
  className?: string
}

/**
 * Component for safely rendering WordPress content with processed image URLs
 */
export default function WordPressContent({ content, className = "" }: WordPressContentProps) {
  const [processedContent, setProcessedContent] = useState("")

  useEffect(() => {
    // Process the content on the client side
    if (content) {
      const processed = processHtmlContent(content)
      setProcessedContent(processed)
    }
  }, [content])

  // Use a placeholder while processing
  if (!processedContent && content) {
    return <div className={`wordpress-content-loading ${className}`}>Loading content...</div>
  }

  return (
    <div
      className={`wordpress-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent || content }}
    />
  )
}
