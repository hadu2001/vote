import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, ShieldCheck, Flame, Cloud, CloudCheck } from "lucide-react";
import { initFirebase } from "../services/firebase";

export default function Navbar({ activeTab, setActiveTab, isOpen, totalVoted, totalEmployees }) {
  const [hasFirebase, setHasFirebase] = useState(false);
  const percent = totalEmployees > 0 ? Math.round((totalVoted / totalEmployees) * 100) : 0;

  useEffect(() => {
    const fb = initFirebase();
    if (fb && fb.db) {
      setHasFirebase(true);
    }
  }, []);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(13, 9, 20, 0.92)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
      marginBottom: "16px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        {/* Logo / Brand */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          onClick={() => setActiveTab("vote")}
        >
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ffd700 0%, #e52145 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(229, 33, 69, 0.5)",
            fontSize: "18px",
            flexShrink: 0
          }}>
            ♕
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-heading)",
              fontSize: "16px",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1
            }}>
              NAM HẢI <span style={{ color: "var(--gold)" }}>GROUP</span>
            </div>
            <div style={{
              fontSize: "10px",
              color: "#ff8fa3",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase"
            }}>
              Gala 20/10 • Cặp Đôi Ứng Xử
            </div>
          </div>
        </div>

        {/* Live indicator & Cloud sync */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Cloud Firebase Indicator */}
          {hasFirebase && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: 700,
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.35)",
                color: "#60a5fa"
              }}
              title="Dữ liệu đồng bộ trực tiếp lên Firebase Cloud"
            >
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#60a5fa",
                display: "inline-block",
                boxShadow: "0 0 6px #60a5fa"
              }} />
              <span>Firebase Cloud</span>
            </div>
          )}

          {/* Cổng vote status */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "9999px",
            fontSize: "11px",
            fontWeight: 700,
            background: isOpen ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: `1px solid ${isOpen ? "rgba(16, 185, 129, 0.35)" : "rgba(239, 68, 68, 0.35)"}`,
            color: isOpen ? "#34d399" : "#f87171"
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isOpen ? "#10b981" : "#ef4444",
              display: "inline-block"
            }} />
            {isOpen ? "Cổng mở" : "Cổng khóa"}
          </div>

          {/* Live vote count */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "9999px",
            fontSize: "11px",
            fontWeight: 700,
            background: "rgba(245, 192, 68, 0.15)",
            border: "1px solid rgba(245, 192, 68, 0.35)",
            color: "#ffde59"
          }}>
            <Flame size={12} color="#f5c044" />
            <span>{totalVoted}/{totalEmployees}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: "rgba(255, 255, 255, 0.06)",
          padding: "3px",
          borderRadius: "9999px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <button
            onClick={() => setActiveTab("vote")}
            style={{
              padding: "6px 12px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s ease",
              background: activeTab === "vote" ? "var(--ruby-gradient)" : "transparent",
              color: activeTab === "vote" ? "#fff" : "var(--text-muted)"
            }}
          >
            <Sparkles size={13} />
            Bình Chọn
          </button>

          <button
            onClick={() => setActiveTab("live")}
            style={{
              padding: "6px 12px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s ease",
              background: activeTab === "live" ? "var(--gold-gradient)" : "transparent",
              color: activeTab === "live" ? "#1a0f00" : "var(--text-muted)"
            }}
          >
            <Trophy size={13} />
            Sân Khấu
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            style={{
              padding: "6px 12px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s ease",
              background: activeTab === "admin" ? "rgba(255, 255, 255, 0.2)" : "transparent",
              color: activeTab === "admin" ? "#fff" : "var(--text-muted)"
            }}
          >
            <ShieldCheck size={13} />
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
