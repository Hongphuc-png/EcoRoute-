# 🌱 EcoRoute Opti – Nền Tảng Tối Ưu Hóa Lộ Trình & Điều Phối Rác Thải Đô Thị

> **Thực nghiệm tại Phường Hòa Cường, Quận Hải Châu, TP. Đà Nẵng**  
> Kết hợp mô hình định tuyến 2 tầng (**2E-VRP** – Two-Echelon Vehicle Routing Problem with Synchronization) và thuật toán **Google OR-Tools CP-SAT Solver** để đồng bộ giờ xe cơ giới với giờ rác sẵn sàng tại các điểm chuyển giao.

---

## 🌟 1. Điểm Nổi Bật & Hiệu Quả Tối Ưu

- **Thời gian chờ rác ngoài đường:** Giảm từ **77,6 phút** xuống **7,3 phút** (**−90,6%**).
- **Tỷ lệ kiệt/hẻm đạt chuẩn (≤ 30 phút):** Tăng từ **53,0%** (187 kiệt vi phạm) lên **100% tuyệt đối**.
- **Điểm ùn ứ rác (> 5 thùng 660L):** Giảm từ **4 điểm** xuống **0 điểm**.
- **Tổng thời gian rác phơi ngoài phố:** Cắt giảm **468 giờ ô nhiễm/ngày**.
- **Tối ưu tài nguyên:** Giữ nguyên đội 7 xe cơ giới + 2 xe nâng gắp 3 tấn, chỉ thêm 1 chuyến ngắn (+1% giờ xe), giữ nguyên thói quen đổ rác của người dân.

---

## 🏗️ 2. Kiến Trúc & Tech Stack

### Backend
- **Ngôn ngữ & Framework:** Python 3.12+ / FastAPI (REST API v1 + WebSockets).
- **Thuật toán & Tối ưu:** Google OR-Tools (CP-SAT Solver), Dynamic Programming, Pandas, OpenPyXL.
- **Tài liệu API:** Swagger UI tự động tại `/docs` và Redoc tại `/redoc`.
- **Cấu trúc thư mục:** Tách biệt hoàn toàn `routes`, `services`, `models`, `config`.

### Frontend
- **Framework & Công nghệ:** React 19 + Vite 6 + Tailwind CSS v4.
- **Bản đồ số:** Leaflet & React-Leaflet (vẽ polyline đa sắc theo xe, marker cảnh báo nháy đỏ, popup chi tiết).
- **Icons & UI:** Lucide React, Glassmorphism, animations nháy cảnh báo.
- **Quản lý kết nối & Trạng thái:** Axios service layer (`services/api`), WebSockets nhận thông báo đẩy thời gian thực, custom Toast.
- **Hai phân hệ người dùng:**
  1. **Admin Portal:** Dashboard điều hành, bộ lọc đa năng (xe, ca, trạm, kiệt/hẻm), bản đồ lộ trình, kéo thả đổi thứ tự/chuyển xe (Drag & Drop), lập kế hoạch tự động (OR-Tools), so sánh KPI, xuất Excel/PDF.
  2. **Driver App:** Giao diện tối ưu Mobile, nút bấm ngón tay cái cỡ lớn (*"Xác nhận ghé điểm"*, *"Xác nhận hoàn thành chuyến"*), nhận thông báo đẩy tức thì từ điều phối viên.

---

## 📂 3. Cấu Trúc Thư Mục

```text
Final EcoRoute/
├── backend/                        # Máy chủ Python FastAPI
│   ├── config.py                   # Cấu hình môi trường & đường dẫn
│   ├── main.py                     # Entry point FastAPI, CORS & WebSockets
│   ├── models/
│   │   └── schemas.py              # Pydantic schemas (APIResponse, Trip, Stop, Alert, v.v.)
│   ├── routes/
│   │   ├── auth.py                 # Đăng nhập & phân quyền (/api/v1/auth)
│   │   ├── vehicles.py             # Quản lý đội xe (/api/v1/vehicles)
│   │   ├── plan.py                 # Tối ưu & kế hoạch lộ trình (/api/v1/plan)
│   │   ├── alerts.py               # Cảnh báo quá tải/chờ lâu (/api/v1/alerts)
│   │   ├── driver.py               # Tác vụ tài xế (/api/v1/driver)
│   │   └── notifications.py        # Lịch sử thông báo (/api/v1/notifications)
│   └── services/
│       ├── data_service.py         # Nạp dữ liệu Excel/Pickle & tính tọa độ Đà Nẵng
│       ├── optimizer_service.py    # VRP Solver (Google OR-Tools & đồng bộ 2 tầng)
│       ├── export_service.py       # Xuất báo cáo Excel (.xlsx) & PDF
│       └── websocket_service.py    # Quản lý kết nối WebSocket thời gian thực
│
├── frontend/                       # Giao diện người dùng React + Vite + Tailwind
│   ├── src/
│   │   ├── components/             # Navbar, RouteMap, ScheduleDragDrop, ComparisonView, v.v.
│   │   ├── hooks/                  # useWebSocket, useToast
│   │   ├── services/api/           # apiClient, planService, driverService, v.v.
│   │   ├── App.jsx                 # Điều hướng chính & chuyển đổi phân hệ
│   │   └── index.css               # Thiết kế Tailwind, Leaflet & CSS animations
│   ├── index.html                  # HTML chuẩn SEO tiếng Việt & Inter font
│   ├── package.json
│   └── vite.config.js              # Cấu hình proxy tự động sang backend
│
├── EcoRoute_Du_lieu_dau_vao_mo_hinh.xlsx  # Dữ liệu 451 kiệt/hẻm, 118 thùng, chuyến xe
├── EcoRoute_ma_nguon/              # Mã nguồn & mô hình trung gian v3 (.pkl)
├── package.json                    # Root package.json điều khiển chạy 1 lệnh
├── start.js                        # Node runner đồng thời khởi động cả hai
├── run.py                          # Python runner khởi động song song
├── .env                            # Biến môi trường hệ thống
├── .env.example                    # File mẫu cấu hình
└── README.md                       # Hướng dẫn chi tiết
```

---

## ⚡ 4. Hướng Dẫn Cài Đặt & Khởi Chạy

### Bước 1: Cài đặt thư viện Backend (Python)
```bash
pip install fastapi uvicorn pydantic python-multipart websockets reportlab pandas openpyxl ortools
```

### Bước 2: Cài đặt thư viện Frontend (Node.js) & Build
```bash
cd frontend
npm install
npm run build
cd ..
```

### Bước 3: Khởi chạy toàn bộ hệ thống bằng 1 lệnh duy nhất (Một localhost chung)

```bash
# Cách 1: Sử dụng npm
npm run dev

# Cách 2: Sử dụng Python
python run.py
```

Sau khi chạy lệnh, màn hình console sẽ hiển thị:
```text
======================================================
🌱 KHỞI ĐỘNG HỆ THỐNG GỘP CHUNG - ECOROUTE OPTI
======================================================

🚀 Hệ thống đã được gộp chung vào MỘT LOCALHOST DUY NHẤT:
👉 Địa chỉ truy cập chính (Web App): http://localhost:8000
👉 Tài liệu API (Swagger UI):        http://localhost:8000/docs
👉 API Endpoints REST:               http://localhost:8000/api/v1
```

---

## 🌐 5. Địa Chỉ Cổng (Ports) & Link Truy Cập Gộp Chung

Toàn bộ hệ thống (Giao diện Admin Portal, Giao diện Driver App, REST API và Swagger UI) được phục vụ **trên cùng một địa chỉ localhost duy nhất**:

| Phân hệ | Địa chỉ truy cập | Ghi chú |
| :--- | :--- | :--- |
| **Giao diện Chung (Web App)** | **`http://localhost:8000`** | Chứa đầy đủ **Admin Portal** và **Driver App (Tài xế)** |
| **Tài liệu API (Swagger UI)**| **`http://localhost:8000/docs`** | Kiểm thử trực tiếp toàn bộ REST API |
| **API Endpoints REST** | **`http://localhost:8000/api/v1`** | Chuẩn RESTful JSON `{ success, data, message }` |
| **WebSocket Đẩy thời gian thực** | **`ws://localhost:8000/ws/notifications`** | Đẩy thông báo tức thì đến tài xế khi Admin sửa lịch |

---

## 🔑 6. Tài Khoản Đăng Nhập Thử Nghiệm

Hệ thống có sẵn tính năng **"Đăng nhập nhanh 1 Click"** trên giao diện, hoặc bạn có thể nhập thông tin thủ công:

| Vai trò | Tên đăng nhập / Email | Mật khẩu | Chức năng & Phạm vi |
| :--- | :--- | :--- | :--- |
| **Quản Trị Viên (Admin)** | `admin@ecoroute.vn` hoặc `admin` | `admin123` | Toàn quyền xem bản đồ, lọc dữ liệu, kéo thả điểm dừng, chạy tối ưu hóa OR-Tools, xem so sánh KPI, xuất file Excel/PDF |
| **Tài Xế Xe 1.5 Tấn (X01)** | `driver@ecoroute.vn` hoặc `driver` | `driver123` | Giao diện mobile-first, danh sách chuyến của xe X01, nút to ghé điểm, xác nhận hoàn thành |
| **Tài Xế Xe 350KG (X02)** | `driver2` | `driver123` | Xe nhỏ chuyên thu các kiệt/hẻm hẹp, theo dõi lộ trình riêng |
| **Tài Xế Xe Nâng 3 Tấn (HC3)** | `driver3` | `driver123` | Xe nâng thùng chuyên trách tại Trạm Duy Tân & các trạm chính |

---

## 📋 7. Báo Cáo Chi Tiết: Tính Năng Đã Làm & Dữ Liệu Thực

### Các tính năng đã hoàn thiện thực tế (Production-ready):
1. ✅ **Kiến trúc tách bạch:** Backend FastAPI riêng biệt, Frontend React riêng biệt, gọi API qua `services/api`.
2. ✅ **Chuẩn hóa REST API:** Mọi API đều trả về dạng `{ success, data, message }`, có try-catch toàn diện và mã lỗi HTTP chuẩn.
3. ✅ **Bản đồ tương tác Leaflet:** Vẽ đường polyline theo từng xe, marker màu sắc riêng, popup đầy đủ thông số giờ rác về, giờ xe ghé, thời gian chờ.
4. ✅ **Cảnh báo nháy đỏ tự động:** Các điểm chuyển giao có rác chờ > 30 phút hoặc số thùng > 5 tự động nháy đỏ/cam trên bản đồ và hiển thị tại trung tâm cảnh báo.
5. ✅ **Kéo thả điều chỉnh kế hoạch (Drag & Drop):** Admin có thể kéo thả để thay đổi thứ tự đón hoặc điều chuyển điểm sang xe khác.
6. ✅ **Đồng bộ thời gian thực (WebSockets):** Khi Admin điều chuyển điểm hoặc chạy tối ưu, ứng dụng tài xế nhận ngay thông báo đẩy trên điện thoại.
7. ✅ **Ứng dụng Tài xế (Mobile-First):** Thiết kế nút bấm một tay cực lớn (*"XÁC NHẬN GHÉ ĐIỂM"*, *"XÁC NHẬN HOÀN THÀNH CHUYẾN"*), cập nhật số thùng thực tế.
8. ✅ **Thuật toán tối ưu hóa VRP 2 tầng (OR-Tools):** Modal chạy tối ưu có thanh tiến trình 5 bước thực nghiệm, tính toán lại thời gian chờ và cập nhật kế hoạch.
9. ✅ **Dashboard đối chiếu KPI:** So sánh trực quan Lịch gốc vs Lịch mới v3 (77.6p → 7.3p; 53% → 100%; 4 điểm ùn ứ → 0).
10. ✅ **Xuất báo cáo đa định dạng:** Xuất kế hoạch ra **Excel (.xlsx)** chuyên nghiệp và **PDF** báo cáo điều hành.
11. ✅ **Danh mục 451 kiệt/hẻm:** Bảng tìm kiếm và tra cứu nhanh toàn bộ 451 kiệt/hẻm của phường Hòa Cường từ file Excel gốc.
12. ✅ **Chạy 1 lệnh duy nhất:** `npm run dev` hoặc `python run.py` tự động kích hoạt cả hai dịch vụ.

### Các thành phần mô phỏng (Mock):
- **Tọa độ GPS kiệt nhỏ:** Các trạm chuyển giao chính (Duy Tân, 357 Lê Thanh Nghị, 30/4, 40 Nguyễn Hữu Thọ, Trần Văn Trứ, Tiểu La) và các kiệt lớn (K59 Núi Thành, Trưng Nữ Vương, Phan Châu Trinh...) sử dụng tọa độ thực tế tại Đà Nẵng; các kiệt nhánh con được tính toán vị trí bám sát theo tuyến đường thực nghiệm.
- **Tích hợp phần cứng GPS OBD:** Giờ xe đến và rời trạm hiện được mô phỏng qua thuật toán ước lượng thời gian di chuyển và nút xác nhận ghé điểm của tài xế.
