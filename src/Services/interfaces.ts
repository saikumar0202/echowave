export interface Name {
  id: string,
  name: string,
}

export interface URLFormat {
  quality: string,
  url: string,
}

export interface ArtistBase extends Name {
  role: string,
  image: URLFormat[] | [],
  type: string,
  url: string,
}
export interface Artist extends ArtistBase {
    followerCount: number | null,
    fanCount: string | null,
    isVerified: boolean | null,
    dominantLanguage: string | null,
    dominantType: string,
    bio: [
      {
        text: string | null,
        title: string | null,
        sequence: number | null
      }
    ] | null,
    dob: string | null,
    fb: string | null,
    twitter: string | null,
    wiki: string | null,
    availableLanguages: string[],
    isRadioPresent: boolean | null,
    topSongs: Song[] | null,
    topAlbums: Album[] | null,
    singles: Song[] | null,
    similarArtists: Artist[] | null
}

export interface Artists {
  primary: ArtistBase[],
  featured: ArtistBase[] | [],
  all: ArtistBase[]
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
  image: URLFormat[],
  songCount?: number,
  songs?: Song[]
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