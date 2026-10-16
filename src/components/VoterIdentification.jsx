import React, { useState, useMemo } from "react";
import { UserCheck, Building2, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff, Search } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc nhân viên theo phòng ban đã chọn
  const filteredEmployees = useMemo(() => {
    let list = employees;
    if (selectedDepartment) {
      list = list.filter((e) => e.department === selectedDepartment);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q));
    }
    return list;
  }, [employees, selectedDepartment, searchTerm]);

  // Thông tin nhân viên đang chọn
  const selectedEmp = useMemo(() => {
    return employees.find((e) => e.id === selectedEmployeeId);
  }, [employees, selectedEmployeeId]);

  return (
    <div
      className="glass-panel"
      style={{
        padding: "24px",
        marginBottom: "30px",
        border: "1px solid rgba(255, 215, 0, 0.28)",
        background: "rgba(22, 14, 34, 0.82)"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
        paddingBottom: "12px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "var(--gold-gradient)",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: "15px"
        }}>
          1
        </div>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "20px",
          color: "#fff",
          margin: 0
        }}>
          Xác Thực Danh Tính Người Bình Chọn
        </h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "auto" }}>
          (Chống bình chọn hộ)
        </span>
      </div>

      {/* Cảnh báo nếu thiết bị này đã từng vote */}
      {deviceHasVoted && (
        <div style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#fca5a5",
          fontSize: "14px"
        }}>
          <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
          <div>
            <strong>Thiết bị này đã hoàn thành lượt bình chọn!</strong> Mỗi người chỉ được vote 1 lần duy nhất trên mỗi thiết bị.
          </div>
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "18px"
      }}>
        {/* Bước 1: Chọn phòng ban */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "8px"
          }}>
            <Building2 size={16} color="#f5c044" />
            1. Chọn Phòng Ban của bạn:
          </label>
          <select
            className="custom-select"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedEmployeeId("");
              setAuthCode("");
            }}
          >
            <option value="">-- Tất cả các phòng ban ({DEPARTMENTS.length}) --</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Bước 2: Chọn Họ và tên */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "8px"
          }}>
            <UserCheck size={16} color="#f5c044" />
            2. Chọn Họ và Tên của bạn:
          </label>
          <select
            className="custom-select"
            value={selectedEmployeeId}
            onChange={(e) => {
              setSelectedEmployeeId(e.target.value);
              setAuthCode("");
            }}
            disabled={filteredEmployees.length === 0}
          >
            <option value="">
              -- {filteredEmployees.length > 0 ? `Chọn nhân sự (${filteredEmployees.length} người)` : "Không có nhân sự"} --
            </option>
            {filteredEmployees.map((emp) => (
              <option key={emp.id} value={emp.id} disabled={emp.hasVoted}>
                {emp.name} {emp.hasVoted ? "✔ (Đã vote)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Bước 3: Nhập mã bảo mật (4 số cuối SĐT) */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "8px"
          }}>
            <KeyRound size={16} color="#f5c044" />
            3. Mã bảo mật (4 số cuối SĐT):
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showCode ? "text" : "password"}
              className="custom-input"
              placeholder="Ví dụ: 6868..."
              maxLength={6}
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              disabled={!selectedEmployeeId || selectedEmp?.hasVoted}
              style={{
                letterSpacing: "4px",
                fontWeight: 800,
                fontSize: "16px",
                paddingRight: "44px"
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
                padding: "6px",
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

      {/* Hiển thị trạng thái của người được chọn */}
      {selectedEmp && (
        <div style={{
          marginTop: "16px",
          padding: "12px 16px",
          borderRadius: "var(--radius-md)",
          background: selectedEmp.hasVoted ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
          border: `1px solid ${selectedEmp.hasVoted ? "rgba(239, 68, 68, 0.35)" : "rgba(16, 185, 129, 0.35)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {selectedEmp.hasVoted ? (
              <AlertCircle size={18} color="#ef4444" />
            ) : (
              <CheckCircle2 size={18} color="#10b981" />
            )}
            <span>
              <strong>{selectedEmp.name}</strong> ({selectedEmp.department})
            </span>
          </div>

          <div>
            {selectedEmp.hasVoted ? (
              <span style={{ color: "#f87171", fontWeight: 700 }}>
                Đã bình chọn vào {selectedEmp.votedAt} (Không thể vote lại)
              </span>
            ) : (
              <span style={{ color: "#34d399", fontWeight: 700 }}>
                Sẵn sàng bình chọn (Chưa vote)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Gợi ý hỗ trợ người dùng */}
      <div style={{
        marginTop: "12px",
        fontSize: "12px",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}>
        <span>💡 <em>Mẹo: Mã bảo mật là 4 chữ số cuối số điện thoại của bạn tại danh sách công ty Nam Hải.</em></span>
      </div>
    </div>
  );
}
