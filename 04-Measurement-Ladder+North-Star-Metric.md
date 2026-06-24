# Bài 4 — Measurement Ladder & North Star Metric (v1.0)

> **Người phụ trách:** Nguyễn Lê Văn · 2A202600569
> **Sản phẩm:** AI Travel Planner (giữ nguyên từ Ngày 18)
> **Đầu vào:**
> - [[01-Customer-Retention-Canvas]] — Quyết định nền tảng (low-frequency), gợi ý North Star.
> - [[02-Retention-Metric]] — Định nghĩa Core Action, các metric M1, M2, M3.
> - [[03-Onboarding-First-Core-Action]] — Funnel dự kiến, TTV, các event tracking.

**Quy ước nhãn độ tin cậy** (kế thừa Bài 1):
- **[Có nguồn]** = dựa trên dữ liệu ngành đã dẫn ở Bài 1, mục 0.
- **[Giả định prototype]** = suy luận thiết kế, CHƯA có tracking thật → cần validate ở Bài 6.

---

## 0. Mục tiêu Bài 4

Xây dựng một hệ thống đo lường (Measurement Ladder) từ hành vi nhỏ nhất của người dùng đến mục tiêu kinh doanh dài hạn, và xác định một chỉ số North Star (NSM) duy nhất để định hướng cho toàn bộ sản phẩm.

Hệ thống này phải tôn trọng **Quyết định nền tảng số 1**: AI Travel Planner là sản phẩm có **tần suất sử dụng tự nhiên THẤP**.

---

## 1. North Star Metric (NSM)

### 1.1. Phát biểu North Star Metric

> **North Star Metric = Số chuyến đi được người dùng chốt thành công mỗi năm.**

- **Số chuyến đi:** Đếm số lượng "planning window" hoàn chỉnh, không phải số user.
- **Người dùng:** Tính trên cơ sở mỗi người dùng (per user).
- **Chốt thành công:** User đã thực hiện **Core Action** (`itinerary_confirmed`) theo định nghĩa của Bài 2.
- **Mỗi năm:** Khung thời gian phù hợp với nhịp đi du lịch tự nhiên (vài lần/năm).

### 1.2. Vì sao chọn NSM này?

1.  **Đo lường giá trị cho người dùng:** NSM này tăng khi người dùng lập được nhiều chuyến đi hơn với app. Nó đo lường **outcome** (chuyến đi thành công) chứ không phải **output** (số tính năng được dùng).
2.  **Phản ánh tăng trưởng bền vững:** Để tăng chỉ số này, sản phẩm phải làm tốt cả ba việc: thu hút người dùng mới (acquisition), giúp họ chốt được chuyến đầu tiên (activation), và giữ họ quay lại cho các chuyến đi tiếp theo (retention).
3.  **Tôn trọng Natural Frequency:** Đo "mỗi năm" thay vì "mỗi ngày/tháng" giúp đội ngũ không bị ám ảnh bởi các chỉ số vanity (như DAU/MAU) và không tối ưu sai cho một sản phẩm low-frequency. Nó khớp trực tiếp với metric **M1 (Per-trip retention)** của Bài 2.
4.  **Dễ hiểu và có tính định hướng:** Toàn bộ đội ngũ từ product, engineering đến marketing đều có thể trả lời câu hỏi: "Việc chúng ta đang làm có giúp người dùng chốt được nhiều chuyến đi hơn trong năm nay không?".

### 1.3. Phản-ví dụ (Các NSM đã loại)

-   ❌ **Số người dùng hoạt động hằng ngày (DAU):** Sai hoàn toàn với bản chất sản phẩm. Sẽ dẫn đến việc spam thông báo để ép người dùng mở app.
-   ❌ **Số itinerary được tạo:** Một người dùng có thể tạo 10 itinerary nháp nhưng không chốt cái nào. Chỉ số này không đo được giá trị thực sự.
-   ❌ **Tổng giá trị booking (GMV):** Đây là chỉ số kinh doanh (business metric), không phải chỉ số giá trị sản phẩm (product metric). Tối ưu cho GMV có thể dẫn đến việc "ép" người dùng đặt dịch vụ đắt tiền, làm hại đến trải nghiệm và sự tin tưởng dài hạn.

---

## 2. Measurement Ladder

Measurement Ladder là bậc thang kết nối các hành động nhỏ (Input Metrics) với chỉ số North Star và mục tiêu kinh doanh cuối cùng.

```
      ▲ Business Outcome (Lagging)
      │   "Doanh thu từ các chuyến đi được lên kế hoạch qua app"
      │
      ├─ North Star Metric
      │   "Số chuyến đi được người dùng chốt thành công mỗi năm"
      │
      ▲ Input Metrics (Leading)
          "Các chỉ số tác động trực tiếp đến North Star"
```

### 2.1. Bảng Measurement Ladder chi tiết

| Tầng | Tên chỉ số | Định nghĩa | Cách đo (Event) | Tác động đến NSM |
| :--- | :--- | :--- | :--- | :--- |
| **Business Outcome** (Lagging) | **LTV / GMV từ booking** | Tổng doanh thu hoặc giá trị giao dịch (vé máy bay, khách sạn) được đặt thông qua app. | `booking_completed` | Là kết quả tài chính cuối cùng. NSM tăng thường sẽ kéo theo LTV tăng. |
| **North Star Metric** | **Số chuyến đi được chốt / user / năm** | Trung bình số `itinerary_confirmed` trên mỗi user trong một năm. | `itinerary_confirmed` (Core Action) | **Chỉ số trung tâm.** Tất cả các input metric bên dưới đều nhằm mục đích thúc đẩy chỉ số này. |
| **Input Metrics** (Leading) | **1. Activation Rate** | % user mới thực hiện Core Action (`itinerary_confirmed`) trong session đầu tiên (hoặc 24h đầu). | `itinerary_confirmed` / `onboarding_start` | Tăng số người dùng bắt đầu đóng góp vào NSM. |
| | **2. Per-trip Retention (M1)** | % user quay lại chốt một chuyến đi *tiếp theo* trong 3-6 tháng. | `itinerary_confirmed` (cohort theo chuyến) | Tăng số chuyến đi trên mỗi user (phần "mỗi năm" của NSM). |
| | **3. Within-window Engagement (M2)** | Số ngày active (chỉnh/xem lịch trình) trong một planning window (28 ngày). | Đếm số ngày có event `itinerary_edited` hoặc `itinerary_viewed` trong window. | User càng tương tác sâu, khả năng họ chốt chuyến càng cao. |
| | **4. Nurture Engagement (M3)** | % user active-nurture (theo dõi giá, lưu điểm đến) giữa các chuyến đi. | `price_watch_added`, `destination_saved` | Giữ chân người dùng và là mồi cho chuyến đi tiếp theo, tác động đến M1. |
| | **5. Time-to-Value (TTV)** | Thời gian từ lúc mở app lần đầu đến lúc chốt itinerary đầu tiên. | `onboarding_start` → `itinerary_confirmed` | Giảm TTV giúp tăng Activation Rate (Input #1). |

### 2.2. Mối quan hệ giữa các chỉ số

-   Để tăng **North Star (Số chuyến đi được chốt)**, chúng ta cần:
    -   Giúp người dùng mới **chốt được chuyến đầu tiên** nhanh và dễ dàng hơn (tăng **Activation Rate** bằng cách giảm **TTV**).
    -   Khiến họ **quay trở lại cho các chuyến tiếp theo** (tăng **Per-trip Retention**).
    -   Giữ họ **tương tác sâu trong quá trình lập kế hoạch** để không bỏ dở (tăng **Within-window Engagement**).
    -   Duy trì sự hiện diện của app trong tâm trí họ giữa các chuyến đi (tăng **Nurture Engagement**).

-   Khi **North Star** tăng, **Business Outcome (LTV)** sẽ có xu hướng tăng theo một cách tự nhiên, vì nhiều chuyến đi được chốt hơn sẽ tạo ra nhiều cơ hội đặt dịch vụ hơn.

---

## 3. Trade-offs & Rủi ro

Việc chỉ tập trung vào North Star Metric có thể dẫn đến các quyết định đánh đổi. Điều quan trọng là phải nhận diện chúng.

| Trade-off | Ví dụ | Cách giảm thiểu |
| :--- | :--- | :--- |
| **Chất lượng vs. Số lượng** | Để tăng "số chuyến được chốt", team có thể đơn giản hóa lịch trình quá mức, khiến nó trở nên vô dụng. | Bổ sung chỉ số phụ về chất lượng: **% itinerary được chỉnh sửa sau khi chốt < X%**. Nếu người dùng phải sửa lại quá nhiều sau khi chốt, tức là bản nháp ban đầu không tốt. |
| **Tăng trưởng ngắn hạn vs. Bền vững** | Nhồi nhét quảng cáo hoặc các gợi ý booking để tăng LTV ngay lập tức. | Giữ vững NSM làm kim chỉ nam. Hành động này sẽ làm giảm sự tin tưởng, từ đó giảm **Per-trip Retention (M1)** và làm hại NSM trong dài hạn. |
| **Tập trung vào Core Use Case vs. Mở rộng** | Bỏ qua các hành vi phụ (Nurture) vì chúng không trực tiếp tạo ra "chuyến đi được chốt". | Ladder đã bao gồm **Nurture Engagement (M3)** như một Input Metric quan trọng, công nhận vai trò của nó trong việc dẫn đến Core Action tiếp theo. |

## 4. Checklist tự nghiệm thu Bài 4
- [x] **North Star Metric** được định nghĩa rõ ràng, đo lường được giá trị cho người dùng.
- [x] Giải thích được **lý do chọn NSM** và các phương án đã loại bỏ.
- [x] **Measurement Ladder** được xây dựng đầy đủ, kết nối từ Input Metrics lên Business Outcome.
- [x] Mỗi chỉ số trong Ladder đều có **định nghĩa và cách đo** rõ ràng, liên kết với các event đã có.
- [x] Phân tích được các **trade-offs** và rủi ro khi tối ưu cho NSM.
- [x] Bàn giao rõ ràng cho các bài tiếp theo.
- [x] Toàn bộ nội dung nhất quán với các quyết định ở Bài 1, 2, 3.