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

interface RatingTabProps {
  ratingGame: "CR" | "BS";
  setRatingGame: (game: "CR" | "BS") => void;
}

export default function RatingTab({ ratingGame, setRatingGame }: RatingTabProps) {
  return (
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
  );
}
