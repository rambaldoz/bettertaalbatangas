# BetterTaalBatangas.org

A volunteer-built community portal for the **Municipality of Taal, Batangas**. It puts the information residents need most in one place: how to get a permit or certificate, what to bring, how much it costs, which office to visit, who the officials are and which numbers to call in an emergency.

BetterTaalBatangas.org is part of the [BetterGov.ph](https://bettergov.ph) movement. It is **not an official government website** and is not run by the Municipality of Taal. It costs the people and government of Taal nothing.

## What's on the site

| Section           | What it has                                                                                                   | Source                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Services          | 90 step-by-step guides in 12 categories: requirements, steps, fees, processing times and the office in charge | Taal Citizen's Charter 2026 (1st Edition)                          |
| Government        | 2025 to 2028 elected officials, municipal offices and department heads, the 42 barangays                      | Election results, Citizen's Charter                                |
| About Taal        | History, culture, holidays                                                                                    | PhilAtlas, Wikipedia, news reports (credited on each page)         |
| Hotlines          | Local and national emergency numbers, also on the home page                                                   | Public directories (confirm before relying on them)                |
| Weather and Forex | Current weather and 5-day forecast for Taal and nearby cities; peso exchange rates                            | [Open-Meteo](https://open-meteo.com), BSP via the BetterGov.ph API |
| Portal pages      | About, FAQs, Contact, Terms of Use, Privacy Policy, Accessibility, Sitemap                                    | Written for this project                                           |

The menus, header and other interface text are available in English and Filipino.

## Getting started

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
cp env.example .env.local   # then fill in the values
npm run dev                 # http://localhost:5173
```

| Command           | What it does                               |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the development server               |
| `npm run build`   | Type-check and build the site into `dist/` |
| `npm run preview` | Serve the built site locally               |
| `npm run lint`    | Check the code with ESLint                 |
| `npm run format`  | Format all files with Prettier             |

Settings live in `.env.local` (not committed). See `env.example` for each one: the site address, share image, contact email, the Google Form for issue reports and the optional build-cost figure.

## Editing content

Most content is plain data files, so it can be updated without touching the page code.

| To change                                                | Edit                                                                                                              |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| A service (steps, fees, requirements)                    | `content/services/<category>/<service>.yaml`, guide in [`content/services/README.md`](content/services/README.md) |
| Service categories, order and home page picks            | `src/data/services.yaml`                                                                                          |
| Offices, department heads and office emails              | `src/data/offices.ts`                                                                                             |
| Elected officials                                        | `src/data/officials.ts`                                                                                           |
| Taal pages, hotlines, holidays, barangays, photo credits | `src/data/taal.ts`                                                                                                |
| Taal page photos                                         | `public/images/taal/` (file names and sizes in its README)                                                        |
| Interface text and Filipino translations                 | `public/locales/en/common.json`, `public/locales/fil/common.json`                                                 |
| Menus and footer links                                   | `src/data/navigation.ts`                                                                                          |
| About, FAQ, Contact, Terms, Privacy, Accessibility       | `src/pages/portal/`, shared facts in `src/data/portal.ts`                                                         |
| Colors and fonts                                         | `src/index.css`, `src/fonts.css`                                                                                  |

Keep the Charter's wording, fees and times. Write "To be confirmed" for anything unknown; the site shows it in gray.

## Design and accessibility

The site is built for older residents and slow phones:

- Text is at least 14px (photo credits excepted) and every text color meets WCAG AA contrast.
- One font (Manrope) in two weights, regular and bold.
- Palette: olive `#606c38`, dark olive `#283618`, copper `#bc6c25` (links and buttons use the darker `#985620` for contrast), on a light gray background.
- Keyboard friendly, with proper headings and labels for screen readers.

## Project structure

```
content/services/      Service pages, one YAML file each
public/
  images/              Logo and Taal page photos
  locales/             English and Filipino interface text
src/
  components/          Layout (header, footer, page shell), home, services, government, Taal page parts
  data/                Site data: services, offices, officials, Taal facts, navigation
  hooks/, lib/         Translation hook, weather and forex fetching, helpers
  pages/               Home, Services, Government, Taal pages, portal pages, 404
  App.tsx              Routes
```

## Deployment

The site is a static build, ready for [Vercel](https://vercel.com) (`vercel.json` sends every route to the app). Set the same variables from `.env.local` in the Vercel project settings.

## Contributing

- **Found an error?** Use the report form on the site's Contact page.
- **Developers, designers, writers and translators** are welcome. Open a pull request with a short description of the change and its source.

## Credits

- **Template:** built on [BetterLocalGov](https://github.com/iyanski/betterlocalgov), the local government starter kit created by [Ian Bert Tusil (@iyanski)](https://github.com/iyanski), with contributions from [Nicu Listana](https://github.com/niculistana) and others. Thank you for making it free for every LGU to use.
- **[BetterGov.ph](https://bettergov.ph):** the volunteer movement behind the Better LGU portals, the forex API and the [Kapwa](https://github.com/bettergov/kapwa) design system.
- **Data:** the Municipality of Taal's Citizen's Charter 2026, [Open-Meteo](https://open-meteo.com) weather data (CC BY 4.0), Bangko Sentral ng Pilipinas exchange rates, and the sources credited on each page.
- **Built with:** React, TypeScript, Vite, Tailwind CSS, React Router, i18next and Lucide icons.

## License

The code and our own content are dedicated to the public domain under [CC0 1.0](LICENSE). Photos and quoted material from other sources keep their own licenses, credited where they appear.
