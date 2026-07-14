import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Search,
  Sparkles,
  ChevronRight,
  X,
  Menu,
  LogOut,
  Leaf,
  Flame,
  Zap,
  Droplets,
  Apple,
  BarChart2,
  AlertCircle,
  CheckCircle2,
  Camera,
  Star,
  Home,
  LayoutDashboard,
  History,
  MessageCircle,
  
  
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────
const NutritionData = {
  name: "",
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
  vitamins: [],
  healthScore: 0,
  servingSize: "",
  tags: [],
}

// ─── Mock analysis result ────────────────────────────────────────────────────
const mockAnalysis = {
  default: {
    name: "Mixed Green Salad",
    calories: 142,
    protein: 4.2,
    carbs: 18.5,
    fat: 6.8,
    fiber: 4.1,
    sugar: 8.2,
    sodium: 210,
    vitamins: ["Vitamin A", "Vitamin C", "Vitamin K", "Folate"],
    healthScore: 88,
    servingSize: "1 bowl (220g)",
    tags: ["Low Calorie", "High Fiber", "Antioxidants"],
  },
};


// ─── Navbar ──────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", icon: Home, path: "/landing" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "History", icon: History, path: "/history" },
  { label: "Coach", icon: MessageCircle, path: "/coach" },
  { label: "Analytics", icon: BarChart2, path: "/analytics" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };


  return (
    
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => 
                    
                    navigate(link.path)
                }
                   className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 "
                   
            
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </nav>
          
        

          {/* Desktop logout */}
          <div className="hidden md:flex items-center">
            <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigate(link.path);
                      setMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      link === "Dashboard"
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="border-t border-border mt-2 pt-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    
    
  );
}

// ─── Macro ring ──────────────────────────────────────────────────────────────
function MacroRing({
  value,
  max,
  color,
  label,
  unit,
}){
  const pct = Math.min((value / max) * 100, 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#e9f0eb" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-foreground leading-none">{value}</span>
          <span className="text-[9px] text-muted-foreground leading-none">{unit}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

// ─── Health score badge ───────────────────────────────────────────────────────
function HealthScoreBadge({ score }) {
  const color =
    score >= 80 ? "#1a7f4b" : score >= 60 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Fair";

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-border shadow-sm">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
        style={{ background: color }}
      >
        {score}
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Health Score
        </p>
        <p className="text-base font-bold" style={{ color }}>
          {label}
        </p>
        <div className="flex mt-1 gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className="w-3 h-3"
              fill={s <= Math.round(score / 20) ? color : "none"}
              stroke={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Result panel ─────────────────────────────────────────────────────────────
function ResultPanel({ data, onReset }) {
  const nutrientRows = [
    { label: "Fiber", value: data.fiber, unit: "g", icon: Leaf, color: "#1a7f4b" },
    { label: "Sugar", value: data.sugar, unit: "g", icon: Droplets, color: "#f59e0b" },
    { label: "Sodium", value: data.sodium, unit: "mg", icon: Zap, color: "#3b82f6" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {data.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Serving: {data.servingSize}</p>
        </div>
        <button
          onClick={onReset}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Calories hero */}
      <div className="bg-gradient-to-br from-primary to-emerald-600 text-white rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium">Total Calories</p>
          <p
            className="text-5xl font-bold mt-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {data.calories}
          </p>
          <p className="text-white/70 text-xs mt-1">kcal per serving</p>
        </div>
        <Flame className="w-14 h-14 text-white/30" />
      </div>

      {/* Macros */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
        <p className="text-sm font-semibold text-foreground mb-4">Macronutrients</p>
        <div className="grid grid-cols-3 gap-4">
          <MacroRing value={data.protein} max={50} color="#1a7f4b" label="Protein" unit="g" />
          <MacroRing value={data.carbs} max={100} color="#f59e0b" label="Carbs" unit="g" />
          <MacroRing value={data.fat} max={65} color="#3b82f6" label="Fat" unit="g" />
        </div>
      </div>

      {/* Health score */}
      <HealthScoreBadge score={data.healthScore} />

      {/* Other nutrients */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-sm space-y-3">
        <p className="text-sm font-semibold text-foreground">Other Nutrients</p>
        {nutrientRows.map(({ label, value, unit, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}20` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-foreground font-semibold">
                  {value}
                  {unit}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((value / (label === "Sodium" ? 500 : 30)) * 100, 100)}%`,
                    background: color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vitamins */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
        <p className="text-sm font-semibold text-foreground mb-3">Vitamins & Minerals</p>
        <div className="flex flex-wrap gap-2">
          {data.vitamins.map((v) => (
            <div key={v} className="flex items-center gap-1.5 text-xs text-primary font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* Analyze again */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-secondary transition-colors"
      >
        Analyze Another Food
      </button>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [foodName, setFoodName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const howItWorks = [
    {
      step: 1,
      text: "Upload or enter food name",
      icon: Upload,
      color: "#1a7f4b",
    },
    {
      step: 2,
      text: "Our AI analyses the food",
      icon: Sparkles,
      color: "#f59e0b",
    },
    {
      step: 3,
      text: "Get nutrition facts and recommendations",
      icon: BarChart2,
      color: "#3b82f6",
    },
  ];

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG).");
      return;
    }
    setError(null);
    setSelectedFile(file);
    
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
        setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const canAnalyze = foodName.trim().length > 0 || preview !== null;

  const handleAnalyze = async () => {
  try {
    setLoading(true);
    setError(null);

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (foodName.trim()){
      formData.append("food_name", foodName);
    }

    if (description.trim()) {
    formData.append("description", description);
}

    
    const token = localStorage.getItem("token")||
                  sessionStorage.getItem("token");

    
    const response = await 
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/food/analyze`,
      {
        method: "POST", 
        headers : {
          Authorization : `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    

    setResult(data);
    

  } catch (error) {
    console.error(error);
    setError("Server connection Failed");
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    setResult(null);
    setPreview(null);
    setFileName(null);
    setFoodName("");
    setError(null);
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {/* Page title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Analysis
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Analyze Your Food
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-md mx-auto">
            Upload a photo or enter a food name to get instant nutrition insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* ── Left: Input panel ── */}
          <div className="lg:col-span-3 space-y-5">
            <AnimatePresence mode="wait">
              {result ? (
                <ResultPanel key="result" 
                data={result} 
                onReset={handleReset} />
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="space-y-4"
                >
                  {/* Upload zone */}
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                      dragActive
                        ? "border-primary bg-secondary scale-[1.01]"
                        : preview
                        ? "border-primary bg-secondary/50"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 bg-white"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFileChange}
                    />

                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Food preview"
                          className="mx-auto max-h-48 rounded-xl object-contain"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                            setFileName(null);
                          }}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-destructive text-white rounded-full flex items-center justify-center shadow-md"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-3 truncate">{fileName}</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-7 h-7 text-primary" />
                        </div>
                        <p className="text-base font-semibold text-foreground">
                          Upload Food Image
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG supported
                        </p>
                      </>
                    )}
                  </div>
                  {/* Optional Description */}

  <label className="block text-sm font-medium text-foreground mb-2">
    Additional Description
    <span className="text-muted-foreground font-normal">
      {" "} (Optional)
    </span>
  </label>



<div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter food description to get detailed analysis"
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                     
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                      or
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Food name input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      placeholder="Enter food name (e.g. Caesar Salad, Oatmeal...)"
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    />
                  </div>
                  

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Analyze button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={!canAnalyze || loading}
                    className={`w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                      canAnalyze && !loading
                        ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Analysing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Analyze
                      </>
                    )}
                  </button>

                  {/* Tip */}
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/60 rounded-lg px-3 py-2.5">
                    <Apple className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">Tip:</strong> Upload clear, well-lit
                      images for best accuracy. Avoid blurry or dark photos.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: How it works ── */}
          <aside className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                How it works?
              </h3>
              <div className="space-y-5">
                {howItWorks.map(({ step, text, icon: Icon, color }, i) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="relative flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}18` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      {i < howItWorks.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2 h-4" />
                      )}
                    </div>
                    <div className="pt-2">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                        Step {step}
                      </div>
                      <p className="text-sm text-foreground font-medium leading-snug">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick foods */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-semibold text-foreground mb-4 text-sm">Quick Try</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Avocado Toast",
                  "Greek Yogurt",
                  "Banana",
                  "Brown Rice",
                  "Boiled Egg",
                  "Almonds",
                ].map((food) => (
                  <button
                    key={food}
                    onClick={() => {
                      setFoodName(food);
                      setResult(null);
                    }}
                    className="px-3 py-1.5 text-xs font-medium border border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-colors"
                  >
                    {food}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent analyses card */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-semibold text-foreground mb-4 text-sm flex items-center justify-between">
                Recent Analyses
                <button className="text-xs text-primary font-medium hover:underline">
                  View all
                </button>
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Oatmeal Bowl", cal: 320, time: "Today, 8:30 AM", score: 90 },
                  { name: "Grilled Chicken", cal: 185, time: "Yesterday, 1:15 PM", score: 92 },
                  { name: "Fruit Smoothie", cal: 210, time: "Yesterday, 7:00 AM", score: 85 },
                ].map(({ name, cal, time, score }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Apple className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{name}</p>
                      <p className="text-xs text-muted-foreground">{time}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">{cal}</p>
                      <p className="text-xs text-muted-foreground">kcal</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-5 mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">NutriVision AI</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            For informational purposes only. Consult a dietitian for medical advice.
          </p>
          <p className="text-xs text-muted-foreground">© 2026 NutriVision AI</p>
        </div>
      </footer>
    </div>
  );
}

