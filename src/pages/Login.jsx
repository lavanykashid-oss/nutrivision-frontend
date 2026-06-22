import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

// ─── NutriVision AI Design Tokens ───────────────────────────────────────────
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

// ─── SVG Bowl Illustration ───────────────────────────────────────────────────
function BowlIllustration() {
  return (
    <svg viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 280 }}>
      {/* Bowl base */}
      <ellipse cx="130" cy="175" rx="95" ry="22" fill="rgba(255,255,255,0.15)" />
      <path d="M45 130 Q45 190 130 198 Q215 190 215 130 Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <ellipse cx="130" cy="130" rx="85" ry="22" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

      {/* Salad greens */}
      <ellipse cx="105" cy="118" rx="28" ry="16" fill="#4ADE80" opacity="0.9" />
      <ellipse cx="135" cy="112" rx="24" ry="14" fill="#22C55E" opacity="0.9" />
      <ellipse cx="158" cy="120" rx="22" ry="13" fill="#4ADE80" opacity="0.85" />
      <ellipse cx="118" cy="108" rx="20" ry="12" fill="#86EFAC" opacity="0.9" />
      <ellipse cx="148" cy="110" rx="18" ry="11" fill="#34D399" opacity="0.9" />

      {/* Tomatoes */}
      <circle cx="100" cy="110" r="10" fill="#F87171" opacity="0.95" />
      <circle cx="160" cy="112" r="9" fill="#EF4444" opacity="0.95" />
      <circle cx="130" cy="104" r="8" fill="#F87171" opacity="0.9" />
      {/* tomato highlight */}
      <circle cx="97" cy="107" r="3" fill="rgba(255,255,255,0.45)" />
      <circle cx="157" cy="109" r="2.5" fill="rgba(255,255,255,0.45)" />

      {/* Carrot sticks */}
      <rect x="118" y="95" width="6" height="28" rx="3" fill="#FB923C" transform="rotate(-18 118 95)" opacity="0.95" />
      <rect x="138" y="93" width="6" height="26" rx="3" fill="#F97316" transform="rotate(12 138 93)" opacity="0.95" />

      {/* Cucumber slices */}
      <circle cx="88" cy="118" r="11" fill="#86EFAC" stroke="#4ADE80" strokeWidth="1.5" opacity="0.9" />
      <circle cx="88" cy="118" r="6" fill="#D1FAE5" opacity="0.8" />
      <circle cx="170" cy="116" r="10" fill="#86EFAC" stroke="#4ADE80" strokeWidth="1.5" opacity="0.9" />
      <circle cx="170" cy="116" r="5.5" fill="#D1FAE5" opacity="0.8" />

      {/* Floating sparkles / nutrients */}
      <circle cx="62" cy="80" r="5" fill="rgba(255,255,255,0.6)" />
      <circle cx="198" cy="75" r="4" fill="rgba(255,255,255,0.55)" />
      <circle cx="75" cy="58" r="3" fill="rgba(255,255,255,0.5)" />
      <circle cx="185" cy="95" r="3.5" fill="rgba(255,255,255,0.5)" />

      {/* Leaf decorations */}
      <path d="M52 68 Q60 55 72 62 Q64 75 52 68Z" fill="#4ADE80" opacity="0.7" />
      <path d="M196 60 Q208 50 215 65 Q203 70 196 60Z" fill="#34D399" opacity="0.65" />

      {/* Heart icon */}
      <path d="M130 50 C130 50 118 38 118 32 C118 27 122 24 126 24 C128 24 130 26 130 26 C130 26 132 24 134 24 C138 24 142 27 142 32 C142 38 130 50 130 50Z" fill="rgba(255,255,255,0.75)" />

      {/* Fork & knife lines */}
      <line x1="32" y1="120" x2="32" y2="148" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="228" y1="120" x2="228" y2="148" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="120" x2="36" y2="120" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <line x1="224" y1="120" x2="232" y2="120" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Google Icon SVG ─────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.7 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.7 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.7 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.3C9.7 35.7 16.3 44 24 44z" /> {/* Adjusted path slightly */}
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C40.9 37 44 31 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

// ─── Eye Icons ───────────────────────────────────────────────────────────────
function EyeIcon({ open }){
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ─── Main Login Component ────────────────────────────────────────────────────
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem(
        "token",
        data.token
      );
      navigate("/landing");
    
      
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: TOKEN.bg,
      fontFamily: TOKEN.fontBody,
      padding: "20px",
    }}>
      {/* Card wrapper */}
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: 960,
        minHeight: 580,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: TOKEN.shadowLg,
      }}>

        {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
        <div style={{
          width: "40%",
          background: `linear-gradient(145deg, ${TOKEN.primary} 0%, ${TOKEN.primaryDark} 60%, #047857 100%)`,
          display: "flex",
          flexDirection: "column",
          padding: "36px 32px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background orb decorations */}
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }} />
          <div style={{
            position: "absolute", bottom: -40, left: -40,
            width: 160, height: 160, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }} />
          <div style={{
            position: "absolute", bottom: 100, right: -20,
            width: 100, height: 100, borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }} />

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 2 4 5 4 9c0 5 8 13 8 13s8-8 8-13c0-4-4-7-8-7z" fill="white" opacity="0.9" />
                <path d="M12 6c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" fill="white" opacity="0.5" />
              </svg>
            </div>
            <span style={{
              fontFamily: TOKEN.fontDisplay,
              fontWeight: 700,
              fontSize: 16,
              color: "white",
              letterSpacing: "-0.3px",
            }}>NutriVision AI</span>
          </div>

          {/* Illustration */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            padding: "24px 0 16px",
          }}>
            <BowlIllustration />
          </div>

          {/* Tagline */}
          <div style={{ zIndex: 1 }}>
            <div style={{
              fontFamily: TOKEN.fontDisplay,
              fontWeight: 800,
              fontSize: 26,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 10,
            }}>
              Better Nutrition<br />Better Life
            </div>
            <p style={{
              fontSize: 13.5,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.6,
              maxWidth: 220,
            }}>
              Let AI guide you to a healthier you — personalized meal plans, smart nutrition tracking.
            </p>

            {/* Stats pills */}
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              {[["50K+", "Users"], ["98%", "Accuracy"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 20,
                  padding: "5px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                  <span style={{ fontFamily: TOKEN.fontDisplay, fontWeight: 700, fontSize: 12, color: "white" }}>{val}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
        <div style={{
          flex: 1,
          background: TOKEN.white,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 52px",
        }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{
              fontFamily: TOKEN.fontDisplay,
              fontWeight: 700,
              fontSize: 28,
              color: TOKEN.text,
              margin: 0,
              marginBottom: 6,
              letterSpacing: "-0.5px",
            }}>Welcome Back!</h1>
            <p style={{
              fontSize: 14,
              color: TOKEN.textSecondary,
              margin: 0,
            }}>Login to your account to continue your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Email */}
            <div>
              <label style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: TOKEN.text,
                marginBottom: 6,
                fontFamily: TOKEN.fontBody,
              }}>Email Address</label>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: `1.5px solid ${emailFocus ? TOKEN.borderFocus : TOKEN.border}`,
                borderRadius: TOKEN.radius,
                padding: "0 14px",
                background: emailFocus ? TOKEN.primaryGhost : "#FAFAFA",
                transition: "all 0.2s ease",
                boxShadow: emailFocus ? `0 0 0 3px rgba(16,185,129,0.12)` : "none",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={emailFocus ? TOKEN.primary : TOKEN.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 14,
                    color: TOKEN.text,
                    padding: "12px 0",
                    fontFamily: TOKEN.fontBody,
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: TOKEN.text,
                marginBottom: 6,
                fontFamily: TOKEN.fontBody,
              }}>Password</label>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: `1.5px solid ${passFocus ? TOKEN.borderFocus : TOKEN.border}`,
                borderRadius: TOKEN.radius,
                padding: "0 14px",
                background: passFocus ? TOKEN.primaryGhost : "#FAFAFA",
                transition: "all 0.2s ease",
                boxShadow: passFocus ? `0 0 0 3px rgba(16,185,129,0.12)` : "none",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={passFocus ? TOKEN.primary : TOKEN.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 14,
                    color: TOKEN.text,
                    padding: "12px 0",
                    fontFamily: TOKEN.fontBody,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: TOKEN.textMuted,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontSize: 13,
                color: TOKEN.textSecondary,
                fontWeight: 400,
              }}>
                <div
                  onClick={() => setRemember(!remember)}
                  style={{
                    width: 18, height: 18,
                    borderRadius: 5,
                    border: `2px solid ${remember ? TOKEN.primary : TOKEN.border}`,
                    background: remember ? TOKEN.primary : "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                >
                  {remember && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                Remember Me
              </label>
              <a href="#" style={{
                fontSize: 13,
                color: TOKEN.primary,
                textDecoration: "none",
                fontWeight: 500,
              }}
                onMouseOver={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseOut={e => (e.currentTarget.style.textDecoration = "none")}
              >Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                background: loading
                  ? TOKEN.textMuted
                  : `linear-gradient(135deg, ${TOKEN.primary} 0%, ${TOKEN.primaryDark} 100%)`,
                color: "white",
                border: "none",
                borderRadius: TOKEN.radius,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: TOKEN.fontDisplay,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: loading ? "none" : `0 4px 14px rgba(16,185,129,0.4)`,
                letterSpacing: "0.3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseOver={e => {
                if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Signing in...
                </>
              ) : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "20px 0",
          }}>
            <div style={{ flex: 1, height: 1, background: TOKEN.border }} />
            <span style={{ fontSize: 12, color: TOKEN.textMuted, fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: TOKEN.border }} />
          </div>

          {/* Google Button */}
          <button
            type="button"
            style={{
              width: "100%",
              padding: "12px",
              background: "white",
              color: TOKEN.text,
              border: `1.5px solid ${TOKEN.border}`,
              borderRadius: TOKEN.radius,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: TOKEN.fontBody,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "all 0.2s ease",
              boxShadow: TOKEN.shadow,
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = TOKEN.primary;
              e.currentTarget.style.background = TOKEN.primaryGhost;
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = TOKEN.border;
              e.currentTarget.style.background = "white";
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Sign Up */}
          <p style={{
            textAlign: "center",
            fontSize: 13.5,
            color: TOKEN.textSecondary,
            marginTop: 24,
            marginBottom: 0,
          }}>
            {"Don't have an account? "}
            <a href="/register" style={{
              color: TOKEN.primary,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: TOKEN.fontDisplay,
            }}
              onMouseOver={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseOut={e => (e.currentTarget.style.textDecoration = "none")}
            >Sign Up</a>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        @media (max-width: 700px) {
          .nutri-card { flex-direction: column !important; }
          .nutri-left { width: 100% !important; padding: 32px 24px !important; }
          .nutri-right { padding: 32px 24px !important; }
        }
      `}</style>
    </div>
  );
}
