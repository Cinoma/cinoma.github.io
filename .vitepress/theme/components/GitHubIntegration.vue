<script setup>
import { ref, onMounted } from 'vue'

const repositories = ref([])
const contributions = ref([])
const loading = ref(true)
const error = ref(null)

const username = 'cinoma'

async function fetchGitHubData() {
  try {
    // Fetch repositories
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    )
    const repoData = await repoResponse.json()
    repositories.value = repoData.map(repo => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      language: repo.language,
      topics: repo.topics
    }))

    // Fetch contribution data (last year)
    const contributionResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}`
    )
    const contributionData = await contributionResponse.json()
    contributions.value = contributionData.contributions

    loading.value = false
  } catch (e) {
    error.value = 'Failed to load GitHub data'
    loading.value = false
  }
}

onMounted(() => {
  fetchGitHubData()
})
</script>

<template>
  <div class="github-integration">
    <div v-if="loading" class="loading">
      Loading GitHub data...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <!-- Repositories Section -->
      <div class="repositories">
        <h2>Latest Repositories</h2>
        <div class="repo-grid">
          <div v-for="repo in repositories" :key="repo.name" class="repo-card">
            <h3>
              <a :href="repo.url" target="_blank">{{ repo.name }}</a>
            </h3>
            <p class="description">{{ repo.description }}</p>
            <div class="repo-stats">
              <span class="language" v-if="repo.language">
                <span class="lang-dot" :class="repo.language?.toLowerCase()"></span>
                {{ repo.language }}
              </span>
              <span class="stars">⭐ {{ repo.stars }}</span>
              <span class="forks">🍴 {{ repo.forks }}</span>
            </div>
            <div class="topics" v-if="repo.topics && repo.topics.length">
              <span v-for="topic in repo.topics" :key="topic" class="topic">
                {{ topic }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contribution Graph -->
      <div class="contribution-graph">
        <h2>Contribution Activity</h2>
        <div class="graph">
          <div v-for="(week, weekIndex) in contributions" 
               :key="weekIndex" 
               class="week">
            <div v-for="(day, dayIndex) in week" 
                 :key="dayIndex" 
                 class="day"
                 :class="'level-' + day.intensity"
                 :title="`${day.date}: ${day.count} contributions`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-integration {
  padding: 2rem 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.repo-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.repo-card h3 {
  margin: 0 0 0.5rem 0;
}

.repo-card a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.repo-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.language {
  display: flex;
  align-items: center;
  gap: 0.3rem;
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

/* Language colors */
.javascript { background: #f1e05a; }
.typescript { background: #2b7489; }
.css { background: #563d7c; }
.go { background: #00ADD8; }
.vue { background: #41b883; }
.ruby { background: #701516; }
.csharp { background: #178600; }
.python { background: #306998; }
/* Add more language colors as needed */
</style>

