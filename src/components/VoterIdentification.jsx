import React, { useState, useMemo } from "react";
import { UserCheck, Building2, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles } from "lucide-react";
import { DEPARTMENTS } from "../data/initialData";

export default function VoterIdentification({
  employees,
  selectedDepartment,
  setSelectedDepartment,
  selectedEmployeeId,
  setSelectedEmployeeId,
  authCode,
  setAuthCode,
  deviceHasVoted
}) {
  const [showCode, setShowCode] = useState(false);

  // Lọc danh sách nhân viên theo phòng ban đã chọn
  const filteredEmployees = useMemo(() => {
    if (!selectedDepartment) return employees;
    return employees.filter((e) => e.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  // Thông tin nhân viên đang chọn
  const selectedEmp = useMemo(() => {
    return employees.find((e) => e.id === selectedEmployeeId);
  }, [employees, selectedEmployeeId]);

  return (
    <div
      className="glass-panel"
      style={{
        padding: "20px 16px",
        marginBottom: "24px",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        background: "rgba(22, 14, 34, 0.88)"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "14px",
        paddingBottom: "10px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "var(--gold-gradient)",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: "14px",
          flexShrink: 0
        }}>
          1
        </div>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "18px",
          color: "#fff",
          margin: 0
        }}>
          Bước 1: Chọn Tên & Xác Thực
        </h2>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "auto" }}>
          (Chống vote hộ)
        </span>
      </div>

      {/* Cảnh báo nếu máy này đã vote */}
      {deviceHasVoted && (
        <div style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          borderRadius: "var(--radius-md)",
          padding: "12px 14px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#fca5a5",
          fontSize: "13px"
        }}>
          <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
          <div>
            <strong>Điện thoại này đã hoàn thành lượt bình chọn!</strong> Mỗi người chỉ được vote 1 lần duy nhất.
          </div>
        </div>
      )}

      {/* 3 Trường nhập liệu tối ưu điện thoại */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* 1. Chọn phòng ban */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "6px"
          }}>
            <Building2 size={16} color="#f5c044" />
            1. Phòng Ban của bạn:
          </label>
          <select
            className="custom-select"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedEmployeeId("");
              setAuthCode("");
            }}
            style={{ minHeight: "46px", fontSize: "15px" }}
          >
            <option value="">-- Tất cả các phòng ban ({DEPARTMENTS.length}) --</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Chọn Tên */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "6px"
          }}>
            <UserCheck size={16} color="#f5c044" />
            2. Họ và Tên của bạn:
          </label>
          <select
            className="custom-select"
            value={selectedEmployeeId}
            onChange={(e) => {
              setSelectedEmployeeId(e.target.value);
              setAuthCode("");
            }}
            style={{ minHeight: "46px", fontSize: "15px" }}
          >
            <option value="">
              -- Chọn tên của bạn ({filteredEmployees.length} người) --
            </option>
            {filteredEmployees.map((emp) => (
              <option key={emp.id} value={emp.id} disabled={emp.hasVoted}>
                {emp.name} {emp.hasVoted ? "✔ (Đã bình chọn)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Nhập 4 số cuối SĐT (bật bàn phím số numeric trên điện thoại) */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "6px"
          }}>
            <KeyRound size={16} color="#f5c044" />
            3. Mã bảo mật (4 số cuối SĐT của bạn):
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showCode ? "text" : "password"}
              inputMode="numeric"
              pattern="[0-9]*"
              className="custom-input"
              placeholder="Nhập 4 số cuối SĐT..."
              maxLength={6}
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              disabled={!selectedEmployeeId || selectedEmp?.hasVoted}
              style={{
                letterSpacing: "4px",
                fontWeight: 800,
                fontSize: "18px",
                paddingRight: "44px",
                minHeight: "46px"
              }}
            />
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center"
              }}
              title={showCode ? "Ẩn mã" : "Hiện mã"}
            >
              {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Thông tin trạng thái cử tri */}
      {selectedEmp && (
        <div style={{
          marginTop: "14px",
          padding: "10px 14px",
          borderRadius: "var(--radius-sm)",
          background: selectedEmp.hasVoted ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
          border: `1px solid ${selectedEmp.hasVoted ? "rgba(239, 68, 68, 0.35)" : "rgba(16, 185, 129, 0.35)"}`,
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {selectedEmp.hasVoted ? (
              <AlertCircle size={16} color="#ef4444" />
            ) : (
              <CheckCircle2 size={16} color="#10b981" />
            )}
            <span style={{ fontWeight: 700, color: "#fff" }}>
              {selectedEmp.name}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
              ({selectedEmp.department})
            </span>
          </div>

          <div style={{ marginTop: "4px", fontSize: "12px" }}>
            {selectedEmp.hasVoted ? (
              <span style={{ color: "#f87171", fontWeight: 700 }}>
                Đã bình chọn lúc {selectedEmp.votedAt} (Không thể vote lại)
              </span>
            ) : (
              <span style={{ color: "#34d399", fontWeight: 600 }}>
                ✔ Sẵn sàng! Vui lòng nhập 4 số cuối SĐT và chọn cặp đôi bên dưới.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
