# Bài 1 — Customer Retention Canvas (NGUỒN SỰ THẬT · v1.0)

> **Sản phẩm:** AI Travel Planner (giữ nguyên từ Ngày 18)
> **Lát cắt:** AI lập & chỉnh lịch trình một chuyến đi → người dùng review → đặt dịch vụ.
> **Mục đích file:** Đầu vào CHUNG cho Bài 2–6. Bám theo các quyết định đã chốt ở đây; muốn đổi thì báo cả nhóm vì sẽ kéo theo metric/onboarding/hook.

**Quy ước nhãn độ tin cậy** (để phân biệt fact với giả định, không bịa):
- **[Có nguồn]** = có dữ liệu ngành dẫn ở mục "Cơ sở thực tế".
- **[Giả định prototype]** = suy luận thiết kế, CHƯA có tracking thật → cần validate (đúng yêu cầu đề: "ghi rõ đây là ước tính từ prototype").

---

## 0. Cơ sở thực tế (để các con số không phải bịa)

> ⚠️ Dữ liệu dưới là **US/global**. Bối cảnh Việt Nam có thể khác về độ lớn, nhưng **hai kết luận cấu trúc vẫn đúng**: (a) du lịch giải trí là hành vi **tần suất thấp, vài lần/năm**; (b) việc lập kế hoạch là một **đợt research dồn dập kéo dài nhiều tuần rồi tắt**. Đây là nền cho toàn bài.

| Khẳng định | Số liệu | Nguồn |
|---|---|---|
| Số chuyến giải trí/năm | Mỹ trung bình **~3–5 chuyến/năm** (4.7 năm 2014; Millennials kỳ vọng 4.4; nữ ~3) | Statista |
| Lập chuyến tốn nhiều công | **>5 giờ** (303 phút) xem nội dung du lịch trong 45 ngày trước khi đặt; xem **141 trang** (tới **277** ở Mỹ) | Expedia Group |
| "Mở cả chục tab" | **89%** người sau khi vào 1 OTA còn ghé thêm site khác (hãng bay, khách sạn, metasearch) | Expedia Group |
| Đợt research dồn dập rồi tắt | Path-to-purchase **trung bình >2 tháng**; đầu kỳ ~2.5 trang/ngày, **tăng vọt ~25 trang/ngày** ngay trước khi đặt | Expedia Group |

→ Diễn giải: persona **không** mở app mỗi ngày quanh năm. Họ trải qua **một đợt cao điểm research dài nhiều tuần** mỗi khi chuẩn bị một chuyến, rồi gần như biến mất tới chuyến sau. Đây chính là lý do KHÔNG ép daily retention.

---

## ⚠️ Quyết định nền tảng số 1 — phải đồng thuận

**AI Travel Planner là sản phẩm natural frequency THẤP cho core use case.** Lập & đặt một chuyến đi xảy ra **vài lần/năm** (low-frequency, không đều) — **[Có nguồn]**.

- ❌ KHÔNG ép D1/D7/D30 daily retention hay habit loop hằng ngày.
- ✅ Đo theo "lần lập chuyến tiếp theo" + dùng Nurture & hành vi phụ (lưu điểm đến, theo dõi giá) để giữ hiện diện giữa hai chuyến — giống ví dụ Zillow/Zestimate trong đề (mục 13).

Đây là điểm dễ trượt nhất; Bài 2 (metric), Bài 4 (North Star), Bài 5 (Hook) đều phải tôn trọng nó.

---

## 4. Customer Retention Canvas — Use Case

Use case chính: *"Lập kế hoạch và chốt lịch trình cho một chuyến đi sắp tới."*

### 4.1. The Problem (bằng lời người dùng)

> "Mỗi lần sắp đi du lịch, tôi tốn cả buổi tối mở cả chục tab so giá vé và khách sạn, đọc review, ghép lịch từng ngày — mà vẫn sợ bỏ lỡ chỗ hay hoặc đặt hớ giá. Tôi muốn có một lịch trình dùng được ngay mà không phải tự gồng nghiên cứu."

- KHÔNG viết: *"Người dùng cần một AI có dashboard thông minh để gợi ý chuyến đi"* (đó là tính năng, không phải vấn đề).
- Vấn đề thật = **tốn nhiều công sức nghiên cứu + lo ra quyết định sai (bỏ lỡ / đặt hớ giá)**.
- Mức độ "tốn công" này **[Có nguồn]**: >5 giờ và 141–277 trang xem trước khi đặt; 89% phải ghé nhiều site → đúng cảnh "mở cả chục tab".

### 4.2. The Persona

**Persona chính — "Người tự lên kế hoạch chuyến đi cá nhân":**

| Thuộc tính | Mô tả | Độ tin cậy |
|---|---|---|
| Vai trò / hoàn cảnh | NV văn phòng / cặp đôi, tự tổ chức **vài chuyến nghỉ/năm** (lễ, hè, cuối tuần dài) | Tần suất **[Có nguồn]**; nghề nghiệp **[Giả định]** |
| Độ tuổi | ~**25–40** (skew Millennials) | **[Giả định]** — Millennials là nhóm đi nhiều nhất (4.4 chuyến/năm) nên skew trẻ là hợp lý, nhưng band cụ thể cần validate |
| Mục tiêu | Lịch trình khả thi, đúng ngân sách, không bỏ lỡ trải nghiệm — với ít công sức nhất | **[Giả định]** suy từ Problem |
| Kinh nghiệm | Biết tự đặt vé/khách sạn online, KHÔNG phải chuyên gia lên lịch; ngại đọc quá nhiều | **[Giả định]** |
| Điều kiện đổi hành vi | Quỹ thời gian ít, ngân sách hữu hạn, ngại ra quyết định sai khi tiền & ngày nghỉ đều quý | **[Giả định]** |

**Anti-persona (loại khỏi phân tích để không trộn dữ liệu):**

- **Khách công tác** có công ty / travel agency lo vé & khách sạn → không tự research, hành vi khác hẳn.
- **Backpacker / travel hacker** coi việc tự research là thú vui, muốn kiểm soát từng chi tiết → không cần AI lo hộ.
- **Người chỉ mua tour trọn gói** → không có hành vi "tự lập lịch trình".

→ Ba nhóm này có natural frequency và động lực khác nhau; gộp vào sẽ làm nhiễu metric.

### 4.3. The Why (động lực cốt lõi — outcome, không phải tính năng)

Persona muốn **đi được một chuyến đáng tiền mà không phải gồng nghiên cứu và không lo quyết định sai.** Cụ thể:

- Tiết kiệm thời gian (cắt phần lớn trong >5 giờ research hiện tại — **[Có nguồn]**).
- An tâm về quyết định (không bỏ lỡ chỗ hay, không đặt hớ giá, lịch khả thi về thời gian/ngân sách).

Outcome = **"một lịch trình mình tin tưởng và dùng được ngay"**, không phải "đã dùng tính năng AI".

### 4.4. The Alternative (đang giải quyết bằng cách nào khi chưa có sản phẩm)

**[Có nguồn]** — đây là các kênh research thực tế phổ biến nhất (Expedia: OTA 80%, search engine 61%, social 58%, hãng bay 54%, metasearch 51%):

- Mở nhiều tab thủ công: Google, Booking/Agoda (OTA), Skyscanner (metasearch), web hãng bay, Google Maps.
- Hỏi bạn bè / group Facebook / Reddit du lịch (social).
- Xem blog, video review, bài "lịch trình N ngày…".
- Tự ghép bằng spreadsheet / ghi chú.
- Hoặc chấp nhận đi không kế hoạch / mua tour trọn gói cho xong.

→ Alternative cho thấy hành vi thật: người dùng **dồn sức research nhiều site trong một đợt trước mỗi chuyến**, rồi dừng.

### 4.5. The Frequency (tần suất tự nhiên — quan sát, không theo mong muốn)

**Hai nhịp tách biệt — chìa khóa cho toàn bài:**

1. **Nhịp giữa các chuyến (per-trip):** **vài lần/năm** (~2–4, không đều) — **[Có nguồn]**: benchmark Mỹ 3–5 chuyến/năm; nhóm lấy mốc thận trọng cho persona Việt và cho riêng "chuyến cần lập kế hoạch kỹ".
2. **Nhịp trong một "planning window":** khi đang lập 1 chuyến, người dùng quay lại **nhiều lần, dồn dập trong nhiều tuần và tăng tốc sát ngày đặt**, rồi **về gần 0** đến chuyến sau — **[Có nguồn]**: path-to-purchase trung bình >2 tháng; từ ~2.5 trang/ngày lên ~25 trang/ngày ngay trước khi đặt.

> Đúng tinh thần ví dụ trong đề: *"một use case lập kế hoạch có thể daily trong thời gian dự án diễn ra, sau đó giảm mạnh khi kết thúc."*

**Hệ quả (ghi rõ để Bài 2 & 4 dùng):**
- Không đo daily retention toàn cục. Đo theo **planning window** (đợt cao điểm) + **tỷ lệ quay lại lập chuyến tiếp theo** (per-trip cohort).
- Hành vi phụ tần suất cao hơn để giữ hiện diện: **lưu/lướt điểm đến, theo dõi giá vé–khách sạn, đọc gợi ý** — khai thác ở Nurture (Bài 5). *(Mức độ thường xuyên của hành vi phụ là **[Giả định]**, cần tracking để xác nhận.)*

---

## 5. Canvas cần hoàn thành (bản đã điền)

| Thành phần | Câu hỏi | Câu trả lời của nhóm |
|---|---|---|
| The Problem | Vấn đề bằng lời user là gì? | "Tốn cả buổi tối mở chục tab so giá, ghép lịch, mà vẫn sợ bỏ lỡ chỗ hay / đặt hớ giá." |
| The Persona | Ai có vấn đề đó? | NV văn phòng/cặp đôi ~25–40, tự tổ chức vài chuyến nghỉ/năm, ít thời gian, ngân sách hữu hạn |
| Anti-persona | Ai không thuộc use case này? | Khách công tác có công ty lo; backpacker thích tự research; người mua tour trọn gói |
| The Why | Động lực cốt lõi là gì? | Đi được chuyến đáng tiền mà không phải gồng research và không lo quyết định sai |
| The Alternative | Họ đang giải quyết bằng cách nào? | Mở nhiều tab (OTA/metasearch/hãng bay), hỏi bạn bè/group, xem blog/video, spreadsheet, hoặc mua tour |
| The Frequency | Vấn đề tự nhiên xuất hiện bao lâu một lần? | Core: vài lần/năm (per-trip). Trong planning window: dồn dập nhiều tuần, tăng tốc sát ngày đặt, rồi về 0 |

---

## 🔗 Gợi ý bàn giao cho các bài sau (để 3 thành viên bám)

> **Gợi ý có lý do, không phải đáp án đóng.** Người phụ trách tinh chỉnh nhưng nên tôn trọng logic low-frequency ở trên.

### → Bài 2 (Du): Core Action, Active User, Retention Metric
- **Core job:** biến nhu cầu mơ hồ ("muốn đi đâu đó") thành một lịch trình dùng được ngay.
- **Core action gợi ý:** **"Review & CHỐT một itinerary do AI tạo cho chuyến đi thật"** (đã xem/chỉnh rồi xác nhận). Value đáp xuống ở đây — quan sát được, gắn trực tiếp use case.
  - *Đặt vé/khách sạn* là **business event downstream** (phụ thuộc giá, có thể đặt ngoài app) → để ở Business/lagging layer của Bài 4, không làm core action.
  - "Mở app / xem 1 màn hình" KHÔNG đủ tính core action.
- **Aha moment gợi ý:** lần đầu nhận một lịch trình đầy đủ, khả thi, đúng ngân sách mà user thấy "xài được luôn".
- **Active user (mẫu câu):** *"Một user là active trong một planning window khi họ chốt/chỉnh ít nhất một itinerary có giá trị."*
- **Retention metric (định hướng — KHÔNG ép daily):** per-trip *"% user quay lại lập chuyến tiếp theo trong 3–6 tháng"* (quý/cohort); trong window: *"WAU theo planning window / số ngày active mỗi window"*; phụ: *"% user theo dõi giá / lưu điểm đến giữa hai chuyến"*.

### → Bài 4 (Văn): Measurement Ladder & North Star
- Core action (chốt itinerary) = **Activation/leading**; **đặt dịch vụ + chuyến diễn ra** = **lagging/business** (LTV).
- **North Star gợi ý:** *"Số chuyến đi được lập & chốt thành công mỗi user mỗi năm"* (value lặp lại, không vanity DAU). Thay thế cân nhắc: "trips with ≥1 booking".
- Trade-off mẫu: nhồi nhiều gợi ý booking để tăng revenue ngắn hạn → user thấy bị bán hàng, giảm tin tưởng & quay lại.

### → Bài 5 (Văn): Nature vs Nurture & Hook
- **Nature:** nhịp vài lần/năm — KHÔNG tạo ra từ số 0.
- **Nurture (giữ hiện diện giữa hai chuyến):** cảnh báo giá cho điểm đến đã lưu, gợi ý mùa đẹp/lễ sắp tới, email "lịch trình mẫu". Vừa đủ, không dày.
- **Hook chỉ áp cho hành vi phụ tần suất cao** (theo dõi giá / lướt điểm đến), KHÔNG ép habit "lập chuyến" hằng ngày — đề cấm habit loop giả.
- Internal trigger gợi ý: "thèm đi đâu đó" / sắp tới kỳ nghỉ / thấy giá vé rẻ.

### → Bài 3 (Hoàng): Onboarding → First Core Action
- First core action cần audit = **đạt tới "itinerary đầu tiên được chốt" càng nhanh càng tốt**.
- Cảnh giác friction: bắt tạo tài khoản / nhập quá nhiều (ngày, ngân sách, sở thích) TRƯỚC khi cho user thấy một lịch trình mẫu → Delay/Simplify.

---

## Nguồn

- Statista — *Average number of leisure trips (US)* & *Leisure travel frequency by age (US 2024)*: https://www.statista.com/statistics/185300/average-number-of-leisure-trips-in-the-us/
- Expedia Group — *Path to Purchase / Travelers spend over 5 hours researching trips*: https://www.expedia.com/newsroom/eg-path-to-purchase-research/
- Expedia Group Advertising — *How travelers research destinations*: https://advertising.expedia.com/blog/travel-trends/travel-research-process-and-destination-decisions/

> Dữ liệu là US/global, dùng để **kiểm chứng hướng và độ lớn**, không phải benchmark nội bộ. Mọi con số gắn **[Giả định prototype]** cần được thay bằng số đo thật khi có tracking (Bài 6).

*Bản hoàn chỉnh Bài 1 v1.0 · AI Travel Planner · Day 20 Lab — nguồn sự thật cho Bài 2–6.*
