# Bài 3 — Onboarding → First Core Action (v1.0)

> **Người phụ trách:** Nguyễn Kim Hoàng · 2A202600987
> **Sản phẩm:** AI Travel Planner (giữ nguyên từ Ngày 18)
> **Đầu vào:**
> - [[01-Customer-Retention-Canvas]] — persona, problem, frequency.
> - [[02-Retention-Metric]] — Core Action = "Review & CHỐT một itinerary do AI tạo cho chuyến đi thật"; Aha moment = lần đầu nhận lịch trình đầy đủ, khả thi, đúng ngân sách mà user thấy "xài được luôn".
> **Bàn giao cho:** Bài 6 (Văn — event points trên flow redesign); prototype chỉnh sửa chính thức.

**Quy ước nhãn độ tin cậy** (kế thừa Bài 1):
- **[Có nguồn]** = dựa trên dữ liệu ngành đã dẫn ở Bài 1, mục 0.
- **[Giả định prototype]** = suy luận thiết kế, CHƯA có tracking thật → cần validate ở Bài 6.

---

## 0. Mục tiêu Bài 3

Đưa user từ **lần mở app đầu tiên** đến **first core action** (chốt itinerary đầu tiên) nhanh nhất có thể, với ít ma sát nhất, đồng thời giữ đủ bối cảnh để AI tạo lịch trình chất lượng.

> **First Core Action** (từ Bài 2): "Review & CHỐT một itinerary do AI tạo cho một chuyến đi thật" — user đã xem/chỉnh bản nháp → bấm xác nhận "Đây là lịch trình của tôi".

---

## 1. Audit Prototype Ngày 18 — Current-State Journey

### 1.1. Flow hiện tại (từ prototype Day 18)

Prototype Ngày 18 có **5 màn hình chính** + 1 flow map:

```
[MH00: Flow Map]
     ↓
[MH01: Onboarding]  ──→  [MH02: AI hỏi thêm thông tin]  ──→  [MH03: Lịch trình lần 1 + Sửa lỗi]
                                                                         ↓
                                                              [MH04: Phát hiện lỗi thời + Recovery]
                                                                         ↓
                                                              [MH05: Đặt dịch vụ + Ranh giới thẩm quyền]
```

### 1.2. Current-State Journey Map (từ mở app → first core action)

| Bước | Màn hình | User đang làm gì | User đang nghĩ / cảm thấy | Touchpoint | Thời gian ước tính |
|---|---|---|---|---|---|
| **B1** | MH01 — Onboarding | Đọc giới thiệu WanderAI: "Tôi có thể giúp…", "Tôi không thể…" | "App này làm được gì? Có an toàn không?" — tò mò nhưng cẩn thận | Splash → Onboarding card | ~15–30 giây |
| **B2** | MH01 — CTA | Chọn `[Bắt đầu lên kế hoạch ngay]` hoặc `[Cấp quyền Google Calendar]` | "Cấp quyền hay không?" — lưỡng lự nếu chưa tin. Nếu chọn Calendar → thêm bước hệ thống | Nút CTA | ~5–15 giây |
| **B3** | MH02 — Nhập nhu cầu | Gõ chat: "Tôi muốn đi Đà Nẵng chơi mấy ngày để xả stress" | "Không biết nên nói gì, nói bao nhiêu?" — hơi blank nếu không có gợi ý | Text input | ~20–60 giây |
| **B4** | MH02 — Chọn chip | AI hỏi thêm → user click chip: số ngày, đi cùng ai, ngân sách | "OK dễ, click thôi" — giảm áp lực gõ | Chip pills | ~10–20 giây |
| **B5** | MH02 — Chờ AI | Thấy loading "Đang thiết kế lịch trình…" | "Nhanh lên…" — lo lắng nhẹ nếu quá lâu (>5 giây), hoặc tò mò | Loading indicator | ~3–10 giây |
| **B6** | MH03 — Xem lịch trình | Duyệt timeline Ngày 1 (6 điểm dày đặc) | "Nhiều quá! Ngày đầu mà đi hết mấy chỗ này sao?" — thất vọng/overwhelm | Timeline UI | ~30–90 giây |
| **B7** | MH03 — Sửa lỗi | Vuốt xóa "Chùa Linh Ứng", AI cập nhật | "À sửa được, đỡ hơn" — nhẹ nhõm | Swipe-to-delete | ~15–30 giây |
| **B8** | *(Chưa có nút "Chốt")* | **⚠️ KHÔNG CÓ BƯỚC CHỐT ITINERARY TRONG PROTOTYPE HIỆN TẠI** | "Xong rồi hả? Tôi chốt ở đâu?" — bối rối, không rõ đã hoàn thành chưa | — | — |

> **⚠️ Phát hiện quan trọng:** Prototype Ngày 18 **THIẾU bước chốt lịch trình** (core action theo Bài 2). Flow hiện tại nhảy từ "xem/sửa lịch trình" thẳng sang "phát hiện lỗi thời" và "đặt dịch vụ" mà không có **hành vi xác nhận tường minh** ("Đây là lịch trình của tôi"). Đây là gap lớn nhất cần bổ sung.

### 1.3. Tổng thời gian ước tính (current state)

**TTV hiện tại ≈ 2–4 phút** từ mở app đến khi xem được lịch trình hoàn chỉnh (B1→B7). **[Giả định prototype]**

Tuy nhiên, **first core action (chốt itinerary) CHƯA TỒN TẠI** trong flow → TTV thực tế = ∞ (user không bao giờ đạt core action trong prototype hiện tại).

---

## 2. Friction Audit — Keep / Remove / Delay / Simplify

Phân tích từng bước trong current-state journey theo 4 loại hành động:

### 2.1. Bảng Friction Audit

| Bước | Mô tả | Verdict | Lý do | Chi tiết thay đổi |
|---|---|---|---|---|
| **B1** — Đọc onboarding | Giới thiệu "Tôi có thể / không thể" | **✅ Keep** | Thiết lập trust boundary (AI không tự thanh toán). Rất quan trọng cho sản phẩm có rủi ro tài chính. Nhưng cần **Simplify** — giảm text. | Rút gọn thành 2 dòng icon + tagline, không paragraph dài |
| **B2** — CTA cấp quyền Calendar | Hỏi cấp quyền Google Calendar ngay onboarding | **⏩ Delay** | User chưa thấy giá trị gì → hỏi quyền sớm gây nghi ngờ và tăng drop-off. Nên delay sau khi user đã chốt itinerary đầu tiên (lúc đó có lý do: "Đồng bộ lịch trình vào Calendar?") | Chuyển sang **post-core-action prompt** |
| **B3** — Gõ chat tự do | User phải tự nghĩ và gõ câu đầu tiên | **🔄 Simplify** | "Blank page syndrome" — user không biết bắt đầu thế nào. 89% user research nhiều site ([Có nguồn]) chứng tỏ họ biết muốn gì nhưng ngại diễn đạt. | Thay bằng **gợi ý nhanh** (destination cards phổ biến) + vẫn cho gõ tự do |
| **B4** — Chọn chip (ngày, bạn đồng hành, ngân sách) | Click chip pills thay vì gõ | **✅ Keep** | Giảm cognitive load, nhanh, AI có đủ bối cảnh. Đây là điểm tốt của prototype hiện tại. | Giữ nguyên, bổ sung chip "Chưa chắc / Linh hoạt" |
| **B5** — Chờ AI tạo lịch trình | Loading indicator | **✅ Keep + Enhance** | Cần thiết (AI đang xử lý). Nhưng loading trống gây lo lắng. | Thêm **skeleton UI** hiển thị cấu trúc lịch trình đang hình thành + micro-progress ("Đang tìm khách sạn…", "Đang ghép lịch…") |
| **B6** — Lịch trình quá dày (6 điểm) | AI tạo lịch trình Ngày 1 với quá nhiều hoạt động | **🔄 Simplify** | Lịch trình đầu tiên **QUÁ DÀY** → user overwhelm → cảm giác "AI không hiểu mình" → rủi ro drop trước core action. Aha moment bị phá hỏng. | AI **mặc định tạo lịch thoải mái hơn** (3–4 điểm/ngày thay vì 6); user có thể bấm "Thêm hoạt động" nếu muốn |
| **B7** — Vuốt xóa điểm | Swipe-to-delete | **✅ Keep** | Thao tác trực quan, cho phép user tinh chỉnh nhanh. Agency đúng mức. | Giữ nguyên |
| **B8** — *(Thiếu)* Chốt itinerary | Không có trong prototype | **➕ ADD** | **Core action không tồn tại!** Phải bổ sung nút "Chốt lịch trình này" để hoàn thành loop giá trị. | Thêm nút **"✓ Chốt lịch trình này"** nổi bật ở cuối timeline + celebration moment |

### 2.2. Tổng hợp Friction Audit

| Loại | Số bước | Chi tiết |
|---|---|---|
| **Keep** | 4 | B1 (simplify text), B4 (chip), B5 (enhance loading), B7 (swipe) |
| **Remove** | 0 | Không có bước nào cần bỏ hoàn toàn |
| **Delay** | 1 | B2 (cấp quyền Calendar → delay sau core action) |
| **Simplify** | 2 | B3 (gõ tự do → gợi ý nhanh), B6 (lịch trình 6 điểm → 3–4 điểm) |
| **Add** | 1 | B8 (thêm nút Chốt itinerary — core action) |

---

## 3. Redesign: Onboarding → First Core Action

### 3.1. Flow mới (After)

```
[MH01-NEW: Welcome + Trust]          ≈10 giây
     ↓
[MH02-NEW: Chọn điểm đến nhanh]     ≈10–20 giây
     ↓
[MH02b-NEW: Bổ sung bối cảnh]       ≈10–20 giây (chip pills — giữ nguyên)
     ↓
[MH02c-NEW: AI đang tạo…]           ≈3–8 giây (skeleton + micro-progress)
     ↓
[MH03-NEW: Lịch trình lần 1]        ≈30–60 giây (3–4 điểm/ngày, thoải mái)
     ↓  ← user chỉnh sửa nếu muốn (swipe xóa / kéo thả / thêm)
     ↓
[MH03b-NEW: ★ CHỐT ITINERARY]       ≈5 giây ← FIRST CORE ACTION
     ↓
[Celebration + Post-action prompts]   
     ↓
[MH04+: Tiếp tục flow cũ — chi tiết, đặt dịch vụ…]
```

### 3.2. Chi tiết từng màn hình redesign

#### MH01-NEW: Welcome + Trust (tối giản hóa)

**Before (Day 18):**
- Paragraph dài: "Tôi có thể giúp bạn: 📍 Lên lịch trình… 🏨 Tìm khách sạn…"
- Paragraph: "Tôi không thể: 💳 Tự động thanh toán…"
- 2 nút CTA (bao gồm cấp quyền Calendar)

**After:**
- **Tagline ngắn:** "WanderAI — Lịch trình du lịch cá nhân hóa trong 2 phút"
- **Trust badge nhỏ:** 🔒 "AI không bao giờ tự thanh toán" (1 dòng, không paragraph)
- **1 nút CTA duy nhất:** `[🗺️ Bắt đầu lên kế hoạch]`
- *(Cấp quyền Calendar → DELAY sang sau khi chốt itinerary)*

**Lý do:** Giảm cognitive load, user chỉ cần đọc 2 dòng thay vì 2 paragraph. Trust vẫn được thiết lập nhưng không block flow. Calendar permission chuyển sang thời điểm có giá trị hơn.

---

#### MH02-NEW: Chọn điểm đến nhanh (thay thế chat trống)

**Before (Day 18):**
- Text input trống, user tự gõ "Tôi muốn đi Đà Nẵng…"

**After:**
- **Heading:** "Bạn muốn đi đâu?"
- **Grid 4–6 destination cards phổ biến** (có hình ảnh thu nhỏ):
  - 🏖️ Đà Nẵng · "Biển đẹp, ẩm thực"
  - 🏯 Hội An · "Phố cổ, đèn lồng"
  - 🌄 Đà Lạt · "Mát mẻ, cafe view"
  - 🏔️ Sa Pa · "Ruộng bậc thang, trekking"
  - 🌊 Phú Quốc · "Đảo, resort"
  - 🏙️ Nha Trang · "Biển, vui chơi"
- **+ Thanh tìm kiếm:** "Hoặc gõ điểm đến khác…"
- User **tap 1 card** hoặc gõ → chuyển ngay sang bước tiếp

**Lý do:** Loại bỏ "blank page syndrome". 1 tap thay vì phải nghĩ câu gõ. Vẫn cho gõ tự do cho user biết rõ muốn đi đâu. Destination cards cũng hoạt động như **implicit nurture** — user lướt xem = hành vi phụ (Bài 5).

---

#### MH02b-NEW: Bổ sung bối cảnh (giữ nguyên chip — đã tốt)

**Giữ nguyên** từ prototype Day 18, bổ sung nhỏ:
- Chip số ngày: `[3N2Đ]` `[4N3Đ]` `[5N4Đ]` **`[Chưa chắc]`**
- Chip đi cùng: `[Gia đình]` `[Cặp đôi]` `[Bạn bè]` `[Đi một mình]`
- Chip ngân sách: `[Tiết kiệm]` `[Thoải mái]` **`[Linh hoạt]`**

**Thêm:** chip `[Chưa chắc]` và `[Linh hoạt]` cho user chưa quyết — AI vẫn tạo được lịch trình mặc định hợp lý, giảm friction "phải biết chính xác mới bấm được".

---

#### MH02c-NEW: AI đang tạo… (skeleton + micro-progress)

**Before (Day 18):**
- "Đang thiết kế lịch trình…" + icon loading (generic)

**After:**
- **Skeleton UI** — hiển thị khung timeline đang dần hiện lên:
  - ░░░ Ngày 1 ░░░░░░░
  - ░░░ Sáng: đang tìm… ░░░
  - ░░░ Trưa: ░░░░░░░░░
- **Micro-progress text** lần lượt:
  - "🔍 Đang tìm điểm đến phù hợp…"
  - "🏨 Đang chọn khách sạn khu vực trung tâm…"
  - "📋 Đang ghép lịch trình tối ưu…"
- **Expectation setting:** "Lịch trình sẽ sẵn sàng trong ~10 giây"

**Lý do:** Loading có nội dung giảm lo lắng bỏ app. User thấy AI đang "làm việc thật" → tăng trust + giảm perceived wait time.

---

#### MH03-NEW: Lịch trình lần 1 (thoải mái hơn, có nút Chốt)

**Before (Day 18) — Ngày 1:**
| Giờ | Hoạt động |
|---|---|
| 08:00 | Ăn sáng Mì Quảng |
| 09:00 | Tham quan Ngũ Hành Sơn |
| 10:30 | Chùa Linh Ứng |
| 12:00 | Ăn trưa Hải sản |
| 13:00 | Tắm biển Mỹ Khê |
| 15:00 | Hội An |

→ **6 hoạt động**, di chuyển xa (Ngũ Hành Sơn → Chùa Linh Ứng → Mỹ Khê → Hội An), không thực tế cho ngày đầu.

**After — Ngày 1 (redesign):**
| Giờ | Hoạt động | Ghi chú |
|---|---|---|
| 09:00 | ☀️ Ăn sáng Mì Quảng Bà Vị | Khu vực gần khách sạn |
| 10:00 | 🏖️ Tắm biển & thư giãn Mỹ Khê | Block 2.5 tiếng — "xả stress" đúng mục tiêu |
| 12:30 | 🍜 Ăn trưa Hải sản tại Nhà hàng Năm Châu | Cập nhật mới, rating 4.5★ |
| 14:30 | 🏔️ Tham quan Ngũ Hành Sơn | 1 điểm văn hóa, gần khu ăn trưa |
| 17:00 | 🌅 Ngắm hoàng hôn + đi bộ bãi biển | Kết thúc ngày nhẹ nhàng |

→ **5 hoạt động**, giãn cách hợp lý, không nhồi nhét. User thấy "xài được luôn" → **Aha moment**.

**Tương tác mới:**
- Mỗi mục có nút `[⊕ Thêm]` và vuốt `[✕ Xóa]` (giữ nguyên swipe từ Day 18)
- Có thể kéo thả đổi thứ tự
- Cuối timeline: **Nút nổi bật**

```
┌─────────────────────────────────────┐
│  ✓  Chốt lịch trình này            │
│     "Lịch trình Đà Nẵng 4N3Đ"      │
└─────────────────────────────────────┘
```

---

#### MH03b-NEW: ★ Celebration + Post-Core-Action

Khi user bấm **"Chốt lịch trình này"** → đây chính là **FIRST CORE ACTION**:

**UI:**
- 🎉 **Confetti animation** nhẹ (micro-animation 1.5 giây)
- "Tuyệt vời! Lịch trình Đà Nẵng 4N3Đ đã sẵn sàng. Bạn có thể chỉnh sửa bất cứ lúc nào."
- **Post-action prompts** (đây là thời điểm Delay thích hợp):
  - `[📅 Đồng bộ vào Google Calendar]` ← cấp quyền Calendar **ở đây** (thay vì onboarding)
  - `[🔔 Theo dõi giá vé & khách sạn]` ← kích hoạt hành vi nurture (M3 — Bài 2)
  - `[📤 Chia sẻ với bạn đồng hành]`
  - `[Xem chi tiết từng địa điểm →]` ← tiếp tục flow MH04+

**Lý do:** Celebration tạo dopamine hit → gắn Aha moment vào bộ nhớ. Post-action prompts xuất hiện **sau khi user đã nhận giá trị** → tỷ lệ chấp nhận cao hơn nhiều so với hỏi trước khi thấy value.

---

## 4. Before / After — So sánh tổng thể

### 4.1. Flow Comparison

| Tiêu chí | Before (Day 18) | After (Redesign) |
|---|---|---|
| **Số bước đến core action** | ∞ (không có core action) | **6 bước** (Welcome → Chọn đến → Chip → Loading → Xem lịch trình → Chốt) |
| **TTV (Time-to-Value)** | Không xác định — user xem được lịch trình nhưng không có moment "chốt" | **~90–120 giây** (≈2 phút) **[Giả định prototype]** |
| **Onboarding text** | 2 paragraph dài + 2 nút | 2 dòng ngắn + 1 nút |
| **Cách nhập điểm đến** | Chat tự do (blank page) | Destination cards + search bar |
| **Quyền Calendar** | Hỏi ngay ở onboarding | Delay sau first core action |
| **Lịch trình đầu tiên** | 6 điểm/ngày, dày đặc, di chuyển xa | 4–5 điểm/ngày, giãn cách, hợp lý |
| **Loading state** | Generic "Đang thiết kế…" | Skeleton UI + micro-progress |
| **Nút chốt (core action)** | ❌ Không có | ✅ Nổi bật cuối timeline |
| **Celebration moment** | ❌ Không có | ✅ Confetti + summary + post-action prompts |
| **Recovery path** | Vuốt xóa + báo lỗi thời | Giữ nguyên + bổ sung "Undo" |

### 4.2. Before / After per Screen

| Màn hình | Before | After | Thay đổi |
|---|---|---|---|
| MH01 | 2 paragraph + 2 CTA + hỏi quyền | Tagline + trust badge + 1 CTA | **Simplify** + Delay permission |
| MH02 | Chat trống → chip pills | Destination cards → chip pills | **Simplify** input |
| MH02c | Loading generic | Skeleton + micro-progress | **Enhance** |
| MH03 | 6 điểm dày đặc, không nút chốt | 4–5 điểm thoải mái + **nút Chốt** | **Simplify** + **Add core action** |
| MH03b | *(không tồn tại)* | Celebration + post-action prompts | **Add** hoàn toàn mới |

---

## 5. Recovery Path (Đường khôi phục)

### 5.1. Recovery paths trong flow redesign

Ngoài recovery đã có ở prototype Day 18 (vuốt xóa — MH03, báo lỗi thời — MH04), bổ sung:

| Tình huống lỗi | Người phát hiện | Recovery | Vị trí trong flow |
|---|---|---|---|
| **Lịch trình quá dày** | User (nhìn timeline chật) | Vuốt xóa điểm → AI tự giãn cách *(giữ nguyên Day 18)* | MH03-NEW |
| **Thông tin lỗi thời** (quán đóng cửa) | User (xem chi tiết, thấy nguồn cũ) | Bấm "Báo cáo sai" → AI thay thế *(giữ nguyên Day 18)* | MH04 (sau core action) |
| **🆕 Chọn sai điểm đến** | User (nhận ra sau khi xem lịch trình) | Nút **"↩ Đổi điểm đến"** ở header MH03 → quay lại MH02-NEW, giữ chip đã chọn | MH03-NEW |
| **🆕 Lỡ chốt, muốn sửa** | User (chốt rồi nhưng thấy cần chỉnh) | Bấm **"✏️ Chỉnh sửa lịch trình"** trên MH03b → quay lại MH03 ở chế độ edit, core action vẫn được tính | MH03b-NEW |
| **🆕 Undo thao tác xóa** | User (xóa nhầm điểm) | **Toast "Đã xóa Chùa Linh Ứng" + nút [Hoàn tác]** hiển thị 5 giây | MH03-NEW |
| **🆕 AI tạo lịch trình không ưng** | User (lịch trình tổng thể không hợp) | Nút **"🔄 Tạo lại lịch trình khác"** ở cuối timeline (trước nút Chốt) | MH03-NEW |

### 5.2. Recovery Flow Diagram

```
[User xem lịch trình MH03-NEW]
     │
     ├── Ưng → Bấm "Chốt" → MH03b (Celebration) → Tiếp tục
     │                              │
     │                              └── Muốn sửa? → "Chỉnh sửa" → MH03 (edit mode)
     │
     ├── Không ưng chi tiết → Vuốt xóa / kéo thả → AI cập nhật → Xem lại
     │                              │
     │                              └── Xóa nhầm? → Toast [Hoàn tác] (5 giây)
     │
     ├── Không ưng tổng thể → "Tạo lại lịch trình khác" → AI re-generate
     │
     └── Sai điểm đến → "Đổi điểm đến" → MH02-NEW (giữ chip cũ)
```

---

## 6. Activation & TTV (Time-to-Value)

### 6.1. Định nghĩa Activation

> **Activation = user hoàn thành first core action thành công** = bấm "Chốt lịch trình này" lần đầu tiên, với itinerary đủ điều kiện (theo Bài 2, mục 1.3):
> 1. Gắn với **chuyến đi thật** (có điểm đến + khoảng thời gian)
> 2. User đã **xem/chỉnh** ít nhất một phần
> 3. Có **hành vi xác nhận tường minh** (bấm "Chốt")

### 6.2. TTV — Time-to-Value

| Metric | Before (Day 18) | After (Redesign) | Ghi chú |
|---|---|---|---|
| **TTV (đến Aha moment)** | ~2–4 phút đến khi xem lịch trình, nhưng **không có core action** → value không được "seal" | **~90–120 giây** (≈1.5–2 phút) đến khi bấm Chốt | **[Giả định prototype]** — cần đo thật ở Bài 6 |
| **Số tap/click** | ~4–6 (không rõ endpoint) | **~6–8 tap** (chọn đến → 3 chip → xem → chốt) nhưng mỗi tap có value rõ ràng | Thêm tap nhưng giảm friction mỗi bước |
| **Drop-off risk cao nhất** | B3 (blank page — gõ chat) + B6 (lịch trình quá dày — overwhelm) | MH02-NEW (chọn đến — đã giảm bằng cards) + MH03-NEW (xem lịch trình — đã giảm bằng giãn cách) | |

### 6.3. Activation Funnel (dự kiến — cần tracking Bài 6)

```
MH01: Welcome (100%)
  ↓  ~95% click CTA (đơn giản, 1 nút)
MH02: Chọn điểm đến (~95%)
  ↓  ~90% chọn card hoặc gõ (giảm blank page)
MH02b: Chọn chip (~85%)
  ↓  ~98% click chip (dễ, nhanh)
MH02c: Chờ AI (~83%)
  ↓  ~95% chờ xong (skeleton giữ chân)
MH03: Xem lịch trình (~79%)
  ↓  ~75% tiếp tục chỉnh/chốt (lịch hợp lý, không overwhelm)
MH03b: ★ CHỐT (~59%)
```

> **Activation rate dự kiến: ~55–65%** (user mới → chốt itinerary đầu tiên trong session đầu). **[Giả định prototype]** — con số này cần validate bằng tracking thật (Bài 6).

---

## 7. Bàn giao cho Bài 6 (Văn) — Event Points trên Flow Redesign

Các event point cần gắn tracking trên flow mới (để Văn map ở Bài 6):

| Event | Bắn khi | Vị trí flow | Phục vụ metric |
|---|---|---|---|
| `onboarding_start` | User mở app lần đầu | MH01-NEW | Funnel top |
| `onboarding_cta_click` | User bấm "Bắt đầu lên kế hoạch" | MH01-NEW | Funnel B1→B2 |
| `destination_selected` | User chọn card hoặc gõ điểm đến | MH02-NEW | Funnel B2→B3, M3 (nurture) |
| `context_chips_selected` | User hoàn tất chọn chip (ngày/bạn/ngân sách) | MH02b-NEW | Funnel B3→B4 |
| `itinerary_created` | AI tạo xong bản nháp đầu tiên | MH02c-NEW → MH03-NEW | TTV, phễu |
| `itinerary_edited` | User chỉnh ≥1 mục (xóa/thêm/kéo thả) | MH03-NEW | Điều kiện active (Bài 2, 2.1) |
| `itinerary_regenerated` | User bấm "Tạo lại lịch trình khác" | MH03-NEW | Recovery tracking |
| `destination_changed` | User bấm "Đổi điểm đến" | MH03-NEW | Recovery tracking |
| **`itinerary_confirmed`** | **User bấm "Chốt lịch trình này"** | **MH03b-NEW** | **★ Core action, M1, M2, Activation** |
| `calendar_permission_granted` | User cấp quyền Calendar (post-action) | MH03b-NEW | Post-activation engagement |
| `price_watch_added` | User bật theo dõi giá (post-action) | MH03b-NEW | M3 (nurture) |
| `share_initiated` | User chia sẻ lịch trình | MH03b-NEW | Virality / engagement |
| `undo_action` | User bấm Hoàn tác sau khi xóa nhầm | MH03-NEW | Recovery UX quality |

---

## 8. Checklist tự nghiệm thu Bài 3

- [x] **Audit prototype Day 18** đầy đủ — liệt kê từng bước, phát hiện gap (thiếu core action).
- [x] **Current-state journey map** — bảng B1→B8 với cảm xúc user, thời gian ước tính.
- [x] **Friction audit** — mỗi bước có verdict Keep/Remove/Delay/Simplify + lý do cụ thể.
- [x] **Redesign** — flow mới MH01→MH03b, chi tiết từng màn hình before/after.
- [x] **Before/After** — bảng so sánh tổng thể + per screen.
- [x] **Recovery path** — 6 tình huống (4 mới + 2 giữ từ Day 18), flow diagram.
- [x] **Activation & TTV** — định nghĩa activation, TTV before/after, funnel dự kiến.
- [x] **Bàn giao Bài 6** — bảng event points (13 events) gắn lên flow redesign.
- [x] Nhất quán với **Bài 1** (low-frequency, không ép daily) và **Bài 2** (core action = chốt itinerary).

*Bài 3 v1.0 · AI Travel Planner · Day 20 Lab — Nguyễn Kim Hoàng · 2A202600987.*
