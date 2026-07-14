import { useState } from "react";
import { Leaf } from "lucide-react";
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

export default function CompleteProfile() {
  const [form, setForm] = useState({
    dob: "",
    age: "",
    weight: "",
    goal: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key) => (value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const validate = () => {
    const e = {};

    if (!form.dob) e.dob = "Date of Birth is required";
    if (!form.age) e.age = "Age is required";
    if (!form.weight) e.weight = "Weight is required";
    if (!form.goal) e.goal = "Please select your goal";

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/complete-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        window.location.href = "/landing";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: TOKEN.bg,
        padding: 20,
      }}
    >
        <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

*{
  box-sizing:border-box;
}

.complete-card{
  display:flex;
  max-width:900px;
  width:100%;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 25px 50px -12px rgba(0,0,0,.14);
}

.left-panel{
  width:40%;
}

.right-panel{
  flex:1;
}

@media (max-width:768px){

  .complete-card{
      flex-direction:column;
  }

  .left-panel{
      width:100%;
      padding:28px 24px !important;
      min-height:280px;
      text-align:center;
  }

  .right-panel{
      padding:28px 20px !important;
  }

}

@media (max-width:480px){

  .right-panel{
      padding:20px 16px !important;
  }

  h2{
      font-size:22px !important;
  }

}
`}</style>
      <div
      className="complete-card"
        style={{
          display: "flex",
          maxWidth: 900,
          width: "100%",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: TOKEN.shadowLg,
        }}
      >
        {/* LEFT PANEL */}

        <div
        className="left-panel"
          style={{
    
            background:
              "linear-gradient(145deg,#10B981 0%,#059669 55%,#047857 100%)",
            padding: 40,
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            >
              <Leaf className="w-4 h-4 text-white" />
            </div>

            <span
              style={{
                fontFamily: TOKEN.fontDisplay,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              NutriVision AI
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ClipboardIllustration />
          </div>

          <h2
            style={{
              fontFamily: TOKEN.fontDisplay,
            }}
          >
            Complete Your Profile
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Tell us a little more about yourself so our AI can personalize your
            nutrition plan.
          </p>
        </div>

        {/* RIGHT PANEL */}

        <div
        className="right-panel"
          style={{
        
            background: "white",
            padding: 40,
          }}
        >
          <h2
            style={{
              fontFamily: TOKEN.fontDisplay,
              marginBottom: 25,
            }}
          >
            Profile Details
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Field
              label="Date of Birth"
              type="date"
              value={form.dob}
              onChange={set("dob")}
              error={errors.dob}
            />

            <Field
              label="Age"
              type="number"
              value={form.age}
              onChange={set("age")}
              error={errors.age}
            />

            <Field
              label="Weight (kg)"
              type="number"
              value={form.weight}
              onChange={set("weight")}
              error={errors.weight}
            />

            <SelectField
              label="Goal"
              value={form.goal}
              onChange={set("goal")}
              options={[
                "Weight Loss",
                "Muscle Gain",
                "Maintain Weight",
                "Improve Energy",
                "Eat Healthier",
              ]}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width:"100%",
                marginTop:10,
                padding: "14px",
                border: "none",
                borderRadius: TOKEN.radius,
                background: TOKEN.primary,
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {loading ? "Saving..." : "Complete Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}