"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import type { Media } from "@/content/media";
import { PauseIcon, PlayIcon } from "./icons";

type Props = {
  sources: { src: string; media?: string }[];
  poster: Media;
  /** Prazno za dekorativnu pozadinu */
  alt?: string;
  sizes: string;
  preload?: boolean;
  /** Pozicija dugmeta za pauzu */
  controlsClassName?: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Video u petlji bez zvuka preko poster slike.
 * Poster se učitava odmah (next/image), a video tek u browseru i samo ako
 * korisnik nije uključio smanjeno kretanje. Dugme za pauzu je obavezno za
 * pokretni sadržaj duži od 5 s (WCAG 2.2.2).
 */
export function AutoplayVideo({ sources, poster, alt = "", sizes, preload, controlsClassName = "bottom-4 right-4" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  // Na serveru nema videa; u browseru zavisi od podešavanja kretanja
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <Image src={poster.src} alt={alt} fill preload={preload} sizes={sizes} className="object-cover" placeholder="blur" />
      {!reducedMotion && (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          >
            {sources.map((s) => (
              <source key={s.src} src={s.src} media={s.media} type="video/mp4" />
            ))}
          </video>
          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? "Pusti video" : "Zaustavi video"}
            className={`absolute z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-white/20 bg-bg/60 text-fg backdrop-blur-sm hover:bg-bg/80 ${controlsClassName}`}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </>
      )}
    </>
  );
}
