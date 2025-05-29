"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ImageDebugger() {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Collect all images on the page
  useEffect(() => {
    if (isOpen) {
      const allImages = Array.from(document.querySelectorAll("img"))
      setImages(allImages)
    }
  }, [isOpen])

  // Debug a specific image
  const debugImage = async (img: HTMLImageElement) => {
    setSelectedImage(img)
    setIsLoading(true)
    setDebugInfo(null)

    try {
      const response = await fetch(`/api/debug-image?url=${encodeURIComponent(img.src)}`)
      const data = await response.json()
      setDebugInfo(data)
    } catch (error) {
      setDebugInfo({ error: String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100">
          Debug Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Image Debugger</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Images on Page ({images.length})</h3>
            <div className="border rounded-md overflow-auto max-h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {images.map((img, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="w-16 h-16 relative">
                          <img
                            src={img.src || "/placeholder.svg"}
                            alt="Preview"
                            className="object-contain w-full h-full"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{img.src}</TableCell>
                      <TableCell>
                        {img.naturalWidth}x{img.naturalHeight}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => debugImage(img)}>
                          Debug
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {selectedImage && (
            <div>
              <h3 className="text-lg font-medium mb-2">Debug Information</h3>
              <div className="border rounded-md p-4">
                <div className="mb-4">
                  <strong>URL:</strong> {selectedImage.src}
                </div>

                {isLoading ? (
                  <div>Loading...</div>
                ) : debugInfo ? (
                  <div>
                    <div className="mb-2">
                      <strong>Status:</strong> {debugInfo.status} {debugInfo.statusText}
                    </div>
                    {debugInfo.headers && (
                      <div>
                        <strong>Headers:</strong>
                        <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto">
                          {JSON.stringify(debugInfo.headers, null, 2)}
                        </pre>
                      </div>
                    )}
                    {debugInfo.error && (
                      <div className="text-red-500">
                        <strong>Error:</strong> {debugInfo.error}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
