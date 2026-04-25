# Pieni puukkopaja

Handmade Finnish puukko knives from Varkaus — a single-page artisan web presence.

## About

Pieni puukkopaja ("The Little Knife Workshop") is a small artisan brand crafting traditional Finnish puukko knives in Varkaus, Finland. This site serves as the workshop's digital storefront, showcasing knife models, the crafting process, ordering information, and contact details.

## Tech stack

- **HTML** — semantic, accessible single-page layout with smooth-scroll navigation
- **Tailwind CSS** — utility-first styling via CDN with a custom Nordic forest color theme
- **Font Awesome** — icon library for UI elements
- **Google Fonts** — Inter (body) and Lora (headings)
- **Vanilla JavaScript** — mobile menu, scroll-reveal animations, contact form, toast notifications

No build tools, no frameworks — just open `index.html` in a browser.

## Color theme

| Token | Hex | Role |
|---|---|---|
| Pine | `#2C302E` | Primary text, dark sections |
| Linen | `#EBE9E4` | Page background |
| Wool | `#F4F2EE` | Cards and surfaces |
| Lichen | `#6B6F64` | Secondary text, labels |
| Rust | `#C27E3E` | Buttons, links, accents |
| Moss | `#5A6B4A` | Borders, secondary accent |
| Smoke | `#8C7A6B` | Tertiary accents |
| Drift | `#D6D3C8` | Borders, dividers |

## Deployment

This site is designed to deploy directly to **GitHub Pages** with no build step.

### Option 1: Deploy from root

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Under **Branch**, select `main` and `/ (root)`
4. Click **Save**

The site will be live at `https://<username>.github.io/<repo>/`.

### Option 2: Custom domain

1. Add a `CNAME` file to the repository containing your domain (e.g., `pienipuukkopaja.fi`)
2. In your DNS provider, point the domain to GitHub Pages:
   - **CNAME record**: `<username>.github.io`
3. Enable **Enforce HTTPS** in Settings → Pages

## Project structure

```
pieni-puukkopaja/
├── index.html          Main page
├── main.js             Interactivity (menu, scroll, form, toast)
├── style.css           Custom styles (reveal animations, hero bg, toasts)
├── public/
│   ├── figurine.jpg    Figurine decorated puukko
│   ├── hero.png        Hero background image
│   ├── normal.jpg      Basic puukko
│   ├── special.jpg     Custom order puukko
│   └── workshop.png    Workshop photo
└── README.md
```

## License

All rights reserved. Images and content belong to Pieni puukkopaja.
