import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  ChevronRight,
  Home,
  LayoutDashboard,
  History,
  MessageCircle,
  BarChart2,
  User,
  Menu,
  X,
  Flame,
  Star,
  TrendingUp,
  Lightbulb,
  Filter,
  Leaf,
} from "lucide-react";
import { useNavigate } from "react-router-dom";




const typeColors = {
  Meal: "bg-orange-100 text-orange-700",
  Snack: "bg-green-100 text-green-700",
  Drink: "bg-blue-100 text-blue-700",
};

const scoreColor = (score) => {
  if (score >= 85) return "#16a34a";
  if (score >= 70) return "#eab308";
  return "#f97316";
};

function ScoreRing({ score }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);
  return (
    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
      <svg width="48" height="48" className="-rotate-90">
        <circle cx="24" cy="24" r={r} stroke="#e5e7eb" strokeWidth="3.5" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={r}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xs font-semibold" style={{ color }}>{score}</span>
    </div>
  );
}

const navLinks = [
  { label: "Home", icon: Home, path: "/landing" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "History", icon: History, path: "/history" },
  { label: "Coach", icon: MessageCircle, path: "/coach" },
  { label: "Analytics", icon: BarChart2 },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  fetchHistory();
}, []);

const fetchHistory = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/v1/food/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("History Data:", data);

    setMeals(data);

  } catch (error) {
    console.error(error);
  }
};

  const filters = ["All", "Meals", "Snacks", "Drinks"];

  
    // .filter((m) => {
    //   if (activeFilter === "All") return true;
    //   const map = { Meals: "Meal", Snacks: "Snack", Drinks: "Drink" };
    //   return m.type === map[activeFilter];
    // })
    // .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    // .slice(0, visibleCount);

  
    // .filter((m) => {
    //   if (activeFilter === "All") return true;
    //   const map = { Meals: "Meal", Snacks: "Snack", Drinks: "Drink" };
    //   return m.type === map[activeFilter];
    // })
    // .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));


  const allFiltered = meals
  .filter((meal) => {
    if (activeFilter === "All") return true;

    const filterMap = {
      Meals: "Meal",
      Snacks: "Snack",
      Drinks: "Drink",
    };

    return meal.meal_type === filterMap[activeFilter];
  })
  .filter((meal) =>
    meal.meal_name.toLowerCase().includes(search.toLowerCase())
  );

const filtered = allFiltered.slice(0, visibleCount);

  const totalCalories = meals.reduce(
  (sum, meal) => sum + (meal.calories || 0),
  0
);

const totalProtein = meals.reduce(
  (sum, meal) => sum + (meal.protein || 0),
  0
);

const totalCarbs = meals.reduce(
  (sum, meal) => sum + (meal.carbs || 0),
  0
);

const totalFat = meals.reduce(
  (sum, meal) => sum + (meal.fat || 0),
  0
);

const totalFiber = meals.reduce(
  (sum, meal) => sum + (meal.fiber || 0),
  0
);

const totalHealthScore =
  meals.length > 0
    ? Math.round(
        meals.reduce((sum, meal) => sum + 90, 0) / meals.length
      )
    : 0;

const totalMeals = meals.length;



  const deleteMeal = async (mealId) => {

  try {

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/v1/food/history/${mealId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Refresh the history list
    fetchHistory();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-background font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── TOP NAV ── */}
      <header className="bg-white border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-foreground hidden sm:block">NutriVision AI</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => 
                    
                    navigate(link.path)
                }
                   className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                   link.label === "History"
                   ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                 }`}
            
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </nav>

          {/* Profile */}
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-accent transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="hidden sm:inline font-medium">Profile</span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground hidden sm:inline" />
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => {

                navigate(link.path);
                setMobileNavOpen(!mobileNavOpen)}}
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  link.active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setMobileNavOpen(false)}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── PAGE BODY ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">

        {/* ── LEFT / MAIN COLUMN ── */}
        <div className="flex-1 min-w-0">
          {/* Page heading */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <History className="w-6 h-6 text-primary" />
              History
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">View your past food analysis and meals.</p>
          </div>

          {/* Filter tabs + search row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* Tabs */}
            <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit">
              {/* {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setVisibleCount(4); }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === f
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))} */}
              {filters.map((filter) => (
  <button
    key={filter}
    onClick={() => {
      setActiveFilter(filter);
      setVisibleCount(4);
    }}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
      activeFilter === filter
        ? "bg-primary text-white"
        : "bg-muted text-muted-foreground hover:bg-accent"
    }`}
  >
    {filter}
  </button>
))}
            </div>

            {/* Search + filter */}
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search food..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-border text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-border text-sm text-foreground hover:bg-accent transition whitespace-nowrap">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="hidden sm:inline">Filter by Date</span>
                <Calendar className="w-4 h-4 text-muted-foreground sm:hidden" />
              </button>
            </div>
          </div>

          {/* Meal list */}
          <div className="flex flex-col gap-3">
  {filtered.length === 0 ? (
    <div className="text-center py-16 text-muted-foreground">
      <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
      <p className="text-sm">No meals found.</p>
    </div>
  ) : (
    filtered.map((meal) => (
      <div
        key={meal.id}
        className="bg-white rounded-2xl border border-border p-4 hover:shadow-md transition-all"
      >
        <h3 className="font-semibold text-lg text-foreground">
          {meal.meal_name}
        </h3>


       <p className="text-sm text-gray-500">
        {meal.date}
       </p>

       <div className="mt-2 flex gap-4 text-sm">
  <span>🔥 {meal.calories} kcal</span>
  <span>🥩 {meal.protein}g Protein</span>
  <span>🍞 {meal.carbs}g Carbs</span>
  <span>🥑 {meal.fat}g Fat</span>
  <p>Fiber: {meal.fiber}g</p>
  <p>Sugar: {meal.sugar}g</p>
  <p>Sodium: {meal.sodium}mg</p>
  <button
  onClick={() => deleteMeal(meal.id)}
  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
>
  Delete
</button>
</div>

        <p className="text-sm text-muted-foreground">
          {new Date(meal.created_at).toLocaleString()}
        </p>
      </div>
    ))
  )}
</div>

          {/* Load more */}
          {visibleCount < allFiltered.length && (
            <button
              onClick={() => setVisibleCount((c) => c + 4)}
              className="mt-5 w-full py-2.5 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all"
            >
              Load More
            </button>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Summary card */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              History Summary
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BarChart2 className="w-4 h-4 text-primary" />
                  Total Analyses
                </div>
                <span className="font-bold text-foreground">{meals.length}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Total Calories
                </div>
                <span className="font-bold text-foreground">{totalCalories.toFixed(1)}kcal</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Avg Health Score
                </div>
                <span className="font-bold text-green-600">{totalHealthScore}/100</span>
              </div>
            </div>
          </div>

          {/* Top foods */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-bold text-foreground mb-3 text-sm">Top Foods</h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "Chicken Biryani", count: 5, emoji: "🍗" },
                { name: "Paneer", count: 4, emoji: "🧀" },
                { name: "Oats", count: 3, emoji: "🥣" },
              ].map((food, i) => (
                <div key={food.name} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground w-4">{i + 1}</span>
                  <span className="text-base">{food.emoji}</span>
                  <span className="flex-1 text-sm text-foreground">{food.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {food.count}×
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Tip</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              To maintain a balanced diet, keep analyzing your meals!
            </p>
          </div>

          {/* Mobile score legend */}
          <div className="lg:hidden bg-white rounded-2xl border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Health Score</p>
            <div className="flex gap-4">
              {[
                { label: "Excellent", color: "#16a34a", range: "85+" },
                { label: "Good", color: "#eab308", range: "70–84" },
                { label: "Fair", color: "#f97316", range: "<70" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <div>
                    <p className="text-xs font-medium text-foreground">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground">{s.range}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
