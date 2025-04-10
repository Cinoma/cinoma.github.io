import { defineConfig } from 'vitepress'

export default defineConfig({
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
            { text: 'Web Development', link: '/projects/web' },
            { text: 'Open Source', link: '/projects/open-source' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Latest Posts', link: '/blog/' },
            { text: 'Technical Guides', link: '/blog/guides' },
            { text: 'Career Journey', link: '/blog/career' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cinoma' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/chris-inoma' }
    ]
  },
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
})

