import React, { useMemo, useState } from "react";
import { Trophy, Crown, Flame, BarChart3, Maximize, Minimize, Users, Sparkles, RefreshCw } from "lucide-react";
import { getAssetUrl } from "../utils/assets";

export default function LiveLeaderboard({
  contestants,
  totalVoted,
  totalEmployees,
  isOpen,
  auditLogs
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Tính tổng số phiếu thực tế
  const totalVotesCount = useMemo(() => {
    return contestants.reduce((acc, c) => acc + (c.votes || 0), 0);
  }, [contestants]);

  // Sắp xếp các cặp đôi theo thứ tự số phiếu cao nhất -> thấp nhất
  const sortedContestants = useMemo(() => {
    return [...contestants].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  }, [contestants]);

  // Cặp đôi đang dẫn đầu (Top 1)
  const top1 = sortedContestants[0];

  // Bật/tắt chế độ toàn màn hình cho máy chiếu hội trường
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const percentTurnout = totalEmployees > 0 ? Math.round((totalVoted / totalEmployees) * 100) : 0;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", paddingBottom: "40px" }}>
      {/* Stage Screen Header */}
      <div
        className="glass-panel"
        style={{
          padding: "24px 30px",
          marginBottom: "26px",
          textAlign: "center",
          border: "2px solid #ffd700",
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.25)",
          position: "relative"
        }}
      >
        <button
          onClick={toggleFullScreen}
          className="btn-secondary"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "8px 14px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          title="Chế độ chiếu toàn màn hình LED"
        >
          {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          <span>{isFullscreen ? "Thu nhỏ" : "Toàn Màn Hình LED"}</span>
        </button>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(245, 192, 68, 0.18)",
          border: "1px solid rgba(245, 192, 68, 0.4)",
          padding: "6px 16px",
          borderRadius: "9999px",
          color: "#ffd700",
          fontSize: "12px",
          fontWeight: 800,
          marginBottom: "10px",
          letterSpacing: "1px"
        }}>
          <Flame size={15} color="#ffd700" />
          BẢNG XẾP HẠNG THỜI GIAN THỰC (REALTIME)
        </div>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(26px, 4vw, 42px)",
          fontWeight: 900,
          marginBottom: "10px",
          color: "#fff"
        }}>
          KẾT QUẢ BÌNH CHỌN <span className="text-gold-gradient">CẶP ĐÔI ỨNG XỬ 2026</span>
        </h1>

        <p style={{ color: "#ffc2d1", fontSize: "16px", marginBottom: "20px" }}>
          Nam Hải Group Gala 20/10 • Cập nhật trực tiếp số liệu từ hội trường
        </p>

        {/* Big Numbers Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            borderRadius: "var(--radius-md)",
            padding: "16px"
          }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Tổng số phiếu bầu
            </div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#ffd700", fontFamily: "var(--font-heading)" }}>
              {totalVotesCount}
            </div>
            <div style={{ fontSize: "12px", color: "#34d399" }}>
              Hợp lệ 100%
            </div>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            borderRadius: "var(--radius-md)",
            padding: "16px"
          }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Tiến độ cử tri công ty
            </div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#ff6b8b", fontFamily: "var(--font-heading)" }}>
              {totalVoted}/{totalEmployees}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Tỉ lệ tham gia: <strong>{percentTurnout}%</strong>
            </div>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            borderRadius: "var(--radius-md)",
            padding: "16px"
          }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Trạng thái cổng vote
            </div>
            <div style={{
              fontSize: "22px",
              fontWeight: 800,
              color: isOpen ? "#34d399" : "#f87171",
              marginTop: "8px",
              marginBottom: "4px"
            }}>
              {isOpen ? "ĐANG MỞ" : "ĐÃ KHÓA"}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {isOpen ? "Đang nhận bình chọn" : "MC đã chốt sổ"}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Podium (Top 1 Highlight) */}
      {top1 && top1.votes > 0 && (
        <div
          className="glass-panel animate-glow"
          style={{
            padding: "24px",
            marginBottom: "30px",
            background: "linear-gradient(135deg, rgba(60, 30, 20, 0.9) 0%, rgba(35, 18, 45, 0.9) 100%)",
            border: "2px solid #ffd700",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ position: "relative" }}>
              <img
                src={getAssetUrl(top1.image)}
                alt={top1.name}
                style={{
                  width: "90px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid #ffd700",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)"
                }}
              />
              <div style={{
                position: "absolute",
                top: "-12px",
                left: "-10px",
                background: "#ffd700",
                color: "#000",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.8)"
              }}>
                <Crown size={18} />
              </div>
            </div>

            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255, 215, 0, 0.2)",
                color: "#ffd700",
                padding: "3px 10px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 800,
                marginBottom: "6px"
              }}>
                ★ ĐANG DẪN ĐẦU BÌNH CHỌN (TOP 1)
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "26px",
                color: "#fff",
                margin: "0 0 4px"
              }}>
                {top1.name} - SBD {top1.sbd}
              </h2>
              <div style={{ fontSize: "16px", color: "#ffc2d1", fontWeight: 700 }}>
                {top1.members}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {top1.department}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Số phiếu hiện tại
            </div>
            <div style={{
              fontSize: "44px",
              fontWeight: 900,
              color: "#ffd700",
              fontFamily: "var(--font-heading)",
              lineHeight: 1
            }}>
              {top1.votes} <span style={{ fontSize: "18px", color: "var(--text-secondary)" }}>phiếu</span>
            </div>
            <div style={{ fontSize: "14px", color: "#34d399", fontWeight: 700, marginTop: "4px" }}>
              {totalVotesCount > 0 ? Math.round((top1.votes / totalVotesCount) * 100) : 0}% tổng số phiếu
            </div>
          </div>
        </div>
      )}

      {/* All Contestants Live Bar Chart */}
      <div
        className="glass-panel"
        style={{
          padding: "28px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(255, 215, 0, 0.25)"
        }}
      >
        <h3 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "22px",
          color: "#fff",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <BarChart3 size={24} color="#f5c044" />
          Chi Tiết Tỷ Lệ Phiếu Của 5 Cặp Đôi
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {sortedContestants.map((c, index) => {
            const votePercent = totalVotesCount > 0 ? Math.round((c.votes / totalVotesCount) * 100) : 0;
            const isLeader = index === 0 && c.votes > 0;

            return (
              <div
                key={c.id}
                style={{
                  background: isLeader ? "rgba(255, 215, 0, 0.08)" : "rgba(255, 255, 255, 0.03)",
                  border: isLeader ? "1px solid rgba(255, 215, 0, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px 20px",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: index === 0 ? "var(--gold-gradient)" : index === 1 ? "#c0c0c0" : index === 2 ? "#cd7f32" : "rgba(255, 255, 255, 0.15)",
                      color: index < 3 ? "#000" : "#fff",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px"
                    }}>
                      #{index + 1}
                    </div>

                    <img
                      src={getAssetUrl(c.image)}
                      alt={c.name}
                      style={{
                        width: "48px",
                        height: "56px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 215, 0, 0.3)"
                      }}
                    />

                    <div>
                      <div style={{ fontWeight: 800, fontSize: "17px", color: "#fff" }}>
                        {c.name} (SBD {c.sbd})
                      </div>
                      <div style={{ fontSize: "13px", color: "#ffc2d1" }}>
                        {c.members}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#ffd700" }}>
                      {c.votes || 0} <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>phiếu</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 700 }}>
                      {votePercent}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  width: "100%",
                  height: "14px",
                  background: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.max(votePercent, c.votes > 0 ? 3 : 0)}%`,
                      background: isLeader
                        ? "linear-gradient(90deg, #f5c044 0%, #ffd700 100%)"
                        : "linear-gradient(90deg, #b71c1c 0%, #e52145 100%)",
                      borderRadius: "9999px",
                      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isLeader ? "0 0 12px rgba(255, 215, 0, 0.6)" : "none"
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Recent Activity Stream */}
      {auditLogs && auditLogs.length > 0 && (
        <div style={{
          marginTop: "24px",
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 215, 0, 0.15)",
          borderRadius: "var(--radius-md)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ffd700" }}>
            <Sparkles size={16} />
            <span>Vừa bình chọn:</span>
            <strong style={{ color: "#fff" }}>{auditLogs[0]?.voterName}</strong>
            <span style={{ color: "var(--text-muted)" }}>({auditLogs[0]?.department})</span>
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            {auditLogs[0]?.timestamp}
          </div>
        </div>
      )}
    </div>
  );
}
