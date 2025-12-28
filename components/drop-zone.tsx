"use client"

import React from "react"

import { useCallback } from "react"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropZoneProps {
  onFilesAdded: (files: File[]) => void
  compact?: boolean
}

export function DropZone({ onFilesAdded, compact = false }: DropZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      if (droppedFiles.length > 0) {
        onFilesAdded(droppedFiles)
      }
    },
    [onFilesAdded],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files)
        onFilesAdded(selectedFiles)
      }
    },
    [onFilesAdded],
  )

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border-2 border-dashed border-border bg-card transition-all duration-200",
        isDragging && "border-accent bg-accent/5",
        compact ? "p-8" : "p-16",
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileInput}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
        aria-label="File upload"
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div
          className={cn(
            "rounded-full bg-secondary p-4 transition-all duration-200 group-hover:bg-accent/20",
            isDragging && "bg-accent/20",
          )}
        >
          <Upload
            className={cn(
              "h-8 w-8 text-muted-foreground transition-colors duration-200 group-hover:text-accent",
              isDragging && "text-accent",
            )}
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">{"Drop files here or click to browse"}</p>
          <p className="text-sm text-muted-foreground">{"Any file type • Any size"}</p>
        </div>
      </div>
    </div>
  )
}
