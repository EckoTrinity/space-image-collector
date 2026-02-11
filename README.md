# Cosmic View — React Space Image Collector

Personal portfolio project: a compact React + Vite app that collects and displays space imagery with a lightweight widget interface and Tailwind CSS styling.

## About

Cosmic View is a small, responsive gallery and widget demo built to showcase UI work in a portfolio. It focuses on clean component structure, fast iteration with Vite, and easy styling with Tailwind.

## Features

- Responsive image gallery and widget UI
- Small, modular React components for easy reuse and customization
- Fast development with Vite HMR
- Static assets in `src/assets` for offline demos or portfolio screenshots

## Tech Stack

- React
- Vite
- Tailwind CSS
- PostCSS

## Getting Started

Prerequisites: Node.js (LTS recommended)

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Project Structure (key files)

- [src/App.jsx](src/App.jsx) — main application
- [src/CosmicWidget.jsx](src/CosmicWidget.jsx) — widget component used for the demo
- [src/widget.jsx](src/widget.jsx) — helper/widget logic
- [src/assets](src/assets) — images and static assets
- [index.html](index.html) — HTML entry
- [package.json](package.json) — scripts and dependencies

## Customization

- Replace or add images inside `src/assets` to show your own collection.
- Tweak styles in `tailwind.config.js` or `src/index.css` to match your portfolio branding.
- Expand components in `src/` to add new features or integrations (e.g., NASA APIs).

## License

This project is intended as a personal portfolio showcase.

## Author

Rishkar Maharaj
