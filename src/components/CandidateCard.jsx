import React from "react";
import { Crown, Heart, Sparkles, Music, Check } from "lucide-react";

export default function CandidateCard({
  contestant,
  isSelected,
  onSelect,
  disabled
}) {
  return (
    <div
      onClick={() => !disabled && onSelect(contestant.id)}
      className="glass-panel"
      style={{
        position: "relative",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: isSelected
          ? "2px solid #ffd700"
          : "1px solid rgba(255, 215, 0, 0.2)",
        background: isSelected
          ? "linear-gradient(180deg, rgba(45, 24, 60, 0.95) 0%, rgba(26, 15, 38, 0.95) 100%)"
          : "rgba(22, 14, 34, 0.75)",
        transform: isSelected ? "scale(1.02)" : "none",
        boxShadow: isSelected
          ? "0 0 30px rgba(255, 215, 0, 0.35), 0 10px 25px rgba(0,0,0,0.6)"
          : "var(--shadow-card)",
        opacity: disabled ? 0.65 : 1
      }}
    >
      {/* SBD Badge */}
      <div style={{
        position: "absolute",
        top: "14px",
        left: "14px",
        zIndex: 10,
        background: "rgba(13, 9, 20, 0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 215, 0, 0.5)",
        borderRadius: "9999px",
        padding: "4px 12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#ffd700",
        fontWeight: 800,
        fontSize: "13px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
      }}>
        <Crown size={14} color="#ffd700" />
        <span>SBD {contestant.sbd}</span>
      </div>

      {/* Checkmark indicator when selected */}
      {isSelected && (
        <div style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          zIndex: 10,
          background: "var(--gold-gradient)",
          color: "#000",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          boxShadow: "0 0 15px rgba(255, 215, 0, 0.7)"
        }}>
          <Check size={20} strokeWidth={3} />
        </div>
      )}

      {/* Image container */}
      <div style={{
        position: "relative",
        width: "100%",
        paddingTop: "125%", // 4:5 aspect ratio
        overflow: "hidden",
        background: "#180f24"
      }}>
        <img
          src={contestant.image}
          alt={contestant.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease"
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(13, 9, 20, 0) 40%, rgba(13, 9, 20, 0.95) 100%)"
        }} />
      </div>

      {/* Info Card Content */}
      <div style={{ padding: "18px 20px 22px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px"
        }}>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "22px",
            fontWeight: 800,
            color: isSelected ? "#ffd700" : "#fff",
            margin: 0
          }}>
            {contestant.name}
          </h3>
        </div>

        {/* Member names */}
        <div style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#ffc2d1",
          marginBottom: "8px"
        }}>
          {contestant.members}
        </div>

        {/* Department tag */}
        <div style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          marginBottom: "12px",
          lineHeight: 1.4
        }}>
          🏢 {contestant.department}
        </div>

        {/* Performance & Slogan */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 12px",
          marginBottom: "16px",
          fontSize: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#f5c044",
            fontWeight: 700,
            marginBottom: "4px"
          }}>
            <Music size={13} />
            <span>{contestant.performance}</span>
          </div>
          <div style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
            "{contestant.slogan}"
          </div>
        </div>

        {/* Vote Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onSelect(contestant.id);
          }}
          className={isSelected ? "btn-gold w-full" : "btn-primary w-full"}
          style={{
            padding: "11px 16px",
            fontSize: "14px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          {isSelected ? (
            <>
              <Check size={16} />
              ĐÃ CHỌN CẶP NÀY
            </>
          ) : (
            <>
              <Heart size={16} />
              Bình Chọn Cho Cặp Này
            </>
          )}
        </button>
      </div>
    </div>
  );
}
