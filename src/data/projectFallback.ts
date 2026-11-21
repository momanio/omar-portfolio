import type { ProjectSnapshot } from "@/types/project";

// Local case-study copy and captures also serve visitors when the CMS is unavailable.
export const projectFallback: ProjectSnapshot[] = [
  {
    "_id": "d2145e93-997f-4a13-a14c-93e98b9dc198",
    "title": "BeeBites",
    "slug": {
      "current": "beebites"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/beebites.webp",
      "alt": "Arabic BeeBites storefront showing the featured bakery menu.",
      "width": 960,
      "height": 595,
      "lqip": null
    },
    "fullPageScreenshot": {
      "assetId": null,
      "url": "/projects/beebites-full.webp",
      "alt": "BeeBites’ Arabic storefront, from the featured item through the menu and ordering instructions.",
      "width": 960,
      "height": 6698,
      "lqip": null
    },
    "gallery": [],
    "year": null,
    "role": "Storefront and CMS development",
    "legacyBody": "Full Stack bakery website",
    "problem": "How can customers build a pastry box in Arabic or English and send it to the bakery?",
    "summary": "I built a bilingual menu, a box builder, and a WhatsApp order handoff for a home bakery in Jordan.",
    "result": "Switching languages keeps the selected items and quantities in the box.",
    "highlights": [
      "The bakery can edit categories, products, and translations in Sanity.",
      "The order opens in WhatsApp in the customer’s chosen language."
    ],
    "tags": [
      "Storefront"
    ],
    "techStack": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Sanity"
    ],
    "accentColor": "#EAB867",
    "order": null,
    "featured": false,
    "liveUrl": "https://beebites.o-a-momani.workers.dev/",
    "repoUrl": null,
    "publishedAt": "2026-11-12T15:19:47.609Z"
  },
  {
    "_id": "nawa-clinic",
    "title": "Nawa Clinic",
    "slug": {
      "current": "nawa-clinic"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/nawa-clinic.webp",
      "alt": "Arabic Nawa Clinic demo with a medical illustration and appointment request link.",
      "width": 960,
      "height": 600,
      "lqip": null
    },
    "fullPageScreenshot": {
      "assetId": null,
      "url": "/projects/nawa-clinic-full.webp",
      "alt": "Arabic clinic demo from its home page through services, appointment requests, and opening hours.",
      "width": 960,
      "height": 4515,
      "lqip": null
    },
    "gallery": [],
    "year": null,
    "role": "Frontend developer",
    "problem": "How can a clinic visitor request an appointment in Arabic or English?",
    "summary": "I built a bilingual clinic demo that turns an appointment request into a WhatsApp message for the visitor to review.",
    "result": "The page remembers the selected language on a return visit.",
    "highlights": [
      "I kept clinic details in one configuration and used typed translation keys to keep the Arabic and English interfaces in sync.",
      "The form accepts Arabic digits and prepares a localized appointment request. The demo uses fictional clinic details."
    ],
    "tags": [
      "Bilingual",
      "Demo"
    ],
    "techStack": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS"
    ],
    "accentColor": "#80B6A0",
    "order": null,
    "featured": false,
    "liveUrl": "https://clinic-project.o-a-momani.workers.dev/",
    "repoUrl": "https://github.com/momanio/clinic-project",
    "publishedAt": null
  },
  {
    "_id": "3100a5bf-6875-4e32-87e2-84d223012007",
    "title": "Barqya",
    "slug": {
      "current": "barqya"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/barqya.webp",
      "alt": "Barqya interface screenshot",
      "width": 1352,
      "height": 643,
      "lqip": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKHRFWHRDcmVhdGlvbgAxNiDZhtmK2LPYp9mGLCAyMDI1IDA4OjEyOjA5INmFKyNYwwAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAI5SURBVHicZY89b9NQGEb9f8rCwB+AsR2QYIYfgJjYWgmpaoF2Q0JqEZ26MCJKKUJIRQxAGztO7MR1/JE48Wf8ERo7SYHtIN8gFoaj933ucO7zSg82D3m085o7D19w/fZjVlbXuba28R8ra+sCsa+us7Jazw2Rb9zd5Oa9HW7df4b09OUxO6/es3twQr1v778TPPnLMh+xvXfE1t5btvbqfPyPrf1jdg8+8Pzwk0A6OVV48/E7p19VWrqJZlgC/cJBN2zUTg9VN2l3LbpmH2sQ4Y5S3FG2xM8YBLmgfpdsx6PZ1pGVJprWptPR6XQ7GKaBYRi0NA1VVWlrOqblEsY5WVGRFhXjvCTJSsZ5nUuKSYkUBBHdrkGjIdOQZRqKImi2WrTaGueywrezcxqyimY4WP0I20tEm2GY4/k5XpDhRxPSfIrkBzFd4wJFaaI0a1TkpkpL09E6HbGfNWTauoHrhWimz5eGJeY4m5JPKrK63Y8Zl9M5ku/HmD1bnNTWlyxlXXTDoNlqIzdbmHafIM7p2iGfz3vovYDJ5YxqdkVZLqiqK8pqUTdMcAdDITV7FrZl49gOjuviun0sy8KybMIgoiguGacTgigT59WCWjQtF0JalnOkMEoJwhjfG+I5NiPXIfJ9kiggjQKSYEg88siikGI8phgnTMYJ08mEWbVgNv8pWgrxdIYUxSlJlBB5AzzTYGD1hLCW5aFP6g+IBzbRwCH2RyT1Z16fLPQppxWLq9/MF79Ew6KY8gddQaBK6oYyugAAAABJRU5ErkJggg=="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "An Arabic landing page with a direct entry point for sending a telegram.",
    "highlights": [],
    "tags": [
      "Landing",
      "Responsive",
      "UI"
    ],
    "techStack": [
      "PHP",
      "Laravel",
      "Inertia",
      "React",
      "Tailwind CSS"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-04-15T22:44:18.745Z",
    "problem": "Send an Arabic telegram online.",
    "legacyBody": "Barqya is"
  },
  {
    "_id": "94760a21-2a2e-4fca-bdfa-5de0fa71bd02",
    "title": "Badil",
    "slug": {
      "current": "badil"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/badil.webp",
      "alt": "Badil’s Arabic landing page with links to browse products and register a laboratory.",
      "width": 1350,
      "height": 649,
      "lqip": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKHRFWHRDcmVhdGlvbgAxNiDZhtmK2LPYp9mGLCAyMDI1IDA4OjE4OjI1INmFv0XrVQAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAKZSURBVHicTc1LTxMBFIbh+T8a3ZiYuFCXxERX6grFaETBIFojolKpUhDaFAFpocCABaH3Cy2UkZlh2qFTgcIALXSUS4iXxJ/xGtGFizdfzrM5wt0Rg/tjq9T06Jx6rnCiVebEs8X/+nP/s5a/dvI/O/mv0y9kzthVhEB+j0n9EE/2C/ZoGXtkG0eswpvkLh3JKs5U9Xj/9Dqxe5wjvkN7fIdXsQr22C72uEV70sKRshBU02K5fIC0UkFMyLyfShHM6sdW+vqDFesbhZ0jlrYPkM19JPOA+fU94kaZad1k0qgyvXpIZOOIiHmEIGYUoqpBWMrh6B+lzvaKlh4vEdlgybSQViukjE1C+RKh3Dqh5TIBzaQvqdITlXCndbzKBjMrFglzH8H5IY0nKOFLLNE9mabJPU5j9xjdU1mmlA0+aluMflpj5NMaAW2TkFFlYmmLjhmZzplFvJkCH3NbZDcP0ao/EJ760rSJWdzRPMPSOkMLJRwBidbhFIOzRQJaBe/8GkPZEuPqNlN6Fb+8TWc4T19i+fhpslhFKX9H//IL4dbbCC3iIq7ECmNqhcm8hStaoGU4Tce0Rn+6hCv+me6oQVesiCNSpG2mgDNcwDdXYkLeIqhXmTOPWCz/RLjUKtLgzdIeLNKbNunPmLR9UGjwRLjrDvNgYJZmv4RNVHgsqtR7JW73ZXjsX6AzVMCVWKV3dh2/XEFULYRzTT4uO4LU9S/QOKrROKJR60pS88THxQfvuPJyghueNPU+mftDCjd7M1xzhrnuDFE/kKV5LMcjUccWMGgOGAhnmkY4a5vg3PMg51+nqOlZ4HLXLBdtfi489HGtM8atQYV7ozoPxws0DKnUeua42pWk1j3PnQGVusEctYM5rg5o/AbcsELMpKUu9QAAAABJRU5ErkJggg=="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "An Arabic marketplace with product listings, laboratory registration, and an admin dashboard.",
    "highlights": [],
    "tags": [
      "Admin",
      "Dashboard",
      "Responsive",
      "Landing"
    ],
    "techStack": [
      "PHP",
      "Laravel",
      "Inertia",
      "React",
      "Tailwind CSS"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-02-16T00:53:01.294Z",
    "problem": "Help medical laboratories find equipment to buy or exchange."
  },
  {
    "_id": "a5ea5660-7b93-489c-8d9a-4a07f5136378",
    "title": "Xitmnt",
    "slug": {
      "current": "xitmnt"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/xitmnt.webp",
      "alt": "Xitmnt interface screenshot",
      "width": 1919,
      "height": 996,
      "lqip": "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMEBQYH/8QAIxAAAgIBAwMFAAAAAAAAAAAAAQIAAwQREjEFBiETIlGR4f/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAaEQACAgMAAAAAAAAAAAAAAAAAAQIRAyEx/9oADAMBAAIRAxEAPwDl2P1quvWg46PrYWd3Pk/kZ3EKqsRnqWgB9B7GBImOyGPrP5PMXuPyfuJLFclJMOt2WFTHbyYSJUTt5MIob6f/2Q=="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "A single-page site introducing gaming and virtual reality services in Saudi Arabia.",
    "highlights": [],
    "tags": [
      "Gaming",
      "Virtual reality"
    ],
    "techStack": [
      "JavaScript",
      "HTML5",
      "CSS3"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-01-23T13:47:07.054Z",
    "problem": "Introduce gaming and VR services to visitors in Saudi Arabia.",
    "legacyBody": "A single-page application for gaming services in saudi arabia."
  },
  {
    "_id": "c1217f80-2837-4278-bc28-c970b774833b",
    "title": "Herbal Home",
    "slug": {
      "current": "herbal-home"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/herbal-home.webp",
      "alt": "Herbal Home interface screenshot",
      "width": 1919,
      "height": 996,
      "lqip": "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUHAwT/xAAlEAABAwMDAwUAAAAAAAAAAAABAgMEAAURBhIiExQhMTJEUYH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAT/xAAZEQADAQEBAAAAAAAAAAAAAAABAhEABDH/2gAMAwEAAhEDEQA/AKbrfTVyVemVWG2tGGG+QQlI5ftJZVg1QuGnsbc2y9nCsBP3VrHqKV2EktS8n5CqBSm3ArdxRdNwFxWDJgxuvsG/gPdjzRWl4cWmZhK1AbR4BoqLAHzaF5wwt3//2Q=="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "A searchable catalog of herbal products with ratings and product details.",
    "highlights": [],
    "tags": [
      "Admin",
      "Dashboard",
      "Responsive"
    ],
    "techStack": [
      "JavaScript",
      "HTML5",
      "CSS3"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-01-23T13:45:20.210Z",
    "problem": "Find ratings and details for herbal products.",
    "legacyBody": "Herbal Home provides Natural Herbal Medications, allowing users to search for product ratings and details."
  },
  {
    "_id": "0670fe83-1057-4668-a573-44c18fdc94ca",
    "title": "Elham",
    "slug": {
      "current": "elham"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/elham.webp",
      "alt": "Elham interface screenshot",
      "width": 1288,
      "height": 804,
      "lqip": "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAECAwQFB//EACAQAAEEAgMAAwAAAAAAAAAAAAEAAgMEESEFEzESFEH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EABwRAAICAgMAAAAAAAAAAAAAAAARARQDBBJSYf/aAAwDAQACEQMRAD8A4hUsWpet8j2hoyMfLCuWrt0xBlV7GNGNFwPqj+rFrRSmvGcZyqdqUgqeu3xG1eQ5LrIfOSWuI14haNGtH0+fqEVifRK+Hqf/2Q=="
    },
    "fullPageScreenshot": {
      "assetId": null,
      "url": "/projects/elham-full.webp",
      "alt": "Elham’s website from its opening illustration through the process, services, and contact sections.",
      "width": 960,
      "height": 2170,
      "lqip": null
    },
    "gallery": [],
    "year": null,
    "role": "Frontend developer",
    "summary": "I built a single-page site that walks visitors through the agency’s process, services, and contact form.",
    "highlights": [
      "I separated the agency’s process from its service examples. Visitors can see how the team works before choosing a service.",
      "I built the service slider around a single list. Each entry supplies its own name, description, and artwork, so editing one service updates its slide.",
      "On desktop, the previous and next controls wrap at either end of the list. The contact link stays below the slider as visitors browse."
    ],
    "tags": [
      "Landing",
      "Responsive",
      "SPA"
    ],
    "techStack": [
      "React",
      "JSX",
      "Tailwind CSS"
    ],
    "accentColor": "#A998EB",
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": "https://github.com/momanio/Elham-Frontend",
    "publishedAt": "2025-01-23T13:43:08.671Z",
    "problem": "Help potential clients understand Elham’s services and how the team works.",
    "legacyBody": "A single-page application that allows users to know more about Elham Company and its services.",
    "result": "Visitors can browse service examples and reach the contact form from the same page."
  },
  {
    "_id": "ef3e66ef-968f-4776-9977-ce430f01c503",
    "title": "Bandar Coatch",
    "slug": {
      "current": "bandar-coatch"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/bandar-coatch.webp",
      "alt": "Bandar Coatch interface screenshot",
      "width": 1920,
      "height": 1080,
      "lqip": "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQCAwf/xAAeEAACAgICAwAAAAAAAAAAAAABAgADIUEEERIiMf/EABYBAQEBAAAAAAAAAAAAAAAAAAQCA//EABkRAAIDAQAAAAAAAAAAAAAAAAABAhEhEv/aAAwDAQACEQMRAD8Aw/ntQyg060IleUdPQMOh9MTqdvIZMu5LMEwdSEqwVOfdyWCZY9nJhImE0CH/2Q=="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "An Arabic admin dashboard for managing trainees and their exercise and nutrition plans.",
    "highlights": [],
    "tags": [
      "Admin",
      "Dashboard",
      "Responsive",
      "SPA"
    ],
    "techStack": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MUI"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": "https://github.com/momanio/bandar-app",
    "publishedAt": "2025-01-18T14:37:09.988Z",
    "problem": "Manage the day-to-day work of a fitness center.",
    "legacyBody": "Admin Dashboard for a Gym and Fitness Center."
  },
  {
    "_id": "2474de3f-651f-4e23-abcf-822e8d04b47b",
    "title": "Baslex",
    "slug": {
      "current": "baslex-project"
    },
    "thumbnail": {
      "assetId": null,
      "url": "/projects/baslex-project.webp",
      "alt": "Baslex interface screenshot",
      "width": 1352,
      "height": 643,
      "lqip": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKHRFWHRDcmVhdGlvbgAxNiDZhtmK2LPYp9mGLCAyMDI1IDA4OjEyOjUzINmFjH431wAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAI0SURBVHichZFZTxNRAEbnv/pgjNEnIkGDgjEsgsYoCTE+GFFjIksQC2WRYI1CCy0iQksLpECxs907S6d0pusxHWmiTz6cfF/uw8m931WOsmcsR1Isfdwim86ja0aIpmlouoGhmxi6QJgSS1pYloVsp7QwhaR4rnN2UuS8oFJUNRTTkMQ3tojMzxHfjHGcP2Q7lWRpYY4vayuc5PN4Xhm/4uO5ZWxZQgo3RJguumqh/pII08EteSiOYxHbiPLsZT/PX48S+7bG5Pu33O+5ydPhe+yktvB9n3q9Qcm9wNRtdK2DhabKMF2nTBBUUYQ0mFt+x62BK3Q/uMHswiyT0xP03b3GyFAPqWSCIAhCoeddIKWDKWwM00LXJapmoukC1/WotoVSmix+mmHgcRcPn/SxuBplKvKK2wNX6R3sYn1zHd8PaDabVKs1ymUf2y5hGALDkBi6RbGoh7uGNzSFyfzCNCND3YyPDfI5tsxM9A29I9fpH+0mntzADwJarRaNRhO/Ugt3VIva5UeVUIs6QojwJYqQgmj0A48G7/BibJhEPEZie5WpyDiRlQlOCznq9XooDKX1BtWgRuWiQuAHf3rFD3euVqso7ZLPH5NMfGU3lUArFjBFgdPzn6hGlorv0Go1QxmX0nZ2eof2JLVaDcWxXCxpI4XAMiWO5eDYNrYtsG2J67qU3PJ/cR0PKWyU3e97pPeyHKRzZPZzHGQO/yGTPuQgfUQ2cxxmm87Z36T3c/zY2eM3uBPKlB9ONn0AAAAASUVORK5CYII="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "A dashboard for managing photographers and their clients’ orders.",
    "highlights": [],
    "tags": [
      "Admin",
      "Dashboard",
      "Responsive"
    ],
    "techStack": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-01-18T14:17:23.290Z",
    "problem": "Manage photographers and client orders in one place.",
    "legacyBody": "Admin dashboard to manage photographers and clients orders and more."
  }
];
