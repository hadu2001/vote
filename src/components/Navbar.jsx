import React from "react";
import { Sparkles, Trophy, ShieldCheck, Flame } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, isOpen, totalVoted, totalEmployees }) {
  const percent = totalEmployees > 0 ? Math.round((totalVoted / totalEmployees) * 100) : 0;

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(13, 9, 20, 0.88)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
      marginBottom: "20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        {/* Logo / Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setActiveTab("vote")}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ffd700 0%, #e52145 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px rgba(229, 33, 69, 0.5)",
            fontSize: "20px"
          }}>
            ♕
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-heading)",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "0.5px",
              color: "#fff",
              lineHeight: 1.2
            }}>
              NAM HẢI <span style={{ color: "var(--gold)" }}>GROUP</span>
            </div>
            <div style={{
              fontSize: "11px",
              color: "#ff6b8b",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}>
              Gala 20/10 • Cặp Đôi Ứng Xử
            </div>
          </div>
        </div>

        {/* Status Indicator & Live Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 700,
            background: isOpen ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: `1px solid ${isOpen ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
            color: isOpen ? "#34d399" : "#f87171"
          }}>
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: isOpen ? "#10b981" : "#ef4444",
              display: "inline-block",
              boxShadow: isOpen ? "0 0 8px #10b981" : "none"
            }} />
            {isOpen ? "ĐANG MỞ BÌNH CHỌN" : "ĐÃ KHÓA BÌNH CHỌN"}
          </div>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 700,
            background: "rgba(245, 192, 68, 0.15)",
            border: "1px solid rgba(245, 192, 68, 0.35)",
            color: "#ffde59"
          }}>
            <Flame size={14} color="#f5c044" />
            <span>Đã vote: {totalVoted}/{totalEmployees} ({percent}%)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255, 255, 255, 0.06)",
          padding: "4px",
          borderRadius: "9999px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <button
            onClick={() => setActiveTab("vote")}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
              background: activeTab === "vote" ? "var(--ruby-gradient)" : "transparent",
              color: activeTab === "vote" ? "#fff" : "var(--text-muted)",
              boxShadow: activeTab === "vote" ? "0 2px 10px rgba(229, 33, 69, 0.4)" : "none"
            }}
          >
            <Sparkles size={15} />
            Bình Chọn
          </button>

          <button
            onClick={() => setActiveTab("live")}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
              background: activeTab === "live" ? "var(--gold-gradient)" : "transparent",
              color: activeTab === "live" ? "#1a0f00" : "var(--text-muted)",
              boxShadow: activeTab === "live" ? "0 2px 10px rgba(245, 192, 68, 0.4)" : "none"
            }}
          >
            <Trophy size={15} />
            Màn Hình Sân Khấu
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
              background: activeTab === "admin" ? "rgba(255, 255, 255, 0.2)" : "transparent",
              color: activeTab === "admin" ? "#fff" : "var(--text-muted)"
            }}
          >
            <ShieldCheck size={15} />
            Ban Tổ Chức
          </button>
        </nav>
      </div>
    </header>
  );
}
