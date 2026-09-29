# Steven's Portfolio

This is the source code for my personal portfolio at [stevenlocen.com](https://stevenlocen.com). It brings my software projects, work experience, education, and interests into one place, with direct links to my work and resume.

The site is built with React and custom CSS. An interactive location selector changes the page's colors and skyline artwork to reflect places where I have lived, studied, or worked.

## What the site includes

- Visitors can browse four selected projects and expand the collection to see all 13 projects.
- Seven location themes connect the visual design to my background.
- Dedicated sections cover experience, education, study abroad, and personal interests.
- The navigation provides access to my resume, contact information, and external profiles.
- The layout adapts to smaller screens and includes a skip link, labeled controls, and reduced-motion styles.

## Where to start in the code

| File | What it explains |
| --- | --- |
| [`src/App.js`](src/App.js) | This file defines the portfolio content, page sections, navigation, location selection, and project expansion. |
| [`src/redesign.css`](src/redesign.css) | This stylesheet defines the layout, city themes, skyline artwork, responsive behavior, and reduced-motion rules. |
| [`src/App.test.js`](src/App.test.js) | These tests check the main content, important links, and the expanded project collection. |

## Repository structure

```text
steven-portfolio/
├── public/
│   ├── assets/
│   │   ├── img/                 # The site stores its profile photo here.
│   │   └── resume/              # The site serves the resume PDF from here.
│   ├── CNAME                   # This file sets the custom domain.
│   ├── index.html              # This file provides the HTML document shell.
│   └── og.png                  # This image supports link previews.
├── src/
│   ├── App.js                  # This file contains the page and its content.
│   ├── App.test.js             # This file contains the React component tests.
│   ├── redesign.css            # This file contains the main visual design.
│   ├── index.css               # This file contains global styles.
│   ├── index.js                # This file mounts the React application.
│   └── setupTests.js           # This file configures the test environment.
├── package.json
└── package-lock.json
```

## How it works

The portfolio uses a single React page. Arrays in `App.js` hold the projects, experience, education, locations, and social links. The page maps those records into repeated sections, which keeps content updates separate from the markup for each card.

React state controls the mobile menu, selected location, and expanded project list. Selecting a location applies a theme class that updates CSS variables and the matching city illustration. Section navigation uses in-page anchors and scrolling.

The main technologies are React 19, JavaScript, custom CSS, Bootstrap Icons, and the existing Create React App tooling. Jest and React Testing Library support the component tests. GitHub Pages deployment is configured through `gh-pages`.

## Run locally

Use Node.js 20 or newer and npm. The dependency lockfile includes packages that require Node.js 20 or newer.

```bash
git clone https://github.com/stevloc/steven-portfolio.git
cd steven-portfolio
npm ci
npm start
```

Open [localhost:3000](http://localhost:3000) after the development server starts. The current application renders its content locally and does not require a backend service or API credentials.

## Test and build

Run the existing tests once with:

```bash
npm test -- --watchAll=false
```

Create a production build with:

```bash
npm run build
```

The build is written to `build/`. The configured `npm run deploy` command builds the site and publishes that directory through `gh-pages`. Publishing requires write access to the repository.

## Update the content

- Edit the data arrays and page sections in `src/App.js` to update projects, experience, education, or links.
- Edit `src/redesign.css` to change the layout, colors, or city illustrations.
- Replace the files in `public/assets/` to update the profile photo or resume, and keep the corresponding links in `App.js` in sync.
- Update both `public/CNAME` and the `homepage` field in `package.json` if the deployment domain changes.
