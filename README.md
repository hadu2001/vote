# Ứng Dụng Bình Chọn "Cặp Đôi Ứng Xử Nam Hải Group 2026 ♕"
### Chào Mừng Sự Kiện Ngày Phụ Nữ Việt Nam 20/10

Ứng dụng web bình chọn trực tuyến cao cấp dành cho sự kiện 20/10 của **Nam Hải Group**, thay thế hoàn hảo cho Google Form với giao diện lộng lẫy, kết quả nhảy số theo thời gian thực (Realtime) trên màn hình máy chiếu sân khấu và cơ chế **chống mạo danh / chống gian lận đa lớp**.

---

## 🌟 Tính Năng Nổi Bật

1. **Giao Diện Chủ Đề 20/10 Sang Trọng**:
   - Banner Gala vương miện, hoa hồng, ánh sáng sân khấu chuyên nghiệp.
   - 5 thẻ cặp đôi ứng xử với ảnh chụp sắc nét, số báo danh (SBD 01 đến 05), tên thành viên, tiết mục biểu diễn và thông điệp.
   - Hiệu ứng pháo hoa chúc mừng (`canvas-confetti`) và xuất thẻ bình chọn điện tử sau khi hoàn tất.

2. **Cơ Chế Chống Gian Lận & Chống Mạo Danh (1 Người 1 Lượt Vote)**:
   - **Danh bạ nhân sự 2 cấp**: Chọn `Phòng ban` ➔ Chọn `Họ và tên` từ danh sách 100 cán bộ nhân viên công ty.
   - **Xác thực bảo mật cá nhân**: Bắt buộc nhập **4 số cuối SĐT** (hoặc mã NV). Người khác dù biết tên cũng không thể vote hộ.
   - **Khóa thiết bị (Device Lock)**: Mỗi điện thoại/máy tính sau khi vote thành công sẽ bị khóa, không thể dùng lại để vote tiếp cho người khác.
   - **Nhật ký kiểm toán (Audit Trail)**: Lưu lại đầy đủ: `Thời gian chính xác`, `Cử tri`, `Phòng ban`, `Cặp đôi bình chọn`, `Địa chỉ IP`, `Tên thiết bị (iPhone, Android, Windows...)`.

3. **Màn Hình Chiếu Sân Khấu (Live Leaderboard)**:
   - Thiết kế tối ưu cho máy chiếu hội trường / màn hình LED sân khấu.
   - Biểu đồ tỷ lệ % và số lượt bình chọn nhảy số trực tiếp theo thời gian thực (Realtime).
   - Tự động vinh danh **Top 1 Quán Quân 👑** và bảng xếp hạng Top 2, Top 3.
   - Hỗ trợ chế độ **Toàn màn hình (Fullscreen)** chỉ với 1 click.

4. **Bảng Điều Khiển Ban Tổ Chức (Admin Dashboard)**:
   - Bảo vệ bằng mã PIN quản trị (Mã: **`300803`**).
   - **Reset dữ liệu bình chọn**: Reset toàn bộ số vote test về 0 cho 5 cặp đôi & 100 nhân viên (Yêu cầu mật khẩu cấp 2: **`admin123`** để chống bấm nhầm).
   - **Bật / Tắt cổng bình chọn**: MC hô kết thúc giờ bình chọn là khóa cổng ngay lập tức.
   - **Theo dõi tiến độ**: Xem tỷ lệ tham gia theo từng phòng ban trong công ty.
   - **Kiểm tra danh sách 100 nhân sự**: Lọc xem ai đã vote lúc mấy giờ, ai chưa vote.
   - **Tra cứu Audit Log**: Minh bạch 100%, giải quyết nhanh chóng mọi nghi vấn mạo danh.
   - **Xuất file Excel (CSV)**: Tải toàn bộ kết quả kiểm phiếu về máy để báo cáo Ban Lãnh Đạo.
   - **Tích hợp Firebase Cloud Firestore**: Đồng bộ đa thiết bị tức thì (Realtime 0.1s).

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local)

```bash
# 1. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 2. Khởi động server phát triển
npm run dev
```

Truy cập trên trình duyệt: **`http://localhost:5173/`**

---

## 🌐 Hướng Dẫn Đẩy Lên GitHub & Deploy Miễn Phí (Có Link Tạo Mã QR)

### Bước 1: Đẩy code lên GitHub
1. Tạo một repository mới trên GitHub (ví dụ: `namhai-vote-2010`).
2. Chạy các lệnh sau trong terminal:
```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/namhai-vote-2010.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy miễn phí lấy link web (Chỉ mất 2 phút)

#### Cách A: Dùng Vercel (Cực nhanh & Đơn giản nhất)
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
2. Bấm **"Add New Project"** ➔ Chọn repository `namhai-vote-2010`.
3. Bấm **"Deploy"**. Sau 30 giây, bạn sẽ nhận được một đường link HTTPS (ví dụ: `https://namhai-vote-2010.vercel.app`).
4. Dùng link này để tạo mã QR dán lên bàn tiệc hoặc chiếu lên màn hình hội trường!

#### Cách B: Dùng Firebase Hosting
```bash
# Cài đặt Firebase CLI (nếu chưa có)
npm install -g firebase-tools

# Đăng nhập và khởi tạo
firebase login
firebase init hosting
# Chọn thư mục public: dist
# Cấu hình Single Page App: Yes

# Build và Deploy
npm run build
firebase deploy --only hosting
```

---

## ⚙️ Cấu Trúc Thư Mục Dự Án

```
d:/project/vote/
├── public/
│   ├── banner.jpg         # Banner Gala 20/10 Nam Hải Group
│   ├── couple1.jpg ~ 5.jpg# Hình ảnh 5 cặp đôi ứng xử
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Thanh điều hướng trên cùng & thanh trạng thái
│   │   ├── Header.jsx               # Banner & thể lệ bình chọn
│   │   ├── VoterIdentification.jsx  # Chọn Phòng ban -> Tên -> Mã xác thực 4 số
│   │   ├── CandidateCard.jsx        # Thẻ thông tin và nút vote từng cặp đôi
│   │   ├── ConfirmationModal.jsx    # Hộp thoại xác nhận trước khi gửi phiếu
│   │   ├── SuccessScreen.jsx        # Màn hình cảm ơn + pháo hoa confetti
│   │   ├── LiveLeaderboard.jsx      # Màn hình chiếu sân khấu Realtime
│   │   └── AdminDashboard.jsx       # Bảng điều khiển quản trị (PIN: 2010)
│   ├── data/
│   │   └── initialData.js           # Danh sách 100 cán bộ nhân viên & 5 cặp đôi
│   ├── services/
│   │   ├── firebase.js              # Khởi tạo kết nối Firebase Firestore
│   │   └── storageService.js        # Logic lưu trữ, audit trail, đồng bộ đa tab
│   ├── App.jsx                      # Component chính điều phối ứng dụng
│   └── index.css                    # Toàn bộ hệ thống giao diện 20/10 cao cấp
└── package.json
```
