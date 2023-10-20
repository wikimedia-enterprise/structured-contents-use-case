import { type Image } from './wme'

export interface MusicRecording {
  name: string
  url?: string
  duration?: string
  image?: Image
  in_album?: MusicAlbum
}

export interface MusicRelease {
  date_published?: string
}

export interface MusicAlbum {
  name: string
  url?: string
  image?: Image
  album_release?: MusicRelease
  tracks?: MusicRecording[]
}

export interface Occupation {
  name: string
}

export interface Thing {
  name: string
  genres?: string[]
  has_occupation?: Occupation[]
  albums?: MusicAlbum[]
  image?: Image
  awards?: string[]
}

export interface ISOCK {
  getThing(name: string): Promise<Thing | null>
}

export class SOCK implements ISOCK {
  async getThing(name: string): Promise<Thing | null> {
    try {
      const res = await fetch(`things/${name.replace(/\s/g, '_')}.json`)
      return res.json()
    } catch (error) {
      console.warn(error)
      return null
    }
  }
}
