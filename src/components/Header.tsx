import Icon from "@/components/ui/icon";

type Tab = "tournaments" | "rating" | "profile";
type AuthStep = "choose" | "login" | "register";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isLoggedIn: boolean;
  userName: string;
  setAuthOpen: (open: boolean) => void;
  setAuthStep: (step: AuthStep) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isLoggedIn,
  userName,
  setAuthOpen,
  setAuthStep,
}: HeaderProps) {
  return (
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
  );
}
