# Bài 6 — Metric Tracking Requirement (v1.0)

> **Người phụ trách:** Nguyễn Lê Văn · 2A202600569
> **Sản phẩm:** AI Travel Planner (giữ nguyên từ Ngày 18)
> **Đầu vào:**
> - [[02-Retention-Metric]] — Danh sách event cơ bản cho M1, M2, M3.
> - [[03-Onboarding-First-Core-Action]] — Danh sách 13 event chi tiết trên flow redesign.
> - [[04-Measurement-Ladder+North-Star-Metric]] — Các event cần thiết để đo NSM và Input Metrics.
> - [[05-Nature-Nurture-Hook]] — Các event cần thiết để đo hiệu quả Nurture Hook.
> - **Prototype Day 20** (`index.html` trang 08) — Đã có sẵn event log để tham chiếu.
> **Bàn giao cho:** Developer để implement tracking.

**Quy ước:**
- Các thuộc tính (properties) được liệt kê là **tối thiểu**. Developer có thể bổ sung các thuộc tính chung như `app_version`, `device_type`, `os_version` cho tất cả các event.
- `user_id` là định danh duy nhất cho mỗi người dùng, được gắn vào tất cả các event sau khi người dùng đăng nhập hoặc từ lần sử dụng đầu tiên (anonymous ID).

---

## 0. Mục tiêu Bài 6

Tạo một tài liệu yêu cầu kỹ thuật (technical requirement) rõ ràng cho việc theo dõi (tracking) các sự kiện (events) của người dùng. Tài liệu này phải đảm bảo thu thập đủ dữ liệu để tính toán tất cả các chỉ số đã định nghĩa trong **Measurement Ladder (Bài 4)**, bao gồm North Star Metric, Activation Rate, Retention (M1, M2, M3), và TTV.

Đây là cầu nối cuối cùng giữa Product (các bài 1-5) và Engineering (implement tracking).

---

## 1. Bảng Event Tracking Chi Tiết

Bảng này tổng hợp và chi tiết hóa tất cả các event đã được đề cập trong các bài trước, đặc biệt là từ flow redesign của **Bài 3**.

### 1.1. Onboarding & Activation Funnel (chủ yếu từ Bài 3)

| Tên Event | Bắn khi... | Thuộc tính (Properties) | Phục vụ Metric / Phân tích |
| :--- | :--- | :--- | :--- |
| `onboarding_start` | User mở app lần đầu tiên. | `user_id` (anonymous) | Điểm bắt đầu của Activation Funnel. Dùng để tính TTV. |
| `onboarding_cta_click` | User bấm nút "Bắt đầu lên kế hoạch". | `user_id` | Tỷ lệ chuyển đổi từ màn hình welcome sang bước chọn điểm đến. |
| `destination_selected` | User chọn một thẻ điểm đến hoặc gõ và enter. | `user_id`, `destination_name`, `selection_method` ('card' hoặc 'search') | Tỷ lệ chuyển đổi sang bước chọn bối cảnh. Phân tích điểm đến phổ biến. |
| `context_chips_selected` | User hoàn tất chọn các chip (ngày, bạn đồng hành, ngân sách) và bấm "Tạo lịch trình". | `user_id`, `destination_name`, `days_chip`, `companion_chip`, `budget_chip` | Tỷ lệ chuyển đổi sang bước chờ AI. Phân tích các lựa chọn phổ biến. |
| `itinerary_created` | AI tạo xong bản nháp lịch trình đầu tiên và hiển thị cho user. | `user_id`, `trip_id` (sinh mới), `destination_name`, `processing_time_ms`, `initial_poi_count` | Điểm kết thúc của TTV (phần tạo). Đo lường hiệu năng AI. |
| **`itinerary_confirmed`** | **User bấm nút "Chốt lịch trình này".** | `user_id`, `trip_id`, `time_to_confirm_seconds` (từ `onboarding_start`), `is_first_trip` (boolean), `poi_count`, `edit_count` (số lần `itinerary_edited` trước khi chốt) | **★ CORE ACTION**. Đo **North Star Metric**, **Activation Rate**, **M1 (Per-trip Retention)**, **M2 (Within-window Engagement)**. |

### 1.2. Engagement & Retention (Core Loop & Nurture Loop)

| Tên Event | Bắn khi... | Thuộc tính (Properties) | Phục vụ Metric / Phân tích |
| :--- | :--- | :--- | :--- |
| `itinerary_viewed` | User mở xem một lịch trình đã được chốt. | `user_id`, `trip_id` | Đo **M2 (Within-window Engagement)**. |
| `itinerary_edited` | User thực hiện một thay đổi trên lịch trình (xóa, thêm, đổi thứ tự). | `user_id`, `trip_id`, `edit_type` ('delete_poi', 'add_poi', 'reorder_poi'), `poi_name` | Điều kiện để tính "active" trong M2. Phân tích chất lượng lịch trình AI (nếu user sửa nhiều). |
| `destination_saved` | User lưu một điểm đến vào "wishlist". | `user_id`, `destination_name`, `source` ('destination_card', 'blog_post', 'search_result') | Đo **M3 (Nurture Engagement)**. Đầu vào cho Nurture Hook. |
| `price_watch_added` | User bật theo dõi giá cho một điểm đến (post-action). | `user_id`, `destination_name`, `watch_type` ('flight', 'hotel', 'combo') | Đo **M3 (Nurture Engagement)**. Đầu vào cho Nurture Hook (Investment). |
| `notification_opened` | User bấm vào một thông báo đẩy (push notification) từ app. | `user_id`, `notification_type` ('price_alert', 'new_suggestion', 'reminder'), `campaign_id` | Đo hiệu quả của External Trigger trong Nurture Hook. |
| `share_initiated` | User chia sẻ lịch trình (post-action). | `user_id`, `trip_id`, `share_channel` ('zalo', 'messenger', 'copy_link') | Đo lường mức độ lan truyền (virality) và engagement. |
| `calendar_permission_granted` | User cấp quyền Calendar (post-action). | `user_id`, `trip_id` | Đo lường post-activation engagement. |

### 1.3. Recovery & UX Quality (từ Bài 3)

| Tên Event | Bắn khi... | Thuộc tính (Properties) | Phục vụ Metric / Phân tích |
| :--- | :--- | :--- | :--- |
| `itinerary_regenerated` | User bấm nút "Tạo lại lịch trình khác". | `user_id`, `trip_id`, `reason` (nếu có thể hỏi) | Phân tích các điểm AI làm chưa tốt, cần cải thiện. |
| `destination_changed` | User bấm nút "Đổi điểm đến" sau khi đã xem lịch trình. | `user_id`, `trip_id`, `from_destination`, `to_destination` | Phân tích friction trong flow, có thể user chọn nhầm. |
| `undo_action` | User bấm nút "Hoàn tác" sau một hành động (ví dụ: xóa điểm đến). | `user_id`, `trip_id`, `action_undone` ('delete_poi') | Đo lường chất lượng UX của các tính năng recovery. |
| `feedback_submitted` | User gửi một phản hồi (ví dụ: báo cáo thông tin sai). | `user_id`, `feedback_type` ('stale_info', 'bad_suggestion'), `poi_name` | Thu thập dữ liệu để cải thiện chất lượng nội dung và thuật toán. |

### 1.4. Business Outcome (Lagging Indicator)

| Tên Event | Bắn khi... | Thuộc tính (Properties) | Phục vụ Metric / Phân tích |
| :--- | :--- | :--- | :--- |
| `booking_started` | User bấm vào một link để chuyển sang trang của đối tác (OTA, hãng bay) để đặt dịch vụ. | `user_id`, `trip_id`, `booking_type` ('flight', 'hotel'), `partner_name`, `estimated_value` | Đo lường ý định đặt dịch vụ, là bước trên của phễu doanh thu. |
| `booking_completed` | User hoàn thành một booking (cần có cơ chế callback/UTM từ đối tác, hoặc user tự báo cáo). | `user_id`, `trip_id`, `booking_id`, `booking_type`, `partner_name`, `final_value` (GMV), `commission_value` | Đo lường **Business Outcome (LTV/GMV)**. Đây là chỉ số tài chính cuối cùng. |

---

## 2. Mối quan hệ giữa Event và Metric

Sơ đồ này cho thấy cách các event được sử dụng để tính toán các chỉ số chính trong Measurement Ladder.

```
Business Outcome (LTV)
  ▲
  └── booking_completed

North Star Metric (Số chuyến đi chốt/năm)
  ▲
  └── itinerary_confirmed (đếm theo user, theo năm)

Input Metrics (Leading)
  ├── Activation Rate: itinerary_confirmed (is_first_trip=true) / onboarding_start
  │
  ├── Per-trip Retention (M1): cohort(itinerary_confirmed) → itinerary_confirmed (chuyến tiếp theo)
  │
  ├── Within-window Engagement (M2): Đếm số ngày có itinerary_viewed/itinerary_edited trong 28 ngày
  │
  ├── Nurture Engagement (M3): Đếm user có destination_saved/price_watch_added trong 30 ngày
  │
  └── Time-to-Value (TTV): timestamp(itinerary_confirmed) - timestamp(onboarding_start)
```

---

## 3. Ví dụ về User Journey và Event Stream

Một người dùng mới trải qua flow redesign (Bài 3) sẽ tạo ra một chuỗi event như sau:

1.  Mở app lần đầu → `onboarding_start`
2.  Bấm "Bắt đầu" → `onboarding_cta_click`
3.  Chọn thẻ "Đà Nẵng" → `destination_selected` (destination_name: 'Đà Nẵng', method: 'card')
4.  Chọn chip "4N3Đ", "Cặp đôi", "Thoải mái" → `context_chips_selected`
5.  AI tạo xong lịch trình → `itinerary_created` (trip_id: 'trip123')
6.  User xem và xóa một điểm đến → `itinerary_edited` (trip_id: 'trip123', edit_type: 'delete_poi')
7.  User bấm "Chốt lịch trình này" → **`itinerary_confirmed`** (trip_id: 'trip123', is_first_trip: true)
8.  User bật theo dõi giá → `price_watch_added` (destination_name: 'Đà Nẵng')

*Dữ liệu từ chuỗi event này đủ để tính TTV, cập nhật phễu Activation, và ghi nhận Core Action đầu tiên của người dùng.*

---

## 4. Checklist tự nghiệm thu Bài 6
- [x] Đã tạo một danh sách event đầy đủ, bao quát các flow chính (onboarding, core, nurture, recovery).
- [x] Mỗi event có định nghĩa rõ ràng về thời điểm bắn (trigger).
- [x] Mỗi event có danh sách các thuộc tính (properties) cần thiết để phân tích.
- [x] Đã giải thích rõ mỗi event phục vụ cho việc đo lường metric nào.
- [x] Có thể liên kết trực tiếp các event với từng chỉ số trong **Measurement Ladder (Bài 4)**.
- [x] Có ví dụ về một user journey và chuỗi event tương ứng để làm rõ cách hoạt động.
- [x] Tài liệu đủ rõ ràng để đội ngũ engineering có thể dựa vào đó để implement tracking.
- [x] Toàn bộ nội dung nhất quán với các quyết định ở các bài trước.

*Bài 6 v1.0 · AI Travel Planner · Day 20 Lab — Nguyễn Lê Văn · 2A202600569.*
```
