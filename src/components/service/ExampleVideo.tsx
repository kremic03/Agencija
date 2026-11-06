"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Example } from "@/content/services";
import { PlayIcon } from "@/components/ui/icons";

type Props = {
  example: Example & { video: NonNullable<Example["video"]> };
  sizes: string;
  /** Za poster koji je LCP element */
  fetchPriority?: "high";
  loading?: "eager";
};

/**
 * Primer sa videom: dok se ne klikne prikazuje se samo poster, pa se video
 * ne preuzima bez potrebe. Posle klika pušta se sa kontrolama.
 */
export function ExampleVideo({ example, sizes, fetchPriority, loading }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pauza kada Next sakrije rutu posle navigacije (<Activity>)
  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, [playing]);

  if (playing) {
    return (
      <video
        ref={videoRef}
        autoPlay
        controls
        playsInline
        muted
        aria-label={example.title}
        className="absolute inset-0 z-10 size-full bg-bg object-cover"
      >
        {example.video.sources.map((s) => (
          <source key={s.src} src={s.src} media={s.media} type={s.type ?? "video/mp4"} />
        ))}
      </video>
    );
  }

  return (
    <>
      <Image
        src={example.image.src}
        alt={example.image.alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        loading={loading}
        placeholder="blur"
        className="object-cover"
      />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Pusti video: ${example.title} (${example.video.duration})`}
        className="absolute top-4 right-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-bg/70 text-fg backdrop-blur-sm hover:bg-bg/90"
      >
        <PlayIcon />
      </button>
    </>
  );
}
