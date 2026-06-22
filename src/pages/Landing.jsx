import { useState } from "react";
import {
  Camera,
  LogOut,
  LayoutDashboard,
  History,
  MessageCircle,
  Home,
  ChevronRight,
  Zap,
  Brain,
  TrendingUp,
  Bell,
  Search,
  Leaf,
  ArrowRight,
  Star,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const user = {
  name: "Sarah",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  streak: 14,
};

const navLinks = [
  { label: "Home", icon: Home, path: "/landing" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "History", icon: History, path: "/history" },
  { label: "Coach", icon: MessageCircle, path: "/coach" },
];

const featureCards = [
  {
    icon: Camera,
    title: "Upload Food",
    description: "Snap a photo of your meal and let AI recognize and log every ingredient instantly.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    stat: "2.4s avg",
    statLabel: "recognition time",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get detailed nutrition information in seconds — calories, macros, vitamins, and more.",
    color: "bg-lime-50",
    iconColor: "text-lime-600",
    stat: "98%",
    statLabel: "accuracy rate",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Personalized suggestions for a healthier you, adapting to your goals and preferences.",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    stat: "50k+",
    statLabel: "food database",
  },
  {
    icon: TrendingUp,
    title: "Track & Improve",
    description: "Monitor your progress over time and hit your health targets with intelligent insights.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    stat: "87%",
    statLabel: "goal success rate",
  },
];

const recentMeals = [
  { name: "Grilled Salmon Bowl", calories: 520, time: "8:30 AM", score: 92 },
  { name: "Green Smoothie", calories: 180, time: "Yesterday", score: 88 },
  { name: "Avocado Toast", calories: 340, time: "Yesterday", score: 76 },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-foreground tracking-tight">
              NutriVision <span className="text-primary">AI</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, icon: Icon, path}) => (
              <button
                key={label}
                onClick={() =>{
                  setActiveNav(label);
                  navigate(path);
                  }}
                
                
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeNav === label
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                searchFocused ? "border-primary bg-white shadow-sm" : "border-border bg-muted"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search foods..."
                className="bg-transparent text-sm outline-none w-36 text-foreground placeholder:text-muted-foreground"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>

            {/* Notification */}
            <button className="relative w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>

            {/* Streak badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-primary/20">
              <span className="text-base">🔥</span>
              <span className="text-sm font-semibold text-primary">{user.streak}</span>
              <span className="text-xs text-muted-foreground">day streak</span>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
              />
              <div className="hidden md:flex items-center">
            <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-primary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                AI-Powered Nutrition
              </span>
            </div>

            <h1
              className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-6"
            >
              Food{" "}
              <span
                className="text-primary relative"
                style={{
                  backgroundImage: "linear-gradient(135deg, #1a6b3c 0%, #2d9e5c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nutrition
              </span>{" "}
              Analyzer
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Upload a food image or enter a food name to get instant nutrition insights and personalized AI recommendations tailored to your health goals.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.button
              onClick={() => navigate("/food-analysis")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              >
                <Camera className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                Analyze Food
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border-2 border-primary/30 text-primary font-semibold text-[15px] bg-white hover:bg-secondary hover:border-primary/50 transition-all duration-200"
              >
                <BarChart3 className="w-[18px] h-[18px]" />
                Explore Features
              </motion.button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
              {/* <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&auto=format",
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&auto=format",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
              </div> */}
              {/* <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">12,400+</span> healthy meals analyzed today
                </p>
              </div> */}
            </div>
          </motion.div>

          {/* Right — visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            {/* Main image card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=480&fit=crop&auto=format"
                alt="Healthy colorful meal bowl"
                className="w-full h-80 lg:h-96 object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating analysis card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Analyzing meal...
                    </p>
                    <p className="text-base font-bold text-foreground">Mediterranean Grain Bowl</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">92</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Calories", value: "420" },
                    { label: "Protein", value: "28g" },
                    { label: "Carbs", value: "48g" },
                    { label: "Fat", value: "14g" },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-sm font-bold text-foreground">{value}</p>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 bg-primary text-white rounded-xl px-3.5 py-2 shadow-lg shadow-primary/30">
              <p className="text-xs font-semibold">Health Score</p>
              <p className="text-xl font-extrabold leading-none">92/100</p>
            </div>
          </motion.div>
        </section>

        {/* Feature Cards */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Everything you need
              </h2>
              <p className="text-muted-foreground">
                Powerful tools to help you eat smarter and live healthier.
              </p>
            </div>
            <a
              href="#features"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See all features <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map(({ icon: Icon, title, description, color, iconColor, stat, statLabel }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-250 cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>
                <div className="pt-4 border-t border-border flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-foreground">{stat}</span>
                  <span className="text-xs text-muted-foreground">{statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Meals + Quick Stats */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Recent Meals */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground">Recent Meals</h3>
              <a href="#history" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="space-y-3">
              {recentMeals.map((meal) => (
                <div
                  key={meal.name}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-muted hover:bg-accent transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {meal.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{meal.calories}</p>
                      <p className="text-xs text-muted-foreground">kcal</p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `conic-gradient(#1a6b3c ${meal.score}%, #eef2ec ${meal.score}%)`,
                        color: "#1a6b3c",
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-primary">
                        {meal.score}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Summary */}
          <div className="bg-primary rounded-2xl p-6 text-white flex flex-col">
            <h3 className="text-base font-bold mb-1 text-white/90">Today's Summary</h3>
            <p className="text-xs text-white/60 mb-6">Saturday, June 21</p>

            <div className="flex-1 space-y-4">
              {[
                { label: "Calories", current: 1240, goal: 2000, unit: "kcal" },
                { label: "Protein", current: 68, goal: 120, unit: "g" },
                { label: "Water", current: 5, goal: 8, unit: "glasses" },
              ].map(({ label, current, goal, unit }) => {
                const pct = Math.round((current / goal) * 100);
                return (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/80 font-medium">{label}</span>
                      <span className="text-white font-semibold">
                        {current}{unit} <span className="text-white/50">/ {goal}{unit}</span>
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="mt-6 w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-colors border border-white/20 flex items-center justify-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Full Dashboard
            </button>
          </div>
        </section>
      </main>

      {/* Footer strip */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">NutriVision AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 NutriVision AI. Eat smart, live well.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
