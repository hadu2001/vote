import React from "react";
import { Crown, ShieldAlert } from "lucide-react";
import { getAssetUrl } from "../utils/assets";

export default function Header() {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Banner Card */}
      <div
        className="glass-panel"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(229, 33, 69, 0.2)"
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          maxHeight: "220px",
          overflow: "hidden"
        }}>
          <img
            src={getAssetUrl("/banner.jpg")}
            alt="Nam Hải Group Gala 20/10"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              filter: "brightness(0.92)"
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(13,9,20,0.05) 0%, rgba(13,9,20,0.85) 95%)"
          }} />
        </div>

        {/* Header content below image */}
        <div style={{ padding: "16px 18px 20px", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(229, 33, 69, 0.2)",
            border: "1px solid rgba(229, 33, 69, 0.4)",
            padding: "4px 14px",
            borderRadius: "9999px",
            color: "#ff8fa3",
            fontSize: "12px",
            fontWeight: 800,
            marginBottom: "8px",
            letterSpacing: "0.5px"
          }}>
            <Crown size={14} color="#ffd700" />
            GALA 20/10 NAM HẢI GROUP
          </div>

          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(20px, 4.5vw, 32px)",
            fontWeight: 900,
            lineHeight: 1.25,
            marginBottom: "8px"
          }}>
            CẶP ĐÔI ỨNG XỬ <span className="text-gold-gradient">2026 ♕</span>
          </h1>

          <p style={{
            color: "#ffc2d1",
            fontSize: "clamp(13px, 2.5vw, 15px)",
            fontWeight: 600,
            maxWidth: "600px",
            margin: "0 auto 12px",
            lineHeight: 1.4
          }}>
            "Hãy bình chọn cho cặp đôi bạn thấy ấn tượng và xứng đáng nhất"
          </p>

          {/* Quy định bảo mật */}
          <div style={{
            maxWidth: "550px",
            margin: "0 auto",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px dashed rgba(255, 215, 0, 0.3)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "12px",
            color: "var(--text-secondary)",
            textAlign: "left"
          }}>
            <ShieldAlert size={16} color="#f5c044" style={{ flexShrink: 0 }} />
            <span>
              Mỗi cán bộ nhân viên bình chọn <strong>1 lần duy nhất</strong>. Nhập <strong>4 số cuối SĐT</strong> để bảo vệ danh tính, chống bình chọn hộ.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
