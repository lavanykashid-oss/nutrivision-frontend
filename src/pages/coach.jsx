import { useState, useRef, useEffect } from "react";
import {
  Send,
  Plus,
  Leaf,
  MessageSquare,
  User,
  Menu,
  X,
  Bot,
  LogOut,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
  Home,
  MessageCircle,
  History,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const INITIAL_SESSIONS = [];

const SUGGESTED_PROMPTS = [
  "What should I eat for breakfast?",
  "How many calories do I need daily?",
  "Best foods for muscle recovery",
  "Foods that boost metabolism",
];


function formatMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <p key={i} className="font-semibold text-[#1a2e1a] mb-2 mt-1">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-4 mb-1 flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2a7a4b] flex-shrink-0" />
          <span>{line.slice(2)}</span>
        </li>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="mb-1">{line}</p>;
  });
}

const navLinks = [
  { label: "Home", icon: Home, path: "/landing" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "History", icon: History, path: "/history" },
  { label: "Coach", icon: MessageCircle, path: "/coach" },
  // { label: "Analytics", icon: BarChart2 },
];

export default function App() {
  console.log("coach component mounted");
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [messages, setMessages] =  useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Coach");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    loadProfile();
  loadSessions();
  
}, []);
useEffect(() => {

    const closeMenu = () => {

        setOpenMenu(null);

    };

    window.addEventListener("click", closeMenu);

    return () =>
        window.removeEventListener("click", closeMenu);

}, []);

const loadProfile = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(!response.ok) {
    throw new Error("Failed to fetch profile");
}


    const data = await response.json();



    setProfile(data);
    console.log("Messages API returned:", data);

  } catch (error) {

    console.error(error);

  }

};
  
  const loadSessions = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/coach/sessions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
    throw new Error("Failed to fetch sessions");
}

    const data = await response.json();

    
    setSessions(data);

    if (data.length === 0) {
      setMessages([]);
      setCurrentSessionId(null);
      setActiveSessionId(null);
}

    

    
  } catch (error) {

    console.error(error);

  }

};

const loadMessages = async (sessionId) => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/coach/session/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
    throw new Error("Failed to fetch message");
}



    const data = await response.json();

    console.log("Message:",data);

    if (!Array.isArray(data)){
       console.error("Expected array but got:", data);
       return;
    }

    const formattedMessages = data.map((msg) => ({
      id: msg.id,
      role: msg.role,
      text: msg.text,
      timestamp: new Date(msg.timestamp),
    }));

    setMessages(formattedMessages);

    setCurrentSessionId(sessionId);

  } catch (error) {

    console.error(error);

  }

};



const deleteSession = async (sessionId) => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/coach/session/${sessionId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete session");
    }

    // Remove deleted session from sidebar immediately
    setSessions((prev) =>
      prev.filter((s) => s.id !== sessionId)
    );

  const updatedSessions = sessions.filter((s) => s.id !== sessionId);

  setSessions(updatedSessions);

  if (currentSessionId === sessionId) {
    if (updatedSessions.length > 0) {
       setActiveSessionId(updatedSessions[0].id);
       loadMessages(updatedSessions[0].id);
    } else {
       setMessages([]);
       setCurrentSessionId(null);
       setActiveSessionId(null);
  }
}

    // If the deleted chat is currently open
    // if (currentSessionId === sessionId) {
    //   setMessages([]);
    //   setCurrentSessionId(null);
    //   setActiveSessionId(null);
    // }

  } catch (error) {
    console.error(error);
  }

};

  const sendMessage = async (text = "") => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      text: msgText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    
    setInput("");
    setIsTyping(true);

    try {

  const token = localStorage.getItem("token");

  console.log("Sending:", {
  message: msgText,
  session_id: currentSessionId,
});



  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/coach/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        message: msgText,
        session_id: currentSessionId,
      }),
    }
  );
  console.log("Response status:", response.status);


  if (!response.ok) {
    throw new Error("Failed to send message");
}


  

  const data = await response.json();

  console.log("Coach response:", data);

  if (!currentSessionId) {

    setCurrentSessionId(data.session_id);

    setActiveSessionId(data.session_id);
    
    
    

}

  const aiMsg = {
    id: (Date.now() + 1).toString(),
    role: "ai",
    text: data.reply,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, aiMsg]);
  await loadSessions();

} catch (error) {

  console.error(error);

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now().toString(),
      role: "ai",
      text: "Sorry, something went wrong.",
      timestamp: new Date(),
    },
  ]);

}

setIsTyping(false);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const newChat = () => {

    setMessages([]);

    setCurrentSessionId(null);

    setActiveSessionId(null);

    setSidebarOpen(false);

};

  
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static top-0 left-0 h-full z-20 lg:z-auto
            w-64 flex-shrink-0 bg-white border-r border-[rgba(42,122,75,0.12)]
            flex flex-col transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            pt-14 lg:pt-0
          `}
        >
          {/* New chat button */}
          <div className="p-3 border-b border-[rgba(42,122,75,0.08)]">
            <button
              onClick={newChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2a7a4b] text-white rounded-xl font-semibold text-sm hover:bg-[#236040] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          {/* Chat history */}
          <div className="flex-1 overflow-y-auto py-2">
            <p className="px-4 py-2 text-[10px] font-semibold text-[#6b8f70] uppercase tracking-wider">
              Chat History
            </p>
            {sessions.map((session) => (

<div
    key={session.id}
    className={`relative mx-1 rounded-lg ${
        activeSessionId === session.id
            ? "bg-[#e6f2eb]"
            : "hover:bg-[#f5f8f5]"
    }`}
>

    <button
        onClick={() => {
            setActiveSessionId(session.id);
            loadMessages(session.id);
            setSidebarOpen(false);
        }}
        className="w-full text-left px-3 py-2.5 flex items-start gap-2.5"
    >

        <MessageSquare
            className={`w-3.5 h-3.5 mt-0.5 ${
                activeSessionId === session.id
                    ? "text-[#2a7a4b]"
                    : "text-[#a8cdb5]"
            }`}
        />

        <div className="min-w-0 flex-1">

            <p className="text-sm font-medium truncate">
                {session.title}
            </p>

            <p className="text-xs text-[#6b8f70] truncate">
                {session.preview}
            </p>

        </div>

    </button>

    <button
        onClick={(e) =>{
          e.stopPropagation();
            setOpenMenu(
                openMenu === session.id
                    ? null
                    : session.id
            );
        }}
        className="absolute right-2 top-3 p-1 rounded hover:bg-gray-200"
    >
        <MoreVertical className="w-4 h-4" />
    </button>

    {openMenu === session.id && (

        <div className="absolute right-2 top-10 bg-white border rounded-lg shadow-lg w-36 z-50">

            <button
                onClick={async (e) => {

                    e.stopPropagation();

                    await deleteSession(session.id);

                    setOpenMenu(null);

                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-50"
            >
                <Trash2 className="w-4 h-4" />

                Delete Chat

            </button>

        </div>

    )}

</div>

))}
          </div>

          {/* Sidebar footer */}
          <div className="p-3 border-t border-[rgba(42,122,75,0.08)]">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-[#edf4ee]">
              <div className="w-7 h-7 rounded-full bg-[#2a7a4b] flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#1a2e1a] truncate">{profile?.name || "Loading...."}</p>
                <p className="text-[10px] text-[#6b8f70] truncate">Goal: {profile?.goal || "Loading..."}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat main */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Chat header */}
          <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-[rgba(42,122,75,0.08)] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e6f2eb] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2a7a4b]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a2e1a]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                NutriVision Assistant
              </p>
              <p className="text-xs text-[#6b8f70]">Personalized nutrition guidance</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ea066] animate-pulse" />
              <span className="text-xs text-[#6b8f70]">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-5 space-y-5">

            {/* Empty state */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-[#e6f2eb] flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-[#2a7a4b]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1a2e1a]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    How can I help you today?
                  </h2>
                  <p className="text-sm text-[#6b8f70] mt-1 max-w-xs">
                    Ask me anything about nutrition, diet plans, or healthy eating habits.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md mt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left px-3.5 py-2.5 rounded-xl border border-[rgba(42,122,75,0.15)] bg-white text-sm text-[#2a7a4b] font-medium hover:bg-[#e6f2eb] hover:border-[#2a7a4b] transition-all flex items-center justify-between gap-2 group"
                    >
                      <span>{prompt}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                  msg.role === "user"
                    ? "bg-[#2a7a4b]"
                    : "bg-[#e6f2eb] border border-[rgba(42,122,75,0.15)]"
                }`}>
                  {msg.role === "user"
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-[#2a7a4b]" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] sm:max-w-[70%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#2a7a4b] text-white rounded-tr-sm"
                      : "bg-white border border-[rgba(42,122,75,0.1)] text-[#1a2e1a] rounded-tl-sm shadow-sm"
                  }`}>
                    {msg.role === "ai"
                      ? <ul className="space-y-0.5">{formatMessage(msg.text)}</ul>
                      : <p>{msg.text}</p>
                    }
                  </div>
                  <span className="text-[10px] text-[#6b8f70] px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-[#e6f2eb] border border-[rgba(42,122,75,0.15)]">
                  <Bot className="w-4 h-4 text-[#2a7a4b]" />
                </div>
                <div className="bg-white border border-[rgba(42,122,75,0.1)] rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#3ea066]"
                        style={{
                          animation: "bounce 1.2s infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts strip (when chat has messages) */}
          {messages.length > 0 && (
            <div className="flex-shrink-0 px-3 sm:px-6 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {SUGGESTED_PROMPTS.slice(0, 3).map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-[rgba(42,122,75,0.2)] bg-white text-[#2a7a4b] font-medium hover:bg-[#e6f2eb] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="flex-shrink-0 bg-white border-t border-[rgba(42,122,75,0.1)] px-3 sm:px-5 py-3">
            <div className="flex items-end gap-3 bg-[#f5f8f5] rounded-2xl border border-[rgba(42,122,75,0.15)] px-4 py-2.5 focus-within:border-[#2a7a4b] focus-within:ring-2 focus-within:ring-[rgba(42,122,75,0.12)] transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about nutrition..."
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-[#1a2e1a] placeholder:text-[#6b8f70] focus:outline-none max-h-28 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 112) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#2a7a4b] flex items-center justify-center text-white hover:bg-[#236040] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-[#a8cdb5] mt-2">
              NutriVision AI · Personalized health guidance. Not a substitute for medical advice.
            </p>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

