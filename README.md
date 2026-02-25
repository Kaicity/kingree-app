## 📌 Giới thiệu

Đây là một ứng dụng mô phỏng hệ thống matching đơn giản:

- Người dùng có thể **Like** nhau
- Khi cả hai cùng Like → tạo **Match**
- Hai người chọn **thời gian rảnh**
- Hệ thống tự động tìm **slot trùng nhau đầu tiên**
- Nếu tìm được → hiển thị lịch hẹn

---

# 🏗️ Cách tôi tổ chức hệ thống

## 1️⃣ Kiến trúc tổng thể

Frontend và Backend được tách biệt:

Frontend:

- Next.js
- HeroUI
- React Hook Form
- Zod

Backend:

- Node.js
- Express
- MongoDB

---

## 2️⃣ Cấu trúc Backend

Tôi tổ chức theo hướng clean structure:
