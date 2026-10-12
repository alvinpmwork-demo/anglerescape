import type { ArticleContent } from "./types";

/** EN-only list page for "illegal fishing game" queries (no ZH twin yet, so no hreflang). */
export const illegalFishingEn: ArticleContent = {
  locale: "en",
  path: "/similar-games/illegal-fishing-games/",
  singleLocale: true,
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  title: "Illegal Fishing Games (All Fiction): Run From the Warden",
  description:
    "Fiction-only list of illegal fishing / stealth fishing games where you dodge patrols or run after getting spotted—unBAITable, Risk of Reel, Stealth Fishing, Steal a Fish, and Angler Escape.",
  h1: "Games Where You Fish Illegally (All Fiction)",
  topNote:
    "These are cartoon or indie games. They do not teach real fishing, poaching, or how to avoid real officers. Follow local fishing laws.",
  intro: [
    "People search for “illegal fishing game” and “fishing game where you run from the game warden” because the premise is fun in fiction: break a rule in a made-up world, get spotted, then sneak or sprint away. Below is a short comparison of titles that actually play with that idea (or a close cousin), plus where to try them. Store pages and prices change—check each link before you download.",
  ],
  sections: [
    {
      h2: "Quick Comparison",
      table: {
        headers: ["Game", "Premise (fiction)", "Chase / stealth?", "Where", "Session feel"],
        rows: [
          [
            "unBAITable",
            "Fishing banned by a fictional Fish Protection Bureau; fish in a fish costume, dodge patrols, sell to a black-market shop",
            "Patrol tension, story nights",
            "itch.io (pay-what-you-want; browser + desktop)",
            "~30 min runs",
          ],
          [
            "Risk of Reel",
            "Night fishing at a campus lake that is “highly illegal” in-game; hide from guards (or bribe them in-fiction)",
            "Hide / stealth between casts",
            "itch.io",
            "Casual night runs",
          ],
          [
            "Stealth Fishing",
            "Fox breaks into a theme-park tank to rescue fish while dodging searchlights (stealth + fishing theme, not “poaching”)",
            "Searchlights / arcade stealth",
            "itch.io (browser + Windows)",
            "A few minutes",
          ],
          [
            "Steal a Fish",
            "Short HTML5 “steal the fish” browser games hosted on many free portals",
            "Often chase / grab loops",
            "Various HTML5 portals; platforms vary",
            "Very short",
          ],
          [
            "Angler Escape",
            "Chinese 钓鱼佬 meme slapstick: you already got caught once; sneak past a cartoon Inspector’s flashlight and save your gear",
            "Yes — Second Escape after getting spotted",
            "anglerescape.com (free browser)",
            "~30 seconds",
          ],
        ],
      },
    },
    {
      h2: "unBAITable",
      paragraphs: [
        "The clearest “fishing is outlawed” story game on this list. You work around a fictional Fish Protection Bureau, dodge patrols, and make choices across story nights and an endless mode. If you want plot and endings more than a 30-second meme loop, start here. Official page: eninabox.itch.io/unbaitable.",
      ],
    },
    {
      h2: "Risk of Reel",
      paragraphs: [
        "A small itch game about fishing at night where the fiction is that the spot is illegal and campus guards will catch you. You cast, hide, and sell the haul. Tone is casual comedy, not a tutorial. Official page: snailsquid.itch.io/risk-of-reel.",
      ],
    },
    {
      h2: "Stealth Fishing",
      paragraphs: [
        "Older arcade-style browser game: you sneak past searchlights to rescue fish from a marine park tank. It is stealth-fishing themed, but the fantasy is “animal rescue,” not breaking fishing laws. Still useful if someone typed “stealth fishing game.” Official page: campa.itch.io/stealth-fishing.",
      ],
    },
    {
      h2: "Steal a Fish",
      paragraphs: [
        "You will see many short browser clones and portals under this name. Status and hosts change often. Treat them as throwaway HTML5 toys; we do not mirror or rehost them. Prefer official itch pages when you can find one.",
      ],
    },
    {
      h2: "Angler Escape (Ours)",
      paragraphs: [
        "Built around what happens after you are spotted. In Second Escape you already got caught once; now you hug rock shadows, stay out of the Inspector’s flashlight cone, and reach the green EXIT bush. Runs are about 30 seconds, retry is instant, and the comedy is the fail. Pure cartoon fiction—no real fishing advice.",
      ],
      links: [
        { label: "▶ Play Second Escape free", href: "/play/second-escape/" },
        { label: "More sneaky fishing picks", href: "/similar-games/" },
        { label: "Chinese fishing guy meme explained", href: "/meme/fishing-guy-meme/" },
      ],
    },
  ],
  primaryCta: "▶ Play Second Escape Free",
  primaryHref: "/play/second-escape/",
  secondaryCta: "Games like unBAITable →",
  secondaryHref: "/similar-games/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Is there a game where you fish illegally and run from wardens?",
      a: "In fiction, yes—unBAITable, Risk of Reel, and Angler Escape all play with that premise. None of them are about real fishing or real enforcement.",
    },
    {
      q: "Are these free?",
      a: "Angler Escape is free in the browser. unBAITable is pay-what-you-want on itch. Others vary—check each store.",
    },
    {
      q: "Do you teach real illegal fishing?",
      a: "No. This page is a games list only. See our fishing rules disclaimer page.",
    },
    {
      q: "Are you affiliated with these games?",
      a: "No, except Angler Escape, which is ours. All other rights belong to their creators.",
    },
  ],
  bottomNote:
    "※ Disclaimer: these are fictional games. Nothing here teaches real fishing, poaching, or how to avoid real officers. Follow local fishing laws.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Similar Games", href: "/similar-games/" },
    { label: "Illegal Fishing Games", href: "/similar-games/illegal-fishing-games/" },
  ],
  related: [
    { label: "Fishing rules disclaimer", href: "/about/fishing-rules-disclaimer/", note: "real life: rules apply" },
    { label: "Angler Escape vs unBAITable", href: "/vs/unbaitable/" },
    { label: "How to escape the Inspector (in-game guide)", href: "/guides/how-to-escape-inspector/" },
    { label: "Stealth fishing game homepage", href: "/" },
  ],
  schemaType: "CollectionPage",
};
