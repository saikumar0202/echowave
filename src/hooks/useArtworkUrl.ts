import { useEffect, useMemo, useState } from 'react';
import { URLFormat } from "../Services/interfaces";
import { artworkCandidates, LOAD_TIMEOUT_MS, markBadHost } from "../utils/artwork";

// Same fallback for CSS backgrounds: resolves to the first URL that loads.
export const useArtworkUrl = (images: URLFormat[] | undefined, size: 'small' | 'medium' | 'large'): string => {
  const candidates = useMemo(() => artworkCandidates(images, size), [images, size]);
  const [resolved, setResolved] = useState(candidates[0] ?? '');

  useEffect(() => {
    let cancelled = false;
    setResolved(candidates[0] ?? '');
    const tryAt = (index: number) => {
      if (cancelled || index >= candidates.length) return;
      const probe = new Image();
      const timer = window.setTimeout(() => fail(), LOAD_TIMEOUT_MS);
      const fail = () => {
        window.clearTimeout(timer);
        probe.onload = probe.onerror = null;
        markBadHost(candidates[index]);
        tryAt(index + 1);
      };
      probe.onload = () => {
        window.clearTimeout(timer);
        if (!cancelled) setResolved(candidates[index]);
      };
      probe.onerror = fail;
      probe.src = candidates[index];
    };
    tryAt(0);
    return () => {
      cancelled = true;
    };
  }, [candidates]);

  return resolved;
};
