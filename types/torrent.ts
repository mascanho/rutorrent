export interface TorrentFile {
  id: string
  name: string
  size: number
  status: "uploading" | "seeding" | "downloading"
  progress: number
  downloadSpeed: number
  uploadSpeed: number
  peers: number
  link: string
  file: File
}
