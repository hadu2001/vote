import React from "react";
import { AlertTriangle, CheckCircle, X, ShieldCheck } from "lucide-react";
import { getAssetUrl } from "../utils/assets";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  voter,
  contestant,
  isSubmitting
}) {
  if (!isOpen || !contestant || !voter) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#1c112b",
          border: "2px solid #ffd700",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 192, 68, 0.35)",
          padding: "26px",
          position: "relative",
          animation: "float 0.3s ease-out"
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--gold-gradient)",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
          }}>
            <ShieldCheck size={32} />
          </div>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "24px",
            color: "#fff",
            marginBottom: "6px"
          }}>
            Xác Nhận Phiếu Bình Chọn
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Vui lòng kiểm tra kỹ thông tin trước khi hoàn tất
          </p>
        </div>

        {/* Voter Details */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          marginBottom: "16px",
          fontSize: "14px"
        }}>
          <div style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "4px" }}>
            Người gửi bình chọn:
          </div>
          <div style={{ fontWeight: 800, color: "#fff", fontSize: "16px" }}>
            {voter.name}
          </div>
          <div style={{ color: "#ffc2d1", fontSize: "13px" }}>
            {voter.department} (Mã: {voter.id})
          </div>
        </div>

        {/* Selected Candidate Preview */}
        <div style={{
          background: "rgba(229, 33, 69, 0.12)",
          border: "1px solid rgba(229, 33, 69, 0.35)",
          borderRadius: "var(--radius-md)",
          padding: "14px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "20px"
        }}>
          <img
            src={getAssetUrl(contestant.image)}
            alt={contestant.name}
            style={{
              width: "65px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "var(--radius-sm)",
              border: "1px solid #ffd700"
            }}
          />
          <div>
            <div style={{
              display: "inline-block",
              background: "#ffd700",
              color: "#000",
              fontWeight: 800,
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "4px",
              marginBottom: "4px"
            }}>
              SBD {contestant.sbd}
            </div>
            <div style={{ fontWeight: 800, color: "#fff", fontSize: "17px" }}>
              {contestant.name}
            </div>
            <div style={{ color: "#ffc2d1", fontSize: "13px", fontWeight: 600 }}>
              {contestant.members}
            </div>
          </div>
        </div>

        {/* Warning Alert */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          background: "rgba(245, 192, 68, 0.12)",
          border: "1px solid rgba(245, 192, 68, 0.3)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 14px",
          marginBottom: "24px",
          fontSize: "12px",
          color: "#ffde59"
        }}>
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>
            <strong>Chú ý:</strong> Mỗi người chỉ được bình chọn <strong>1 lần duy nhất</strong>. Sau khi bấm xác nhận, phiếu bầu sẽ được ghi nhận và không thể thay đổi!
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
            style={{ flex: 1, padding: "12px" }}
          >
            Quay Lại
          </button>
          <button
            type="button"
            className="btn-gold"
            onClick={onConfirm}
            disabled={isSubmitting}
            style={{ flex: 2, padding: "12px" }}
          >
            {isSubmitting ? "Đang Gửi Phiếu..." : "✔ Xác Nhận & Gửi"}
          </button>
        </div>
      </div>
    </div>
  );
}
