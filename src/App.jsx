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
  unlockCurrentDevice
} from "./services/storageService";
import { AlertCircle, Heart, Sparkles, Check, CheckCircle2 } from "lucide-react";

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

    // Lắng nghe cập nhật từ các tab khác và Firebase Cloud Firestore
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (deviceHasVoted) {
      setErrorMessage("Điện thoại này đã hoàn thành lượt bình chọn. Mỗi người chỉ được vote 1 lần!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!selectedEmployeeId) {
      setErrorMessage("Vui lòng chọn Phòng Ban và Tên của bạn ở Bước 1 trước khi gửi!");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    if (!authCode.trim()) {
      setErrorMessage("Vui lòng nhập 4 số cuối SĐT của bạn ở Bước 1 để xác thực!");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    if (!selectedCoupleId) {
      setErrorMessage("Vui lòng chạm chọn 1 trong 5 Cặp đôi ở Bước 2!");
      return;
    }

    // Mở popup xác nhận
    setIsConfirmModalOpen(true);
  };

  // Xác nhận lần cuối và gửi phiếu lên Cloud Firestore
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMessage(result.message);
        setIsConfirmModalOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setErrorMessage("Có lỗi kết nối. Vui lòng thử lại!");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Bật/tắt cổng vote từ Admin
  const handleToggleStatus = async (newStatus) => {
    await toggleVotingStatus(newStatus);
    loadData();
  };

  const isReadyToSubmit = selectedCoupleId && selectedEmployeeId && authCode.trim() && config.isOpen && !deviceHasVoted;

  return (
    <div style={{ paddingBottom: activeTab === "vote" && !voteSuccessData ? "100px" : "40px" }}>
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={config.isOpen}
        totalVoted={totalVotedCount}
        totalEmployees={employees.length}
      />

      <main className="app-container">
        {/* TAB 1: TRANG BÌNH CHỌN (TỐI ƯU CHO ĐIỆN THOẠI DI ĐỘNG) */}
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
                {/* Thông báo lỗi nếu có */}
                {errorMessage && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.2)",
                      border: "1px solid rgba(239, 68, 68, 0.5)",
                      borderRadius: "var(--radius-md)",
                      padding: "12px 16px",
                      marginBottom: "16px",
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
                <div style={{ marginBottom: "20px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px"
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
                      2
                    </div>
                    <h2 style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "19px",
                      color: "#fff",
                      margin: 0
                    }}>
                      Bước 2: Chọn Cặp Đôi Xuất Sắc Nhất
                    </h2>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>
                    Chạm trực tiếp vào ảnh cặp đôi bạn muốn bình chọn:
                  </p>

                  {/* Danh sách các cặp đôi (Dạng hàng ngang nhỏ gọn tối ưu lướt trên điện thoại) */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "10px"
                  }}>
                    {contestants.map((c) => (
                      <CandidateCard
                        key={c.id}
                        contestant={c}
                        isSelected={selectedCoupleId === c.id}
                        onSelect={(id) => {
                          setSelectedCoupleId(id);
                          if (navigator.vibrate) navigator.vibrate(35);
                        }}
                        disabled={!config.isOpen || deviceHasVoted}
                      />
                    ))}
                  </div>
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
            onUnlockDevice={handleUnlockDevice}
          />
        )}
      </main>

      {/* THANH GHIM CỐ ĐỊNH Ở ĐÁY MÀN HÌNH ĐIỆN THOẠI (STICKY BOTTOM ACTION BAR) */}
      {activeTab === "vote" && !voteSuccessData && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "rgba(18, 11, 28, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255, 215, 0, 0.3)",
          boxShadow: "0 -5px 25px rgba(0, 0, 0, 0.7)",
          padding: "10px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))"
        }}>
          <div style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px"
          }}>
            {/* Tóm tắt cặp đôi đã chọn */}
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Đang chọn:
              </div>
              <div style={{
                fontSize: "14px",
                fontWeight: 800,
                color: selectedContestant ? "#ffd700" : "var(--text-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {selectedContestant ? `★ ${selectedContestant.name}` : "Chưa chọn cặp đôi"}
              </div>
            </div>

            {/* Nút to dưới ngón tay cái */}
            <button
              type="button"
              className="btn-gold"
              onClick={handleInitiateVote}
              disabled={!selectedCoupleId || !selectedEmployeeId || !config.isOpen || deviceHasVoted}
              style={{
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 800,
                whiteSpace: "nowrap",
                flexShrink: 0,
                boxShadow: isReadyToSubmit ? "0 0 20px rgba(245, 192, 68, 0.6)" : "none"
              }}
            >
              <Heart size={16} fill="#1a0f00" />
              GỬI BÌNH CHỌN
            </button>
          </div>
        </div>
      )}

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
