export interface Name {
  id: string,
  name: string,
}

export interface URLFormat {
  quality: string,
  url: string,
}

export interface Artist extends Name {
  role: string,
  image: URLFormat[] | [],
  type: string,
  url: string,
}

export interface Artists {
  primary: Artist[],
  featured: Artist[] | [],
  all: Artist[]
}

export interface Album extends Name {
  description: string,
  url: string,
  year: number,
  type: string,
  playCount: string | null,
  language: string,
  explicitContent: boolean,
  artists: Artists,
  image: URLFormat[]
}

export interface Song extends Name {
  type: string,
  year: string,
  releaseDate: string | null,
  duration: number,
  label: string,
  explicitContent: boolean,
  playCount: number,
  language: string,
  hasLyrics: boolean,
  lyricsId: null,
  url: string,
  copyright: string,
  album: {
    id: string,
    name: string,
    url: string,
  },
  artists: Artists,
  image: URLFormat[],
  downloadUrl: URLFormat[]
}