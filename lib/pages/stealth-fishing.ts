import { OPERATOR_NAME } from "./trust";

export const STEALTH_FISHING_GAME_URL = "https://stealthfishinggame.com/";
export const CAMPA_STEALTH_FISHING_URL = "https://campa.itch.io/stealth-fishing";

export const stealthFishingGame = {
  en: {
    title: "Stealth Fishing Game",
    meta: "2026 · Free in the browser · No download",
    body: `Fish in a private pond and dodge two wardens in 120-second rounds. This is a separate game from Angler Escape. Both games are by ${OPERATOR_NAME.en}. Campa T. Dog’s 2016 Stealth Fishing is an arcade game about a fox rescuing fish from a theme park aquarium.`,
    href: STEALTH_FISHING_GAME_URL,
  },
  zh: {
    title: "Stealth Fishing Game",
    meta: "2026 年 · 免费网页游戏 · 免下载",
    body: `在私人池塘钓鱼，躲开两名管理员，每局 120 秒。这是 ${OPERATOR_NAME.zh} 在《钓鱼佬大逃亡》之外制作的另一款游戏，也和 Campa T. Dog 于 2016 年推出的《Stealth Fishing》不同。那款旧作讲的是狐狸潜入主题公园的水族馆救鱼。`,
    href: STEALTH_FISHING_GAME_URL,
  },
};

export const campaStealthFishing = {
  en: {
    title: "Stealth Fishing",
    meta: "Campa T. Dog · 2016 · itch.io",
    body: "Play as a fox sneaking past searchlights to rescue fish from a theme park aquarium.",
    href: CAMPA_STEALTH_FISHING_URL,
  },
  zh: {
    title: "Stealth Fishing",
    meta: "Campa T. Dog · 2016 年 · itch.io",
    body: "扮演一只狐狸，躲开探照灯，潜入主题公园的水族馆救鱼。",
    href: CAMPA_STEALTH_FISHING_URL,
  },
};
