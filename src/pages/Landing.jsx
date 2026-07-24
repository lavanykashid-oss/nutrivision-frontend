import { useState, useRef, useCallback } from "react";
import FoodAnalysisSection from "../components/FoodAnalysisSection";
import logo from "../assets/logo.png";
import {
  Upload,
  Sparkles,
  Flame,
  Droplets,
  AlertCircle,
  CheckCircle2,
  Camera,
  LogOut,
  LayoutDashboard,
  History,
  MessageCircle,
  Home,
  X,
  ChevronRight,
  Zap,
  Menu,
  Brain,
  TrendingUp,
  Bell,
  Search,
  Leaf,
  ArrowRight,
  Star,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TOKEN = {
  primary: "#10B981",
  primaryDark: "#059669",
  primaryLight: "#D1FAE5",
  primaryGhost: "rgba(16,185,129,0.08)",
  bg: "#F8FAFC",
  white: "#FFFFFF",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  borderFocus: "#10B981",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  error: "#EF4444",
  radius: "12px",
  radiusSm: "8px",
  shadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
  shadowMd: "0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.05)",
  shadowLg: "0 25px 50px -12px rgba(0,0,0,0.12)",
  fontDisplay: "'Poppins', sans-serif",
  fontBody: "'Inter', sans-serif",
};

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


export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };
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

  const scrollToAnalysis = () => {
    document
        .getElementById("analyze")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
};
  

  return (
     <div className="min-h-screen bg-background" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        
         <div className="w-full px-6 lg:px-10">
       
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
             <div className="flex items-center gap-2.5">
              {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <img
                  src={logo}
                  alt="NutriVision AI"
                  className="h-11 w-auto object-contain"
                />
                   
              </div> */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
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
              onClick={scrollToAnalysis}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              >
                <Camera className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                Analyze Food
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </motion.button>
     
              {/* <motion.button
              onClick={() => navigate("/food-analysis")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              >
                <Camera className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                Analyze Food
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </motion.button> */}

              
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
           
            </div>
          </motion.div>

          {/* Right — visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=480&fit=crop&auto=format"
                alt="Healthy colorful meal bowl"
                className="w-full h-80 lg:h-96 object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

             
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

            <div className="absolute -top-3 -right-3 bg-primary text-white rounded-xl px-3.5 py-2 shadow-lg shadow-primary/30">
              <p className="text-xs font-semibold">Health Score</p>
              <p className="text-xl font-extrabold leading-none">92/100</p>
            </div>
          </motion.div> 
        </section>


{/* Food Analysis */}
<section id="analyze" className="py-20">
    <FoodAnalysisSection
    foodName={foodName}
    setFoodName={setFoodName}
    preview={preview}
    setPreview={setPreview}
    fileName={fileName}
    setFileName={setFileName}
    description={description}
    setDescription={setDescription}
    loading={loading}
    result={result}
    setResult={setResult}
    error={error}
    handleAnalyze={handleAnalyze}
    handleReset={handleReset}
    dragActive={dragActive}
    setDragActive={setDragActive}
    fileInputRef={fileInputRef}
    onDrop={onDrop}
    onFileChange={onFileChange}
    canAnalyze={canAnalyze}
    
/>
</section>
</main>

    
    </div>
  );
}


