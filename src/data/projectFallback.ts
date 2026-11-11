import type { Project } from "@/types/project";

// Verified snapshot of the seven existing public Sanity projects, 2026-11-12.
// Missing case-study facts stay absent; publishing dates are not project years.
export const projectFallback: Project[] = [
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
    "summary": "Barqya is ",
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
      "Tailwindcss"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-04-15T22:44:18.745Z"
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
      "alt": "Badil interface screenshot",
      "width": 1350,
      "height": 649,
      "lqip": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKHRFWHRDcmVhdGlvbgAxNiDZhtmK2LPYp9mGLCAyMDI1IDA4OjE4OjI1INmFv0XrVQAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAKZSURBVHicTc1LTxMBFIbh+T8a3ZiYuFCXxERX6grFaETBIFojolKpUhDaFAFpocCABaH3Cy2UkZlh2qFTgcIALXSUS4iXxJ/xGtGFizdfzrM5wt0Rg/tjq9T06Jx6rnCiVebEs8X/+nP/s5a/dvI/O/mv0y9kzthVhEB+j0n9EE/2C/ZoGXtkG0eswpvkLh3JKs5U9Xj/9Dqxe5wjvkN7fIdXsQr22C72uEV70sKRshBU02K5fIC0UkFMyLyfShHM6sdW+vqDFesbhZ0jlrYPkM19JPOA+fU94kaZad1k0qgyvXpIZOOIiHmEIGYUoqpBWMrh6B+lzvaKlh4vEdlgybSQViukjE1C+RKh3Dqh5TIBzaQvqdITlXCndbzKBjMrFglzH8H5IY0nKOFLLNE9mabJPU5j9xjdU1mmlA0+aluMflpj5NMaAW2TkFFlYmmLjhmZzplFvJkCH3NbZDcP0ao/EJ760rSJWdzRPMPSOkMLJRwBidbhFIOzRQJaBe/8GkPZEuPqNlN6Fb+8TWc4T19i+fhpslhFKX9H//IL4dbbCC3iIq7ECmNqhcm8hStaoGU4Tce0Rn+6hCv+me6oQVesiCNSpG2mgDNcwDdXYkLeIqhXmTOPWCz/RLjUKtLgzdIeLNKbNunPmLR9UGjwRLjrDvNgYJZmv4RNVHgsqtR7JW73ZXjsX6AzVMCVWKV3dh2/XEFULYRzTT4uO4LU9S/QOKrROKJR60pS88THxQfvuPJyghueNPU+mftDCjd7M1xzhrnuDFE/kKV5LMcjUccWMGgOGAhnmkY4a5vg3PMg51+nqOlZ4HLXLBdtfi489HGtM8atQYV7ozoPxws0DKnUeua42pWk1j3PnQGVusEctYM5rg5o/AbcsELMpKUu9QAAAABJRU5ErkJggg=="
    },
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": null,
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
      "Tailwindcss"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-02-16T00:53:01.294Z"
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
    "summary": "A single-page application for gaming services in saudi arabia.",
    "highlights": [],
    "tags": [
      "Games",
      "Excitement",
      "Gaming",
      "VR Games"
    ],
    "techStack": [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Vanilla JS"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": "https://xitmnt.sa/",
    "repoUrl": null,
    "publishedAt": "2025-01-23T13:47:07.054Z"
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
    "summary": "Herbal Home provides Natural Herbal Medications, allowing users to search for product ratings and details.",
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
    "publishedAt": "2025-01-23T13:45:20.210Z"
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
    "fullPageScreenshot": null,
    "gallery": [],
    "year": null,
    "role": null,
    "summary": "A single-page application that allows users to know more about Elham Company and its services.",
    "highlights": [],
    "tags": [
      "Landing",
      "Responsive",
      "SPA"
    ],
    "techStack": [
      "React",
      "Jsx",
      "Tailwindcss"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": null,
    "repoUrl": null,
    "publishedAt": "2025-01-23T13:43:08.671Z"
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
    "summary": "Admin Dashboard for a Gym and Fitness Center.",
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
      "Tailwindcss",
      "MUI",
      "SPA"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": "https://baslex.vercel.app/",
    "repoUrl": "https://baslex.vercel.app/",
    "publishedAt": "2025-01-18T14:37:09.988Z"
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
    "summary": "Admin dashboard to manage photographers and clients orders and more.",
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
      "Tailwindcss",
      "tasStack"
    ],
    "accentColor": null,
    "order": null,
    "featured": false,
    "liveUrl": "https://baslex.vercel.app/",
    "repoUrl": "https://baslex.vercel.app/",
    "publishedAt": "2025-01-18T14:17:23.290Z"
  }
];
