import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import api from "../api/axios";
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
  LogOut,
  TrendingUp,
  Lightbulb,
  Filter,
  Leaf,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Apple,
  Candy,
  Salad,
  ShieldCheck,
  Sparkles,
  Brain,
  HeartPulse,
  BadgeAlert,
  Tags,
  FlaskConical,
  Pill,
  Trash2,
  Clock3,
  Star
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
  // { label: "Analytics", icon: BarChart2 },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("History");
  const [visibleCount, setVisibleCount] = useState(4);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
  fetchHistory();
}, []);

const fetchHistory = async () => {

  try {

    const token = localStorage.getItem("token") ||
                  sessionStorage.getItem("token");

    // const response = await fetch(
    //   `${import.meta.env.VITE_API_URL}/api/v1/food/history`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    

    const response = await api.get("/food/history");

    setMeals(response.data);

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

    const type = meal.meal_type?.toLowerCase();

    switch (activeFilter) {
      case "Meals":
        return (
          type === "breakfast" ||
          type === "lunch" ||
          type === "dinner"
        );

      case "Snacks":
        return type === "snack";

      case "Drinks":
        return type === "drink";

      default:
        return true;
    }
  })
  

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
        meals.reduce((sum, meal) => sum + (meal.healthScore || 0),
      0 
    ) / meals.length
      )
    : 0;

const totalMeals = meals.length;



  const deleteMeal = async (mealId) => {

  try {

    const token = localStorage.getItem("token") ||
                  sessionStorage.getItem("token");

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/food/history/${mealId}`,
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
    <div className="min-h-screen bg-background" style={{ fontFamily: "Inter, sans-serif" }}>
          {/* Navbar */}
          <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <img
                      src={logo}
                      alt="NutriVision AI"
                      className="h-11 w-auto object-contain"
                    />
                       
                  </div>
                  <span className="font-bold text-lg text-foreground tracking-tight">NutriVision AI</span>
                </div>
    
                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map(({ label, icon: NavIcon, path }) => (
                    <button
                      key={label}
                      onClick={() => {
                        setActiveNav(label);
                        navigate(path);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeNav === label
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <NavIcon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
    
                {/* Logout + Mobile Toggle */}
                <div className="flex items-center gap-2">
                  <button 
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <LogOut size={15} />
                    Logout
                  </button>
                  <button
                    className="md:hidden p-2 rounded-lg hover:bg-accent text-muted-foreground"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>
    
              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden py-3 border-t border-border flex flex-col gap-1">
                  {navLinks.map(({ label, icon: NavIcon, path }) => (
                    <button
                      key={label}
                      onClick={() => { setActiveNav(label); setMobileMenuOpen(false); navigate(path); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeNav === label
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <NavIcon size={16} />
                      {label}
                    </button>
                  ))}
                  <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent mt-1">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
    
     
        {/* {mobileNavOpen && (
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
        )} */}

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
        className="bg-white rounded-2xl border border-border px-4 py-2 hover:shadow-md transition-all">
      
       

       <div className="mt-4">

  {/* Nutrition Row */}
  
<div className="mt-0 grid lg:grid-cols-12 gap-8">

  {/* LEFT SIDE - Nutrition Cards */}
  <div className="lg:col-span-4">
<div className="w-full h-64 rounded-3xl overflow-hidden border border-gray-200 bg-gray-100">
  <img
    src={meal.image_url}
    alt={meal.meal_name}
    className="w-full h-full object-cover"
  />
</div>
{/* Nutrition */}
<div className="mt-3">
  <h3 className="text-lg font-semibold text-emerald-900 mb-2">
    Nutrition
  </h3>

  <div className="space-y-0">
    {[
      {
        icon: Flame,
        label: "Calories",
        value: meal.calories,
        unit: "kcal",
      },
      {
        icon: Beef,
        label: "Protein",
        value: meal.protein,
        unit: "g",
      },
      {
        icon: Wheat,
        label: "Carbs",
        value: meal.carbs,
        unit: "g",
      },
      {
        icon: Droplets,
        label: "Fats",
        value: meal.fat,
        unit: "g",
      },
      {
        icon: Apple,
        label: "Fiber",
        value: meal.fiber,
        unit: "g",
      },
      {
        icon: Candy,
        label: "Sugar",
        value: meal.sugar,
        unit: "g",
      },
      {
        icon: FlaskConical,
        label: "Sodium",
        value: meal.sodium,
        unit: "mg",
      },
    ].map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={item.label}
          className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-none"
        >
          {/* Left */}
          <div className="flex items-center gap-2.5">
            <Icon className="w-4.5 h-4.5 text-emerald-600" />

            <span className="text-[15px] text-gray-700 font-medium">
              {item.label}
            </span>
          </div>

          {/* Right */}
          <div className="font-bold text-emerald-800 text-xl">
            {item.value}
            <span className="text-sm text-gray-500 ml-1 font-medium">
              {item.unit}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>
   
  </div>


  {/* RIGHT SIDE */}
  <div className="lg:col-span-8 space-y-4">
    <div className="flex justify-between items-start">

  <div className="space-y-3">

    <h2 className="text-3xl font-bold text-green-800 leading-tight m-0">
      {meal.meal_name}
    </h2>

    <div className="flex items-center gap-2 text-gray-500">
      <Clock3 className="w-4 h-4" />
      <span className="text-sm">
        {new Date(meal.created_at).toLocaleString()}
      </span>
    </div>

  </div>
  

  <button
    onClick={() => deleteMeal(meal.id)}
    className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition"
  >
    <Trash2 className="w-5 h-5 text-red-500" />
  </button>
  
  
  

</div>
 <div>

      <h4 className="font-semibold mb-2">
        Tags
      </h4>

      <div className="flex flex-wrap gap-2">

        {meal.tags?.map((tag, i) => (

          <span
            key={i}
            className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-sm"
          >
            {tag}
          </span>

        ))}

      </div>

    </div>

   <div className="border-t border-gray-200 pt-6">

  <div className="grid md:grid-cols-2 gap-8">

    {/* Vitamins */}

    <div>

      <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
        <Sparkles className="w-5 h-5" />
        Vitamins
      </h4>

      <div className="flex flex-wrap gap-2">

        {meal.vitamins?.map((vitamin, i) => (

          <span
            key={i}
            className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium"
          >
            {vitamin}
          </span>

        ))}

      </div>

    </div>

    {/* Minerals */}

    <div>

      <h4 className="flex items-center gap-2 font-semibold text-blue-700 mb-3">
        <ShieldCheck className="w-5 h-5" />
        Minerals
      </h4>

      <div className="flex flex-wrap gap-2">

        {meal.minerals?.map((mineral, i) => (

          <span
            key={i}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
          >
            {mineral}
          </span>

        ))}

      </div>

    </div>

  </div>

</div>

<div className="border-t border-gray-200 pt-6">

  <div className="grid md:grid-cols-2 gap-8">

    {/* Health Tips */}

    <div>

      <h4 className="flex items-center gap-2 text-green-700 font-semibold mb-4">
        <HeartPulse className="w-5 h-5" />
        Health Tips
      </h4>

      <div className="space-y-3">

        {meal.healthTips?.map((tip, i) => (

          <div
            key={i}
            className="flex items-start gap-3"
          >

            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-green-600" />
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {tip}
            </p>

          </div>

        ))}

      </div>

    </div>

    {/* Warnings */}

    {meal.warnings?.length > 0 && (

      <div>

        <h4 className="flex items-center gap-2 text-red-600 font-semibold mb-4">
          <BadgeAlert className="w-5 h-5" />
          Warnings
        </h4>

        <div className="space-y-3">

          {meal.warnings.map((warning, i) => (

            <div
              key={i}
              className="flex items-start gap-3"
            >

              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <BadgeAlert className="w-4 h-4 text-red-600" />
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {warning}
              </p>

            </div>

          ))}

        </div>
        

      </div>

    )}

  </div>
  <div className="bg-primary/5 rounded-xl p-3 mt-3">

<h4 className="font-semibold flex items-center gap-2 mb-4">
<Brain className="w-5 h-5 text-primary"/>
AI Analysis
</h4>

<div className="grid md:grid-cols-2 gap-3">

<p><strong>Meal Type:</strong> {meal.mealTypeAI}</p>

<p><strong>Serving:</strong> {meal.servingSize}</p>

<p><strong>Confidence:</strong> {meal.confidence}%</p>

<p><strong>Health Score:</strong> {meal.healthScore}/100</p>

</div>

</div>

  

</div>
    

    
  </div>

</div>
  
 
</div>
         
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
                <span className="font-bold text-green-600">{totalHealthScore.toFixed()}/100</span>
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
