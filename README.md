# Day 20 Lab — Retention, Engagement & Habit Loop

**Sản phẩm:** AI Travel Planner (tiếp nối prototype Ngày 18)
**Lát cắt:** AI lập & chỉnh lịch trình một chuyến đi → người dùng review → đặt dịch vụ.

> Bài lab Ngày 20 không làm sản phẩm mới. Nhóm giữ nguyên sản phẩm/scenario/persona Ngày 18 và bổ sung lớp **Retention / Engagement / Habit Loop** lên trên. Nộp **1 link duy nhất**.

## Nhóm thực hiện
| Họ tên | Mã HV | Phụ trách |
|---|---|---|
| Đỗ Việt Anh | 2A202601008 | Bài 1 + tích hợp, repo, demo |
| Nguyễn Viết Du | 2A202600800 | Bài 2 — Core Action / Active User / Retention Metric |
| Nguyễn Kim Hoàng | 2A202600987 | Bài 3 — Onboarding → First Core Action (+ sửa prototype) |
| Nguyễn Lê Văn | 2A202600569 | Bài 4 + 5 + 6 — Measurement / Hook / Tracking |

## Tiến độ
- [x] **Bài 1 — Customer Retention Canvas** → [`01-Customer-Retention-Canvas.md`](01-Customer-Retention-Canvas.md) ✅ *(đã kiểm chứng dữ liệu thật, frequency chốt 2–4 lần/năm)*
- [x] **Bài 2 — Core Action, Active User & Retention Metric** → [`02-Retention-Metric.md`](02-Retention-Metric.md) ✅ *(core action = chốt itinerary; metric per-trip + within-window + nurture)*
- [x] **Bài 3 — Onboarding Audit + Redesign + Before/After** → [`03-Onboarding-First-Core-Action.md`](03-Onboarding-First-Core-Action.md) ✅ *(audit Day18, friction audit, redesign flow, TTV ~90–120s)*
- [x] **Chỉnh sửa prototype** → trang **`08` trong [`index.html`](index.html)** ✅ *(flow redesign tương tác “After”: Welcome → Destination cards → Chips → Skeleton → Itinerary 5 điểm → **nút Chốt = core action** → Celebration; có Undo/Tạo lại/Đổi điểm đến + **event log trực tiếp** cho Bài 6. Giữ nguyên p00–p07 làm “Before”.)*
- [ ] Bài 4 — Measurement Ladder & North Star Metric *(Văn)*
- [ ] Bài 5 — Nature vs Nurture & Hook Model *(Văn)*
- [ ] Bài 6 — Metric Tracking Requirement *(Văn — đã có sẵn bảng event ở trang 08 + cuối Bài 2/3)*
- [ ] Demo path Day 20 ≤ 8 phút + bật GitHub Pages lấy link nộp *(Anh)*

## Quyết định nền tảng (cả nhóm bám theo)
**AI Travel Planner là sản phẩm tần suất THẤP** (core use case ~2–4 lần/năm). KHÔNG ép daily retention / habit hằng ngày. Đo theo planning window + lần lập chuyến tiếp theo, dùng Nurture để giữ hiện diện giữa hai chuyến. Chi tiết & nguồn: xem file Bài 1.
