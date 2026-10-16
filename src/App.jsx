import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import VoterIdentification from "./components/VoterIdentification";
import CandidateCard from "./components/CandidateCard";
import ConfirmationModal from "./components/ConfirmationModal";
import SuccessScreen from "./components/SuccessScreen";
import LiveLeaderboard from "./components/LiveLeaderboard";
import AdminDashboard from "./components/AdminDashboard";
import {
  getConfig,
  getContestants,
  getEmployees,
  getAuditLogs,
  hasDeviceVoted,
  subscribeToUpdates,
  submitVote,
  toggleVotingStatus,
  resetAllData,
  unlockCurrentDevice
} from "./services/storageService";
import { AlertCircle, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("vote"); // vote, live, admin
  const [contestants, setContestants] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [config, setConfig] = useState(getConfig());
  const [deviceHasVoted, setDeviceHasVoted] = useState(false);

  // Voter selection state
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [selectedCoupleId, setSelectedCoupleId] = useState("");

  // Modals & Status
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteSuccessData, setVoteSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Tải dữ liệu ban đầu
  const loadData = useCallback(() => {
    setContestants(getContestants());
    setEmployees(getEmployees());
    setAuditLogs(getAuditLogs());
    setConfig(getConfig());
    setDeviceHasVoted(hasDeviceVoted());

    // Nếu đã có phiếu bầu lưu trong máy
    const myVote = localStorage.getItem("namhai_my_vote");
    if (myVote && !voteSuccessData) {
      try {
        const parsed = JSON.parse(myVote);
        setVoteSuccessData({
          voterName: parsed.employeeName,
          coupleName: parsed.coupleName,
          ticketId: parsed.ticketId,
          timestamp: parsed.timestamp
        });
      } catch (e) {
        // ignore
      }
    }
  }, [voteSuccessData]);

  useEffect(() => {
    loadData();

    // Lắng nghe cập nhật từ các tab khác (BroadcastChannel / Storage / Firebase)
    const unsubscribe = subscribeToUpdates(() => {
      loadData();
    });

    return () => {
      unsubscribe();
    };
  }, [loadData]);

  // Tổng số cử tri đã hoàn thành bình chọn
  const totalVotedCount = useMemo(() => {
    return employees.filter((e) => e.hasVoted).length;
  }, [employees]);

  // Cặp đôi đang được chọn
  const selectedContestant = useMemo(() => {
    return contestants.find((c) => c.id === selectedCoupleId);
  }, [contestants, selectedCoupleId]);

  // Cử tri đang được chọn
  const selectedEmployee = useMemo(() => {
    return employees.find((e) => e.id === selectedEmployeeId);
  }, [employees, selectedEmployeeId]);

  // Bấm nút "Gửi Bình Chọn"
  const handleInitiateVote = () => {
    setErrorMessage("");

    if (!config.isOpen) {
      setErrorMessage("Cổng bình chọn hiện đang đóng bởi Ban Tổ Chức!");
      return;
    }

    if (deviceHasVoted) {
      setErrorMessage("Thiết bị này đã hoàn thành lượt bình chọn. Mỗi người chỉ được vote 1 lần!");
      return;
    }

    if (!selectedEmployeeId) {
      setErrorMessage("Vui lòng chọn Phòng Ban và Họ Tên của bạn trước khi bình chọn!");
      return;
    }

    if (!authCode.trim()) {
      setErrorMessage("Vui lòng nhập Mã bảo mật cá nhân (4 số cuối SĐT) để xác thực!");
      return;
    }

    if (!selectedCoupleId) {
      setErrorMessage("Vui lòng chọn 1 trong 5 Cặp đôi ứng xử để bình chọn!");
      return;
    }

    // Mở popup xác nhận
    setIsConfirmModalOpen(true);
  };

  // Xác nhận lần cuối và gửi phiếu
  const handleConfirmVote = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await submitVote({
        employeeId: selectedEmployeeId,
        coupleId: selectedCoupleId,
        authCode: authCode.trim()
      });

      if (result.success) {
        setVoteSuccessData(result.data);
        setIsConfirmModalOpen(false);
        setDeviceHasVoted(true);
        loadData();
      } else {
        setErrorMessage(result.message);
        setIsConfirmModalOpen(false);
      }
    } catch {
      setErrorMessage("Có lỗi xảy ra khi gửi bình chọn. Vui lòng thử lại!");
      setIsConfirmModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mở khóa thiết bị để vote thử nghiệm tiếp
  const handleUnlockDevice = () => {
    unlockCurrentDevice();
    setDeviceHasVoted(false);
    setVoteSuccessData(null);
    setSelectedEmployeeId("");
    setSelectedCoupleId("");
    setAuthCode("");
    loadData();
  };

  // Bật/tắt cổng vote từ Admin
  const handleToggleStatus = async (newStatus) => {
    await toggleVotingStatus(newStatus);
    loadData();
  };

  // Reset dữ liệu từ Admin
  const handleResetData = async () => {
    await resetAllData();
    setVoteSuccessData(null);
    setDeviceHasVoted(false);
    setSelectedEmployeeId("");
    setSelectedCoupleId("");
    setAuthCode("");
    loadData();
  };

  return (
    <div>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={config.isOpen}
        totalVoted={totalVotedCount}
        totalEmployees={employees.length}
      />

      <main className="app-container">
        {/* TAB 1: TRANG BÌNH CHỌN (VOTE) */}
        {activeTab === "vote" && (
          <div>
            {/* Header & Banner */}
            <Header />

            {/* Nếu đã vote thành công trên máy này */}
            {voteSuccessData ? (
              <SuccessScreen
                voteData={voteSuccessData}
                onGoToLive={() => setActiveTab("live")}
                onUnlockDevice={handleUnlockDevice}
              />
            ) : (
              <div>
                {/* Error Banner nếu có */}
                {errorMessage && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.2)",
                      border: "1px solid rgba(239, 68, 68, 0.5)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      marginBottom: "20px",
                      color: "#fca5a5",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                    <div>{errorMessage}</div>
                  </div>
                )}

                {/* BƯỚC 1: XÁC THỰC DANH TÍNH CỬ TRI */}
                <VoterIdentification
                  employees={employees}
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={setSelectedDepartment}
                  selectedEmployeeId={selectedEmployeeId}
                  setSelectedEmployeeId={setSelectedEmployeeId}
                  authCode={authCode}
                  setAuthCode={setAuthCode}
                  deviceHasVoted={deviceHasVoted}
                />

                {/* BƯỚC 2: CHỌN CẶP ĐÔI ỨNG XỬ */}
                <div style={{ marginBottom: "26px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px"
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
                      2
                    </div>
                    <h2 style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "22px",
                      color: "#fff",
                      margin: 0
                    }}>
                      {config.formQuestion || "Theo Anh/Chị, cặp đôi có phần thể hiện xuất sắc nhất chính là:"}
                    </h2>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "18px" }}>
                    Nhấn chọn vào 1 trong 5 cặp đôi dưới đây:
                  </p>

                  {/* Danh sách 5 cặp đôi */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "20px"
                  }}>
                    {contestants.map((c) => (
                      <CandidateCard
                        key={c.id}
                        contestant={c}
                        isSelected={selectedCoupleId === c.id}
                        onSelect={(id) => setSelectedCoupleId(id)}
                        disabled={!config.isOpen || deviceHasVoted}
                      />
                    ))}
                  </div>
                </div>

                {/* Nút gửi bình chọn cố định hoặc ở cuối */}
                <div
                  className="glass-panel"
                  style={{
                    padding: "20px 24px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "16px",
                    background: "rgba(25, 14, 38, 0.95)"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                      Cặp đôi đã chọn:
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: selectedContestant ? "#ffd700" : "#a394b8" }}>
                      {selectedContestant ? `★ ${selectedContestant.name} (${selectedContestant.members})` : "Chưa chọn cặp đôi"}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-gold"
                    onClick={handleInitiateVote}
                    disabled={!selectedCoupleId || !selectedEmployeeId || !config.isOpen || deviceHasVoted}
                    style={{
                      padding: "14px 32px",
                      fontSize: "16px",
                      boxShadow: "0 0 25px rgba(245, 192, 68, 0.5)"
                    }}
                  >
                    <Heart size={18} fill="#1a0f00" />
                    HOÀN TẤT & GỬI BÌNH CHỌN
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MÀN HÌNH CHIẾU SÂN KHẤU (LIVE) */}
        {activeTab === "live" && (
          <LiveLeaderboard
            contestants={contestants}
            totalVoted={totalVotedCount}
            totalEmployees={employees.length}
            isOpen={config.isOpen}
            auditLogs={auditLogs}
          />
        )}

        {/* TAB 3: TRANG QUẢN TRỊ BAN TỔ CHỨC */}
        {activeTab === "admin" && (
          <AdminDashboard
            config={config}
            employees={employees}
            contestants={contestants}
            auditLogs={auditLogs}
            onToggleStatus={handleToggleStatus}
            onResetData={handleResetData}
            onUnlockDevice={handleUnlockDevice}
          />
        )}
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmVote}
        voter={selectedEmployee}
        contestant={selectedContestant}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
