import React from "react";
import { Crown, Heart, ShieldAlert } from "lucide-react";

export default function Header() {
  return (
    <div style={{ marginBottom: "28px" }}>
      {/* Banner Card */}
      <div
        className="glass-panel"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(229, 33, 69, 0.25)"
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          maxHeight: "340px",
          overflow: "hidden"
        }}>
          <img
            src="/banner.jpg"
            alt="Nam Hải Group Gala 20/10"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              filter: "brightness(0.92)"
            }}
          />
          {/* Subtle gradient overlay at bottom */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(13,9,20,0.1) 0%, rgba(13,9,20,0.85) 95%)"
          }} />
        </div>

        {/* Header content below image */}
        <div style={{ padding: "20px 24px 24px", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(229, 33, 69, 0.18)",
            border: "1px solid rgba(229, 33, 69, 0.4)",
            padding: "6px 16px",
            borderRadius: "9999px",
            color: "#ff8fa3",
            fontSize: "13px",
            fontWeight: 800,
            marginBottom: "12px",
            letterSpacing: "1px"
          }}>
            <Crown size={15} color="#ffd700" />
            CHÀO MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10
          </div>

          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(24px, 4vw, 38px)",
            fontWeight: 900,
            lineHeight: 1.25,
            marginBottom: "10px",
            letterSpacing: "0.5px"
          }}>
            CẶP ĐÔI ỨNG XỬ <span className="text-gold-gradient">NAM HẢI GROUP 2026 ♕</span>
          </h1>

          <p style={{
            color: "#ffc2d1",
            fontSize: "clamp(14px, 2vw, 17px)",
            fontWeight: 600,
            maxWidth: "750px",
            margin: "0 auto 16px",
            lineHeight: 1.5
          }}>
            "Hãy bình chọn cho cặp đôi bạn thấy xứng đáng nhất trong đêm Gala 20/10"
          </p>

          {/* Quy định bảo mật */}
          <div style={{
            maxWidth: "680px",
            margin: "0 auto",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px dashed rgba(255, 215, 0, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontSize: "13px",
            color: "var(--text-secondary)"
          }}>
            <ShieldAlert size={18} color="#f5c044" style={{ flexShrink: 0 }} />
            <span>
              <strong>Lưu ý:</strong> Mỗi cán bộ nhân viên bình chọn <strong>1 lần duy nhất</strong>. Vui lòng chọn đúng tên và nhập <strong>4 số cuối SĐT</strong> để chống mạo danh.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
