# Bài 5 — Nature vs Nurture & Hook Model (v1.0)

> **Người phụ trách:** Nguyễn Lê Văn · 2A202600569
> **Sản phẩm:** AI Travel Planner (giữ nguyên từ Ngày 18)
> **Đầu vào:**
> - [[01-Customer-Retention-Canvas]] — Quyết định nền tảng (low-frequency), gợi ý về Nature/Nurture.
> - [[02-Retention-Metric]] — Định nghĩa metric M3 (Nurture retention) & các event liên quan.
> - [[04-Measurement-Ladder+North-Star-Metric]] — M3 là Input Metric quan trọng để tăng M1 (Per-trip retention).
> **Bàn giao cho:** Bài 6 (Văn — tracking plan cho các event trong Hook).

**Quy ước nhãn độ tin cậy** (kế thừa Bài 1):
- **[Có nguồn]** = dựa trên dữ liệu ngành đã dẫn ở Bài 1, mục 0.
- **[Giả định prototype]** = suy luận thiết kế, CHƯA có tracking thật → cần validate ở Bài 6.

---

## 0. Mục tiêu Bài 5

Phân biệt rõ ràng giữa nhịp điệu sử dụng tự nhiên của sản phẩm (Nature) và các chiến lược nuôi dưỡng người dùng giữa các chuyến đi (Nurture). Xây dựng một Hook Model phù hợp, **chỉ áp dụng cho các hành vi phụ có tần suất cao**, nhằm mục đích cuối cùng là tăng tỷ lệ người dùng quay lại cho chuyến đi tiếp theo (M1 - Per-trip retention).

Bài viết này tuyệt đối tuân thủ **Quyết định nền tảng số 1**: KHÔNG cố gắng tạo ra một thói quen (habit) sử dụng hằng ngày cho hành vi cốt lõi "lập kế hoạch chuyến đi".

---

## 1. Nature vs. Nurture

### 1.1. Nature (Tần suất tự nhiên)

-   **Hành vi:** Lập kế hoạch cho một chuyến đi (Core Action: `itinerary_confirmed`).
-   **Tần suất:** **Thấp, không đều, vài lần/năm** (2-4 lần/năm theo Bài 1). **[Có nguồn]**
-   **Bản chất:** Đây là nhịp điệu tự nhiên của người dùng, sản phẩm không thể tự tạo ra nhu cầu này từ con số không. Chúng ta chỉ có thể "đón" nhu cầu khi nó xuất hiện.
-   **Sai lầm cần tránh:** Cố gắng kéo người dùng vào lập kế hoạch mỗi ngày/tuần khi họ không có nhu cầu. Điều này sẽ gây phiền nhiễu và phản tác dụng.

### 1.2. Nurture (Chiến lược nuôi dưỡng)

-   **Hành vi:** Các hành vi phụ, có tần suất cao hơn, diễn ra giữa các chuyến đi.
    -   Lướt xem các điểm đến gợi ý (như ở MH02-NEW của Bài 3).
    -   Lưu lại các điểm đến yêu thích (`destination_saved`).
    -   Theo dõi giá vé máy bay/khách sạn cho một điểm đến cụ thể (`price_watch_added`).
-   **Tần suất:** **Cao hơn, có thể là hàng tuần hoặc hàng tháng**, tùy thuộc vào mức độ "thèm đi" của người dùng. **[Giả định prototype]**
-   **Bản chất:** Đây là những hành vi "đầu tư" nhỏ, ít ma sát, giúp giữ cho thương hiệu AI Travel Planner luôn hiện diện trong tâm trí người dùng. Chúng hoạt động như những "mồi câu" để khi nhu cầu "Nature" trỗi dậy, người dùng sẽ nghĩ đến app của chúng ta đầu tiên.
-   **Mục tiêu:** Tăng **M3 (Nurture Engagement)** để tác động tích cực lên **M1 (Per-trip Retention)**, theo như định nghĩa trong Bài 2 và Bài 4.

---

## 2. Hook Model cho hành vi Nurture

Hook Model của Nir Eyal sẽ được áp dụng cho vòng lặp của các **hành vi phụ (Nurture)**, không phải hành vi cốt lõi.

> **Vòng lặp:** Lướt xem điểm đến → Lưu lại → Theo dõi giá → Nhận thông báo giá tốt → Quay lại app → ...

### 2.1. Trigger (Tác nhân)

#### Internal Trigger (Tác nhân nội tại)
-   Cảm giác "thèm đi đâu đó", muốn thoát khỏi công việc hàng ngày.
-   Sự buồn chán, lướt mạng xã hội và thấy bạn bè đi du lịch.
-   Nhận ra sắp có một kỳ nghỉ lễ dài ngày.

#### External Trigger (Tác nhân bên ngoài)
-   **Thông báo đẩy (Push Notification):** "Giá vé máy bay đến Đà Nẵng vừa giảm 15%!" (dành cho người dùng đã bật `price_watch_added`).
-   **Email hàng tuần/tháng:** "Top 5 điểm đến lý tưởng cho kỳ nghỉ 30/4 sắp tới."
-   **Gợi ý trong app (In-app suggestion):** "Bạn đã lưu Hội An, hãy xem thử lịch trình mẫu 3 ngày 2 đêm tại đây."
-   **Social/Content:** Các bài blog, video về du lịch do team sản xuất.

### 2.2. Action (Hành động)

Hành động phải cực kỳ đơn giản, ít ma sát nhất có thể.

-   **Hành động chính:**
    -   **Lưu một điểm đến:** Chỉ cần một cú chạm vào icon `♡` hoặc `[Lưu]`. Event: `destination_saved`.
    -   **Bật theo dõi giá:** Một cú chạm vào nút `[🔔 Theo dõi giá]`. Event: `price_watch_added`.
-   **Hành động phụ:**
    -   Lướt xem danh sách các điểm đến (như ở màn hình MH02-NEW của Bài 3).
    -   Đọc một bài blog gợi ý.

### 2.3. Variable Reward (Phần thưởng biến đổi)

Phần thưởng phải tạo ra sự hứng thú và bất ngờ, khiến người dùng muốn quay lại.

-   **Phần thưởng của "Bộ lạc" (Rewards of the Tribe):**
    -   Thấy được những điểm đến "hot" mà mọi người đang quan tâm.
    -   Chia sẻ một lịch trình mẫu hay một deal giá tốt với bạn bè.
-   **Phần thưởng của "Săn lùng" (Rewards of the Hunt):**
    -   **Cốt lõi của Nurture Loop:** Bất ngờ nhận được thông báo "Giá vé đến nơi bạn thích đang ở mức thấp nhất trong 3 tháng!".
    -   Khám phá một điểm đến mới, đẹp mà trước đây chưa từng biết đến qua các gợi ý của app.
-   **Phần thưởng của "Bản thân" (Rewards of the Self):**
    -   Cảm giác hoàn thành khi xây dựng được một "wishlist" các điểm đến mơ ước.
    -   Cảm giác thông thái, làm chủ được kế hoạch khi nắm bắt được thông tin giá cả.

### 2.4. Investment (Sự đầu tư)

Đây là bước người dùng bỏ ra một chút công sức, làm cho các tác nhân tiếp theo trở nên cá nhân hóa và hiệu quả hơn, đồng thời tăng khả năng quay trở lại của họ.

-   **Hành động đầu tư:**
    -   **Lưu một điểm đến (`destination_saved`):** Đây là dữ liệu quý giá. App biết được người dùng quan tâm đến đâu để gửi thông báo giá (External Trigger) liên quan.
    -   **Bật theo dõi giá (`price_watch_added`):** Một sự cho phép rõ ràng từ người dùng để app gửi thông báo. Đây là một External Trigger cực kỳ mạnh.
    -   **Chỉnh sửa nhẹ một lịch trình mẫu:** Ví dụ, xóa một điểm không thích trong lịch trình gợi ý cho Đà Lạt. Hệ thống có thể học (`itinerary_edited`) và cá nhân hóa tốt hơn cho lần sau.

---

## 3. Mối quan hệ giữa Hook và Retention

```
  [Bắt đầu]
      ↓
  Internal Trigger ("Thèm đi chơi")
      ↓
  Mở App (Hành vi Nurture) → Lướt xem điểm đến
      ↓
  Action (Lưu Đà Lạt) → Investment (`destination_saved` event)
      ↓
  External Trigger (Thông báo "Giá vé đi Đà Lạt giảm")
      ↓
  Variable Reward (Bất ngờ vì giá tốt)
      ↓
  Quay lại App → Cân nhắc lập kế hoạch (chuyển sang Core Loop)
      ↓
  Internal Trigger ("OK đi thật thôi") → Bắt đầu Core Action "Lập kế hoạch"
      ↓
  Tăng khả năng thực hiện Core Action → Tăng M1 (Per-trip Retention)
```

Vòng lặp Nurture Hook không trực tiếp tạo ra doanh thu, nhưng nó giữ chân người dùng và làm "ấm" họ. Khi đến thời điểm họ thực sự có nhu cầu đi du lịch (Nature), AI Travel Planner sẽ là lựa chọn hàng đầu trong tâm trí họ, từ đó thúc đẩy chỉ số quan trọng nhất là **M1 - Per-trip retention**.

---

## 4. Bàn giao cho Bài 6

Các event sau đây, đã được đề cập trong các bài trước, là trọng tâm để theo dõi hiệu quả của Nurture Hook. Bài 6 cần chi tiết hóa các thuộc tính của chúng:
-   `destination_saved`: Cần biết `user_id`, `destination_name`, `source` (từ đâu mà user lưu: màn hình chính, bài blog, etc.).
-   `price_watch_added`: Cần biết `user_id`, `destination_name`, `watch_type` (vé máy bay/khách sạn).
-   `notification_opened`: Cần biết `user_id`, `notification_type` (price_alert, new_suggestion), `campaign_id`.
-   `itinerary_edited`: Cần biết `user_id`, `trip_id`, `edit_type` (delete, add, reorder).

---

## 5. Checklist tự nghiệm thu Bài 5
- [x] Phân biệt rõ ràng giữa **Nature** (tần suất thấp, core action) và **Nurture** (tần suất cao hơn, hành vi phụ).
- [x] Khẳng định lại việc **không áp dụng Hook Model cho core action**.
- [x] Xây dựng **Hook Model chi tiết (Trigger, Action, Reward, Investment)** cho vòng lặp Nurture.
- [x] Mỗi phần của Hook Model đều có ví dụ cụ thể, gắn với các tính năng và event của sản phẩm.
- [x] Giải thích được **mối quan hệ** giữa Nurture Hook và mục tiêu tăng retention dài hạn (M1).
- [x] Bàn giao các event cần theo dõi cho Bài 6.
- [x] Toàn bộ nội dung nhất quán với các quyết định ở Bài 1, 2, 3, 4.

*Bài 5 v1.0 · AI Travel Planner · Day 20 Lab — Nguyễn Lê Văn · 2A202600569.*