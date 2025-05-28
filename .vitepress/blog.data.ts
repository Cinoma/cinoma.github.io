import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  description: string
  date: string
  url: string
  published?: boolean
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/**/*.md', {
  transform(posts) {
    return posts
      .filter(post => {
        // Check if required fields exist
        return post.frontmatter.title &&
          post.frontmatter.date &&
          post.frontmatter.published !== false
      })
      .map(post => ({
        title: post.frontmatter.title,
        description: post.frontmatter.description || '',
        date: post.frontmatter.date,
        url: post.url,
        published: post.frontmatter.published ?? true
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
})
