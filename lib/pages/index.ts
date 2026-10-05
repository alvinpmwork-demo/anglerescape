export type { ArticleContent, ArticleSection, Breadcrumb } from "./types";

export { guideEn, guideZh } from "./guide";
export { similarEn, similarZh } from "./similar";
export { vsEn, vsZh } from "./vs";
export { memeEn, memeZh } from "./meme";
export {
  levelsHubEn,
  levelsHubZh,
  level01En,
  level01Zh,
  level02En,
  level02Zh,
  level03En,
  level03Zh,
} from "./levels";
export { charactersEn, charactersZh } from "./characters";
export { disclaimerEn, disclaimerZh } from "./disclaimer-page";
export { playEn, playZh } from "./play";

import type { ArticleContent } from "./types";
import { guideEn, guideZh } from "./guide";
import { similarEn, similarZh } from "./similar";
import { vsEn, vsZh } from "./vs";
import { memeEn, memeZh } from "./meme";
import {
  levelsHubEn,
  levelsHubZh,
  level01En,
  level01Zh,
  level02En,
  level02Zh,
  level03En,
  level03Zh,
} from "./levels";
import { charactersEn, charactersZh } from "./characters";
import { disclaimerEn, disclaimerZh } from "./disclaimer-page";
import { playEn, playZh } from "./play";

/** All SEO article pages for sitemap / tooling */
export const allArticles: ArticleContent[] = [
  playEn,
  playZh,
  guideEn,
  guideZh,
  similarEn,
  similarZh,
  vsEn,
  vsZh,
  memeEn,
  memeZh,
  levelsHubEn,
  levelsHubZh,
  level01En,
  level01Zh,
  level02En,
  level02Zh,
  level03En,
  level03Zh,
  charactersEn,
  charactersZh,
  disclaimerEn,
  disclaimerZh,
];
