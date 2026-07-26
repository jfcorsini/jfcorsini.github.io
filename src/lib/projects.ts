export const PROJECTS = [
  {
    id: "casting",
    name: "KivaCast",
    url: "https://www.kivacast.com",
  },
  {
    id: "dress4weather",
    name: "Dress4Weather",
    url: "https://www.dress4weather.com",
  },
] as const;

export type Project = (typeof PROJECTS)[number];
