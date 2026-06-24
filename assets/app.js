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
