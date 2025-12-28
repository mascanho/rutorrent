"use client"

import { FileCard } from "@/components/file-card"
import type { TorrentFile } from "@/types/torrent"

interface FileListProps {
  files: TorrentFile[]
  setFiles: (files: TorrentFile[]) => void
}

export function FileList({ files, setFiles }: FileListProps) {
  const handleRemove = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {"Active Transfers"}
        </h2>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>
      <div className="space-y-3">
        {files.map((file) => (
          <FileCard key={file.id} file={file} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  )
}
