export type PrismicRichText = PrismicRichTextItem[]
export interface PrismicRichTextItem {
  type: string
  text?: string
  spans?: SpansItem[]
  url?: string
  alt?: null
  copyright?: null
  dimensions?: Dimensions
  oembed?: Oembed
}
interface SpansItem {
  start: number
  end: number
  type: string
  data?: Data
}
interface Data {
  link_type: string
  url?: string
  target?: string
  id?: string
  type?: string
  tags?: any[]
  slug?: string
  lang?: string
  uid?: string
  isBroken?: boolean
}
interface Dimensions {
  width: number
  height: number
}
interface Oembed {
  type: string
  embed_url: string
  title: string
  provider_name: string
  thumbnail_url: string
  thumbnail_height: number
  thumbnail_width: number
  version: string
  provider_url: string
  author_name: string
  height: number
  html: string
  width: number
  author_url: string
}
