<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])
const contributions = ref([])
const loading = ref(true)
const error = ref(null)

const username = import.meta.env.VITE_GITLAB_USERNAME
const gitlabToken = import.meta.env.VITE_GITLAB_TOKEN

const checkConfig = () => {
  if (!gitlabToken || gitlabToken === 'your_gitlab_token_here') {
    throw new Error('GitLab token not configured. Please set VITE_GITLAB_TOKEN in your .env file.')
  }
  if (!username || username === 'your_gitlab_username') {
    throw new Error('GitLab username not configured. Please set VITE_GITLAB_USERNAME in your .env file.')
  }
}

async function fetchGitLabData() {
  try {
    checkConfig()
    
    // Fetch projects
    const projectResponse = await fetch(
      `https://gitlab.com/api/v4/users/${username}/projects?order_by=updated_at&sort=desc&per_page=6`,
      {
        headers: {
          'Authorization': `Bearer ${gitlabToken}`,
          'Content-Type': 'application/json',
        }
      }
    )
    
    if (!projectResponse.ok) {
      throw new Error(`GitLab API error: ${projectResponse.statusText}`)
    }
    
    const projectData = await projectResponse.json()
    
    // Process each project
    projects.value = projectData.map(project => ({
      name: project.name,
      description: project.description,
      stars: project.star_count,
      forks: project.forks_count,
      url: project.web_url,
      language: project.main_language || null,
      topics: project.topics,
      visibility: project.visibility,
      lastActivityAt: project.last_activity_at
    }))

    // Fetch user activity (contributions)
    const today = new Date()
    const yearAgo = new Date(today.setFullYear(today.getFullYear() - 1))
    
    const activityResponse = await fetch(
      `https://gitlab.com/api/v4/users/${username}/events?after=${yearAgo.toISOString()}`,
      {
        headers: {
          'Authorization': `Bearer ${gitlabToken}`,
          'Content-Type': 'application/json',
        }
      }
    )

    if (!activityResponse.ok) {
      throw new Error(`GitLab API error: ${activityResponse.statusText}`)
    }
    
    const activityData = await activityResponse.json()
    
    // Process activity data into a contribution graph format
    const contributionMap = new Map()
    activityData.forEach(event => {
      const date = event.created_at.split('T')[0]
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1)
    })
    
    // Convert to weekly format
    const weeks = []
    let currentWeek = []
    
    for (let d = new Date(yearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      const count = contributionMap.get(dateStr) || 0
      const intensity = count === 0 ? 0 : Math.min(Math.ceil(count / 2), 4)
      
      currentWeek.push({
        date: dateStr,
        count,
        intensity
      })
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }
    
    contributions.value = weeks
    loading.value = false
  } catch (e) {
    console.error('Error:', e)
    error.value = e.message || 'Failed to load GitLab data'
    loading.value = false
  }
}

onMounted(() => {
  fetchGitLabData()
})
</script>

<template>
  <div class="gitlab-integration">
    <div v-if="loading" class="loading">
      Loading GitLab data...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <!-- Projects Section -->
      <div class="projects">
        <h2>Latest Projects</h2>
        <div class="project-grid">
          <div v-for="project in projects" :key="project.name" class="project-card">
            <h3>
              <a :href="project.url" target="_blank">{{ project.name }}</a>
            </h3>
            <p class="description">{{ project.description }}</p>
            <div class="project-stats">
              <span class="language" v-if="project.language">
                <span class="lang-dot" :class="project.language?.toLowerCase()"></span>
                {{ project.language }}
              </span>
              <span class="visibility">{{ project.visibility }}</span>
              <span class="stars">⭐ {{ project.stars }}</span>
              <span class="forks">🍴 {{ project.forks }}</span>
            </div>
            <div class="topics" v-if="project.topics && project.topics.length">
              <span v-for="topic in project.topics" :key="topic" class="topic">
                {{ topic }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gitlab-integration {
  padding: 2rem 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.project-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.project-card h3 {
  margin: 0 0 0.5rem 0;
}

.project-card a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.project-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  align-items: center;
}

.language {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.visibility {
  text-transform: capitalize;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
  font-size: 0.8rem;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.topics {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 12px;
  color: var(--vp-c-brand-dark);
}

.contribution-graph {
  margin-top: 2rem;
}

.graph {
  display: flex;
  gap: 2px;
  overflow-x: auto;
  padding: 1rem 0;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.day {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--vp-c-bg-soft);
}

.level-0 { background: var(--vp-c-bg-soft); }
.level-1 { background: var(--vp-c-brand-lighter); }
.level-2 { background: var(--vp-c-brand-light); }
.level-3 { background: var(--vp-c-brand); }
.level-4 { background: var(--vp-c-brand-dark); }

/* Language colors - Add more as needed */
.javascript { background: #f1e05a; }
.typescript { background: #2b7489; }
.python { background: #3572A5; }
.ruby { background: #701516; }
.go { background: #00ADD8; }
.cpp { background: #f34b7d; }
.java { background: #b07219; }
.php { background: #4F5D95; }
.kotlin { background: #F18E33; }
</style>

