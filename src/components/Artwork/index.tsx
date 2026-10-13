import React, { useEffect, useMemo, useRef, useState } from 'react';
import { URLFormat } from "../../Services/interfaces";
import { artworkCandidates, LOAD_TIMEOUT_MS, markBadHost } from "../../utils/artwork";

type Size = 'small' | 'medium' | 'large';

const CHECK_EVERY_MS = 500;

interface ArtworkProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  images: URLFormat[] | undefined,
  size: Size,
}

// <img> that falls back through mirror servers when one errors or stalls.
export const Artwork = ({ images, size, alt = '', ...rest }: ArtworkProps) => {
  const candidates = useMemo(() => artworkCandidates(images, size), [images, size]);
  const [attempt, setAttempt] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const src = candidates[attempt];

  useEffect(() => setAttempt(0), [candidates]);

  // Count only time spent on screen: lazy images don't start loading until
  // scrolled into view, and that shouldn't count against the server.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src || attempt >= candidates.length - 1) return;
    let visibleFor = 0;
    const timer = window.setInterval(() => {
      if (img.complete && img.naturalWidth > 0) {
        window.clearInterval(timer);
        return;
      }
      const rect = img.getBoundingClientRect();
      const onScreen = rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight
        && rect.right > 0 && rect.left < window.innerWidth;
      visibleFor = onScreen ? visibleFor + CHECK_EVERY_MS : 0;
      if (visibleFor >= LOAD_TIMEOUT_MS) {
        window.clearInterval(timer);
        markBadHost(src);
        setAttempt((value) => value + 1);
      }
    }, CHECK_EVERY_MS);
    return () => window.clearInterval(timer);
  }, [src, attempt, candidates.length]);

  if (!src) return null;
  return (
    <img ref={imgRef} src={src} alt={alt} {...rest}
         onError={(event) => {
           if (attempt < candidates.length - 1) {
             markBadHost(src);
             setAttempt((value) => value + 1);
           }
           rest.onError?.(event);
         }} />
  );
};
