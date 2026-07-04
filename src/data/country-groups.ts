// Schengen area member destinations we currently list.
// Ireland is EU but NOT Schengen — deliberately excluded.
export const SCHENGEN_SLUGS = new Set<string>([
  "germany",
  "france",
  "netherlands",
  "switzerland",
  "iceland",
  "sweden",
  "portugal",
  "greece",
  "austria",
  "italy",
]);

export const isSchengen = (slug: string) => SCHENGEN_SLUGS.has(slug);

// Curated head-to-head comparisons that answer real user questions.
export type ComparisonPreset = {
  id: string;
  title: string;
  blurb: string;
  slugs: [string, string] | [string, string, string];
};

export const POPULAR_COMPARISONS: ComparisonPreset[] = [
  {
    id: "usa-vs-canada",
    title: "USA vs Canada",
    blurb: "North America visitor visas — interview-based B1/B2 vs Canada TRV.",
    slugs: ["usa", "canada"],
  },
  {
    id: "australia-vs-new-zealand",
    title: "Australia vs New Zealand",
    blurb: "Two of the most-asked Oceania tourist visas, compared side by side.",
    slugs: ["australia", "new-zealand"],
  },
  {
    id: "schengen-classics",
    title: "France vs Italy vs Germany",
    blurb: "The three most-applied Schengen destinations from the UK.",
    slugs: ["france", "italy", "germany"],
  },
  {
    id: "affordable-schengen",
    title: "Portugal vs Greece",
    blurb: "Sun, sea and the most affordable Schengen entry points.",
    slugs: ["portugal", "greece"],
  },
  {
    id: "asia-hubs",
    title: "Singapore vs Malaysia vs Thailand",
    blurb: "South-East Asia visa options for business and leisure travellers.",
    slugs: ["singapore", "malaysia", "thailand"],
  },
  {
    id: "ireland-vs-schengen",
    title: "Ireland vs France",
    blurb: "Ireland (non-Schengen) vs a classic Schengen destination.",
    slugs: ["ireland", "france"],
  },
];
