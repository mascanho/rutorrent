"use client"

import { useState } from "react"
import { Download, Link2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { formatBytes, formatSpeed } from "@/lib/format"

interface DownloadingFile {
  id: string
  name: string
  size: number
  progress: number
  downloadSpeed: number
  uploadSpeed: number
  peers: number
  link: string
}

export function DownloadTab() {
  const [link, setLink] = useState("")
  const [downloading, setDownloading] = useState<DownloadingFile | null>(null)
  const [isStarting, setIsStarting] = useState(false)

  const handleDownload = () => {
    if (!link.trim()) return

    setIsStarting(true)

    // Simulate starting download
    setTimeout(() => {
      const file: DownloadingFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: "shared-file.zip",
        size: Math.random() * 500000000 + 100000000,
        progress: 0,
        downloadSpeed: 0,
        uploadSpeed: 0,
        peers: Math.floor(Math.random() * 15) + 3,
        link: link,
      }

      setDownloading(file)
      setIsStarting(false)

      // Simulate download progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 5 + 2
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
        }

        setDownloading((prev) =>
          prev
            ? {
                ...prev,
                progress,
                downloadSpeed: progress < 100 ? Math.random() * 5000000 + 1000000 : 0,
                uploadSpeed: progress < 100 ? Math.random() * 1000000 + 200000 : 0,
              }
            : null,
        )
      }, 500)
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* Download Input */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-accent" />
          <h2 className="font-mono text-lg font-semibold text-foreground">Enter Link</h2>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Paste download link here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !downloading) {
                handleDownload()
              }
            }}
            disabled={!!downloading}
            className="flex-1 font-mono"
          />
          <Button onClick={handleDownload} disabled={!link.trim() || !!downloading || isStarting} className="gap-2">
            {isStarting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Starting
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Download Progress */}
      {downloading && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-mono font-semibold text-foreground">{downloading.name}</h3>
                <p className="font-mono text-sm text-muted-foreground">{formatBytes(downloading.size)}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-accent">{Math.round(downloading.progress)}%</div>
                <div className="font-mono text-xs text-muted-foreground">
                  {downloading.progress === 100 ? "Complete" : "Downloading"}
                </div>
              </div>
            </div>

            <Progress value={downloading.progress} className="h-2" />

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-3">
              <div>
                <div className="mb-1 font-mono text-xs text-muted-foreground">Download</div>
                <div className="font-mono text-sm font-medium text-foreground">
                  {downloading.progress < 100 ? formatSpeed(downloading.downloadSpeed) : "—"}
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-xs text-muted-foreground">Upload</div>
                <div className="font-mono text-sm font-medium text-foreground">
                  {downloading.progress < 100 ? formatSpeed(downloading.uploadSpeed) : "—"}
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-xs text-muted-foreground">Peers</div>
                <div className="font-mono text-sm font-medium text-accent">{downloading.peers}</div>
              </div>
            </div>

            {downloading.progress === 100 && (
              <Button
                onClick={() => {
                  setDownloading(null)
                  setLink("")
                }}
                variant="outline"
                className="w-full"
              >
                Download Another File
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
