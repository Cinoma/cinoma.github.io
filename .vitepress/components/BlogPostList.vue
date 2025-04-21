<script setup>
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const { theme } = useData()
const posts = ref([])

onMounted(async () => {
  const modules = import.meta.glob('/blog/*.md')
  const postPromises = Object.keys(modules)
    .filter(path => !path.endsWith('index.md'))
    .map(async (path) => {
      const module = await modules[path]()
      const frontmatter = module.frontmatter
      return {
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date || new Date(frontmatter.published || '').toLocaleDateString(),
        url: path.replace(/\.md$/, ''),
        ...frontmatter
      }
    })

  posts.value = (await Promise.all(postPromises))
    .filter(post => post.title) // Filter out pages without titles
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date
})
</script>

<template>
  <div class="blog-post-list">
    <div v-for="post in posts" :key="post.url" class="blog-post">
      <h2>
        <a :href="post.url">{{ post.title }}</a>
      </h2>
      <p class="post-date">Posted on {{ post.date }}</p>
      <p class="post-description">{{ post.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.blog-post {
  margin-bottom: 2rem;
}
.post-date {
  color: #666;
  font-size: 0.9em;
  margin: 0.5rem 0;
}
.post-description {
  margin-top: 0.5rem;
}
</style>
