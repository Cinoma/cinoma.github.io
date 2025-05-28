<script setup lang="ts">
import { formatDate } from '../theme/utils/dateFormatter'
import { data as posts } from '../blog.data'
</script>

<template>
  <div class="blog-post-list">
    <div v-if="posts.length === 0" class="no-posts">
      No blog posts found.
    </div>
    <div v-else v-for="post in posts" :key="post.url" class="blog-post">
      <h2>
        <a :href="post.url">{{ post.title }}</a>
      </h2>
      <p class="post-date">
        Posted on {{ formatDate(post.date) }}
      </p>
      <p class="post-description">{{ post.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.blog-post-list {
  max-width: 800px;
  margin: 0 auto;
}

.no-posts {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.blog-post {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.blog-post:last-child {
  border-bottom: none;
}

.post-date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  margin: 0.5rem 0;
}

.post-description {
  margin-top: 0.5rem;
  color: var(--vp-c-text-1);
}

.blog-post h2 {
  margin-bottom: 0.5rem;
}

.blog-post a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.blog-post a:hover {
  text-decoration: underline;
}
</style>
