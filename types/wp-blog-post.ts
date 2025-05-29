export interface WPBlogPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  modified: string
  author: number
  author_name?: string
  featured_media: number
  featured_image_url?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
    author?: Array<{
      name: string
    }>
    "wp:term"?: Array<
      Array<{
        id: number
        name: string
        slug: string
      }>
    >
  }
  categories: number[]
  category_names?: string[]
}
