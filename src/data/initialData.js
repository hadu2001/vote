// Danh mục 5 Cặp đôi dự thi từ Google Form Nam Hải Group
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

// Danh sách 100 nhân sự công ty Nam Hải Group (Mỗi người có ID và 4 số cuối SĐT làm mã bảo mật)
export const INITIAL_EMPLOYEES = [
  // Ban Lãnh Đạo (5)
  { id: "NV001", name: "Nguyễn Hải Nam", department: "Ban Lãnh Đạo", authCode: "6868", phone: "090***6868" },
  { id: "NV002", name: "Trần Thị Lan Hương", department: "Ban Lãnh Đạo", authCode: "8888", phone: "091***8888" },
  { id: "NV003", name: "Lê Văn Hùng", department: "Ban Lãnh Đạo", authCode: "9999", phone: "098***9999" },
  { id: "NV004", name: "Phạm Quốc Tuấn", department: "Ban Lãnh Đạo", authCode: "7777", phone: "097***7777" },
  { id: "NV005", name: "Vũ Thị Ngọc Trâm", department: "Ban Lãnh Đạo", authCode: "3636", phone: "093***3636" },

  // Phòng Hành Chính Nhân Sự (10)
  { id: "NV006", name: "Đỗ Thị Quỳnh Chi", department: "Phòng Hành Chính Nhân Sự", authCode: "1234", phone: "091***1234" },
  { id: "NV007", name: "Nguyễn Hoàng Anh", department: "Phòng Hành Chính Nhân Sự", authCode: "2345", phone: "098***2345" },
  { id: "NV008", name: "Bùi Tuyết Mai", department: "Phòng Hành Chính Nhân Sự", authCode: "3456", phone: "097***3456" },
  { id: "NV009", name: "Trương Minh Quang", department: "Phòng Hành Chính Nhân Sự", authCode: "4567", phone: "096***4567" },
  { id: "NV010", name: "Lê Thanh Hằng", department: "Phòng Hành Chính Nhân Sự", authCode: "5678", phone: "094***5678" },
  { id: "NV011", name: "Vũ Phương Linh", department: "Phòng Hành Chính Nhân Sự", authCode: "6789", phone: "093***6789" },
  { id: "NV012", name: "Phan Đình Dũng", department: "Phòng Hành Chính Nhân Sự", authCode: "7890", phone: "090***7890" },
  { id: "NV013", name: "Hoàng Minh Châu", department: "Phòng Hành Chính Nhân Sự", authCode: "8901", phone: "092***8901" },
  { id: "NV014", name: "Dương Thị Hồng", department: "Phòng Hành Chính Nhân Sự", authCode: "9012", phone: "095***9012" },
  { id: "NV015", name: "Tạ Văn Cường", department: "Phòng Hành Chính Nhân Sự", authCode: "1122", phone: "098***1122" },

  // Phòng Tài Chính Kế Toán (10)
  { id: "NV016", name: "Nguyễn Thị Phương Thảo", department: "Phòng Tài Chính Kế Toán", authCode: "2233", phone: "091***2233" },
  { id: "NV017", name: "Lê Thu Trang", department: "Phòng Tài Chính Kế Toán", authCode: "3344", phone: "097***3344" },
  { id: "NV018", name: "Trần Đăng Khoa", department: "Phòng Tài Chính Kế Toán", authCode: "4455", phone: "096***4455" },
  { id: "NV019", name: "Phạm Thúy Hạnh", department: "Phòng Tài Chính Kế Toán", authCode: "5566", phone: "094***5566" },
  { id: "NV020", name: "Đinh Thị Thảo", department: "Phòng Tài Chính Kế Toán", authCode: "6677", phone: "093***6677" },
  { id: "NV021", name: "Võ Văn Toàn", department: "Phòng Tài Chính Kế Toán", authCode: "7788", phone: "090***7788" },
  { id: "NV022", name: "Lý Kiều My", department: "Phòng Tài Chính Kế Toán", authCode: "8899", phone: "092***8899" },
  { id: "NV023", name: "Đoàn Minh Tâm", department: "Phòng Tài Chính Kế Toán", authCode: "9900", phone: "098***9900" },
  { id: "NV024", name: "Ngô Ánh Tuyết", department: "Phòng Tài Chính Kế Toán", authCode: "1357", phone: "091***1357" },
  { id: "NV025", name: "Hà Bích Ngọc", department: "Phòng Tài Chính Kế Toán", authCode: "2468", phone: "097***2468" },

  // Phòng Kinh Doanh & Dự Án (18)
  { id: "NV026", name: "Trần Văn Nam", department: "Phòng Kinh Doanh & Dự Án", authCode: "3579", phone: "096***3579" },
  { id: "NV027", name: "Nguyễn Tuấn Dũng", department: "Phòng Kinh Doanh & Dự Án", authCode: "4680", phone: "094***4680" },
  { id: "NV028", name: "Lê Hoài Thương", department: "Phòng Kinh Doanh & Dự Án", authCode: "5791", phone: "093***5791" },
  { id: "NV029", name: "Phạm Thị Thùy Dung", department: "Phòng Kinh Doanh & Dự Án", authCode: "6802", phone: "090***6802" },
  { id: "NV030", name: "Hoàng Anh Tuấn", department: "Phòng Kinh Doanh & Dự Án", authCode: "7913", phone: "092***7913" },
  { id: "NV031", name: "Vũ Tiến Thành", department: "Phòng Kinh Doanh & Dự Án", authCode: "8024", phone: "098***8024" },
  { id: "NV032", name: "Bùi Thanh Huyền", department: "Phòng Kinh Doanh & Dự Án", authCode: "9135", phone: "091***9135" },
  { id: "NV033", name: "Đặng Đình Phúc", department: "Phòng Kinh Doanh & Dự Án", authCode: "0246", phone: "097***0246" },
  { id: "NV034", name: "Mai Thu Uyên", department: "Phòng Kinh Doanh & Dự Án", authCode: "1470", phone: "096***1470" },
  { id: "NV035", name: "Nguyễn Đức Trọng", department: "Phòng Kinh Doanh & Dự Án", authCode: "2581", phone: "094***2581" },
  { id: "NV036", name: "Lê Văn Thịnh", department: "Phòng Kinh Doanh & Dự Án", authCode: "3692", phone: "093***3692" },
  { id: "NV037", name: "Phan Minh Khang", department: "Phòng Kinh Doanh & Dự Án", authCode: "4703", phone: "090***4703" },
  { id: "NV038", name: "Tô Mỹ Hạnh", department: "Phòng Kinh Doanh & Dự Án", authCode: "5814", phone: "092***5814" },
  { id: "NV039", name: "Trịnh Thùy Linh", department: "Phòng Kinh Doanh & Dự Án", authCode: "6925", phone: "098***6925" },
  { id: "NV040", name: "Cao Xuân Bách", department: "Phòng Kinh Doanh & Dự Án", authCode: "7036", phone: "091***7036" },
  { id: "NV041", name: "Chu Ngọc Lan", department: "Phòng Kinh Doanh & Dự Án", authCode: "8147", phone: "097***8147" },
  { id: "NV042", name: "Lương Đức Hải", department: "Phòng Kinh Doanh & Dự Án", authCode: "9258", phone: "096***9258" },
  { id: "NV043", name: "Tăng Kim Oanh", department: "Phòng Kinh Doanh & Dự Án", authCode: "0369", phone: "094***0369" },

  // Phòng Marketing & Truyền Thông (10)
  { id: "NV044", name: "Nguyễn Duy Hưng", department: "Phòng Marketing & Truyền Thông", authCode: "1593", phone: "093***1593" },
  { id: "NV045", name: "Lê Thu Hà", department: "Phòng Marketing & Truyền Thông", authCode: "2604", phone: "090***2604" },
  { id: "NV046", name: "Trần Bảo Ngọc", department: "Phòng Marketing & Truyền Thông", authCode: "3715", phone: "092***3715" },
  { id: "NV047", name: "Phạm Quang Minh", department: "Phòng Marketing & Truyền Thông", authCode: "4826", phone: "098***4826" },
  { id: "NV048", name: "Võ Thị Thanh Thảo", department: "Phòng Marketing & Truyền Thông", authCode: "5937", phone: "091***5937" },
  { id: "NV049", name: "Đỗ Khánh Linh", department: "Phòng Marketing & Truyền Thông", authCode: "6048", phone: "097***6048" },
  { id: "NV050", name: "Hoàng Gia Bảo", department: "Phòng Marketing & Truyền Thông", authCode: "7159", phone: "096***7159" },
  { id: "NV051", name: "Bùi Thị Diệu", department: "Phòng Marketing & Truyền Thông", authCode: "8260", phone: "094***8260" },
  { id: "NV052", name: "Nguyễn Yến Nhi", department: "Phòng Marketing & Truyền Thông", authCode: "9371", phone: "093***9371" },
  { id: "NV053", name: "Vũ Hải Đăng", department: "Phòng Marketing & Truyền Thông", authCode: "0482", phone: "090***0482" },

  // Phòng Kỹ Thuật & Công Nghệ (12)
  { id: "NV054", name: "Nguyễn Văn Đạt", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "1111", phone: "092***1111" },
  { id: "NV055", name: "Trần Đình Trọng", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "2222", phone: "098***2222" },
  { id: "NV056", name: "Lê Thế Anh", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "3333", phone: "091***3333" },
  { id: "NV057", name: "Phạm Hữu Thắng", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "4444", phone: "097***4444" },
  { id: "NV058", name: "Hoàng Trung Kiên", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "5555", phone: "096***5555" },
  { id: "NV059", name: "Đặng Quốc Việt", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "6666", phone: "094***6666" },
  { id: "NV060", name: "Bùi Minh Hiếu", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "7777", phone: "093***7777" },
  { id: "NV061", name: "Vũ Thành Công", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "8888", phone: "090***8888" },
  { id: "NV062", name: "Đoàn Nhật Quang", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "9999", phone: "092***9999" },
  { id: "NV063", name: "Nguyễn Tiến Long", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "1212", phone: "098***1212" },
  { id: "NV064", name: "Lê Xuân Huy", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "2323", phone: "091***2323" },
  { id: "NV065", name: "Trần Anh Vũ", department: "Phòng Kỹ Thuật & Công Nghệ", authCode: "3434", phone: "097***3434" },

  // Khối Sản Xuất & Vận Hành (18)
  { id: "NV066", name: "Phan Văn Hậu", department: "Khối Sản Xuất & Vận Hành", authCode: "4545", phone: "096***4545" },
  { id: "NV067", name: "Nguyễn Đình Luật", department: "Khối Sản Xuất & Vận Hành", authCode: "5656", phone: "094***5656" },
  { id: "NV068", name: "Trần Văn Quyết", department: "Khối Sản Xuất & Vận Hành", authCode: "6767", phone: "093***6767" },
  { id: "NV069", name: "Lê Hữu Nghĩa", department: "Khối Sản Xuất & Vận Hành", authCode: "7878", phone: "090***7878" },
  { id: "NV070", name: "Vũ Văn Lực", department: "Khối Sản Xuất & Vận Hành", authCode: "8989", phone: "092***8989" },
  { id: "NV071", name: "Đỗ Xuân Trường", department: "Khối Sản Xuất & Vận Hành", authCode: "9090", phone: "098***9090" },
  { id: "NV072", name: "Hoàng Văn Thái", department: "Khối Sản Xuất & Vận Hành", authCode: "0101", phone: "091***0101" },
  { id: "NV073", name: "Bùi Văn Doanh", department: "Khối Sản Xuất & Vận Hành", authCode: "1313", phone: "097***1313" },
  { id: "NV074", name: "Nguyễn Thị Lụa", department: "Khối Sản Xuất & Vận Hành", authCode: "2424", phone: "096***2424" },
  { id: "NV075", name: "Lê Thị Thắm", department: "Khối Sản Xuất & Vận Hành", authCode: "3535", phone: "094***3535" },
  { id: "NV076", name: "Trần Thu Hoài", department: "Khối Sản Xuất & Vận Hành", authCode: "4646", phone: "093***4646" },
  { id: "NV077", name: "Phạm Văn Sơn", department: "Khối Sản Xuất & Vận Hành", authCode: "5757", phone: "090***5757" },
  { id: "NV078", name: "Ngô Quang Vinh", department: "Khối Sản Xuất & Vận Hành", authCode: "6868", phone: "092***6868" },
  { id: "NV079", name: "Đặng Thị Thêu", department: "Khối Sản Xuất & Vận Hành", authCode: "7979", phone: "098***7979" },
  { id: "NV080", name: "Hà Văn Thắng", department: "Khối Sản Xuất & Vận Hành", authCode: "8080", phone: "091***8080" },
  { id: "NV081", name: "Lý Văn Hòa", department: "Khối Sản Xuất & Vận Hành", authCode: "9191", phone: "097***9191" },
  { id: "NV082", name: "Dương Đình Quân", department: "Khối Sản Xuất & Vận Hành", authCode: "0202", phone: "096***0202" },
  { id: "NV083", name: "Chu Văn Điệp", department: "Khối Sản Xuất & Vận Hành", authCode: "1414", phone: "094***1414" },

  // Phòng Quản Lý Chất Lượng QA/QC (8)
  { id: "NV084", name: "Lê Thị Cẩm Vân", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "2525", phone: "093***2525" },
  { id: "NV085", name: "Nguyễn Đức Anh", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "3636", phone: "090***3636" },
  { id: "NV086", name: "Trần Hải Yến", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "4747", phone: "092***4747" },
  { id: "NV087", name: "Phạm Thanh Tùng", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "5858", phone: "098***5858" },
  { id: "NV088", name: "Vũ Thị Nguyệt", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "6969", phone: "091***6969" },
  { id: "NV089", name: "Đỗ Gia Huy", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "7070", phone: "097***7070" },
  { id: "NV090", name: "Bùi Thị Minh Nguyệt", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "8181", phone: "096***8181" },
  { id: "NV091", name: "Hoàng Văn Tuấn", department: "Phòng Quản Lý Chất Lượng (QA/QC)", authCode: "9292", phone: "094***9292" },

  // Phòng Logistics & Kho Vận (9)
  { id: "NV092", name: "Trần Quốc Bảo", department: "Phòng Logistics & Kho Vận", authCode: "0303", phone: "093***0303" },
  { id: "NV093", name: "Nguyễn Văn Chiến", department: "Phòng Logistics & Kho Vận", authCode: "1515", phone: "090***1515" },
  { id: "NV094", name: "Lê Đức Thọ", department: "Phòng Logistics & Kho Vận", authCode: "2626", phone: "092***2626" },
  { id: "NV095", name: "Phan Văn Bình", department: "Phòng Logistics & Kho Vận", authCode: "3737", phone: "098***3737" },
  { id: "NV096", name: "Võ Thị Thu Trang", department: "Phòng Logistics & Kho Vận", authCode: "4848", phone: "091***4848" },
  { id: "NV097", name: "Đinh Văn Long", department: "Phòng Logistics & Kho Vận", authCode: "5959", phone: "097***5959" },
  { id: "NV098", name: "Mai Văn Hưởng", department: "Phòng Logistics & Kho Vận", authCode: "6060", phone: "096***6060" },
  { id: "NV099", name: "Nguyễn Thị Lệ", department: "Phòng Logistics & Kho Vận", authCode: "7171", phone: "094***7171" },
  { id: "NV100", name: "Trương Văn Tài", department: "Phòng Logistics & Kho Vận", authCode: "8282", phone: "093***8282" }
];

export const APP_CONFIG = {
  eventTitle: "CẶP ĐÔI ỨNG XỬ NAM HẢI GROUP 2026 ♕",
  eventSubtitle: "Chào Mừng Ngày Phụ Nữ Việt Nam 20/10",
  companyName: "NAM HẢI GROUP",
  formQuestion: "Theo Anh/Chị, cặp đôi có phần thể hiện xuất sắc nhất chính là:",
  defaultAdminPin: "2010",
  isOpen: true
};
