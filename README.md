# Yash Srivastava — Applied AI Engineer Portfolio

An interactive, production-ready portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and an NVIDIA NIM-powered AI twin.

## Highlights

- Four evidence-led engineering case studies with constraints, decisions, results, and ownership boundaries.
- Tool-calling AI twin with `search_work`, `get_case_study`, `get_metric`, `compare_systems`, and `navigate_to`.
- Streaming OpenAI-compatible chat route configured for `nvidia/nemotron-3-ultra-550b-a55b`.
- Resume download, contact form, responsive interactions, command palette, smooth scroll, reduced-motion support, SEO, sitemap, and JSON-LD.
- Railway deployment configuration included.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and configure:

```bash
LLM_API_KEY=your_rotated_nvidia_key
LLM_BASE_URL=https://integrate.api.nvidia.com/v1/chat/completions
AI_MODEL=nvidia/nemotron-3-ultra-550b-a55b
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional, for email delivery
RESEND_API_KEY=re_your_key
CONTACT_EMAIL_FROM="Yash Portfolio <contact@yourdomain.com>"
CONTACT_EMAIL_TO=ys7.work@gmail.com
```

Never commit `.env.local` or a real API key. The key shared during setup should be rotated before deployment.

## Verify

```bash
npm run lint
npm test
npm run build
```

## Railway

Create a service from this repository, add the environment variables above, and deploy. `railway.json` runs the production build and Next.js start command; Railway supplies `PORT` automatically.

## Attribution

This project began from the MIT-licensed architecture of [Nikunj2003/My-Next-Js-Portfolio-v2](https://github.com/Nikunj2003/My-Next-Js-Portfolio-v2) and was redesigned and rewritten for Yash Srivastava. See `LICENSE`.
