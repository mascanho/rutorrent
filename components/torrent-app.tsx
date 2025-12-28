"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { DropZone } from "@/components/drop-zone";
import { FileList } from "@/components/file-list";
import { DownloadTab } from "@/components/download-tab";
import type { TorrentFile } from "@/types/torrent";

type Tab = "upload" | "download";

export function TorrentApp() {
  const [activeTab, setActiveTab] = useState<Tab>("upload");
  const [files, setFiles] = useState<TorrentFile[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    const torrentFiles: TorrentFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "seeding",
      progress: 100,
      downloadSpeed: 0,
      uploadSpeed: Math.random() * 2000000 + 500000,
      peers: Math.floor(Math.random() * 20) + 5,
      link: `${window.location.origin}/d/${Math.random().toString(36).substr(2, 9)}`,
      file,
    }));
    setFiles([...files, ...torrentFiles]);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-balance font-mono text-md font-semibold tracking-tight text-foreground md:text-xl">
            {"P2P File Sharing"}
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            {"Share and download files via peer-to-peer network"}
          </p>
        </div>

        <div className="mb-8 flex gap-2 rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3 font-mono text-sm font-medium transition-all ${
              activeTab === "upload"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>
          <button
            onClick={() => setActiveTab("download")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3 font-mono text-sm font-medium transition-all ${
              activeTab === "download"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>

        {activeTab === "upload" ? (
          files.length === 0 ? (
            <DropZone onFilesAdded={handleFilesAdded} />
          ) : (
            <div className="space-y-6">
              <DropZone onFilesAdded={handleFilesAdded} compact />
              <FileList files={files} setFiles={setFiles} />
            </div>
          )
        ) : (
          <DownloadTab />
        )}
      </div>
    </div>
  );
}
