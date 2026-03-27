import Icon from "@/components/ui/icon";

type Game = "CR" | "BS" | "all";
type AuthStep = "choose" | "login" | "register";

const HERO_BG = "https://cdn.poehali.dev/projects/65aec86a-b3d2-4b25-be35-230d4364c57b/files/b18b8708-3568-432a-a491-9b4f25e331ff.jpg";

const tournaments = [
  { id: 1, game: "CR", title: "Королевский кубок", prize: "5 000 ₽", players: "32/64", status: "open", date: "30 марта", icon: "⚔️", tier: "gold" },
  { id: 2, game: "BS", title: "Brawl Чемпионат", prize: "10 000 ₽", players: "48/128", status: "open", date: "1 апреля", icon: "⭐", tier: "diamond" },
  { id: 3, game: "CR", title: "Ночная арена", prize: "2 000 ₽", players: "16/32", status: "soon", date: "2 апреля", icon: "🌙", tier: "silver" },
  { id: 4, game: "BS", title: "Showdown Pro", prize: "7 500 ₽", players: "60/128", status: "open", date: "3 апреля", icon: "💥", tier: "gold" },
  { id: 5, game: "CR", title: "Гранд Турнир", prize: "25 000 ₽", players: "8/16", status: "soon", date: "5 апреля", icon: "👑", tier: "legendary" },
  { id: 6, game: "BS", title: "Hot Zone Clash", prize: "3 500 ₽", players: "32/64", status: "active", date: "Идёт сейчас", icon: "🔥", tier: "silver" },
];

const tierColors: Record<string, string> = {
  silver: "text-gray-300",
  gold: "text-yellow-400",
  diamond: "text-cyan-400",
  legendary: "text-purple-400",
};

const tierBg: Record<string, string> = {
  silver: "border-gray-500/40 bg-gray-500/5",
  gold: "border-yellow-500/40 bg-yellow-500/5",
  diamond: "border-cyan-500/40 bg-cyan-500/5",
  legendary: "border-purple-500/40 bg-purple-500/5",
};

interface TournamentsTabProps {
  activeGame: Game;
  setActiveGame: (game: Game) => void;
  setAuthOpen: (open: boolean) => void;
  setAuthStep: (step: AuthStep) => void;
}

export default function TournamentsTab({
  activeGame,
  setActiveGame,
  setAuthOpen,
  setAuthStep,
}: TournamentsTabProps) {
  const filteredTournaments = tournaments.filter(t =>
    activeGame === "all" ? true : t.game === activeGame
  );

  return (
    <div className="animate-slide-up">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 min-h-[280px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="relative z-10 px-8 py-10">
          <div className="text-xs font-oswald tracking-[4px] text-yellow-400 uppercase mb-3">
            ⚔️ Clash Royale & Brawl Stars
          </div>
          <h1 className="font-russo text-4xl md:text-6xl text-white leading-tight mb-4">
            БИТВА<br />
            <span className="text-gradient-gold">ЧЕМПИОНОВ</span>
          </h1>
          <p className="text-muted-foreground text-base mb-6 max-w-md">
            Регистрируйся через игровой аккаунт, участвуй в турнирах и забирай призы
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => { setAuthOpen(true); setAuthStep("choose"); }}
              className="btn-cr px-6 py-3 rounded-xl"
            >
              🏆 Участвовать
            </button>
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <div className="font-russo text-yellow-400 text-xl">₽50K+</div>
                <div className="text-muted-foreground text-xs">призовых</div>
              </div>
              <div className="text-center">
                <div className="font-russo text-cyan-400 text-xl">1 200+</div>
                <div className="text-muted-foreground text-xs">игроков</div>
              </div>
              <div className="text-center">
                <div className="font-russo text-purple-400 text-xl">24</div>
                <div className="text-muted-foreground text-xs">турнира</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-muted-foreground text-sm font-oswald">Игра:</span>
        {[
          { key: "all", label: "Все", emoji: "🎮" },
          { key: "CR", label: "Clash Royale", emoji: "⚔️" },
          { key: "BS", label: "Brawl Stars", emoji: "⭐" },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setActiveGame(f.key as Game)}
            className={`px-4 py-2 rounded-xl text-sm font-oswald tracking-wide transition-all duration-300 border ${
              activeGame === f.key
                ? f.key === "CR"
                  ? "bg-purple-600/30 border-purple-500/60 text-purple-300"
                  : f.key === "BS"
                    ? "bg-cyan-600/20 border-cyan-500/60 text-cyan-300"
                    : "bg-yellow-600/20 border-yellow-500/60 text-yellow-300"
                : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
            }`}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      {/* Сетка турниров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTournaments.map((t, i) => (
          <div
            key={t.id}
            className={`rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer animate-slide-up ${tierBg[t.tier]}`}
            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.icon}</span>
                <span className={`text-xs font-oswald tracking-widest px-2 py-0.5 rounded-full border ${
                  t.game === "CR"
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                }`}>
                  {t.game === "CR" ? "CLASH ROYALE" : "BRAWL STARS"}
                </span>
              </div>
              <span className={`text-xs font-oswald px-2 py-0.5 rounded-full border ${
                t.status === "open"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : t.status === "active"
                    ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              }`}>
                {t.status === "open" ? "Открыт" : t.status === "active" ? "🔴 LIVE" : "Скоро"}
              </span>
            </div>

            <h3 className="font-russo text-lg text-white mb-1">{t.title}</h3>
            <div className={`font-russo text-2xl mb-3 ${tierColors[t.tier]}`}>{t.prize}</div>

            <div className="divider-gold mb-3 opacity-30" />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon name="Users" size={13} />
                <span className="font-oswald">{t.players}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon name="Calendar" size={13} />
                <span className="font-oswald">{t.date}</span>
              </div>
            </div>

            <button
              onClick={() => { if (t.status !== "active") { setAuthOpen(true); setAuthStep("choose"); } }}
              className={`mt-4 w-full py-2.5 rounded-xl font-oswald text-sm tracking-wide transition-all duration-300 ${
                t.status === "active"
                  ? "opacity-50 cursor-not-allowed bg-white/5 border border-white/10 text-muted-foreground"
                  : t.game === "CR"
                    ? "btn-cr"
                    : "btn-bs"
              }`}
            >
              {t.status === "active" ? "Идёт сейчас" : "Зарегистрироваться"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
