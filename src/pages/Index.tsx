import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Tab = "tournaments" | "rating" | "profile";
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

const ratingData = {
  CR: [
    { rank: 1, name: "KingSlayer_RU", trophies: 9842, wins: 142, game: "CR" },
    { rank: 2, name: "ArenaLord", trophies: 9561, wins: 138, game: "CR" },
    { rank: 3, name: "DarkKnight", trophies: 9234, wins: 129, game: "CR" },
    { rank: 4, name: "GoblinMaster", trophies: 8890, wins: 115, game: "CR" },
    { rank: 5, name: "RoyalGuard_Pro", trophies: 8654, wins: 108, game: "CR" },
    { rank: 6, name: "CardWizard", trophies: 8321, wins: 99, game: "CR" },
    { rank: 7, name: "TowerDestroyer", trophies: 7988, wins: 94, game: "CR" },
    { rank: 8, name: "ElixirKing", trophies: 7654, wins: 88, game: "CR" },
  ],
  BS: [
    { rank: 1, name: "BrawlGod_777", trophies: 52400, wins: 208, game: "BS" },
    { rank: 2, name: "StarPlayer_X", trophies: 49800, wins: 192, game: "BS" },
    { rank: 3, name: "ShellShock", trophies: 47200, wins: 178, game: "BS" },
    { rank: 4, name: "NitroNinja", trophies: 44100, wins: 165, game: "BS" },
    { rank: 5, name: "BrawlerKing", trophies: 41800, wins: 154, game: "BS" },
    { rank: 6, name: "GemGrabber", trophies: 39200, wins: 143, game: "BS" },
    { rank: 7, name: "ShowdownPro", trophies: 36700, wins: 132, game: "BS" },
    { rank: 8, name: "PixelBrawler", trophies: 34100, wins: 121, game: "BS" },
  ],
};

const particleList = [
  { id: 1, delay: 0, x: 5, emoji: "⚔️" },
  { id: 2, delay: 2, x: 15, emoji: "⭐" },
  { id: 3, delay: 4, x: 25, emoji: "💎" },
  { id: 4, delay: 1, x: 35, emoji: "🏆" },
  { id: 5, delay: 3, x: 55, emoji: "⚔️" },
  { id: 6, delay: 5, x: 65, emoji: "🔥" },
  { id: 7, delay: 2, x: 75, emoji: "💥" },
  { id: 8, delay: 6, x: 85, emoji: "👑" },
  { id: 9, delay: 1.5, x: 92, emoji: "⭐" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("tournaments");
  const [activeGame, setActiveGame] = useState<Game>("all");
  const [authOpen, setAuthOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>("choose");
  const [authGame, setAuthGame] = useState<"CR" | "BS">("CR");
  const [ratingGame, setRatingGame] = useState<"CR" | "BS">("CR");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({ tag: "", name: "", password: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTournaments = tournaments.filter(t =>
    activeGame === "all" ? true : t.game === activeGame
  );

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

  const handleLogin = () => {
    if (formData.tag && formData.password) {
      setUserName(formData.tag);
      setIsLoggedIn(true);
      setAuthOpen(false);
      setFormData({ tag: "", name: "", password: "" });
    }
  };

  const handleRegister = () => {
    if (formData.tag && formData.name && formData.password) {
      setUserName(formData.name);
      setIsLoggedIn(true);
      setAuthOpen(false);
      setFormData({ tag: "", name: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Частицы */}
      {mounted && particleList.map(p => (
        <div
          key={p.id}
          className="particle text-xl select-none"
          style={{
            left: `${p.x}%`,
            animationDuration: `${8 + p.id}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Фоновый градиент */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c18] via-[#080a14] to-[#060810]" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-900/5 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-yellow-900/30 glass">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-russo text-black text-lg font-bold shadow-lg shadow-yellow-500/30">
              CA
            </div>
            <div>
              <div className="font-russo text-xl text-gradient-gold leading-none">CLASH ARENA</div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Tournament Platform</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { key: "tournaments", label: "Турниры", icon: "Trophy" },
              { key: "rating", label: "Рейтинг", icon: "BarChart3" },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as Tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-oswald text-sm tracking-wide transition-all duration-300 ${
                  activeTab === item.key
                    ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          {isLoggedIn ? (
            <button
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-oswald text-sm hover:bg-yellow-500/20 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs text-black font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              {userName}
            </button>
          ) : (
            <button
              onClick={() => { setAuthOpen(true); setAuthStep("choose"); }}
              className="btn-cr px-5 py-2 rounded-xl text-sm"
            >
              Войти
            </button>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex border-t border-yellow-900/20">
          {[
            { key: "tournaments", label: "Турниры", icon: "Trophy" },
            { key: "rating", label: "Рейтинг", icon: "BarChart3" },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as Tab)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 text-xs font-oswald tracking-wide transition-all ${
                activeTab === item.key ? "text-yellow-400" : "text-muted-foreground"
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">

        {/* ТУРНИРЫ */}
        {activeTab === "tournaments" && (
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
                  style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
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
                    onClick={() => { if (t.status !== "active") { setAuthOpen(true); setAuthStep("choose"); }}}
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
        )}

        {/* РЕЙТИНГ */}
        {activeTab === "rating" && (
          <div className="animate-slide-up">
            <div className="mb-8">
              <h2 className="font-russo text-3xl text-gradient-gold mb-1">РЕЙТИНГ ИГРОКОВ</h2>
              <p className="text-muted-foreground text-sm">Топ игроков платформы по количеству кубков</p>
            </div>

            <div className="flex gap-3 mb-6">
              {(["CR", "BS"] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setRatingGame(g)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-oswald tracking-wide transition-all duration-300 border ${
                    ratingGame === g
                      ? g === "CR"
                        ? "cr-card border-purple-500/60 text-purple-200 shadow-lg shadow-purple-500/10"
                        : "bs-card border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-500/10"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                  }`}
                >
                  {g === "CR" ? "⚔️ Clash Royale" : "⭐ Brawl Stars"}
                </button>
              ))}
            </div>

            {/* Подиум */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[ratingData[ratingGame][1], ratingData[ratingGame][0], ratingData[ratingGame][2]].map((player, i) => {
                const medals = ["🥈", "🥇", "🥉"];
                const heights = ["h-28", "h-36", "h-24"];
                const glows = ["", "animate-glow-pulse", ""];
                return (
                  <div key={player.rank} className={`flex flex-col items-center justify-end ${heights[i]}`}>
                    <div className={`w-full rounded-2xl glass border border-white/10 p-3 text-center shadow-xl ${glows[i]}`}>
                      <div className="text-2xl mb-1">{medals[i]}</div>
                      <div className="font-russo text-white text-sm truncate">{player.name}</div>
                      <div className={`font-oswald text-xs mt-1 ${ratingGame === "CR" ? "text-purple-300" : "text-cyan-300"}`}>
                        {player.trophies.toLocaleString()} 🏆
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Таблица */}
            <div className="rounded-2xl border border-border overflow-hidden glass">
              <div className="px-4 py-3 border-b border-border">
                <div className="grid grid-cols-12 text-xs font-oswald tracking-widest text-muted-foreground uppercase">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Игрок</div>
                  <div className="col-span-3 text-right">Кубки</div>
                  <div className="col-span-3 text-right">Победы</div>
                </div>
              </div>

              <div className="divide-y divide-border/50">
                {ratingData[ratingGame].map((player) => (
                  <div
                    key={player.rank}
                    className={`rank-row px-4 py-3.5 grid grid-cols-12 items-center ${player.rank <= 3 ? `rank-${player.rank}` : ""}`}
                  >
                    <div className="col-span-1">
                      <span className={`font-russo text-sm ${
                        player.rank === 1 ? "text-yellow-400" :
                        player.rank === 2 ? "text-gray-300" :
                        player.rank === 3 ? "text-orange-400" :
                        "text-muted-foreground"
                      }`}>
                        {player.rank === 1 ? "👑" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : player.rank}
                      </span>
                    </div>
                    <div className="col-span-5 flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-russo ${
                        ratingGame === "CR" ? "bg-purple-500/20 text-purple-300" : "bg-cyan-500/20 text-cyan-300"
                      }`}>
                        {player.name.charAt(0)}
                      </div>
                      <span className="font-oswald text-white text-sm">{player.name}</span>
                    </div>
                    <div className={`col-span-3 text-right font-russo text-sm ${
                      ratingGame === "CR" ? "text-purple-300" : "text-cyan-300"
                    }`}>
                      {player.trophies.toLocaleString()}
                    </div>
                    <div className="col-span-3 text-right font-oswald text-sm text-yellow-400">
                      {player.wins} W
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {activeTab === "profile" && isLoggedIn && (
          <div className="animate-slide-up max-w-2xl mx-auto">
            <div className="rounded-3xl border border-yellow-500/20 overflow-hidden glass">
              <div className="relative p-8 bg-gradient-to-br from-yellow-900/20 to-purple-900/20">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-russo text-3xl text-black shadow-xl shadow-yellow-500/30">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-russo text-2xl text-white">{userName}</div>
                    <div className="text-muted-foreground text-sm mt-1">Игрок платформы</div>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-oswald">⚔️ CR</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-oswald">⭐ BS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Турниры", value: "0", icon: "Trophy" },
                    { label: "Победы", value: "0", icon: "Medal" },
                    { label: "Призовые", value: "₽0", icon: "Coins" },
                  ].map(stat => (
                    <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                      <Icon name={stat.icon} size={20} className="mx-auto mb-2 text-yellow-400" />
                      <div className="font-russo text-xl text-white">{stat.value}</div>
                      <div className="text-xs text-muted-foreground font-oswald">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-sm font-oswald text-muted-foreground mb-2 tracking-wide uppercase">Статус</div>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-oswald text-sm">Верифицирован через игровой аккаунт</span>
                  </div>
                </div>

                <button
                  onClick={() => { setIsLoggedIn(false); setActiveTab("tournaments"); setUserName(""); }}
                  className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-oswald text-sm hover:bg-red-500/10 transition-all"
                >
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ */}
      {authOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setAuthOpen(false)}
        >
          <div className="w-full max-w-md rounded-3xl border border-yellow-500/20 bg-[#0a0c18] overflow-hidden shadow-2xl shadow-yellow-500/10 animate-slide-up">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-yellow-900/15 to-purple-900/15">
              <div>
                <div className="font-russo text-lg text-gradient-gold">CLASH ARENA</div>
                <div className="text-xs text-muted-foreground font-oswald tracking-widest">
                  {authStep === "choose" ? "Выберите способ входа" :
                   authStep === "login" ? "Вход в аккаунт" : "Регистрация"}
                </div>
              </div>
              <button
                onClick={() => setAuthOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            </div>

            <div className="p-6">
              {authStep === "choose" && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl mb-2">🏟️</div>
                    <p className="text-muted-foreground text-sm">Войди через аккаунт игры или создай новый</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(["CR", "BS"] as const).map(g => (
                      <button
                        key={g}
                        onClick={() => setAuthGame(g)}
                        className={`p-4 rounded-xl border transition-all ${
                          authGame === g
                            ? g === "CR" ? "cr-card border-purple-500/60 text-purple-200" : "bs-card border-cyan-500/60 text-cyan-200"
                            : "bg-white/5 border-white/10 text-muted-foreground"
                        }`}
                      >
                        <div className="text-2xl mb-1">{g === "CR" ? "⚔️" : "⭐"}</div>
                        <div className="font-oswald text-xs tracking-wide">{g === "CR" ? "Clash Royale" : "Brawl Stars"}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setAuthStep("login")}
                    className={`w-full py-3.5 rounded-xl font-oswald tracking-wide text-sm ${authGame === "CR" ? "btn-cr" : "btn-bs"}`}
                  >
                    Войти в {authGame === "CR" ? "Clash Royale" : "Brawl Stars"}
                  </button>
                  <button
                    onClick={() => setAuthStep("register")}
                    className="w-full py-3.5 rounded-xl font-oswald tracking-wide text-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    Создать аккаунт
                  </button>
                </div>
              )}

              {authStep === "login" && (
                <div className="space-y-4">
                  <button onClick={() => setAuthStep("choose")} className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-white transition-colors mb-4">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>

                  <div className={`p-3 rounded-xl border text-center mb-4 ${authGame === "CR" ? "cr-card" : "bs-card"}`}>
                    <span className="text-sm font-oswald text-muted-foreground">
                      {authGame === "CR" ? "⚔️ Clash Royale аккаунт" : "⭐ Brawl Stars аккаунт"}
                    </span>
                  </div>

                  {[
                    { label: "Тег игрока (например: #ABC123)", key: "tag", placeholder: "#ABC123", type: "text" },
                    { label: "Пароль платформы", key: "password", placeholder: "••••••••", type: "password" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-xs font-oswald tracking-widest text-muted-foreground uppercase mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white font-oswald text-sm placeholder-muted-foreground focus:outline-none focus:border-yellow-500/60 transition-colors"
                      />
                    </div>
                  ))}

                  <button onClick={handleLogin} className={`w-full py-3.5 rounded-xl font-oswald tracking-wide text-sm mt-2 ${authGame === "CR" ? "btn-cr" : "btn-bs"}`}>
                    Войти
                  </button>
                </div>
              )}

              {authStep === "register" && (
                <div className="space-y-4">
                  <button onClick={() => setAuthStep("choose")} className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-white transition-colors mb-2">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {(["CR", "BS"] as const).map(g => (
                      <button
                        key={g}
                        onClick={() => setAuthGame(g)}
                        className={`py-2 px-3 rounded-xl border text-xs font-oswald tracking-wide transition-all ${
                          authGame === g
                            ? g === "CR" ? "cr-card border-purple-500/60 text-purple-200" : "bs-card border-cyan-500/60 text-cyan-200"
                            : "bg-white/5 border-white/10 text-muted-foreground"
                        }`}
                      >
                        {g === "CR" ? "⚔️ Clash Royale" : "⭐ Brawl Stars"}
                      </button>
                    ))}
                  </div>

                  {[
                    { label: "Тег игрока из игры", key: "tag", placeholder: "#ABC123", type: "text" },
                    { label: "Имя на платформе", key: "name", placeholder: "Твой ник", type: "text" },
                    { label: "Придумай пароль", key: "password", placeholder: "••••••••", type: "password" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-xs font-oswald tracking-widest text-muted-foreground uppercase mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white font-oswald text-sm placeholder-muted-foreground focus:outline-none focus:border-yellow-500/60 transition-colors"
                      />
                    </div>
                  ))}

                  <button onClick={handleRegister} className={`w-full py-3.5 rounded-xl font-oswald tracking-wide text-sm ${authGame === "CR" ? "btn-cr" : "btn-bs"}`}>
                    Зарегистрироваться
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-russo text-gradient-gold text-sm">CLASH ARENA</div>
          <div className="text-xs text-muted-foreground font-oswald tracking-wide text-center">
            Не аффилировано с Supercell · Clash Royale & Brawl Stars — торговые марки Supercell
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground font-oswald">
            <span className="hover:text-white cursor-pointer transition-colors">Правила</span>
            <span className="hover:text-white cursor-pointer transition-colors">Поддержка</span>
            <span className="hover:text-white cursor-pointer transition-colors">О нас</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
