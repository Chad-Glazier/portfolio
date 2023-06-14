export function isYouTube(url: string): boolean {
  return /^(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?$/.test(url);
}

/**
 * Get the YouTube video ID from a YouTube URL.
 */
export function getYouTubeId(url: string): string | null {
  return (url.split("v=")[1] || url.split("/").pop())?.split("&")[0] ?? null;
}
