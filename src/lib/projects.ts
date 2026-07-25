export const PROJECTS = [
  {
    id: "dress4weather",
    name: "Dress4Weather",
    url: "https://www.dress4weather.com",
  },
  {
    id: "casting",
    name: "KivaCast",
    url: "https://www.kivacast.com",
  },
] as const;

export type Project = (typeof PROJECTS)[number];
