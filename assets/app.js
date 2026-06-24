/* ===== Navigation ===== */
function goto(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === id));
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.page === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.getElementById('nav').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (btn) goto(btn.dataset.page);
});

/* ===== Helpers ===== */
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }
function toggle(id) { document.getElementById(id).classList.toggle('hidden'); }

let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3200);
}

function setSteps(containerId, currentIndex) {
  const steps = document.querySelectorAll('#' + containerId + ' .step');
  steps.forEach((s, i) => {
    s.classList.toggle('done', i < currentIndex);
    s.classList.toggle('cur', i === currentIndex);
  });
}

/* ===== 01 Onboarding ===== */
function onb(step) {
  if (step === 'skip') { hide('onb1'); show('onb2'); toast('Bỏ qua giới thiệu — bạn vẫn kiểm soát mọi bước.'); return; }
  if (step === 2) { hide('onb1'); show('onb2'); return; }
  if (step === 'go') { goto('p02'); return; }
}

/* ===== 02 Ask flow (T2) ===== */
// AI "reads" the request, then asks
setTimeout(() => {
  const a = document.getElementById('askA');
  if (a) {
    a.classList.remove('hidden');
    const st = document.getElementById('askState');
    if (st) st.innerHTML = '<span class="state-pill ok">✓ đã hiểu yêu cầu</span>';
    setSteps('askSteps', 1);
  }
}, 1100);

const askAnswers = [];
function askPick(btn, value) {
  btn.textContent = '✓';
  btn.disabled = true;
  askAnswers.push(value);
  const box = document.getElementById('askUser');
  box.classList.remove('hidden');
  box.innerHTML = '<div class="bubble user">' + askAnswers.join(' · ') + '</div>';
  setSteps('askSteps', 2);
  if (askAnswers.length >= 3) {
    setTimeout(() => {
      show('askDraft');
      setSteps('askSteps', 3);
      const st = document.getElementById('askState');
      if (st) st.innerHTML = '<span class="state-pill ok">✓ đủ thông tin</span>';
    }, 500);
  }
}

/* ===== 03 T3 re-rank ===== */
const hotels = {
  beach: { name: '🏖️ Sea Pearl Hotel', beach: 95, cheap: 40, rated: 70 },
  cheap: { name: '💰 City Stay Inn', beach: 30, cheap: 95, rated: 60 },
  rated: { name: '⭐ Grand Riverside', beach: 55, cheap: 25, rated: 98 },
};
function rerank(changed) {
  const wB = +document.getElementById('wBeach').value;
  const wC = +document.getElementById('wCheap').value;
  const wR = +document.getElementById('wRated').value;
  document.getElementById('vBeach').textContent = wB;
  document.getElementById('vCheap').textContent = wC;
  document.getElementById('vRated').textContent = wR;

  const scored = Object.entries(hotels).map(([key, h]) => ({
    key, name: h.name,
    score: (h.beach * wB + h.cheap * wC + h.rated * wR) / (wB + wC + wR || 1)
  })).sort((a, b) => b.score - a.score);

  const list = document.getElementById('hotelList');
  const anchor = list.querySelector('button'); // keep options above the "Vì sao?" button
  scored.forEach((s, i) => {
    const el = list.querySelector('[data-h="' + s.key + '"]');
    el.classList.toggle('top', i === 0);
    el.querySelector('.rank').textContent = i === 0 ? '#1 · AI đề xuất' : '#' + (i + 1);
    list.insertBefore(el, anchor); // reorder, stay before the button
  });
  if (changed) {
    document.getElementById('rerankMsg').textContent =
      'Đã xếp lại theo trọng số của bạn → #1: ' + scored[0].name + '. (Hệ thống phản hồi ngay khi bạn sửa tiêu chí.)';
  }
}

/* ===== 03 T9 hold room (Ask) ===== */
function holdRoom() {
  const btn = document.getElementById('holdBtn');
  btn.textContent = 'Đang giữ...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Đã giữ';
    const r = document.getElementById('holdResult');
    r.classList.remove('hidden');
    r.innerHTML = '<div class="callout ok">✓ <strong>Đã giữ phòng đến 23:59 ngày mai.</strong> Chưa trừ tiền. Huỷ miễn phí trong 24h.<br><span class="muted" style="font-size:12px">Bước tiếp theo: thanh toán do bạn tự thực hiện (AI không tự làm).</span></div>';
  }, 700);
}

/* ===== 04 T6 recovery ===== */
const recFixes = {
  move: { label: 'quá nhiều di chuyển', plan: ['07:30 Bà Nà Hills (cả ngày, thong thả)', '17:30 về nghỉ', '19:00 Cầu Rồng (gần khách sạn)'], note: 'gộp các điểm gần nhau, bỏ Hội An sang ngày khác' },
  rest: { label: 'thiếu thời gian nghỉ', plan: ['08:00 Bà Nà Hills', '13:00 ăn trưa + nghỉ tại KS', '16:30 Chùa Linh Ứng', '19:00 Cầu Rồng'], note: 'chèn 2h nghỉ buổi chiều' },
  much: { label: 'quá nhiều điểm', plan: ['08:00 Bà Nà Hills', '14:00 Hội An (cả chiều)', '19:00 ăn tối Hội An'], note: 'giảm từ 6 → 3 điểm chính' },
};
function recFix(kind) {
  setSteps('recSteps', 3); // system confirms understanding
  const f = recFixes[kind];
  hide('recDraft');
  document.getElementById('recState').textContent = 'đang sửa';
  const r = document.getElementById('recResult');
  r.classList.remove('hidden');
  r.innerHTML =
    '<div class="callout">🤖 <strong>Hệ thống đã hiểu:</strong> vấn đề là "<em>' + f.label + '</em>" ở ngày 2. Mình sẽ ' + f.note + '.</div>' +
    '<div class="state-pill"><span class="dot-pulse"></span> đang dựng lại lịch ngày 2…</div>';

  setTimeout(() => {
    setSteps('recSteps', 4); // propose fix
    r.innerHTML =
      '<div class="callout ok">✓ Đã sửa ngày 2 (' + f.note + ').</div>' +
      '<div class="beforeafter">' +
        '<div><div class="label">Trước (6 điểm)</div><div class="evidence">Bà Nà · Hội An · Rừng dừa · Linh Ứng · Cầu Rồng · Chợ đêm</div></div>' +
        '<div><div class="label ok">Sau</div><div class="evidence">' + f.plan.map(p => '• ' + p).join('<br>') + '</div></div>' +
      '</div>' +
      '<div class="row" style="margin-top:12px">' +
        '<button class="btn primary" onclick="recContinue()">Dùng lịch mới, xem ngày 3 →</button>' +
        '<button class="btn ghost" onclick="recFixReset()">Chưa ổn, sửa tiếp</button>' +
      '</div>';
  }, 1100);
}
function recFixReset() {
  document.getElementById('recResult').classList.add('hidden');
  document.getElementById('recDraft').classList.remove('hidden');
  document.getElementById('recState').textContent = 'bản nháp';
  setSteps('recSteps', 1);
}
function recContinue() {
  setSteps('recSteps', 6); // continue + remember
  const r = document.getElementById('recResult');
  document.getElementById('recState').textContent = 'đã cập nhật';
  r.innerHTML =
    '<div class="callout ok">✓ <strong>Đã áp dụng.</strong> Bạn tiếp tục được tới ngày 3 — mục tiêu (có lịch trình thực tế) đang hoàn thành.</div>' +
    '<div class="callout">🧠 <strong>Hệ thống ghi nhớ gì:</strong> "Bạn thích lịch <em>thưa, ít di chuyển</em> cho <u>chuyến này</u>." ' +
    '<div class="row" style="margin-top:8px">' +
      '<button class="btn sm" onclick="toast(\'Đã lưu cho các chuyến sau. Sửa được trong Cài đặt.\')">Áp dụng cho chuyến sau</button>' +
      '<button class="btn sm ghost" onclick="toast(\'OK — chỉ áp dụng chuyến này, không ghi nhớ lâu dài.\')">Chỉ chuyến này</button>' +
    '</div></div>';
}

/* ===== 04 T7 outdated info ===== */
function t7(action) {
  const r = document.getElementById('t7Result');
  r.classList.remove('hidden');
  if (action === 'call') {
    r.innerHTML = '<div class="callout">📞 Số quán: <span class="src">0236 123 456</span> — gọi xác nhận giờ mở cửa trước khi đi. AI giữ chỗ này trong lịch &amp; gắn nhãn "chờ xác nhận".</div>';
  } else if (action === 'alt') {
    r.innerHTML = '<div class="callout ok">🔄 2 quán thay thế (dữ liệu mới hơn, &lt;1 tháng):<br>• Bếp Hồi An — 4.4★, mở tới 22:00<br>• Madame Lân — 4.3★, gần biển<br><span class="muted" style="font-size:12px">Bạn chọn 1 để thay vào lịch.</span></div>';
  } else {
    r.innerHTML = '<div class="callout warn">⚠ Đã giữ trong lịch &amp; gắn cờ "tôi tự kiểm tra". AI sẽ không khẳng định quán còn mở.</div>';
  }
}

/* init re-rank message */
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('wBeach')) rerank();
});

/* ===================================================================== */
/* ===== 08 · DAY 20 — Onboarding → First Core Action (redesign) ======= */
/* ===================================================================== */
const d20State = { dest: 'Đà Nẵng', days: '', companion: '', budget: '' };
let d20Started = false, d20T0 = 0, d20Timer = null, d20LastRemoved = null, d20UndoTimer = null;

const D20_BASE = [
  { t: '09:00', a: '☀️ Ăn sáng Mì Quảng Bà Vị',      n: 'Gần khách sạn' },
  { t: '10:00', a: '🏖️ Tắm biển & thư giãn Mỹ Khê',   n: 'Block 2.5h — đúng mục tiêu “xả stress”' },
  { t: '12:30', a: '🍜 Ăn trưa hải sản Năm Châu',      n: '4.5★ · dữ liệu cập nhật mới' },
  { t: '14:30', a: '🏔️ Tham quan Ngũ Hành Sơn',       n: '1 điểm văn hoá, gần khu ăn trưa' },
  { t: '17:00', a: '🌅 Ngắm hoàng hôn + dạo biển',     n: 'Kết thúc ngày nhẹ nhàng' },
];
let d20Itin = [];

const D20_PROG = ['🔍 Đang tìm điểm đến phù hợp…', '🏨 Đang chọn khách sạn khu vực trung tâm…', '📋 Đang ghép lịch trình tối ưu…'];

function d20Log(name, meta, core) {
  const box = document.getElementById('d20log');
  if (!box) return;
  const ph = box.querySelector('.muted'); if (ph) box.innerHTML = '';
  const row = document.createElement('div');
  if (core) row.className = 'core';
  row.innerHTML = '<code>' + name + '</code>' + (meta ? ' <span class="meta">· ' + meta + '</span>' : '');
  box.appendChild(row); box.scrollTop = box.scrollHeight;
}

function d20Enter() {           // fire when user first opens the Day 20 page
  if (d20Started) return;
  d20Started = true;
  d20Log('onboarding_start', 'user mở flow Day 20');
}
document.getElementById('nav').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (b && b.dataset.page === 'p08') d20Enter();
});

function d20Show(stage) {
  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(s =>
    document.getElementById('d20' + s).classList.toggle('hidden', s !== stage));
}

function d20Tick() {
  if (!d20T0) return;
  document.getElementById('d20ttv').textContent = 'TTV ' + Math.round((Date.now() - d20T0) / 1000) + 's';
}

function d20Go(stage) {
  d20Enter();   // đảm bảo onboarding_start đã được ghi
  if (stage === 'b' && !document.getElementById('d20a').classList.contains('hidden')) {
    // coming from Welcome → start TTV timer + log CTA
    d20T0 = Date.now(); clearInterval(d20Timer); d20Timer = setInterval(d20Tick, 1000);
    d20Log('onboarding_cta_click', 'bấm “Bắt đầu lên kế hoạch”');
  }
  if (stage === 'b') { document.getElementById('d20bar').textContent = 'Chọn điểm đến'; d20Show('b'); return; }
  if (stage === 'c') { document.getElementById('d20bar').textContent = 'Bối cảnh chuyến đi'; d20Show('c'); return; }
  if (stage === 'd') {
    d20Log('context_chips_selected', [d20State.days, d20State.companion, d20State.budget].filter(Boolean).join(' · ') || 'mặc định');
    document.getElementById('d20bar').textContent = 'AI đang tạo…';
    d20Show('d'); d20Skeleton(); return;
  }
}

function d20Dest(v) {
  v = (v || '').trim(); if (!v) return;
  d20State.dest = v;
  d20Log('destination_selected', v);
  d20Go('c');
}

function d20ChangeDest() { d20Log('destination_changed', 'user quay lại đổi điểm đến'); d20Go('b'); }

function d20Sel(btn, group, val) {
  const wrap = btn.closest('.chgroup');
  wrap.querySelectorAll('.selchip').forEach(c => c.classList.remove('on'));
  btn.classList.add('on');
  d20State[group] = val;
}

function d20Skeleton() {
  let i = 0; const el = document.getElementById('d20prog'); el.textContent = D20_PROG[0];
  const iv = setInterval(() => { i++; if (i < D20_PROG.length) el.textContent = D20_PROG[i]; }, 800);
  setTimeout(() => {
    clearInterval(iv);
    d20Itin = D20_BASE.slice();
    d20RenderItin();
    d20Log('itinerary_created', d20State.dest + ' · ngày 1 · ' + d20Itin.length + ' điểm');
    document.getElementById('d20bar').textContent = 'Lịch trình ngày 1';
    d20Show('e');
  }, 2500);
}

function d20RenderItin() {
  const days = d20State.days && d20State.days !== 'linh hoạt' ? d20State.days : 'lịch gợi ý';
  document.getElementById('d20sum').textContent = d20State.dest + ' · ' + days;
  const ul = document.getElementById('d20itin'); ul.innerHTML = '';
  d20Itin.forEach((it, idx) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="tm">' + it.t + '</span>' +
      '<span class="ac">' + it.a + '<small>' + it.n + '</small></span>' +
      '<button class="del" title="Xoá điểm này" onclick="d20Del(' + idx + ')">✕</button>';
    ul.appendChild(li);
  });
}

function d20Del(idx) {
  d20LastRemoved = { item: d20Itin[idx], index: idx };
  d20Itin.splice(idx, 1);
  d20RenderItin();
  d20Log('itinerary_edited', 'xoá “' + d20LastRemoved.item.a + '”');
  const bar = document.getElementById('d20undo');
  bar.classList.remove('hidden');
  bar.innerHTML = '<span>Đã xoá ' + d20LastRemoved.item.a + '</span><button onclick="d20Undo()">↩ Hoàn tác</button>';
  clearTimeout(d20UndoTimer);
  d20UndoTimer = setTimeout(() => bar.classList.add('hidden'), 5000);
}

function d20Undo() {
  if (!d20LastRemoved) return;
  d20Itin.splice(Math.min(d20LastRemoved.index, d20Itin.length), 0, d20LastRemoved.item);
  d20RenderItin();
  d20Log('undo_action', 'hoàn tác xoá “' + d20LastRemoved.item.a + '”');
  document.getElementById('d20undo').classList.add('hidden');
  d20LastRemoved = null;
}

function d20Regen() {
  d20Log('itinerary_regenerated', 'user yêu cầu lịch trình khác');
  document.getElementById('d20bar').textContent = 'AI đang tạo lại…';
  d20Show('d'); d20Skeleton();
}

function d20Confirm() {                       // ★ FIRST CORE ACTION / ACTIVATION
  clearInterval(d20Timer);
  const s = d20T0 ? Math.round((Date.now() - d20T0) / 1000) : null;
  const days = d20State.days && d20State.days !== 'linh hoạt' ? (' ' + d20State.days) : '';
  document.getElementById('d20done').textContent = d20State.dest + days;
  document.getElementById('d20bar').textContent = '✓ Đã chốt';
  d20Log('itinerary_confirmed', '★ CORE ACTION · Activation' + (s != null ? ' · TTV ' + s + 's' : ''), true);
  d20Show('f');
}

function d20Cal()   { d20Log('calendar_permission_granted', 'cấp quyền Calendar SAU core action (Delay)'); toast('📅 Đã đồng bộ lịch trình vào Google Calendar.'); }
function d20Watch() { d20Log('price_watch_added', 'bật theo dõi giá → nurture (M3)'); toast('🔔 Đã bật theo dõi giá vé & khách sạn cho ' + d20State.dest + '. Báo khi giá đổi.'); }
function d20Share() { d20Log('share_initiated', 'tạo link chia sẻ'); toast('📤 Đã tạo link chia sẻ cho bạn đồng hành.'); }

function d20Reset() {
  d20State.dest = 'Đà Nẵng'; d20State.days = ''; d20State.companion = ''; d20State.budget = '';
  d20Itin = []; d20LastRemoved = null; d20T0 = 0; clearInterval(d20Timer);
  document.getElementById('d20ttv').textContent = 'TTV ~0s';
  document.getElementById('d20bar').textContent = 'WanderAI';
  document.getElementById('d20undo').classList.add('hidden');
  document.querySelectorAll('#d20c .selchip').forEach(c => c.classList.remove('on'));
  document.getElementById('d20log').innerHTML = '<span class="muted">Chạy flow để thấy event bắn theo từng bước…</span>';
  d20Started = false;
  d20Show('a');
  d20Enter();
}
