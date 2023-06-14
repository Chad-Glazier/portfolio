import Image from "next/image";
import { isYouTube, getYouTubeId } from "@/lib";

/**
 * Returns an element based on the URL. If the URL is a link to a
 * YouTube video, it returns the thumbnail of the video. If you set the
 * `active` prop, then it will instead return an embedded YouTube video.
 */
export default function Media({ 
  url, 
  active,
  className,
  height,
  width
}: {
  /**
   * The URL of the media; this can be an image or a YouTube link.
   */
  url: string;
  /**
   * If the media is a YouTube URL, this determines whether to show just the thumbnail
   * (better for performance) or the embedded video player. If you have few videos on
   * the page, it's better to keep this set to `true` to avoid the stutter that happens
   * when the browser replaces the thumbnail image with the embedded video player.
   */
  active?: boolean;
  className?: string;
  /** 
   * note that this is used for the dimensions of the image, and therefore sets the max
   * resolution. If performance isn't an issue, set this to the max possible resolution
   * you'll need, and then tweak the actual size with a `className`.
   * 
   * @default 560
   */
  height?: number;
  /** 
   * note that this is used for the dimensions of the image, and therefore sets the max
   * resolution. If performance isn't an issue, set this to the max possible resolution
   * you'll need, and then tweak the actual size with a `className`.
   * 
   * @default 315
   */
  width?: number;
}
) {
  const youtube = isYouTube(url);
  const actualWidth = width ?? 560;
  const actualHeight = height ?? 315;

  if (youtube && active) {
    return <iframe
      className={className}
      width={actualWidth} 
      height={actualHeight} 
      src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(url)}`}
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen
    />;
  }

  if (youtube) {
    return <Image
      className={className}
      src={`https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg`}
      width={actualWidth}
      height={actualHeight}
      alt={url}
    />;
  }

  return <Image
    className={className}
    src={url}
    alt="media"
    height={actualHeight}
    width={actualWidth}
  />;
}