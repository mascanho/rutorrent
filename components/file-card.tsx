"use client"

import { useEffect, useState } from "react"
import { Copy, X, UploadIcon, Download, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { TorrentFile } from "@/types/torrent"

interface FileCardProps {
  file: TorrentFile
  onRemove: (id: string) => void
}

export function FileCard({ file, onRemove }: FileCardProps) {
  const [copied, setCopied] = useState(false)
  const [uploadSpeed, setUploadSpeed] = useState(file.uploadSpeed)
  const [peers, setPeers] = useState(file.peers)

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadSpeed(Math.random() * 2000000 + 500000)
      setPeers(Math.floor(Math.random() * 20) + 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(file.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
  }

  const formatSpeed = (bytesPerSecond: number) => {
    return `${formatBytes(bytesPerSecond)}/s`
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-accent/50">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-foreground">{file.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(file.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-accent">Seeding</span>
            <span className="text-muted-foreground">{file.progress}%</span>
          </div>
          <Progress value={file.progress} className="h-1.5" />
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-md bg-secondary/50 p-3">
          <div className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4 text-accent" />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">{formatSpeed(uploadSpeed)}</p>
              <p className="text-xs text-muted-foreground">Upload</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">{formatSpeed(file.downloadSpeed)}</p>
              <p className="text-xs text-muted-foreground">Download</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">{peers}</p>
              <p className="text-xs text-muted-foreground">Peers</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={file.link}
            className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyLink}
            className={cn("shrink-0 transition-colors", copied && "bg-accent text-accent-foreground hover:bg-accent")}
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  )
}
