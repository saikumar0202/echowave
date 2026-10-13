import { URLFormat } from "../Services/interfaces";
import { pickImage } from "./format";

type Size = 'small' | 'medium' | 'large';

// Some content servers hang rather than fail, so give up on one after this long.
export const LOAD_TIMEOUT_MS = 4000;

// Content servers that failed or hung this session; tried last from now on.
const badHosts = new Set<string>();

const hostOf = (url: string) => {
  try {
    return new URL(url).origin;
  } catch {
    return '';
  }
};

export const markBadHost = (url: string) => {
  const host = hostOf(url);
  if (host) badHosts.add(host);
};

// The image URL plus the same path on each mirror server, known-bad hosts last.
export const artworkCandidates = (images: URLFormat[] | undefined, size: Size): string[] => {
  const primary = pickImage(images, size);
  if (!primary) return [];
  const image = images?.find((item) => item.url === primary);
  let candidates = [primary];
  if (image?.mirrors?.length && /^https?:/.test(primary)) {
    const { pathname } = new URL(primary);
    candidates = Array.from(new Set([primary, ...image.mirrors.map((mirror) => `${mirror.replace(/\/$/, '')}${pathname}`)]));
  }
  return [...candidates.filter((url) => !badHosts.has(hostOf(url))), ...candidates.filter((url) => badHosts.has(hostOf(url)))];
};
