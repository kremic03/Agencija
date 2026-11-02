"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Media, VideoSource } from "@/content/media";
import { PauseIcon, PlayIcon } from "./icons";

type Props = {
  sources: VideoSource[];
  poster: Media;
  /** Prazno za dekorativnu pozadinu */
  alt?: string;
  sizes: string;
  /** Poster je LCP element: preuzima se odmah, sa visokim prioritetom */
  highPriority?: boolean;
  /** Video kreće tek posle učitavanja stranice (za uvod iznad pregiba) */
  deferUntilLoad?: boolean;
  /** Pozicija dugmeta za pauzu */
  controlsClassName?: string;
};

type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string };

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

const connection = () => (navigator as Navigator & { connection?: NetworkInformation }).connection;

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function subscribeConnection(onChange: () => void) {
  const conn = connection();
  conn?.addEventListener("change", onChange);
  return () => conn?.removeEventListener("change", onChange);
}

/** Uključena ušteda podataka ili spora veza (API postoji samo u Chromium browserima) */
function isLimitedConnection() {
  const conn = connection();
  return !!conn && (!!conn.saveData || SLOW_CONNECTIONS.includes(conn.effectiveType ?? ""));
}

/** Prvi izvor koji odgovara ekranu i koji browser ume da pusti; poslednji je rezerva */
function pickSource(video: HTMLVideoElement, sources: VideoSource[]) {
  const fits = (s: VideoSource) =>
    (!s.media || window.matchMedia(s.media).matches) && (!s.type || video.canPlayType(s.type) !== "");
  return (sources.find(fits) ?? sources[sources.length - 1]).src;
}

/** Poziva callback kada se stranica učita i browser bude slobodan */
function afterLoadIdle(callback: () => void) {
  let idleId: number | undefined;
  let timeoutId: number | undefined;
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(callback, { timeout: 2000 });
    else timeoutId = window.setTimeout(callback, 200);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}

function fullyBuffered(video: HTMLVideoElement) {
  const { buffered, duration } = video;
  return buffered.length > 0 && Number.isFinite(duration) && buffered.end(buffered.length - 1) >= duration - 0.1;
}

/**
 * Video u petlji bez zvuka preko poster slike.
 * Poster se učitava odmah (next/image). Video se preuzima tek kada je u
 * vidnom polju, pauzira se kada izađe iz njega ili kada ruta postane skrivena,
 * i ne pušta se sam uz smanjeno kretanje, uštedu podataka ili sporu vezu.
 * Dugme za pauzu je obavezno za pokretni sadržaj duži od 5 s (WCAG 2.2.2).
 */
export function AutoplayVideo({
  sources,
  poster,
  alt = "",
  sizes,
  highPriority,
  deferUntilLoad,
  controlsClassName = "bottom-4 right-4",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const resumeAt = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [optedIn, setOptedIn] = useState(false);
  // Na serveru nema videa; u browseru zavisi od podešavanja kretanja i veze
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
  const limited = useSyncExternalStore(subscribeConnection, isLimitedConnection, () => false);
  const showVideo = !reducedMotion && (!limited || optedIn);
  const waitForLoad = deferUntilLoad && !optedIn;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    let ready = !waitForLoad;

    const sync = () => {
      if (visible && ready) {
        if (!video.getAttribute("src")) {
          video.src = pickSource(video, sources);
          video.currentTime = resumeAt.current;
        }
        if (!userPaused.current) video.play().catch(() => setPlaying(false));
      } else if (!video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    const cancelIdle = ready
      ? () => {}
      : afterLoadIdle(() => {
          ready = true;
          sync();
        });

    // Gašenje i kada Next sakrije rutu posle navigacije (<Activity>)
    return () => {
      observer.disconnect();
      cancelIdle();
      video.pause();
      // Prekida preuzimanje nedovršenog videa; nastavlja se od iste sekunde
      if (video.getAttribute("src") && !fullyBuffered(video)) {
        resumeAt.current = video.currentTime;
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [sources, waitForLoad, showVideo]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const button = `absolute z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-white/20 bg-bg/60 text-fg backdrop-blur-sm hover:bg-bg/80 ${controlsClassName}`;

  return (
    <>
      <Image
        src={poster.src}
        alt={alt}
        fill
        sizes={sizes}
        fetchPriority={highPriority ? "high" : undefined}
        loading={highPriority ? "eager" : undefined}
        className="object-cover"
        placeholder="blur"
      />
      {showVideo && (
        <>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="absolute inset-0 size-full object-cover"
          />
          <button type="button" onClick={toggle} aria-label={playing ? "Zaustavi video" : "Pusti video"} className={button}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </>
      )}
      {!reducedMotion && limited && !optedIn && (
        <button type="button" onClick={() => setOptedIn(true)} aria-label="Pusti video" className={button}>
          <PlayIcon />
        </button>
      )}
    </>
  );
}
