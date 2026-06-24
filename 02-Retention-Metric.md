# Bài 2 — Use Case → Retention Metric (v1.0)

> **Người phụ trách:** Nguyễn Viết Du · 2A202600800
> **Sản phẩm:** AI Travel Planner (giữ nguyên từ Ngày 18)
> **Đầu vào:** [[01-Customer-Retention-Canvas]] (nguồn sự thật). Mọi quyết định ở đây tôn trọng **Quyết định nền tảng số 1**: sản phẩm có natural frequency THẤP → KHÔNG ép daily retention.
> **Bàn giao cho:** Bài 3 (Hoàng — first core action để audit), Bài 4 & 6 (Văn — Activation/North Star & event tracking).

**Quy ước nhãn độ tin cậy** (kế thừa Bài 1):
- **[Có nguồn]** = dựa trên dữ liệu ngành đã dẫn ở Bài 1, mục 0.
- **[Giả định prototype]** = suy luận thiết kế, CHƯA có tracking thật → cần validate ở Bài 6.

---

## 0. Bối cảnh kế thừa từ Bài 1 (đọc trước khi vào metric)

Persona **không** mở app mỗi ngày quanh năm. Có **hai nhịp tách biệt** — đây là chìa khóa của toàn bộ Bài 2:

| Nhịp | Tần suất | Độ tin cậy |
|---|---|---|
| **Per-trip** (giữa các chuyến) | Vài lần/năm, **~2–4 chuyến** (mốc thận trọng cho persona Việt; benchmark Mỹ 3–5) | **[Có nguồn]** |
| **Trong một planning window** | Quay lại dồn dập nhiều tuần, tăng tốc sát ngày đặt, rồi về ~0 đến chuyến sau | **[Có nguồn]** (path-to-purchase >2 tháng; ~2.5 → ~25 trang/ngày) |

→ Hệ quả: phải đo **theo planning window** (đợt cao điểm) **và** **tỷ lệ quay lại lập chuyến tiếp theo** (per-trip cohort), KHÔNG đo daily retention toàn cục.

---

## 1. Core Action (hành động cốt lõi tạo giá trị)

### 1.1. Phát biểu

> **Core Action = "Review & CHỐT một itinerary do AI tạo cho một chuyến đi thật"**
> (user đã xem / chỉnh bản nháp lịch trình → bấm xác nhận "Đây là lịch trình của tôi").

Ánh xạ thẳng vào prototype Ngày 18: trang **02 (Ask)** → trang **03 (Review & Agency)**, nút **"Chốt lịch trình này"**.

### 1.2. Vì sao đây là core action (và các phương án bị loại)

| Ứng viên | Có phải core action? | Lý do |
|---|---|---|
| **Chốt itinerary** ✅ | **Có** | Đây là lúc **value đáp xuống**: user nhận "một lịch trình tin tưởng, dùng được ngay" — đúng The Why của Bài 1. Quan sát được, gắn trực tiếp use case. |
| Mở app / xem 1 màn hình ❌ | Không | Không thể hiện value đã được nhận; ai cũng "mở" được → vanity, sẽ thổi phồng active user. |
| Chat hỏi AI vài câu ❌ | Không | Là bước trung gian (Ask), chưa tạo outcome hoàn chỉnh. |
| **Đặt vé / khách sạn** ❌ (không phải core action) | Không | Là **business event downstream** — phụ thuộc giá, có thể đặt ngoài app, không phải lúc nào cũng xảy ra ngay. → Để ở **lagging/business layer của Bài 4**, không trộn vào core action. |

> **Aha moment** (gợi ý cho Bài 3): lần đầu user nhận một lịch trình **đầy đủ, khả thi, đúng ngân sách** mà thấy "xài được luôn" — chính là core action thành công lần đầu. **[Giả định prototype]**.

### 1.3. Tiêu chí một core action "hợp lệ" (để Bài 6 gắn event)
Một lần core action được tính khi **đủ cả 3**:
1. Itinerary gắn với **một chuyến đi thật** (có điểm đến + khoảng thời gian dự kiến), không phải bản demo trống.
2. User đã **xem/chỉnh** ít nhất một phần (không chỉ tạo rồi bỏ).
3. Có **hành vi xác nhận tường minh** (bấm "Chốt" / lưu thành "Lịch trình của tôi").

---

## 2. Active User — định nghĩa theo mẫu "active khi ___ trong ___"

Vì có hai nhịp, định nghĩa active **phân lớp** (không gộp làm một để khỏi nhiễu metric):

### 2.1. Active User (lớp lõi — value chính)

> **Một user là _active_ khi họ _chốt hoặc chỉnh ít nhất một itinerary có giá trị_ trong _một planning window (cửa sổ trượt 28 ngày)_.**

- Vì sao **28 ngày**, không phải "1 ngày": planning window kéo dài nhiều tuần (**[Có nguồn]**). Cửa sổ 1 ngày/7 ngày sẽ đánh rớt user đang research bình thường thành "churn" giả.
- Đây là thước đo **mức độ tiến triển trong một chuyến đang lập**.

### 2.2. Active User (lớp phụ — Nurture, giữ hiện diện giữa hai chuyến)

> **Một user là _active-nurture_ khi họ _theo dõi giá / lưu hoặc xem lại một điểm đến đã lưu_ ít nhất một lần trong _30 ngày_.**

- Đây là hành vi **tần suất cao hơn** dùng để giữ hiện diện giữa hai chuyến — khai thác ở Hook/Bài 5, giống Zestimate của Zillow.
- ⚠️ Mức độ thường xuyên của hành vi phụ là **[Giả định prototype]** → cần tracking xác nhận (Bài 6).

> 🚫 **Không** định nghĩa "active = mở app hằng ngày". Đề bài và Bài 1 đều cấm daily retention giả cho sản phẩm low-frequency.

---

## 3. Retention Metric — chọn theo natural frequency

Ba metric ở **ba tầng nhịp khác nhau**, không phải ba cách đo cùng một thứ:

| # | Metric | Cửa sổ / cadence | Đo cái gì | Độ tin cậy |
|---|---|---|---|---|
| **M1 — Per-trip retention** (chính) | **% user quay lại lập & chốt chuyến *tiếp theo* trong 3–6 tháng** | Quý / cohort theo chuyến | Giá trị **lặp lại** thật sự của sản phẩm | **[Có nguồn]** cho cadence; tỉ lệ cụ thể **[Giả định]** |
| **M2 — Within-window engagement** | **Số ngày active trong một planning window** &/hoặc **% window chốt được ≥1 itinerary** | Trong từng window | User có **đi hết** một lần lập chuyến không (chống bỏ dở) | **[Giả định prototype]** |
| **M3 — Nurture retention** (phụ) | **% user theo dõi giá / lưu điểm đến hoạt động trong 30 ngày** giữa hai chuyến | Tháng | Hiện diện giữa hai chuyến → mồi cho chuyến sau | **[Giả định prototype]** |

**Metric chủ đạo để báo cáo retention = M1.** M2, M3 là metric bổ trợ (đưa vào Input metrics ở Bài 4).

### 3.1. Vì sao bộ metric này HỢP cadence (phần giải thích bắt buộc)

1. **Tôn trọng nhịp per-trip (~2–4 lần/năm).** Hành vi "lập chuyến" tự nhiên chỉ xảy ra vài lần/năm → retention đúng phải hỏi *"lần lập chuyến tiếp theo có quay lại không"* (M1), đo theo **quý/cohort**, không phải theo ngày.
2. **Vì sao loại D1/D7/D30 daily retention.** Với sản phẩm low-frequency, một user **rất hài lòng** vẫn sẽ không mở app ngày mai — vì họ **chưa có chuyến nào để lập**. Daily retention sẽ chấm họ là "churn" → tín hiệu sai, dẫn tới tối ưu nhầm (spam thông báo ép mở app). Đây đúng là bẫy ví dụ Zillow trong đề (mục 13).
3. **Bắt được cả nhịp dồn dập trong window.** M2 đo *trong* một planning window — nơi hành vi thực sự daily/near-daily một cách **tự nhiên** (không ép) — nên vẫn nắm được engagement cao điểm mà không xung đột với điểm (2).
4. **Có lớp giữ hiện diện giữa hai chuyến.** M3 theo dõi hành vi phụ tần suất cao (theo dõi giá, lưu điểm đến) — vừa đo được "đừng quên app giữa hai chuyến", vừa là đầu vào cho Hook (Bài 5). Đo theo **tháng**, hợp với tần suất của chính hành vi đó.

> **Tóm tắt một câu:** *Đo retention theo "chuyến đi tiếp theo" (quý), không theo "ngày mai"; cộng thêm engagement trong window và hành vi nurture hằng tháng để không mù giữa hai chuyến.*

### 3.2. Phản-ví dụ (để người chấm thấy nhóm hiểu cái bẫy)
- ❌ "D7 retention = % user quay lại sau 7 ngày" → vô nghĩa: 7 ngày sau user vẫn đang trong **cùng một** chuyến (hoặc chưa có chuyến mới).
- ❌ "DAU/MAU stickiness" → kéo nhóm đi ép mở app hằng ngày, phản lại bản chất sản phẩm.

---

## 4. Bàn giao xuống (để Bài 3/4/6 bám)

### → Bài 3 (Hoàng): Onboarding → First Core Action
- **First core action cần audit = đạt tới "itinerary đầu tiên được CHỐT" càng nhanh càng tốt** (định nghĩa core action ở mục 1.3).
- TTV (time-to-value) đo từ lúc mở lần đầu → core action lần đầu. Friction cần soi: bắt tạo tài khoản / nhập quá nhiều **trước khi** cho thấy lịch trình mẫu.

### → Bài 4 (Văn): Measurement Ladder & North Star
- **Activation/leading** = core action (chốt itinerary) — mục 1.
- **Input metrics** đề xuất lấy từ: **M2** (số ngày active/window), **M3** (% nurture active), tỉ lệ onboarding→first core action.
- **Lagging/business** = đặt dịch vụ + chuyến diễn ra (LTV) — **không** phải core action.
- North Star gợi ý (Bài 1): *"Số chuyến được lập & chốt thành công / user / năm"* — khớp trực tiếp **M1**.

### → Bài 6 (Văn): Metric & Event tracking
Các event tối thiểu suy ra từ Bài 2 (Văn hoàn thiện bảng event):

| Event | Bắn khi | Phục vụ metric |
|---|---|---|
| `itinerary_created` | AI tạo bản nháp đầu tiên | TTV, phễu |
| `itinerary_edited` | User chỉnh ≥1 mục | điều kiện active (2.1) |
| `itinerary_confirmed` | User bấm "Chốt" (core action) | **Core action, M1, M2** |
| `price_watch_added` | User bật theo dõi giá | **M3** (nurture) |
| `destination_saved` | User lưu điểm đến | **M3** (nurture) |
| `booking_started` *(downstream)* | User bắt đầu đặt dịch vụ | Lagging/business (Bài 4) |

---

## 5. Checklist tự nghiệm thu Bài 2
- [x] Core Action phát biểu rõ, quan sát được, gắn use case (không vanity).
- [x] Active User đúng mẫu *"active khi ___ trong ___"*, có cửa sổ thời gian hợp nhịp.
- [x] Retention Metric chọn **theo natural frequency**, không ép daily.
- [x] **Giải thích vì sao metric hợp cadence** (mục 3.1) + nêu phản-ví dụ.
- [x] Nhất quán với Bài 1; bàn giao rõ cho Bài 3/4/6.

*Bài 2 v1.0 · AI Travel Planner · Day 20 Lab — đầu vào cho Bài 3, 4, 6.*
