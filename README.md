# 🚀 Awesome PurePrompts

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com/)

> Welcome to **PurePrompts.net** — an open-source AI Prompts Gallery ecosystem dedicated to discovering, organizing, and sharing high-quality prompts for various AI models like ChatGPT, Gemini, and Claude.

## [🌐 View in Web Gallery](http://localhost:3000) | [🏷️ Browse by Category](http://localhost:3000/categories)

---

## 📖 Table of Contents

- [🤔 What is PurePrompts?](#-what-is-pureprompts)
- [✨ Key Features](#-key-features)
- [🔥 Featured Prompts](#-featured-prompts)
- [💻 Getting Started (Local Dev)](#-getting-started-local-dev)
- [🤝 How to Contribute](#-how-to-contribute)
- [📄 License & Acknowledgements](#-license--acknowledgements)

---

## 🤔 What is PurePrompts?

PurePrompts is a curated community gallery designed to help you extract the absolute best out of LLMs and generative AI. Whether you need a prompt to act as a Linux Terminal, a creative copywriter, or an expert programmer, this library provides ready-to-use templates.

---

## ✨ Key Features

- **Categorized Prompts**: Browse through specific domains like Coding, Images, and General assistants.
- **Advanced Filtering & Search**: Find the exact prompt matching your use case seamlessly.
- **Dynamic Views**: Switch between grid and list layouts for improved readability.
- **Image Prompt Builder**: A dedicated toolkit for crafting complex image generation prompts.
- **Responsive Design**: Fast and mobile-friendly interface optimized for all screen sizes.

---

## 🔥 Featured Prompts

Here are some of the community's favorite prompts available in the project's data layer:

### ✨ No. 1: Linux Terminal
>
> **Prompt**: "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else..."<br/>
> **Category**: Coding

### ✨ No. 2: English Translator and Improver
>
> **Prompt**: "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version..."<br/>
> **Category**: General

### ✨ No. 3: Job Interviewer
>
> **Prompt**: "I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the {Position} position. I want you to only reply as the interviewer..."<br/>
> **Category**: General

### ✨ No. 4: JavaScript Console
>
> **Prompt**: "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show..."<br/>
> **Category**: Coding

---

## 💻 Getting Started (Local Dev)

Want to run the gallery locally? PurePrompts is built with the **Next.js App Router**.

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the project by modifying `src/app/page.tsx`.

---

## 🤝 How to Contribute

We love contributions! The easiest way to contribute is by adding new high-quality prompts to our JSON data files located in `src/data/`.

1. **Fork the repository**
2. **Add your prompt** to `src/data/external-prompts.json` or `src/data/external-image-prompts.json` following the existing schema.
3. **Submit a Pull Request** with a descriptive title!

### 🐛 Found a Bug?

If you've spotted a UI issue or a broken link, please [open an issue](https://github.com/ariel-projects/prompts-catalog-mit/issues).

---

## 📄 License & Acknowledgements

This project is licensed under the **MIT License**.

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### ⭐ Support the Project

If you find these prompts useful, please consider giving this repository a **Star**! It helps the project grow and reach more developers and creators.
