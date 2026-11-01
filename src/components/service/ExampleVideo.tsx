"use client";

import Image from "next/image";
import { useState } from "react";
import type { Example } from "@/content/services";
import { PlayIcon } from "@/components/ui/icons";

/**
 * Primer sa videom: dok se ne klikne prikazuje se samo poster, pa se video
 * ne preuzima bez potrebe. Posle klika pušta se sa kontrolama.
 */
export function ExampleVideo({ example, sizes }: { example: Example & { video: NonNullable<Example["video"]> }; sizes: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        autoPlay
        controls
        playsInline
        muted
        aria-label={example.title}
        className="absolute inset-0 z-10 size-full bg-bg object-cover"
      >
        {example.video.sources.map((s) => (
          <source key={s.src} src={s.src} media={s.media} type="video/mp4" />
        ))}
      </video>
    );
  }

  return (
    <>
      <Image src={example.image.src} alt={example.image.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
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
