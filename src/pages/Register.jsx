const API_URL = "http://127.0.0.1:5000/api/v1/auth/register";
import { useState } from "react";

// ─── NutriVision AI Design Tokens (same as Login) ───────────────────────────
const TOKEN = {
  primary: "#10B981",
  primaryDark: "#059669",
  primaryLight: "#D1FAE5",
  primaryGhost: "rgba(16,185,129,0.08)",
  bg: "#F8FAFC",
  white: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  error: "#EF4444",
  errorGhost: "rgba(239,68,68,0.08)",
  radius: "12px",
  shadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
  shadowLg: "0 25px 50px -12px rgba(0,0,0,0.14)",
  fontDisplay: "'Poppins', sans-serif",
  fontBody: "'Inter', sans-serif",
};

// ─── Clipboard Illustration ──────────────────────────────────────────────────
function ClipboardIllustration() {
  return (
    <svg viewBox="0 0 260 270" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 260 }}>
      {/* Shadow */}
      <ellipse cx="130" cy="248" rx="75" ry="12" fill="rgba(0,0,0,0.12)" />

      {/* Clipboard body */}
      <rect x="52" y="40" width="148" height="192" rx="10" fill="white" opacity="0.92" />
      <rect x="52" y="40" width="148" height="192" rx="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

      {/* Clipboard clip */}
      <rect x="100" y="28" width="52" height="28" rx="6" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="110" y="34" width="32" height="10" rx="3" fill="rgba(16,185,129,0.5)" />

      {/* Checklist lines */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0, ${i * 36})`}>
          {/* Checkbox */}
          <rect x="70" y={82} width="18" height="18" rx="4"
            fill={i < 3 ? TOKEN.primary : "rgba(255,255,255,0.4)"}
            stroke={i < 3 ? TOKEN.primaryDark : "rgba(255,255,255,0.5)"}
            strokeWidth="1.5" />
          {i < 3 && (
            <path d={`M75 ${91} l4 4 7-7`} stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          )}
          {/* Line */}
          <rect x="96" y={88} width={i === 3 ? 60 : 80} height="7" rx="3.5"
            fill={i < 3 ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.25)"} />
        </g>
      ))}

      {/* Apple */}
      <g transform="translate(148, 175)">
        <path d="M26 8 C26 8 28 2 34 2 C34 8 28 10 26 8Z" fill="#4ADE80" opacity="0.9" />
        <ellipse cx="22" cy="22" rx="18" ry="20" fill="#F87171" opacity="0.9" />
        <ellipse cx="22" cy="22" rx="18" ry="20" fill="#EF4444" opacity="0.3" />
        <ellipse cx="15" cy="16" rx="5" ry="7" fill="rgba(255,255,255,0.3)" />
        <path d="M22 2 C22 2 20 -2 22 -4" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Leaf decorations */}
      <path d="M44 140 Q36 126 50 120 Q56 136 44 140Z" fill="#4ADE80" opacity="0.75" />
      <path d="M44 165 Q32 155 42 144 Q52 154 44 165Z" fill="#34D399" opacity="0.65" />
      <path d="M208 90 Q218 78 224 90 Q214 98 208 90Z" fill="#4ADE80" opacity="0.6" />

      {/* Sparkle dots */}
      <circle cx="38" cy="80" r="5" fill="rgba(255,255,255,0.55)" />
      <circle cx="228" cy="145" r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx="55" cy="52" r="3" fill="rgba(255,255,255,0.45)" />
      <circle cx="210" cy="210" r="3.5" fill="rgba(255,255,255,0.45)" />
      <circle cx="42" cy="200" r="4" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

// ─── Google Icon ─────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.7 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.7 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.7 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.3C9.7 35.7 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C40.9 37 44 31 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

// ─── Eye Icon ────────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ─── Shared Input Field ───────────────────────────────────────────────────────
function Field({
  label, type = "text", placeholder, value, onChange, icon, rightSlot, error,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: TOKEN.text, fontFamily: TOKEN.fontBody }}>
        {label}
      </label>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        border: `1.5px solid ${error ? TOKEN.error : focused ? TOKEN.primary : TOKEN.border}`,
        borderRadius: TOKEN.radius, padding: "0 12px",
        background: error ? TOKEN.errorGhost : focused ? TOKEN.primaryGhost : "#FAFAFA",
        transition: "all 0.2s ease",
        boxShadow: focused ? `0 0 0 3px rgba(16,185,129,0.1)` : error ? `0 0 0 3px rgba(239,68,68,0.08)` : "none",
      }}>
        {icon && <span style={{ color: focused ? TOKEN.primary : TOKEN.textMuted, display: "flex", flexShrink: 0 }}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: "none", outline: "none",
            background: "transparent", fontSize: 13,
            color: TOKEN.text, padding: "10px 0",
            fontFamily: TOKEN.fontBody,
          }}
        />
        {rightSlot}
      </div>
      {error && <span style={{ fontSize: 11, color: TOKEN.error, marginTop: 1 }}>{error}</span>}
    </div>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────
function SelectField({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: TOKEN.text, fontFamily: TOKEN.fontBody }}>
        {label}
      </label>
      <div style={{
        border: `1.5px solid ${focused ? TOKEN.primary : TOKEN.border}`,
        borderRadius: TOKEN.radius,
        background: focused ? TOKEN.primaryGhost : "#FAFAFA",
        transition: "all 0.2s ease",
        boxShadow: focused ? `0 0 0 3px rgba(16,185,129,0.1)` : "none",
        position: "relative",
      }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", border: "none", outline: "none",
            background: "transparent", fontSize: 13,
            color: value ? TOKEN.text : TOKEN.textMuted,
            padding: "10px 32px 10px 12px",
            fontFamily: TOKEN.fontBody,
            appearance: "none", cursor: "pointer",
          }}
        >
          <option value="" disabled>{`Select ${label}`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div style={{
          position: "absolute", right: 10, top: "50%",
          transform: "translateY(-50%)", pointerEvents: "none",
          color: TOKEN.textMuted,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Password Strength Bar ────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const score = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
    : 3;
  const colors = ["transparent", "#EF4444", "#F97316", "#EAB308", "#10B981"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: -4 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i <= score ? colors[score] : TOKEN.border,
          transition: "background 0.3s ease",
        }} />
      ))}
      <span style={{ fontSize: 10, color: colors[score], fontWeight: 600, minWidth: 36 }}>{labels[score]}</span>
    </div>
  );
}

// ─── Register Component ───────────────────────────────────────────────────────
export default function App() {
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    dob: "", age: "", weight: "", goal: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => setForm(f => ({ ...f, [key]: v }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!form.dob) e.dob = "Date of birth required";
    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:5000/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          password: form.password
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Registration Successful!");

      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        age: "",
        weight: "",
        goal: ""
      });

    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Server Error");
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes nutri-spin { to { transform: rotate(360deg); } }
        @keyframes nutri-fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 760px) {
          .nutri-reg-card { flex-direction: column !important; }
          .nutri-reg-left { width: 100% !important; min-height: 280px !important; padding: 28px 24px !important; }
          .nutri-reg-right { padding: 32px 24px !important; }
          .nutri-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="nutri-reg-card" style={{
        display: "flex",
        width: "100%",
        maxWidth: 980,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: TOKEN.shadowLg,
        animation: "nutri-fadeIn 0.4s ease",
      }}>

        {/* ── LEFT PANEL (40%) ─────────────────────────────────────── */}
        <div className="nutri-reg-left" style={{
          width: "40%",
          background: "linear-gradient(145deg, #10B981 0%, #059669 55%, #047857 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "40px 34px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Orb decorations */}
          <div style={{ position: "absolute", top: -70, right: -70, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", top: "40%", right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 2 4 5 4 9c0 5 8 13 8 13s8-8 8-13c0-4-4-7-8-7z" fill="white" opacity="0.9" />
                <path d="M12 6c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" fill="white" opacity="0.5" />
              </svg>
            </div>
            <span style={{ fontFamily: TOKEN.fontDisplay, fontWeight: 700, fontSize: 16, color: "white", letterSpacing: "-0.3px" }}>
              NutriVision AI
            </span>
          </div>

          {/* Illustration */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, padding: "20px 0 12px" }}>
            <ClipboardIllustration />
          </div>

          {/* Copy */}
          <div style={{ zIndex: 1 }}>
            <div style={{ fontFamily: TOKEN.fontDisplay, fontWeight: 800, fontSize: 24, color: "white", lineHeight: 1.25, marginBottom: 10 }}>
              Start Your<br />Health Journey
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.65, maxWidth: 210 }}>
              Create your account and let AI build a personalized nutrition plan just for you.
            </p>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
              {["Smart meal planning", "Real-time nutrition tracking", "AI-powered goal setting"].map(feat => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 18,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL (60%) ─────────────────────────────────────── */}
        <div className="nutri-reg-right" style={{
          flex: 1,
          background: TOKEN.white,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 48px",
          overflowY: "auto",
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{
              fontFamily: TOKEN.fontDisplay, fontWeight: 700,
              fontSize: 26, color: TOKEN.text,
              margin: 0, marginBottom: 5, letterSpacing: "-0.5px",
            }}>Create Your Account</h1>
            <p style={{ fontSize: 13.5, color: TOKEN.textSecondary, margin: 0 }}>
              Join NutriVision AI today — it only takes a minute!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Row 1: Full Name + Date of Birth */}
            <div className="nutri-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field
                label="Full Name" placeholder="John Doe"
                value={form.fullName} onChange={set("fullName")} error={errors.fullName}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
              <Field
                label="Date of Birth" type="date" placeholder=""
                value={form.dob} onChange={set("dob")} error={errors.dob}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
            </div>

            {/* Row 2: Email + Age */}
            <div className="nutri-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field
                label="Email Address" type="email" placeholder="you@example.com"
                value={form.email} onChange={set("email")} error={errors.email}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
              <Field
                label="Age" type="number" placeholder="25"
                value={form.age} onChange={set("age")}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
            </div>

            {/* Row 3: Password + Weight */}
            <div className="nutri-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Field
                  label="Password" type={showPass ? "text" : "password"} placeholder="Min. 6 characters"
                  value={form.password} onChange={set("password")} error={errors.password}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  }
                  rightSlot={
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: TOKEN.textMuted, display: "flex", alignItems: "center", padding: 0 }}>
                      <EyeIcon open={showPass} />
                    </button>
                  }
                />
                <PasswordStrength password={form.password} />
              </div>
              <Field
                label="Weight (kg)" type="number" placeholder="70"
                value={form.weight} onChange={set("weight")}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                }
              />
            </div>

            {/* Row 4: Confirm Password + Goal */}
            <div className="nutri-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field
                label="Confirm Password" type={showConfirm ? "text" : "password"} placeholder="Re-enter password"
                value={form.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                }
                rightSlot={
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: TOKEN.textMuted, display: "flex", alignItems: "center", padding: 0 }}>
                    <EyeIcon open={showConfirm} />
                  </button>
                }
              />
              <SelectField
                label="Goal"
                value={form.goal}
                onChange={set("goal")}
                options={["Weight Loss", "Muscle Gain", "Maintain Weight", "Improve Energy", "Better Sleep", "Eat Healthier"]}
              />
            </div>

            {/* Terms checkbox */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginTop: 2 }}>
              <div
                onClick={() => setAgreed(!agreed)}
                style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  border: `2px solid ${agreed ? TOKEN.primary : TOKEN.border}`,
                  background: agreed ? TOKEN.primary : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 12.5, color: TOKEN.textSecondary, lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" style={{ color: TOKEN.primary, fontWeight: 600, textDecoration: "none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color: TOKEN.primary, fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !agreed}
              style={{
                width: "100%", padding: "13px",
                background: loading || !agreed
                  ? "#CBD5E1"
                  : `linear-gradient(135deg, ${TOKEN.primary} 0%, ${TOKEN.primaryDark} 100%)`,
                color: "white", border: "none", borderRadius: TOKEN.radius,
                fontSize: 15, fontWeight: 600, fontFamily: TOKEN.fontDisplay,
                cursor: loading || !agreed ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: !loading && agreed ? `0 4px 14px rgba(16,185,129,0.4)` : "none",
                letterSpacing: "0.3px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 2,
              }}
              onMouseOver={e => { if (!loading && agreed) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white", borderRadius: "50%",
                    animation: "nutri-spin 0.7s linear infinite",
                  }} />
                  Creating account...
                </>
              ) : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
            <div style={{ flex: 1, height: 1, background: TOKEN.border }} />
            <span style={{ fontSize: 11, color: TOKEN.textMuted, fontWeight: 500 }}>or sign up with</span>
            <div style={{ flex: 1, height: 1, background: TOKEN.border }} />
          </div>

          {/* Google */}
          <button
            type="button"
            style={{
              width: "100%", padding: "11px",
              background: "white", color: TOKEN.text,
              border: `1.5px solid ${TOKEN.border}`,
              borderRadius: TOKEN.radius, fontSize: 13.5, fontWeight: 500,
              fontFamily: TOKEN.fontBody, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "all 0.2s ease", boxShadow: TOKEN.shadow,
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = TOKEN.primary; e.currentTarget.style.background = TOKEN.primaryGhost; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = TOKEN.border; e.currentTarget.style.background = "white"; }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Login link */}
          <p style={{ textAlign: "center", fontSize: 13, color: TOKEN.textSecondary, marginTop: 18, marginBottom: 0 }}>
            Already have an account?{" "}
            <a href="/" style={{ color: TOKEN.primary, fontWeight: 600, textDecoration: "none", fontFamily: TOKEN.fontDisplay }}
              onMouseOver={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseOut={e => (e.currentTarget.style.textDecoration = "none")}
            >Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
