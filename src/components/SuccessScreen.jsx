import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Trophy, QrCode, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function SuccessScreen({ voteData, onGoToLive, onUnlockDevice }) {
  useEffect(() => {
    // Bắn pháo hoa ăn mừng 20/10
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ffd700", "#e52145", "#ff69b4", "#ffffff"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ffd700", "#e52145", "#ff69b4", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto 40px", textAlign: "center" }}>
      <div
        className="glass-panel"
        style={{
          padding: "36px 28px",
          borderRadius: "var(--radius-lg)",
          border: "2px solid #ffd700",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 192, 68, 0.4)",
          background: "linear-gradient(180deg, rgba(28, 17, 43, 0.95) 0%, rgba(18, 11, 28, 0.95) 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Success Icon */}
        <div style={{
          width: "74px",
          height: "74px",
          borderRadius: "50%",
          background: "var(--gold-gradient)",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)"
        }}>
          <CheckCircle2 size={44} strokeWidth={2.5} />
        </div>

        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(24px, 4vw, 32px)",
          color: "#fff",
          marginBottom: "8px"
        }}>
          Bình Chọn Thành Công!
        </h2>

        <p style={{ color: "#ffc2d1", fontSize: "15px", marginBottom: "24px" }}>
          Cảm ơn bạn đã tham gia bình chọn trong đêm Gala 20/10 Nam Hải Group.
        </p>

        {/* Digital Ticket */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px dashed rgba(255, 215, 0, 0.4)",
          borderRadius: "var(--radius-md)",
          padding: "20px",
          textAlign: "left",
          marginBottom: "24px",
          position: "relative"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            paddingBottom: "10px",
            marginBottom: "14px"
          }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Phiếu bầu điện tử
            </span>
            <span style={{
              fontSize: "12px",
              color: "#ffd700",
              fontWeight: 800,
              fontFamily: "monospace"
            }}>
              #{voteData?.ticketId || "VOTE-OK"}
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Họ và tên cử tri:</div>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#fff" }}>
              {voteData?.voterName}
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Cặp đôi đã chọn:</div>
            <div style={{ fontSize: "18px", fontWeight: 900, color: "var(--gold)" }}>
              ★ {voteData?.coupleName}
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "var(--text-muted)",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)"
          }}>
            <span>Thời gian: {voteData?.timestamp}</span>
            <span style={{ color: "#34d399", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheck size={14} /> Đã mã hóa
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            type="button"
            className="btn-gold w-full"
            onClick={onGoToLive}
            style={{ padding: "14px", fontSize: "15px" }}
          >
            <Trophy size={18} />
            Xem Màn Hình Chiếu Sân Khấu (Live)
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="btn-secondary w-full"
            onClick={onUnlockDevice}
            style={{ fontSize: "13px" }}
          >
            Mở khóa để vote thử tiếp (Chế độ Test)
          </button>
        </div>
      </div>
    </div>
  );
}
