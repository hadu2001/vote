import React, { useState, useMemo } from "react";
import {
  Lock,
  Unlock,
  Power,
  Download,
  Users,
  FileSpreadsheet,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Database,
  ExternalLink,
  Smartphone,
  RotateCcw,
  AlertTriangle,
  ShieldAlert
} from "lucide-react";
import { DEPARTMENTS } from "../data/initialData";
import { getFirebaseConfig } from "../services/firebase";

export default function AdminDashboard({
  config,
  employees,
  contestants,
  auditLogs,
  onToggleStatus,
  onUnlockDevice,
  onResetVotes
}) {
  const [pinInput, setPinInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeAdminTab, setActiveAdminTab] = useState("overview"); // overview, employees, audit, firebase

  // Trạng thái modal Reset Dữ Liệu (Mật khẩu cấp 2)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [secondaryPin, setSecondaryPin] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // Bộ lọc danh sách nhân viên
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, voted, not_voted
  const [searchEmp, setSearchEmp] = useState("");

  // Firebase config input state
  const [firebaseInput, setFirebaseInput] = useState(() => {
    const existing = getFirebaseConfig();
    return existing ? JSON.stringify(existing, null, 2) : "";
  });
  const [fbSaveMsg, setFbSaveMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === "300803" || pinInput.trim() === config.defaultAdminPin) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Mã PIN quản trị không chính xác! (Chỉ đúng mã 300803 mới truy cập được)");
    }
  };

  // Xác nhận Reset dữ liệu với mật khẩu cấp 2: admin123
  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (!secondaryPin.trim()) {
      setResetError("Vui lòng nhập mật khẩu cấp 2!");
      return;
    }

    if (secondaryPin.trim() !== "admin123") {
      setResetError("Mật khẩu cấp 2 không chính xác! (Bắt buộc: admin123)");
      return;
    }

    setIsResetting(true);
    try {
      const res = await onResetVotes(secondaryPin.trim());
      if (res && res.success) {
        setResetSuccess(res.message || "Đã reset toàn bộ dữ liệu bình chọn về 0 thành công!");
        setTimeout(() => {
          setIsResetModalOpen(false);
          setSecondaryPin("");
          setResetSuccess("");
          setIsResetting(false);
        }, 1200);
      } else {
        setResetError(res?.message || "Có lỗi xảy ra khi reset.");
        setIsResetting(false);
      }
    } catch (err) {
      setResetError("Lỗi kết nối khi reset: " + err.message);
      setIsResetting(false);
    }
  };

  // Thống kê tiến độ theo từng phòng ban
  const deptStats = useMemo(() => {
    return DEPARTMENTS.map((dept) => {
      const deptEmployees = employees.filter((e) => e.department === dept);
      const voted = deptEmployees.filter((e) => e.hasVoted).length;
      const total = deptEmployees.length;
      const percent = total > 0 ? Math.round((voted / total) * 100) : 0;
      return { dept, voted, total, percent };
    });
  }, [employees]);

  // Lọc nhân sự
  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      if (filterDept && e.department !== filterDept) return false;
      if (filterStatus === "voted" && !e.hasVoted) return false;
      if (filterStatus === "not_voted" && e.hasVoted) return false;
      if (searchEmp.trim()) {
        const q = searchEmp.toLowerCase();
        return e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [employees, filterDept, filterStatus, searchEmp]);

  // Xuất file CSV (mở được bằng Excel tiếng Việt UTF-8)
  const handleExportCsv = () => {
    const headers = [
      "Mã Phiếu",
      "Mã Nhân Viên",
      "Họ Và Tên",
      "Phòng Ban",
      "Cặp Đôi Bình Chọn",
      "Thời Gian",
      "Địa Chỉ IP",
      "Thiết Bị"
    ];

    const rows = auditLogs.map((log) => [
      `"${log.id}"`,
      `"${log.employeeId}"`,
      `"${log.voterName}"`,
      `"${log.department}"`,
      `"${log.coupleName}"`,
      `"${log.timestamp}"`,
      `"${log.ipAddress}"`,
      `"${log.deviceInfo}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `NamHai_Gala2010_KetQuaBinhChon_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lưu cấu hình Firebase vào LocalStorage
  const handleSaveFirebase = () => {
    try {
      const parsed = JSON.parse(firebaseInput);
      localStorage.setItem("namhai_firebase_config", JSON.stringify(parsed));
      setFbSaveMsg("✔ Đã lưu cấu hình Firebase! Tải lại trang để kích hoạt kết nối đám mây.");
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setFbSaveMsg("❌ Cú pháp JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc.");
    }
  };

  // Màn hình đăng nhập Admin nếu chưa xác thực
  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: "420px", margin: "40px auto", textAlign: "center" }}>
        <div
          className="glass-panel"
          style={{
            padding: "36px 28px",
            border: "1px solid rgba(255, 215, 0, 0.35)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.6)"
          }}
        >
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "var(--ruby-gradient)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 0 20px rgba(229, 33, 69, 0.4)"
          }}>
            <Lock size={30} />
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "24px", color: "#fff", marginBottom: "6px" }}>
            Ban Tổ Chức Gala 20/10
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "22px" }}>
            Nhập mã PIN để truy cập bảng điều khiển quản trị
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              className="custom-input"
              placeholder="Nhập mã PIN "
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              style={{
                textAlign: "center",
                letterSpacing: "6px",
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "14px"
              }}
              autoFocus
            />

            {authError && (
              <div style={{ color: "#f87171", fontSize: "13px", marginBottom: "14px" }}>
                {authError}
              </div>
            )}

            <button type="submit" className="btn-gold w-full" style={{ padding: "12px" }}>
              Mở Khóa Quản Trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1150px", margin: "0 auto", paddingBottom: "50px" }}>
      {/* Admin Top Controls Card */}
      <div
        className="glass-panel"
        style={{
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <ShieldCheck size={20} color="#ffd700" />
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "24px", color: "#fff", margin: 0 }}>
              Bảng Điều Khiển Ban Tổ Chức
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Kiểm soát cổng bình chọn, quản lý danh sách cử tri và xuất kết quả kiểm phiếu
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Nút Bật/Tắt Cổng Vote */}
          <button
            type="button"
            onClick={() => onToggleStatus(!config.isOpen)}
            className={config.isOpen ? "btn-primary" : "btn-gold"}
            style={{ padding: "10px 18px", fontSize: "13px" }}
          >
            <Power size={16} />
            {config.isOpen ? "Khóa Cổng Bình Chọn (Dừng Vote)" : "Mở Lại Cổng Bình Chọn"}
          </button>

          {/* Nút Xuất Excel */}
          <button
            type="button"
            onClick={handleExportCsv}
            className="btn-secondary"
            style={{ padding: "10px 18px", fontSize: "13px" }}
          >
            <Download size={16} />
            Xuất File Excel (CSV)
          </button>

          {/* Nút Mở Khóa Máy Hiện Tại */}
          <button
            type="button"
            onClick={onUnlockDevice}
            className="btn-secondary"
            style={{ padding: "10px 14px", fontSize: "13px" }}
            title="Cho phép bỏ phiếu thêm lượt thử nghiệm trên máy này"
          >
            <Smartphone size={16} />
            Mở Khóa Máy Này
          </button>

          {/* Nút Reset Dữ Liệu Bình Chọn (Bảo vệ bởi mật khẩu cấp 2) */}
          <button
            type="button"
            onClick={() => {
              setResetError("");
              setResetSuccess("");
              setSecondaryPin("");
              setIsResetModalOpen(true);
            }}
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              background: "rgba(239, 68, 68, 0.2)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              borderRadius: "var(--radius-sm)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              fontWeight: 700,
              transition: "all 0.2s ease"
            }}
            title="Xóa toàn bộ kết quả vote thử nghiệm để chuẩn bị cho cuộc thi chính thức"
          >
            <RotateCcw size={16} />
            Reset Dữ Liệu Bình Chọn
          </button>

        </div>
      </div>


      {/* Admin Subtabs */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        paddingBottom: "12px",
        flexWrap: "wrap"
      }}>
        <button
          onClick={() => setActiveAdminTab("overview")}
          className={activeAdminTab === "overview" ? "btn-gold" : "btn-secondary"}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          📊 Tổng Quan & Phòng Ban
        </button>

        <button
          onClick={() => setActiveAdminTab("employees")}
          className={activeAdminTab === "employees" ? "btn-gold" : "btn-secondary"}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          👥 Cán Bộ Nhân Viên (100 người)
        </button>

        <button
          onClick={() => setActiveAdminTab("audit")}
          className={activeAdminTab === "audit" ? "btn-gold" : "btn-secondary"}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          🛡 Nhật Ký Kiểm Toán (Audit Trail - {auditLogs.length} lượt)
        </button>

        <button
          onClick={() => setActiveAdminTab("firebase")}
          className={activeAdminTab === "firebase" ? "btn-gold" : "btn-secondary"}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          ☁ Cài Đặt Firebase / Đám Mây
        </button>
      </div>

      {/* TAB 1: TỔNG QUAN PHÒNG BAN */}
      {activeAdminTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {/* Card tiến độ các phòng ban */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "#ffd700", marginBottom: "16px" }}>
              Tiến Độ Bình Chọn Theo Phòng Ban
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {deptStats.map((item) => (
                <div key={item.dept} style={{ fontSize: "13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{item.dept}</span>
                    <span style={{ color: item.percent === 100 ? "#34d399" : "#ffc2d1", fontWeight: 700 }}>
                      {item.voted}/{item.total} ({item.percent}%)
                    </span>
                  </div>
                  <div style={{
                    width: "100%",
                    height: "8px",
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${item.percent}%`,
                      height: "100%",
                      background: item.percent === 100 ? "#10b981" : "var(--ruby-gradient)",
                      borderRadius: "4px"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card thống kê 5 cặp đôi */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "#ffd700", marginBottom: "16px" }}>
              Phiếu Bầu 5 Cặp Đôi
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {contestants.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "12px",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={c.image}
                      alt={c.name}
                      style={{ width: "40px", height: "48px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: "#fff", fontSize: "15px" }}>
                        {c.name} (SBD {c.sbd})
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {c.members}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: "#ffd700" }}>
                      {c.votes || 0}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      phiếu bầu
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DANH SÁCH CÁN BỘ NHÂN VIÊN */}
      {activeAdminTab === "employees" && (
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select
                className="custom-select"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="">Tất cả phòng ban</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                className="custom-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="voted">Đã bình chọn</option>
                <option value="not_voted">Chưa bình chọn</option>
              </select>
            </div>

            <div style={{ position: "relative", width: "240px" }}>
              <input
                type="text"
                className="custom-input"
                placeholder="Tìm tên nhân viên..."
                value={searchEmp}
                onChange={(e) => setSearchEmp(e.target.value)}
                style={{ paddingLeft: "36px" }}
              />
              <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.06)", textAlign: "left", color: "#ffd700" }}>
                  <th style={{ padding: "10px 12px" }}>Mã NV</th>
                  <th style={{ padding: "10px 12px" }}>Họ Và Tên</th>
                  <th style={{ padding: "10px 12px" }}>Phòng Ban</th>
                  <th style={{ padding: "10px 12px" }}>Mã Xác Thực (4 số SĐT)</th>
                  <th style={{ padding: "10px 12px" }}>Trạng Thái</th>
                  <th style={{ padding: "10px 12px" }}>Thời Gian Vote</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      background: emp.hasVoted ? "rgba(16, 185, 129, 0.04)" : "transparent"
                    }}
                  >
                    <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "#ffc2d1" }}>{emp.id}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 700, color: "#fff" }}>{emp.name}</td>
                    <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{emp.department}</td>
                    <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "#ffd700" }}>{emp.authCode}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {emp.hasVoted ? (
                        <span style={{ color: "#34d399", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: 700 }}>
                          <CheckCircle2 size={14} /> Đã vote
                        </span>
                      ) : (
                        <span style={{ color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <XCircle size={14} /> Chưa vote
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "10px 12px", color: "var(--text-muted)", fontSize: "12px" }}>
                      {emp.votedAt || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT TRAIL LOGS */}
      {activeAdminTab === "audit" && (
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "#ffd700" }}>
                Nhật Ký Kiểm Toán Phiếu Bầu (Audit Trail)
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Lưu lại toàn bộ IP, thời gian, tên thiết bị để minh bạch và giải quyết tranh chấp mạo danh
              </p>
            </div>
            <span className="badge-gold">
              Tổng số bản ghi: {auditLogs.length}
            </span>
          </div>

          {auditLogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              Chưa có lượt bình chọn nào được ghi nhận.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "rgba(255, 255, 255, 0.06)", textAlign: "left", color: "#ffd700" }}>
                    <th style={{ padding: "10px 12px" }}>Thời Gian</th>
                    <th style={{ padding: "10px 12px" }}>Cử Tri</th>
                    <th style={{ padding: "10px 12px" }}>Phòng Ban</th>
                    <th style={{ padding: "10px 12px" }}>Cặp Đôi Được Chọn</th>
                    <th style={{ padding: "10px 12px" }}>Địa Chỉ IP</th>
                    <th style={{ padding: "10px 12px" }}>Thiết Bị</th>
                    <th style={{ padding: "10px 12px" }}>Mã Phiếu</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <td style={{ padding: "10px 12px", color: "var(--text-muted)", fontSize: "12px", whiteSpace: "nowrap" }}>
                        {log.timestamp}
                      </td>
                      <td style={{ padding: "10px 12px", fontWeight: 700, color: "#fff" }}>
                        {log.voterName}
                      </td>
                      <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>
                        {log.department}
                      </td>
                      <td style={{ padding: "10px 12px", color: "#ffd700", fontWeight: 800 }}>
                        ★ {log.coupleName}
                      </td>
                      <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "#ffc2d1" }}>
                        {log.ipAddress}
                      </td>
                      <td style={{ padding: "10px 12px", color: "var(--text-muted)", fontSize: "12px" }}>
                        {log.deviceInfo}
                      </td>
                      <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "var(--text-muted)", fontSize: "11px" }}>
                        {log.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FIREBASE SETTINGS */}
      {activeAdminTab === "firebase" && (
        <div className="glass-panel" style={{ padding: "24px", maxWidth: "750px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <Database size={22} color="#f5c044" />
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "#fff", margin: 0 }}>
              Cấu Hình Firebase Firestore Realtime
            </h3>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
            Nếu bạn tạo một project Firebase miễn phí tại <strong>console.firebase.google.com</strong>, bạn chỉ cần copy đoạn mã cấu hình SDK (Firebase Config JSON) và dán vào bên dưới. Hệ thống sẽ tự động đồng bộ dữ liệu bình chọn theo thời gian thực lên máy chủ Google!
          </p>

          <textarea
            className="custom-input"
            rows={10}
            value={firebaseInput}
            onChange={(e) => setFirebaseInput(e.target.value)}
            placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "your-app.firebaseapp.com",\n  "projectId": "your-project-id",\n  "storageBucket": "...",\n  "messagingSenderId": "...",\n  "appId": "..."\n}`}
            style={{ fontFamily: "monospace", fontSize: "13px", marginBottom: "14px" }}
          />

          {fbSaveMsg && (
            <div style={{
              fontSize: "13px",
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              marginBottom: "14px",
              background: fbSaveMsg.startsWith("✔") ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
              color: fbSaveMsg.startsWith("✔") ? "#34d399" : "#fca5a5"
            }}>
              {fbSaveMsg}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button type="button" className="btn-gold" onClick={handleSaveFirebase}>
              Lưu & Kích Hoạt Firebase
            </button>
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#ffc2d1",
                fontSize: "13px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none"
              }}
            >
              Tới Firebase Console <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {/* POPUP / MODAL XÁC NHẬN RESET DỮ LIỆU (MẬT KHẨU CẤP 2) */}
      {isResetModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px"
        }}>
          <div className="glass-panel" style={{
            maxWidth: "460px",
            width: "100%",
            padding: "28px",
            border: "1px solid rgba(239, 68, 68, 0.6)",
            boxShadow: "0 20px 50px rgba(239, 68, 68, 0.3)"
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #ef4444",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <AlertTriangle size={28} />
            </div>

            <h3 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "20px",
              color: "#fff",
              textAlign: "center",
              marginBottom: "8px"
            }}>
              Reset Toàn Bộ Dữ Liệu Bình Chọn
            </h3>

            <p style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              textAlign: "center",
              lineHeight: 1.6,
              marginBottom: "16px"
            }}>
              Hành động này sẽ <strong>xóa toàn bộ số vote của 5 cặp đôi về 0</strong>, xóa sạch nhật ký kiểm toán và trả trạng thái 100 nhân viên về <strong>Chưa bình chọn</strong> (dùng khi kết thúc test để chuẩn bị cho cuộc thi chính thức).
            </p>

            <form onSubmit={handleConfirmReset}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ffd700",
                  marginBottom: "6px",
                  textTransform: "uppercase"
                }}>
                  Nhập Mật Khẩu Cấp 2:
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="Nhập: "
                    value={secondaryPin}
                    onChange={(e) => setSecondaryPin(e.target.value)}
                    style={{
                      paddingLeft: "38px",
                      borderColor: "rgba(239, 68, 68, 0.5)",
                      fontSize: "15px"
                    }}
                    autoFocus
                  />
                  <ShieldAlert size={18} color="#ef4444" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              {resetError && (
                <div style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  color: "#fca5a5",
                  fontSize: "13px",
                  padding: "10px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "14px"
                }}>
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  color: "#34d399",
                  fontSize: "13px",
                  padding: "10px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "14px"
                }}>
                  {resetSuccess}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  disabled={isResetting}
                  className="btn-secondary"
                  style={{ padding: "10px 18px", fontSize: "13px" }}
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={isResetting}
                  style={{
                    padding: "10px 20px",
                    fontSize: "13px",
                    fontWeight: 800,
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #e52145, #b91c1c)",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(229, 33, 69, 0.4)"
                  }}
                >
                  {isResetting ? "Đang xử lý..." : "Xác Nhận Reset Về 0"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
