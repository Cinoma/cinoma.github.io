import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/vite-press-portfolio/',
  title: "Chris Climbs Code",
  description: "A collection of Chris Inoma's projects, experiences, and life updates via blog.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'About', link: '/about' }
    ],

    sidebar: {
      '/projects/': [
        {
          text: 'Projects',
          items: [
            { text: 'Featured Projects', link: '/projects/' },
            { text: 'GitHub Activity', link: '/projects/github' },
            { text: 'GitLab Activity', link: '/projects/gitlab' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Latest Posts', link: '/blog/' },
            { text: 'Technical Guides', link: '/blog/guides' },
            { text: 'Podcast Episodes', link: '/blog/podcast' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cinoma' },
      { icon: 'gitlab', link: 'https://gitlab.com/cinoma25' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/chris-inoma' }
    ]
  },
  head: [['link', { rel: 'icon', href: '/vite-press-portfolio/favicon.svg' }]],
  ignoreDeadLinks: true
})
