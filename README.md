# Kavimugil Rajasekar — Personal Portfolio

![Profile preview](https://raw.githubusercontent.com/KavimugilRajasekar/AssetsHosting/main/profile-preview.png)

Personal portfolio website for **Kavimugil Rajasekar** — Computer Science Engineer &amp; Flutter Developer.

This is a fully static, GitHub-Pages-compatible site built on the in-house **Blueprint v2.0 // forest** design system. It continuously synchronizes with the developer's GitHub repositories so the content always reflects the current state of their work.

## Pages

| # | Page | Description |
|---|---|---|
| 01 | `index.html` | Hero, stats strip, featured projects, domain coverage. |
| 02 | `about.html` | Bio, network topology, education + journey timeline, full skills inventory, languages, leadership. |
| 03 | `projects.html` | All 23 repositories organized into Featured · Mobile · Desktop · AI/ML · CLI · Full-Stack · Embedded. |
| 04 | `resume.html` | PDF preview (loaded from the `AssetsHosting` CDN) + network topology. |
| 05 | `contact.html` | Email, phone, social channels, contact form, location map. |
| —  | `bottle-art/` | Optional creative alternate theme. |
| —  | `404.html` | Fallback error page. |

## Design System

| Token | Value |
|---|---|
| Paper | `#F7F7F5` |
| Forest | `#1A3C2B` |
| Coral  | `#FF8C69` |
| Mint   | `#9EFFBF` |
| Gold   | `#F4D35E` |
| Grid   | `#3A3A38` |

- `css/tokens.css` — palette, typography, hairlines, geometry, layout.
- `css/blueprint.css` — component library (header, hero, bento, timeline, cells, forms).
- `css/layout.css` — page scaffolding & responsive helpers.

## Interactivity

- `js/tubes.js` — interactive 3D tubes background (lazy-loads threejs-components from CDN; honors `prefers-reduced-motion`).
- `js/main.js` — mobile nav toggle, dynamic copyright year.

## Repositories Covered (24)

Featured: **N-Queens-Studio, ResponseRally, Heeba, Splitr**.

Mobile (4): N-Queens-Solver, MySpace, Saengil-Alrim, ToggleTalk.
Desktop (6): BillingSystem, RMediTracker, ai-studio-pro (Peak), SerialMonitor, Napify, uPy-Editor.
AI / ML (4): MachineLearningLab, ResponseRally, n_queens_server, CounterView-AI.
CLI (3): Duplver, spacelyzer, MunaiGuard.
Full-Stack (6): C1X-WorkFLow-Builder, Food_Plaza, Cifertrooper-UI, LoginPage-PHP, AI-Yutham, nexus-technology.
Embedded / Learning (2): MicroPy-In-ESP-Board, LeetCode_ProblemSolutions.

## Local References

All project images live under `assets/images/projects/` — copied from each repository rather than hot-linked, so the site works fully offline.

## Resume

The PDF on `resume.html` is loaded directly from `https://raw.githubusercontent.com/KavimugilRajasekar/AssetsHosting/main/Kavimugil_Rajasekar_Resume.pdf` per the design rule "Resume in /resume always loads from URL, not local."

## Setup

```bash
git clone https://github.com/KavimugilRajasekar/KavimugilRajasekar.github.io.git
cd KavimugilRajasekar.github.io
# open index.html in any browser, or serve with:
python -m http.server 8000
```

## License

Personal portfolio — all rights reserved by Kavimugil Rajasekar.