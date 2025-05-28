---
title: Building and Deploying Web Projects with Deno and VitePress
description: My journey building a URL shortener with Deno and a portfolio site with VitePress, including challenges faced and lessons learned in modern web development.
date: 2025-04-20
published: true
---

# {{ $frontmatter.title }}

Hey everyone! I'm excited to share my experience working with Deno and VitePress on two recent projects. I built a URL shortener with Deno and a portfolio site with VitePress, including challenges faced and lessons learned in modern web development.

## The URL Shortener with Deno

[Deno](https://deno.land/) is a modern runtime for JavaScript and TypeScript that I used to build a URL shortener. I chose it for several reasons:

- Built-in TypeScript support
- Robust security features
- Developer-friendly tools (Deno FMT and Deno Lint)
- Clean dependency management

I faced some challenges deploying it live, especially with CORS errors, but I eventually figured it out. While I didn't need to deploy it live for the take-home project with a company I was interviewing with at the time, I wanted to challenge myself and learn more about deployment processes. Eventually I was able to deploy it live and it's working great! Check it out at [url-shortener-v1.deno.dev](https://url-shortener-v1.deno.dev).

## Portfolio Website with VitePress

For my portfolio website, I wanted something more modern and dynamic than my old HTML template. [VitePress](https://vitepress.dev/) proved to be the perfect choice because of its features:

- Clean default UI
- Lightning-fast build times
- Vue.js integration
- Markdown-based content
- Built-in theme customization

### Integration Challenges

One of the trickier aspects was integrating the GitHub and GitLab APIs. Here's what I learned:

1. Proper environment variable management
2. API rate limiting considerations
3. Error handling for failed API calls
4. Caching strategies for better performance

## Key Takeaways

Throughout these projects, I gained valuable insights:

- Understanding modern JavaScript runtimes
- Working with static site generators
- Managing API integrations
- Using AI tools effectively as development aids in troubleshooting
- Importance of proper documentation

## What's Next?

I'm continuing to improve my portfolio website over time and plan to add features like:

- Performance optimizations
- Blog integrations
- Podcast episodes

## Connect With Me

Feel free to follow my journey on the following platforms:
- [Dev.to](https://dev.to/cinoma)
- [GitHub](https://github.com/cinoma)
- [Portfolio](https://cinoma.github.io)

Let me know if you have any questions about either project!
