import React, { useState, useMemo, useRef, useEffect } from "react";
import { UserCheck, Building2, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff, Search, X, ChevronDown } from "lucide-react";
import { DEPARTMENTS } from "../data/initialData";

// Hàm chuẩn hóa tiếng Việt để tìm kiếm không dấu
function removeVietnameseTones(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const authInputRef = useRef(null);

  // Đóng danh sách gợi ý khi bấm ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Thông tin nhân viên đang được chọn
  const selectedEmp = useMemo(() => {
    return employees.find((e) => e.id === selectedEmployeeId);
  }, [employees, selectedEmployeeId]);

  // Cập nhật giá trị ô input khi đã chọn nhân viên
  useEffect(() => {
    if (selectedEmp) {
      setSearchQuery(selectedEmp.name);
    } else if (!isDropdownOpen) {
      setSearchQuery("");
    }
  }, [selectedEmp, isDropdownOpen]);

  // Lọc danh sách gợi ý thông minh (hỗ trợ cả gõ có dấu và không dấu tiếng Việt)
  const suggestions = useMemo(() => {
    let list = employees;
    if (selectedDepartment) {
      list = list.filter((e) => e.department === selectedDepartment);
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const cleanQuery = removeVietnameseTones(searchQuery.trim());
    return list.filter((e) => {
      const cleanName = removeVietnameseTones(e.name);
      const cleanDept = removeVietnameseTones(e.department);
      const cleanId = (e.id || "").toLowerCase();
      return cleanName.includes(cleanQuery) || cleanDept.includes(cleanQuery) || cleanId.includes(cleanQuery);
    });
  }, [employees, selectedDepartment, searchQuery]);

  // Khi người dùng bấm chọn 1 người từ danh sách gợi ý
  const handleSelectEmployee = (emp) => {
    if (emp.hasVoted) return; // Không chọn người đã vote
    setSelectedEmployeeId(emp.id);
    setSelectedDepartment(emp.department); // Tự động chọn phòng ban tương ứng
    setSearchQuery(emp.name);
    setIsDropdownOpen(false);
    setAuthCode("");

    // Tự động chuyển tiêu điểm sang ô nhập mã 4 số cuối SĐT
    setTimeout(() => {
      if (authInputRef.current) {
        authInputRef.current.focus();
      }
    }, 150);
  };

  // Nút xóa để chọn người khác
  const handleClearSelection = () => {
    setSelectedEmployeeId("");
    setSearchQuery("");
    setAuthCode("");
    setIsDropdownOpen(true);
  };

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
        {/* 1. Chọn phòng ban (Tùy chọn lọc nhanh) */}
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
            1. Phòng Ban (Lọc nhanh):
          </label>
          <select
            className="custom-select"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedEmployeeId("");
              setSearchQuery("");
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

        {/* 2. Ô TÌM KIẾM TỰ ĐỘNG GỢI Ý HỌ TÊN (AUTOCOMPLETE COMBOBOX) */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffc2d1",
            marginBottom: "6px"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <UserCheck size={16} color="#f5c044" />
              2. Gõ chữ tìm tên của bạn:
            </span>
            <span style={{ fontSize: "11px", color: "#ffd700", fontWeight: 600 }}>
              (Tự gợi ý khi gõ)
            </span>
          </label>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              className="custom-input"
              placeholder="Gõ tên để tìm (VD: Nam, Hương, Chi, Đức...)"
              value={searchQuery}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
                if (selectedEmployeeId) {
                  setSelectedEmployeeId(""); // Xóa chọn cũ khi người dùng gõ sửa
                }
              }}
              style={{
                minHeight: "48px",
                fontSize: "16px",
                paddingLeft: "40px",
                paddingRight: selectedEmployeeId || searchQuery ? "40px" : "36px",
                borderColor: selectedEmp ? "#ffd700" : undefined,
                background: selectedEmp ? "rgba(35, 20, 50, 0.95)" : undefined
              }}
            />

            {/* Icon kính lúp bên trái */}
            <Search
              size={18}
              color="var(--text-muted)"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none"
              }}
            />

            {/* Nút xóa nhanh bên phải */}
            {(selectedEmployeeId || searchQuery) ? (
              <button
                type="button"
                onClick={handleClearSelection}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer"
                }}
                title="Xóa để chọn lại"
              >
                <X size={14} />
              </button>
            ) : (
              <ChevronDown
                size={18}
                color="var(--text-muted)"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none"
                }}
              />
            )}
          </div>

          {/* MENU DANH SÁCH GỢI Ý THÔNG MINH */}
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                zIndex: 60,
                background: "rgba(18, 11, 30, 0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #ffd700",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 192, 68, 0.25)",
                maxHeight: "260px",
                overflowY: "auto",
                padding: "6px"
              }}
            >
              {suggestions.length === 0 ? (
                <div style={{
                  padding: "16px",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontSize: "13px"
                }}>
                  Không tìm thấy nhân viên nào khớp với <strong>"{searchQuery}"</strong>
                </div>
              ) : (
                suggestions.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      cursor: emp.hasVoted ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                      background: selectedEmployeeId === emp.id
                        ? "rgba(245, 192, 68, 0.2)"
                        : "transparent",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      opacity: emp.hasVoted ? 0.55 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!emp.hasVoted) e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedEmployeeId !== emp.id) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div>
                      <div style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: selectedEmployeeId === emp.id ? "#ffd700" : "#fff"
                      }}>
                        {emp.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {emp.department} • Mã: {emp.id}
                      </div>
                    </div>

                    <div>
                      {emp.hasVoted ? (
                        <span style={{
                          fontSize: "11px",
                          color: "#f87171",
                          fontWeight: 700,
                          background: "rgba(239, 68, 68, 0.15)",
                          padding: "3px 8px",
                          borderRadius: "4px"
                        }}>
                          Đã vote
                        </span>
                      ) : (
                        <span style={{
                          fontSize: "11px",
                          color: "#34d399",
                          fontWeight: 700,
                          background: "rgba(16, 185, 129, 0.15)",
                          padding: "3px 8px",
                          borderRadius: "4px"
                        }}>
                          Chọn
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
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
            3. Mã xác thực (4 số cuối SĐT của bạn):
          </label>
          <div style={{ position: "relative" }}>
            <input
              ref={authInputRef}
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

      {/* Thông tin trạng thái cử tri đã chọn */}
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
                ✔ Đã nhận diện! Vui lòng nhập 4 số cuối SĐT và chọn cặp đôi bên dưới.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
