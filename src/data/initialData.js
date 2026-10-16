// Danh mục 5 Cặp đôi dự thi (Dữ liệu gốc được quản lý trên Firebase Cloud Firestore)
export const INITIAL_CONTESTANTS = [
  {
    id: "couple-1",
    sbd: "01",
    name: "Cặp đôi số 1",
    members: "Nguyễn Văn An & Lê Thị Mai",
    department: "Phòng Kinh Doanh & Phòng Nhân Sự",
    performance: "Bức Họa Đồng Quê & Tài Năng Ứng Xử",
    slogan: "Đoàn kết là sức mạnh - Tự tin tỏa sáng",
    image: "/couple1.jpg",
    votes: 0
  },
  {
    id: "couple-2",
    sbd: "02",
    name: "Cặp đôi số 2",
    members: "Trần Quốc Huy & Hoàng Thu Thảo",
    department: "Phòng Kỹ Thuật & Phòng Kế Toán",
    performance: "Giai Điệu Tự Hào & Tiết Mục Song Ca",
    slogan: "Nhiệt huyết tuổi trẻ - Cống hiến hết mình",
    image: "/couple2.jpg",
    votes: 0
  },
  {
    id: "couple-3",
    sbd: "03",
    name: "Cặp đôi số 3",
    members: "Phạm Minh Đức & Đỗ Mỹ Linh",
    department: "Phòng Marketing & Ban Dự Án",
    performance: "Thanh Xuân Rực Rỡ & Kịch Tình Huống",
    slogan: "Chạm tới trái tim - Lan tỏa yêu thương",
    image: "/couple3.jpg",
    votes: 0
  },
  {
    id: "couple-4",
    sbd: "04",
    name: "Cặp đôi số 4",
    members: "Vũ Hoàng Long & Nguyễn Bích Ngọc",
    department: "Nhà Máy Sản Xuất & Ban QA/QC",
    performance: "Hương Sắc Việt Nam & Múa Đương Đại",
    slogan: "Đồng hành gắn kết - Vững bước tương lai",
    image: "/couple4.jpg",
    votes: 0
  },
  {
    id: "couple-5",
    sbd: "05",
    name: "Cặp đôi số 5",
    members: "Đặng Tuấn Kiệt & Bùi Phương Uyên",
    department: "Phòng Logistics & Phòng Chăm Sóc Khách Hàng",
    performance: "Khát Vọng Nam Hải & Nhảy Hiện Đại",
    slogan: "Vươn tầm cao mới - Khẳng định bản lĩnh",
    image: "/couple5.jpg",
    votes: 0
  }
];

// Danh sách phòng ban công ty
export const DEPARTMENTS = [
  "Ban Lãnh Đạo",
  "Phòng Hành Chính Nhân Sự",
  "Phòng Tài Chính Kế Toán",
  "Phòng Kinh Doanh & Dự Án",
  "Phòng Marketing & Truyền Thông",
  "Phòng Kỹ Thuật & Công Nghệ",
  "Khối Sản Xuất & Vận Hành",
  "Phòng Quản Lý Chất Lượng (QA/QC)",
  "Phòng Logistics & Kho Vận"
];

// Dữ liệu nhân sự đã được di chuyển toàn bộ lên Firebase Cloud Firestore (không lưu cứng trong code)
export const INITIAL_EMPLOYEES = [];

export const APP_CONFIG = {
  eventTitle: "CẶP ĐÔI ỨNG XỬ NAM HẢI GROUP 2026 ♕",
  eventSubtitle: "Chào Mừng Ngày Phụ Nữ Việt Nam 20/10",
  companyName: "NAM HẢI GROUP",
  formQuestion: "Theo Anh/Chị, cặp đôi có phần thể hiện xuất sắc nhất chính là:",
  defaultAdminPin: "300803",
  isOpen: true
};
