export type Stream = {
  monthly: number
  total: number
}

export type Song = {
  id: number
  artist: string
  track: string
  image: string
  video: string
  streams: Stream
  color: string
}

declare namespace JSX {
  interface IntrinsicElements {
    "spline-viewer": {
      url: string
    }
  }
}
