import { INITIAL_CONTESTANTS, INITIAL_EMPLOYEES, APP_CONFIG } from "../data/initialData";
import { initFirebase } from "./firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const STORAGE_KEYS = {
  CONTESTANTS: "namhai_contestants",
  EMPLOYEES: "namhai_employees",
  AUDIT_LOGS: "namhai_audit_logs",
  CONFIG: "namhai_config",
  DEVICE_ID: "namhai_device_id",
  DEVICE_VOTED: "namhai_device_has_voted",
  CLOUD_SYNCED: "namhai_cloud_synced"
};

// Kênh đồng bộ đa tab tức thì (BroadcastChannel)
let syncChannel = null;
try {
  if (typeof window !== "undefined" && window.BroadcastChannel) {
    syncChannel = new BroadcastChannel("namhai_vote_sync");
  }
} catch (e) {
  console.log("BroadcastChannel not supported", e);
}

// Khởi tạo Device ID duy nhất cho trình duyệt này
export function getOrCreateDeviceId() {
  let id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  if (!id) {
    id = "DEV-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "-" + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
  }
  return id;
}

// Lấy IP người dùng (bất đồng bộ)
export async function getClientIp() {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data.ip || "127.0.0.1";
  } catch {
    return "Nội bộ / Mạng di động";
  }
}

// Nhận diện thiết bị người dùng
export function getDeviceDetails() {
  const ua = navigator.userAgent;
  let os = "Thiết bị di động";
  let browser = "Trình duyệt";

  if (/iPhone/i.test(ua)) os = "iPhone (Apple)";
  else if (/iPad/i.test(ua)) os = "iPad (Apple)";
  else if (/Android/i.test(ua)) os = "Android Phone";
  else if (/Windows NT/i.test(ua)) os = "Windows PC";
  else if (/Macintosh|Mac OS/i.test(ua)) os = "MacOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  if (/Zalo/i.test(ua)) browser = "Zalo App";
  else if (/FBAN|FBAV/i.test(ua)) browser = "Facebook App";
  else if (/Chrome/i.test(ua) && !/Edge|OPR/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Edge|Edg/i.test(ua)) browser = "Edge";

  return `${browser} trên ${os}`;
}

// Lấy cấu hình sự kiện
export function getConfig() {
  const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (saved) {
    try {
      return { ...APP_CONFIG, ...JSON.parse(saved) };
    } catch {
      return APP_CONFIG;
    }
  }
  return APP_CONFIG;
}

export function saveConfig(newConfig) {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(newConfig));
  broadcastChange("CONFIG", newConfig);
}

// Lấy danh sách cặp đôi
export function getContestants() {
  const saved = localStorage.getItem(STORAGE_KEYS.CONTESTANTS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_CONTESTANTS;
    }
  }
  localStorage.setItem(STORAGE_KEYS.CONTESTANTS, JSON.stringify(INITIAL_CONTESTANTS));
  return INITIAL_CONTESTANTS;
}

// Lấy danh sách nhân viên & trạng thái đã vote
export function getEmployees() {
  const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_EMPLOYEES;
    }
  }
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
  return INITIAL_EMPLOYEES;
}

// Lấy danh sách Audit Log
export function getAuditLogs() {
  const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

// Kiểm tra xem thiết bị này đã vote chưa
export function hasDeviceVoted() {
  return localStorage.getItem(STORAGE_KEYS.DEVICE_VOTED) === "true";
}

// Phát tín hiệu cập nhật sang các tab khác (Màn hình Live, Admin)
function broadcastChange(type, payload) {
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type, payload, timestamp: Date.now() });
    } catch (e) {
      console.warn("Lỗi gửi broadcast:", e);
    }
  }
}

// Lắng nghe sự kiện cập nhật thời gian thực từ Firestore và BroadcastChannel
export function subscribeToUpdates(callback) {
  const handleMessage = (event) => {
    if (event && event.data) {
      callback(event.data);
    }
  };

  const handleStorage = (event) => {
    if (event.key && event.key.startsWith("namhai_")) {
      callback({ type: "STORAGE_CHANGE", key: event.key });
    }
  };

  if (syncChannel) {
    syncChannel.addEventListener("message", handleMessage);
  }
  window.addEventListener("storage", handleStorage);

  // KẾT NỐI REALTIME TỚI FIREBASE CLOUD FIRESTORE
  let unsubscribeFirebase = null;
  const fb = initFirebase();
  if (fb && fb.db) {
    try {
      const docRef = doc(fb.db, "events", "namhai_gala_2026");

      // Khởi tạo dữ liệu lên Firestore nếu là lần đầu tiên
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.exists()) {
          console.log("Khởi tạo tài liệu sự kiện ban đầu lên Firestore...");
          setDoc(docRef, {
            contestants: INITIAL_CONTESTANTS,
            employees: INITIAL_EMPLOYEES,
            auditLogs: [],
            config: APP_CONFIG,
            lastUpdated: Date.now()
          }).catch((err) => {
            console.warn("Lưu ban đầu lên Firestore lỗi (cần bật Test Mode trên Firebase):", err);
          });
        }
      }).catch((e) => {
        console.warn("Kiểm tra Firestore ban đầu:", e);
      });

      // Lắng nghe thay đổi Realtime (bất kỳ ai vote ở hội trường, máy chiếu sân khấu nhảy số ngay)
      unsubscribeFirebase = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data();
          console.log("Đã nhận dữ liệu realtime từ Firebase Cloud Firestore!");
          
          if (cloudData.contestants) {
            localStorage.setItem(STORAGE_KEYS.CONTESTANTS, JSON.stringify(cloudData.contestants));
          }
          if (cloudData.employees) {
            localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(cloudData.employees));
          }
          if (cloudData.auditLogs) {
            localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(cloudData.auditLogs));
          }
          if (cloudData.config) {
            localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(cloudData.config));
          }
          callback({ type: "FIREBASE_SYNC", payload: cloudData });
        }
      }, (error) => {
        console.warn("Lỗi listener Firestore:", error.message);
      });
    } catch (err) {
      console.warn("Lỗi thiết lập Firebase Listener:", err);
    }
  }

  return () => {
    if (syncChannel) {
      syncChannel.removeEventListener("message", handleMessage);
    }
    window.removeEventListener("storage", handleStorage);
    if (unsubscribeFirebase) {
      unsubscribeFirebase();
    }
  };
}

// Xử lý gửi phiếu bình chọn với cơ chế bảo mật đa lớp
export async function submitVote({ employeeId, coupleId, authCode }) {
  const config = getConfig();

  // 1. Kiểm tra trạng thái cổng bình chọn
  if (!config.isOpen) {
    return {
      success: false,
      message: "Cổng bình chọn hiện đang TẠM KHÓA bởi Ban Tổ Chức!"
    };
  }

  // 2. Kiểm tra xem thiết bị này đã từng bình chọn chưa
  if (hasDeviceVoted()) {
    return {
      success: false,
      message: "Thiết bị này đã hoàn thành lượt bình chọn trước đó. Mỗi người chỉ được vote 1 lần!"
    };
  }

  // 3. Kiểm tra danh tính nhân viên
  const employees = getEmployees();
  const empIndex = employees.findIndex((e) => e.id === employeeId);
  if (empIndex === -1) {
    return {
      success: false,
      message: "Không tìm thấy thông tin nhân viên trong danh sách của công ty!"
    };
  }

  const employee = employees[empIndex];

  // 4. Kiểm tra xem người này đã vote chưa
  if (employee.hasVoted) {
    return {
      success: false,
      message: `Nhân sự "${employee.name}" đã được ghi nhận bình chọn trước đó lúc ${employee.votedAt || ""}. Không thể bình chọn lại!`
    };
  }

  // 5. Kiểm tra mã xác thực bảo mật cá nhân (4 số cuối SĐT)
  const cleanAuthCode = (authCode || "").trim();
  if (cleanAuthCode !== employee.authCode) {
    return {
      success: false,
      message: "Mã xác thực cá nhân (4 số cuối SĐT) không chính xác! Vui lòng kiểm tra lại."
    };
  }

  // 6. Kiểm tra cặp đôi được chọn
  const contestants = getContestants();
  const coupleIndex = contestants.findIndex((c) => c.id === coupleId);
  if (coupleIndex === -1) {
    return {
      success: false,
      message: "Cặp đôi được chọn không hợp lệ!"
    };
  }

  // Thu thập thông tin kiểm toán (Audit Trail)
  const ip = await getClientIp();
  const device = getDeviceDetails();
  const deviceId = getOrCreateDeviceId();
  const now = new Date();
  const timeFormatted = now.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Tăng số lượt vote của cặp đôi
  contestants[coupleIndex].votes = (contestants[coupleIndex].votes || 0) + 1;

  // Đánh dấu nhân viên đã vote
  employees[empIndex].hasVoted = true;
  employees[empIndex].votedAt = timeFormatted;
  employees[empIndex].votedCoupleId = coupleId;

  // Tạo bản ghi nhật ký kiểm toán (Audit Log)
  const auditLogs = getAuditLogs();
  const logEntry = {
    id: "LOG-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(Math.random() * 1000),
    employeeId: employee.id,
    voterName: employee.name,
    department: employee.department,
    coupleId: coupleId,
    coupleName: contestants[coupleIndex].name,
    timestamp: timeFormatted,
    rawTimestamp: Date.now(),
    ipAddress: ip,
    deviceInfo: device,
    deviceId: deviceId
  };
  auditLogs.unshift(logEntry);

  // Lưu vào LocalStorage
  localStorage.setItem(STORAGE_KEYS.CONTESTANTS, JSON.stringify(contestants));
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  localStorage.setItem(STORAGE_KEYS.DEVICE_VOTED, "true");
  localStorage.setItem("namhai_my_vote", JSON.stringify({
    employeeName: employee.name,
    coupleName: contestants[coupleIndex].name,
    timestamp: timeFormatted,
    ticketId: logEntry.id
  }));

  // ĐỒNG BỘ LÊN GOOGLE CLOUD FIRESTORE REALTIME
  const fb = initFirebase();
  if (fb && fb.db) {
    try {
      const docRef = doc(fb.db, "events", "namhai_gala_2026");
      await setDoc(docRef, {
        contestants,
        employees,
        auditLogs,
        config,
        lastUpdated: Date.now()
      }, { merge: true });
      console.log("✔ Đã lưu phiếu bầu thành công lên Firebase Cloud Firestore!");
    } catch (fbErr) {
      console.warn("Lưu lên Firebase thất bại (đã lưu local an toàn):", fbErr);
    }
  }

  // Bắn thông báo cập nhật tới các tab đang mở
  broadcastChange("VOTE_CAST", {
    voterName: employee.name,
    coupleName: contestants[coupleIndex].name,
    contestants
  });

  return {
    success: true,
    message: "Bình chọn thành công!",
    data: {
      voterName: employee.name,
      coupleName: contestants[coupleIndex].name,
      ticketId: logEntry.id,
      timestamp: timeFormatted
    }
  };
}

// Reset toàn bộ dữ liệu (Chỉ dành cho Admin kiểm thử trước giờ G)
export async function resetAllData() {
  localStorage.removeItem(STORAGE_KEYS.CONTESTANTS);
  localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
  localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
  localStorage.removeItem(STORAGE_KEYS.DEVICE_VOTED);
  localStorage.removeItem("namhai_my_vote");

  const freshContestants = INITIAL_CONTESTANTS.map(c => ({ ...c, votes: 0 }));
  const freshEmployees = INITIAL_EMPLOYEES.map(e => ({ ...e, hasVoted: false, votedAt: null, votedCoupleId: null }));

  localStorage.setItem(STORAGE_KEYS.CONTESTANTS, JSON.stringify(freshContestants));
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(freshEmployees));
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([]));

  const fb = initFirebase();
  if (fb && fb.db) {
    try {
      const docRef = doc(fb.db, "events", "namhai_gala_2026");
      await setDoc(docRef, {
        contestants: freshContestants,
        employees: freshEmployees,
        auditLogs: [],
        config: APP_CONFIG,
        lastUpdated: Date.now()
      });
      console.log("✔ Đã reset dữ liệu trên Firebase Cloud Firestore!");
    } catch (err) {
      console.warn("Lỗi reset Firebase:", err);
    }
  }

  broadcastChange("DATA_RESET", {});
  return true;
}

// Bật / Tắt cổng bình chọn
export async function toggleVotingStatus(isOpen) {
  const config = getConfig();
  config.isOpen = isOpen;
  saveConfig(config);

  const fb = initFirebase();
  if (fb && fb.db) {
    try {
      const docRef = doc(fb.db, "events", "namhai_gala_2026");
      await setDoc(docRef, { config, lastUpdated: Date.now() }, { merge: true });
    } catch (e) {
      console.warn("Lỗi đồng bộ config lên Firebase", e);
    }
  }

  broadcastChange("CONFIG_CHANGE", config);
  return config;
}

// Mở khóa thiết bị hiện tại (Chỉ dùng khi Admin cho phép vote thử trên cùng máy)
export function unlockCurrentDevice() {
  localStorage.removeItem(STORAGE_KEYS.DEVICE_VOTED);
  localStorage.removeItem("namhai_my_vote");
  return true;
}
