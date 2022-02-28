export type Post = {
  id: string
  url: string
  slug: string
  title: string
  date?: any
	edited: string
  published: boolean
  hashtags: string[]
  recordMap: any
}

export type Hashtag = {
  name: string
  color: string
  count: number
}