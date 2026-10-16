import React from "react";
import { Crown, Heart, Check, Music } from "lucide-react";
import { getAssetUrl } from "../utils/assets";

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
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        border: isSelected
          ? "2px solid #ffd700"
          : "1px solid rgba(255, 215, 0, 0.2)",
        background: isSelected
          ? "linear-gradient(90deg, rgba(50, 24, 60, 0.95) 0%, rgba(30, 16, 42, 0.95) 100%)"
          : "rgba(22, 14, 34, 0.78)",
        boxShadow: isSelected
          ? "0 0 20px rgba(255, 215, 0, 0.35), 0 4px 15px rgba(0,0,0,0.5)"
          : "0 2px 8px rgba(0,0,0,0.3)",
        opacity: disabled ? 0.6 : 1,
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        gap: "12px",
        minHeight: "88px"
      }}
    >
      {/* Ảnh nhỏ đại diện bên trái kèm SBD */}
      <div style={{
        position: "relative",
        width: "64px",
        height: "76px",
        flexShrink: 0,
        borderRadius: "8px",
        overflow: "hidden",
        border: isSelected ? "1.5px solid #ffd700" : "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
      }}>
        <img
          src={getAssetUrl(contestant.image)}
          alt={contestant.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
        {/* SBD Badge góc trên ảnh */}
        <div style={{
          position: "absolute",
          top: "2px",
          left: "2px",
          background: "rgba(0, 0, 0, 0.8)",
          borderRadius: "4px",
          padding: "1px 5px",
          fontSize: "10px",
          fontWeight: 800,
          color: "#ffd700",
          letterSpacing: "0.5px"
        }}>
          #{contestant.sbd}
        </div>
      </div>

      {/* Thông tin ở giữa (Tên cặp đôi, Tên thí sinh, Tiết mục) */}
      <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "2px"
        }}>
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "16px",
            fontWeight: 800,
            color: isSelected ? "#ffd700" : "#fff",
            lineHeight: 1.2
          }}>
            {contestant.name}
          </span>
        </div>

        {/* Tên thành viên */}
        <div style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#ffc2d1",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "3px"
        }}>
          {contestant.members}
        </div>

        {/* Tiết mục / Phòng ban (rút gọn hiển thị 1 dòng) */}
        <div style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          <Music size={11} color="#f5c044" style={{ flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {contestant.performance || contestant.department}
          </span>
        </div>
      </div>

      {/* Nút chọn hoặc Checkmark bên phải */}
      <div style={{ flexShrink: 0, paddingLeft: "4px" }}>
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onSelect(contestant.id);
          }}
          style={{
            border: "none",
            borderRadius: "9999px",
            padding: isSelected ? "6px 14px" : "6px 12px",
            fontSize: "12px",
            fontWeight: 800,
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "all 0.2s ease",
            background: isSelected ? "var(--gold-gradient)" : "rgba(229, 33, 69, 0.2)",
            color: isSelected ? "#1a0f00" : "#ff8fa3",
            border: isSelected ? "none" : "1px solid rgba(229, 33, 69, 0.4)",
            boxShadow: isSelected ? "0 0 12px rgba(245, 192, 68, 0.6)" : "none"
          }}
        >
          {isSelected ? (
            <>
              <Check size={14} strokeWidth={3} />
              <span>ĐÃ CHỌN</span>
            </>
          ) : (
            <>
              <Heart size={13} />
              <span>Chọn</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
