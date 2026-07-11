import { useState, useEffect} from "react";
import {
  Flame,
  Dumbbell,
  UtensilsCrossed,
  Heart,
  Menu,
  X,
  TrendingUp,
  Apple,
  LogOut,
  History,
  LayoutDashboard,
  BarChart2,
  Home,
  Leaf,
  MessageCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

// const weeklyData = [
//   { day: "Mon", calories: 1800, protein: 75 },
//   { day: "Tue", calories: 2100, protein: 90 },
//   { day: "Wed", calories: 1650, protein: 68 },
//   { day: "Thu", calories: 1950, protein: 82 },
//   { day: "Fri", calories: 2200, protein: 95 },
//   { day: "Sat", calories: 1200, protein: 60 },
//   { day: "Sun", calories: 0, protein: 0 },
// ];

const recentMeals = [
  { name: "Chicken Biryani", time: "1:00 PM", calories: 420, icon: "🍛", macro: "Protein: 32g" },
  { name: "Green Salad", time: "11:30 AM", calories: 120, icon: "🥗", macro: "Fiber: 8g" },
  { name: "Paneer Bowl", time: "8:30 PM", calories: 350, icon: "🍲", macro: "Protein: 22g" },
  { name: "Oats Breakfast", time: "7:00 AM", calories: 310, icon: "🥣", macro: "Carbs: 48g" },
];

// const navLinks = [
//   { label: "Home", icon: Home },
//   { label: "Dashboard", icon: BarChart2, active: true },
//   { label: "Coach", icon: MessageCircle },
//   { label: "Analytics", icon: TrendingUp },
// ];
const navLinks = [
  { label: "Home", icon: Home, path: "/landing" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "History", icon: History, path: "/history" },
  { label: "Coach", icon: MessageCircle, path: "/coach" },
];


function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  bg,
}
) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function App() {

const navigate = useNavigate(); 
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [activeNav, setActiveNav] = useState("Dashboard");
const [dashboardData, setDashboardData] = useState(null);

const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {

  try {

    const token = localStorage.getItem("token")||
    sessionStorage.getItem("token");

    const response = await 
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/food/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Dashboard:",data);

    setDashboardData(data);

  } catch (error) {
    console.error(error);
  }
};
if (!dashboardData) {
  return <div>Loading...</div>;
}

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5"></p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Flame}
            label="Calories Today"
            value={dashboardData?.total_calories || 0}
            sub="of 2,000 kcal goal"
            color="#e85d2f"
            bg="#fef0eb"
          />
          <StatCard
            icon={Dumbbell}
            label="Protein Goal"
            value={`${dashboardData?.total_protein || 0}g`}
            sub="of 100g target"
            color="#2d7a4f"
            bg="#e6f4ec"
          />
          <StatCard
            icon={UtensilsCrossed}
            label="Meals Today"
            value={dashboardData?.total_meals || 0}
            sub="meals logged"
            color="#7c5cbf"
            bg="#f0ebfb"
          />
          <StatCard
            icon={Heart}
            label="Health Score"
            value={`${dashboardData?.health_score || 0}/100`}
            sub="Good — keep going!"
            color="#d4376e"
            bg="#fce9f1"
          />
        </div>

        {/* Bottom Grid: Daily Progress | Weekly Overview | Recent Meals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Daily Progress */}
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
            <h2 className="text-base font-semibold text-foreground mb-4">Daily Progress</h2>
            <div className="space-y-5">
              {[
                {
    label: "Calories",
    current: dashboardData?.total_calories || 0,
    goal: 2000,
    unit: "kcal",
    color: "#e85d2f",
  },
  {
    label: "Protein",
    current: dashboardData?.total_protein || 0,
    goal: 100,
    unit: "g",
    color: "#2d7a4f",
  },
  {
    label: "Carbs",
    current: dashboardData?.total_carbs || 0,
    goal: 250,
    unit: "g",
    color: "#f5a623",
  },
  {
    label: "Fat",
    current: dashboardData?.total_fat || 0,
    goal: 70,
    unit: "g",
    color: "#7c5cbf",
  },
].map(({ label, current, goal, unit, color }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="text-muted-foreground">
                      {current} / {goal} {unit}
                    </span>
                  </div>
                  <ProgressBar value={current} max={goal} color={color} />
                  <p className="text-xs text-muted-foreground text-right">
                    {Math.round((current / goal) * 100)}% of goal
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Weekly Overview</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block rounded" />Calories</span>
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-orange-400 inline-block rounded" />Protein</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={dashboardData.weekly_data || []} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6f0ea" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5a7a65" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5a7a65" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "1px solid #e6f0ea", fontSize: 12 }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#2d7a4f"
                  strokeWidth={2.5}
                  dot={{ fill: "#2d7a4f", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="protein"
                  stroke="#f5a623"
                  strokeWidth={2.5}
                  dot={{ fill: "#f5a623", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* Weekly summary strip */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
              {[
                { label: "Avg Calories", value: dashboardData.avg_calories },
                { label: "Avg Protein", value: `${dashboardData.avg_protein}g` },
                { label: "Days Tracked", value: `${dashboardData.days_tracked}/7`},
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Meals */}
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Recent Meals</h2>
              <button className="text-xs text-primary font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-3">
                {dashboardData?.recent_meals?.map((meal, index) => (
  <div
    key={index}
    className="flex items-center gap-3 p-3 rounded-xl bg-muted/60 hover:bg-accent/60 transition-colors"
  >
    <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
  {meal.image_url ? (
    <img
      src={`${import.meta.env.VITE_API_URL}/${meal.image_url}`}
      alt={meal.meal_name}
      className="w-full h-full object-cover"
    />
  ) : (
    
     "🍎"
    
  )}
</div>

    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground truncate">
        {meal.meal_name}
      </p>

      <p className="text-xs text-muted-foreground">
        Protein: {meal.protein}g
      </p>
    </div>

    <div className="text-right flex-shrink-0">
      <p className="text-sm font-bold text-foreground">
        {meal.calories}
      </p>

      <p className="text-xs text-muted-foreground">
        kcal
      </p>
    </div>
  </div>
))}
              
            </div>
            {/* Total */}
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total logged today</span>
              <span className="text-sm font-bold text-foreground">1,200 kcal</span>
            </div>
          </div>
        </div>

        {/* Nutrient Breakdown Row */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <h2 className="text-base font-semibold text-foreground mb-4">Total Nutrients Breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
               {
    label: "Fiber",
    value: dashboardData?.total_fiber || 0,
    unit: "g",
    pct: Math.min((dashboardData?.total_fiber || 0) * 10, 100),
    color: "#2d7a4f",
    bg: "#e6f4ec",
  },
  {
    label: "Sugar",
    value: dashboardData?.total_sugar || 0,
    unit: "g",
    pct: Math.min((dashboardData?.total_sugar || 0) * 2, 100),
    color: "#f5a623",
    bg: "#fef8eb",
  },
  {
    label: "Sodium",
    value: dashboardData?.total_sodium || 0,
    unit: "mg",
    pct: Math.min((dashboardData?.total_sodium || 0) * 5, 100),
    color: "#7c5cbf",
    bg: "#f0ebfb",
  },
  {
    label: "Health Score",
    value: dashboardData?.health_score || 0,
    unit: "/100",
    pct: dashboardData?.health_score || 0,
    color: "#d4376e",
    bg: "#fce9f1",
  },
    
            ].map(({ label, value, unit, pct, color, bg }) => (
              <div key={label} className="flex flex-col gap-2 p-4 rounded-xl" style={{ backgroundColor: bg }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color }}>{label}</span>
                  <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {value}<span className="text-sm font-medium text-muted-foreground ml-1">{unit}</span>
                </p>
                <ProgressBar value={pct} max={100} color={color} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
