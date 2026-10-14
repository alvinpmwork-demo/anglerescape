import { STEAM_URL } from "@/lib/steam";

type Props = { locale: "en" | "zh"; variant?: "footer" | "inline" };

export function SteamWishlist({ locale, variant = "inline" }: Props) {
  if (!STEAM_URL) return null;
  const label = locale === "zh" ? "在 Steam 加入愿望单" : "Wishlist on Steam";
  const note =
    locale === "zh" ? "完整版开发中，加愿望单第一时间收到上线通知。" : "The full game is in development. Wishlist to get notified at launch.";
  return (
    <aside className={`steam-wishlist steam-wishlist-${variant}`}>
      {variant === "inline" ? <p>{note}</p> : null}
      <a href={STEAM_URL} target="_blank" rel="noopener" className="btn btn-secondary">
        {label}
      </a>
    </aside>
  );
}
