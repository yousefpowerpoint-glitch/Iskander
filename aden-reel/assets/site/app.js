/* Harvard American Institute, Aden: everything that moves or answers on the page.
   No libraries. Animations use transform/opacity and IntersectionObserver, and stand still under reduced motion. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // the institute's WhatsApp (from its public directory listing: confirm with the institute before going live)
  const WA = '967773344996'; // the institute's WhatsApp
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lang = 'ar';
  const t = (ar, en) => (lang === 'ar' ? ar : en);
  const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const toAscii = v => String(v).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

  /* ---------- language: Arabic first, English on request ---------- */
  function applyLang() {
    const html = document.documentElement;
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-en]').forEach(el => {
      if (el.dataset.ar === undefined) el.dataset.ar = el.textContent;
      el.textContent = lang === 'ar' ? el.dataset.ar : el.dataset.en;
    });
    $$('[data-en-ph]').forEach(el => {
      if (el.dataset.arPh === undefined) el.dataset.arPh = el.placeholder;
      el.placeholder = lang === 'ar' ? el.dataset.arPh : el.dataset.enPh;
    });
    // the highlighted word in the hero keeps its marker in both languages
    const h1 = $('.hero h1');
    h1.innerHTML = lang === 'ar' ? 'تعلّم الإنجليزي والحاسوب والمحاسبة في <mark>المنصورة</mark>' : 'English, computing and accounting in <mark>Al-Mansoura</mark>';
    $('#lang').textContent = lang === 'ar' ? 'EN' : 'عربي';
    $('#lang').setAttribute('aria-label', lang === 'ar' ? 'English' : 'العربية');
    document.title = t('معهد هارفرد الأمريكي · عدن', 'Harvard American Institute · Aden');
    renderFilters(); renderBatches(); renderCourseSelect(); renderQuiz(); renderFaq(); wireWa(); renderTyper();
  }
  $('#lang').onclick = () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); };

  /* ---------- header: a hairline once the page has scrolled, and the phone menu ---------- */
  const top = $('#top');
  new IntersectionObserver(([e]) => top.classList.toggle('scrolled', !e.isIntersecting)).observe($('.hero h1'));
  const nav = $('#nav'), menu = $('#menu');
  const setMenu = open => { nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', open); };
  menu.onclick = () => setMenu(!nav.classList.contains('open'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- the board: a phrase is written in English, then its Arabic answer is highlighted ---------- */
  const PHRASES = [
    ['I can do it.', 'أقدر أسويها'],
    ['Nice to meet you.', 'تشرّفت بمعرفتك'],
    ['Where is the library?', 'وين المكتبة؟'],
    ['I passed the test!', 'نجحت في الاختبار!'],
    ['See you tomorrow.', 'أشوفك بكرة']
  ];
  const sayEn = $('#say-en'), sayAr = $('#say-ar');
  let boardOn = true, phraseTimer = 0;
  const wait = ms => new Promise(r => { phraseTimer = setTimeout(r, ms); });
  async function board() {
    for (let i = 0; ; i = (i + 1) % PHRASES.length) {
      const [en, ar] = PHRASES[i];
      sayAr.style.setProperty('--hl', 0); sayAr.style.opacity = 0; sayEn.textContent = '';
      for (let k = 1; k <= en.length; k++) { sayEn.textContent = en.slice(0, k); await wait(55); }
      await wait(350);
      sayAr.textContent = ar; sayAr.style.transition = 'opacity .4s'; sayAr.style.opacity = 1;
      await wait(250); sayAr.style.setProperty('--hl', 1);
      await wait(2600);
      while (!boardOn) await wait(400); // paused while off screen
    }
  }
  if (reduce) { sayEn.textContent = PHRASES[0][0]; sayAr.textContent = PHRASES[0][1]; sayAr.style.setProperty('--hl', 1); }
  else {
    new IntersectionObserver(([e]) => { boardOn = e.isIntersecting; }).observe($('.stage'));
    board();
  }

  /* ---------- hero toys: pick up any floating object, drag it, throw it; it glides, bounces off the
     edges and settles. Uses the CSS translate property, so the gentle float animation keeps running. ---------- */
  const stage = $('#stage');
  $$('.float', stage).forEach(el => {
    el.classList.add('drag');
    let x = 0, y = 0, vx = 0, vy = 0, lastX = 0, lastY = 0, lastT = 0, raf = 0, base = null;
    const place = () => { el.style.translate = `${x}px ${y}px`; };
    const bounds = () => { // how far the object may move inside the stage (a little overflow allowed)
      const s = stage.getBoundingClientRect(), r = base;
      return { minX: s.left - r.left - 20, maxX: s.right - r.right + 20, minY: s.top - r.top - 20, maxY: s.bottom - r.bottom + 40 };
    };
    el.addEventListener('pointerdown', e => {
      cancelAnimationFrame(raf); el.setPointerCapture(e.pointerId); el.classList.add('held');
      const r = el.getBoundingClientRect(); base = { left: r.left - x, right: r.right - x, top: r.top - y, bottom: r.bottom - y };
      lastX = e.clientX; lastY = e.clientY; lastT = performance.now(); vx = vy = 0;
      $('#toy-hint').classList.add('gone');
    });
    el.addEventListener('pointermove', e => {
      if (!el.classList.contains('held')) return;
      const now = performance.now(), dt = Math.max(8, now - lastT), b = bounds();
      x = Math.min(b.maxX, Math.max(b.minX, x + e.clientX - lastX)); y = Math.min(b.maxY, Math.max(b.minY, y + e.clientY - lastY));
      vx = (e.clientX - lastX) / dt * 16; vy = (e.clientY - lastY) / dt * 16;
      lastX = e.clientX; lastY = e.clientY; lastT = now; place();
    });
    const release = () => {
      if (!el.classList.contains('held')) return;
      el.classList.remove('held');
      if (reduce) return;
      const b = bounds();
      const glide = () => { // friction + soft bounce off the stage edges
        x += vx; y += vy; vx *= .92; vy *= .92;
        if (x < b.minX || x > b.maxX) { x = Math.min(b.maxX, Math.max(b.minX, x)); vx *= -.55; }
        if (y < b.minY || y > b.maxY) { y = Math.min(b.maxY, Math.max(b.minY, y)); vy *= -.55; }
        place();
        if (Math.abs(vx) > .2 || Math.abs(vy) > .2) raf = requestAnimationFrame(glide);
      };
      raf = requestAnimationFrame(glide);
    };
    el.addEventListener('pointerup', release); el.addEventListener('pointercancel', release);
  });

  /* ---------- upcoming intakes (sample dates, counted from today so the preview never looks stale) ---------- */
  const CATS = [['all', 'الكل', 'All'], ['en', 'الإنجليزي', 'English'], ['pc', 'الحاسوب', 'Computing'], ['acc', 'المحاسبة', 'Accounting'], ['pro', 'المهني', 'Vocational']];
  // the institute is closed on Fridays: a sample date that lands on one moves to Saturday
  const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); if (d.getDay() === 5) d.setDate(d.getDate() + 1); return d; };
  const daysUntil = d => { const now = new Date(); now.setHours(0, 0, 0, 0); return Math.round((d - now) / 864e5); };
  const BATCHES = [
    { cat: 'en', ar: 'الإنجليزي: المستوى الأول (تأسيس)', en: 'English: Level 1 (foundation)', in: 6, pm: false, time: [9, 0], weeks: 5 },
    { cat: 'en', ar: 'الإنجليزي: محادثة', en: 'English: conversation', in: 9, pm: true, time: [4, 30], weeks: 5 },
    { cat: 'pc', ar: 'الحاسوب: برامج المكتب', en: 'Computing: office tools', in: 13, pm: true, time: [5, 0], weeks: 6 },
    { cat: 'acc', ar: 'المحاسبة المالية', en: 'Financial accounting', in: 16, pm: false, time: [10, 0], weeks: 6 },
    { cat: 'pro', ar: 'إدخال البيانات والطباعة', en: 'Data entry and typing', in: 20, pm: true, time: [4, 0], weeks: 4 },
    { cat: 'en', ar: 'الإنجليزي: المستوى الثاني', en: 'English: Level 2', in: 27, pm: false, time: [9, 0], weeks: 5 }
  ];
  let cat = 'all';
  const loc = () => (lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB');
  const clock = ([h, m], pm) => `${h}:${String(m).padStart(2, '0')} ${pm ? t('م', 'pm') : t('ص', 'am')}`;
  const inDays = n => lang === 'ar'
    ? (n === 1 ? 'تبدأ بكرة' : n === 2 ? 'تبدأ بعد يومين' : n <= 10 ? `تبدأ بعد ${n} أيام` : `تبدأ بعد ${n} يوم`)
    : (n === 1 ? 'Starts tomorrow' : `Starts in ${n} days`);
  function renderFilters() {
    $('#filters').innerHTML = CATS.map(([k, ar, en]) => `<button class="chip" role="tab" type="button" data-cat="${k}" aria-selected="${k === cat}">${t(ar, en)}</button>`).join('');
  }
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-goto]'); if (!g) return;
    cat = g.dataset.goto; renderFilters(); renderBatches();
  });
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    cat = b.dataset.cat; $$('.chip').forEach(c => c.setAttribute('aria-selected', c === b)); renderBatches();
  });
  function renderBatches() {
    const list = BATCHES.filter(b => cat === 'all' || b.cat === cat);
    $('#batch-list').innerHTML = list.length ? list.map((b, n) => {
      const d = day(b.in), name = t(b.ar, b.en), when = d.toLocaleDateString(loc(), { weekday: 'long', day: 'numeric', month: 'long' });
      const msg = t(`السلام عليكم، أبي أحجز مقعد في دورة ${b.ar} اللي تبدأ ${when}، الفترة ${b.pm ? 'المسائية' : 'الصباحية'}.`,
        `Hello, I would like to book a seat in ${b.en}, starting ${when}, ${b.pm ? 'evening' : 'morning'} group.`);
      return `<article class="batch" style="--n:${n}">
        <div class="date"><em>${d.toLocaleDateString(loc(), { weekday: 'short' })}</em><b>${d.getDate()}</b><span>${d.toLocaleDateString(loc(), { month: 'short' })}</span></div>
        <div>
          <h3>${name}</h3>
          <div class="meta">
            <span><svg class="ic"><use href="#i-${b.pm ? 'moon-stars' : 'sun-horizon'}"/></svg>${b.pm ? t('مسائي', 'Evening') : t('صباحي', 'Morning')} ${clock(b.time, b.pm)}</span>
            <span><svg class="ic"><use href="#i-hourglass-medium"/></svg>${lang === 'ar' ? `${b.weeks} أسابيع` : `${b.weeks} weeks`}</span>
          </div>
          <p class="soon">${inDays(daysUntil(d))}</p>
        </div>
        <a class="btn btn-ghost" href="${waLink(msg)}" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp-logo"/></svg>${t('احجز مقعدك', 'Book your seat')}</a>
      </article>`;
    }).join('') : `<p class="empty">${t('ما فيه دفعات في هذا القسم حاليًا. سجّل اهتمامك ونبلغك أول ما تنفتح دفعة.', 'No intakes in this area right now. Register your interest and we will tell you when one opens.')}</p>`;
  }

  /* ---------- challenge yourself: six questions, just for fun ---------- */
  const QUESTIONS = [
    { q: '___ name is Ali.', o: ['I', 'My', 'Me'], a: 1, why: ['قبل الاسم نستخدم My (اسمي).', 'Use My before a noun: My name.'] },
    { q: 'She ___ to school every day.', o: ['go', 'going', 'goes'], a: 2, why: ['مع She في الحاضر البسيط نضيف s: goes.', 'Present simple with she takes -s: goes.'] },
    { q: 'I ___ in Aden since 2015.', o: ['have lived', 'live', 'am living'], a: 0, why: ['مع since نستخدم المضارع التام: have lived.', 'With since we use the present perfect: have lived.'] },
    { q: 'If I ___ more time, I would travel.', o: ['have', 'had', 'will have'], a: 1, why: ['الشرط الثاني: If + الماضي، ثم would.', 'Second conditional: If + past, then would.'] },
    { q: 'This book ___ by millions of students.', o: ['has read', 'was reading', 'has been read'], a: 2, why: ['المبني للمجهول في المضارع التام: has been read.', 'Present perfect passive: has been read.'] },
    { q: 'Choose the closest meaning: "reluctant"', o: ['unwilling', 'excited', 'ready'], a: 0, why: ['reluctant تعني متردد أو مو راغب: unwilling.', 'Reluctant means not wanting to: unwilling.'] }
  ];
  const LEVELS = [
    { min: 0, ar: 'بداية حلوة', en: 'Good start', noteAr: 'كل خبير بدأ من هنا. جرّب مرة ثانية!', noteEn: 'Every expert started here. Try again!' },
    { min: 2, ar: 'زين!', en: 'Nice!', noteAr: 'عندك أساس، والتدريب يوصلك أبعد.', noteEn: 'You have a base, and practice takes you further.' },
    { min: 4, ar: 'ممتاز!', en: 'Great!', noteAr: 'إنجليزيك قوي. تحدّى أصحابك يجربون.', noteEn: 'Your English is strong. Challenge your friends.' },
    { min: 6, ar: 'خارق!', en: 'Perfect!', noteAr: 'ست من ست! ما شاء الله عليك.', noteEn: 'Six out of six. Impressive!' }
  ];
  let qi = 0, score = 0, answered = false;
  function renderQuiz() {
    const card = $('#quiz-card');
    if (qi >= QUESTIONS.length) {
      const L = [...LEVELS].reverse().find(l => score >= l.min);
      card.innerHTML = `<div class="result">
        <span class="q-count">${t(`نتيجتك ${score} من ${QUESTIONS.length}`, `You scored ${score} of ${QUESTIONS.length}`)}</span>
        <div class="lvl">${t(L.ar, L.en)}</div>
        <p>${t(L.noteAr, L.noteEn)}</p>
        <div class="acts">
          <a class="btn btn-brand" href="#batches"><svg class="ic"><use href="#i-calendar-blank"/></svg>${t('شوف الدورات القادمة', 'See upcoming intakes')}</a>
          <button class="btn btn-ghost" type="button" data-restart>${t('العب مرة ثانية', 'Play again')}</button>
        </div></div>`;
      return;
    }
    const Q = QUESTIONS[qi];
    answered = false;
    card.innerHTML = `<span class="q-count">${t(`سؤال ${qi + 1} من ${QUESTIONS.length}`, `Question ${qi + 1} of ${QUESTIONS.length}`)}</span>
      <p class="q-text">${Q.q}</p>
      <div class="q-opts">${Q.o.map((o, i) => `<button class="q-opt" type="button" data-i="${i}"><span>${o}</span></button>`).join('')}</div>
      <p class="q-meaning" id="q-why"></p>`;
  }
  $('#quiz-card').addEventListener('click', e => {
    if (e.target.closest('[data-restart]')) { qi = 0; score = 0; renderQuiz(); return; }
    const b = e.target.closest('.q-opt'); if (!b || answered) return;
    answered = true;
    const Q = QUESTIONS[qi], pick = +b.dataset.i, good = pick === Q.a;
    if (good) score++;
    $$('.q-opt').forEach((x, i) => { x.disabled = true; if (i === Q.a) x.classList.add('right'); else if (i === pick) x.classList.add('wrong'); });
    b.insertAdjacentHTML('beforeend', `<svg class="ic"><use href="#i-${good ? 'check' : 'x'}"/></svg>`);
    $('#q-why').textContent = (good ? t('صح! ', 'Correct! ') : '') + t(Q.why[0], Q.why[1]);
    setTimeout(() => { qi++; renderQuiz(); }, reduce ? 900 : 1500);
  });

  /* ---------- the journey line draws itself when the section comes into view ---------- */
  const pathEl = $('#path-d');
  if (pathEl) $('#journey').style.setProperty('--len', Math.ceil(pathEl.getTotalLength()));
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { $('#journey').classList.add('drawn'); o.disconnect(); } }, { threshold: .35 }).observe($('#journey'));

  /* ---------- scroll reveal ---------- */
  const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px' });
  $$('.reveal').forEach(el => rio.observe(el));

  /* ---------- certificate check (preview: one sample number) ---------- */
  $('#verify-form').addEventListener('submit', e => {
    e.preventDefault();
    const v = toAscii($('#cert').value).trim().toUpperCase().replace(/\s+/g, '');
    const out = $('#verify-out');
    if (!v) { out.className = 'verify-out none'; out.innerHTML = `<span>${t('اكتب رقم الشهادة أولًا.', 'Enter a certificate number first.')}</span>`; return; }
    if (v === 'HAI-2026-0418') {
      out.className = 'verify-out good';
      out.innerHTML = `<svg class="ic"><use href="#i-seal-check"/></svg><span><b>${t('شهادة صحيحة وصادرة من المعهد', 'Valid certificate issued by the institute')}</b>
        <small>${t('دورة الإنجليزي: المستوى الثالث · أكتوبر 2026', 'English course: Level 3 · October 2026')}</small></span>`;
    } else {
      out.className = 'verify-out none';
      out.innerHTML = `<svg class="ic"><use href="#i-magnifying-glass"/></svg><span><b>${t('ما لقينا شهادة بهذا الرقم', 'No certificate found with this number')}</b>
        <small>${t('تأكد من الرقم المطبوع، أو تواصل مع المعهد.', 'Check the printed number, or contact the institute.')}</small></span>`;
    }
  });

  /* ---------- register interest: checked here, sent as one tidy WhatsApp message ---------- */
  const reg = $('#reg');
  function renderCourseSelect() {
    const keep = reg.course.value;
    reg.course.innerHTML = CATS.slice(1).map(([k, ar, en]) => `<option value="${k}">${t(ar, en)}</option>`).join('');
    if (keep) reg.course.value = keep;
  }
  const NAME_OK = /^[A-Za-zء-غف-يً-ْ ]{2,60}$/;
  const fieldErr = (input, msg) => {
    const box = input.closest('.field').querySelector('.err');
    box.textContent = msg || ''; box.hidden = !msg; input.classList.toggle('bad', !!msg);
  };
  reg.phone.addEventListener('input', () => {
    const d = toAscii(reg.phone.value).replace(/\D/g, '').replace(/^0/, '').slice(0, 9);
    if (d !== reg.phone.value) reg.phone.value = d;
  });
  reg.cc.addEventListener('change', () => { reg.phone.placeholder = reg.cc.value === '967' ? '7XX XXX XXX' : '5XX XXX XXX'; });
  reg.name.addEventListener('input', () => { reg.name.value = reg.name.value.replace(/[^A-Za-zء-غف-يً-ْ ]/g, '').replace(/\s{2,}/g, ' '); });
  reg.addEventListener('submit', e => {
    e.preventDefault();
    const name = reg.name.value.trim(), phone = reg.phone.value, cc = reg.cc.value;
    const nameOk = NAME_OK.test(name), phoneOk = new RegExp(`^${cc === '967' ? 7 : 5}\\d{8}$`).test(phone);
    fieldErr(reg.name, nameOk ? '' : t('اكتب اسمك بالحروف (حرفين على الأقل).', 'Please write your name in letters.'));
    fieldErr(reg.phone, phoneOk ? '' : cc === '967' ? t('رقم يمني من 9 أرقام يبدأ بـ 7.', 'A Yemeni number: 9 digits starting with 7.') : t('رقم سعودي من 9 أرقام يبدأ بـ 5.', 'A Saudi number: 9 digits starting with 5.'));
    if (!nameOk) return reg.name.focus();
    if (!phoneOk) return reg.phone.focus();
    const course = reg.course.selectedOptions[0].textContent, period = reg.period.selectedOptions[0].textContent;
    const msg = t(`السلام عليكم، أبي أسجّل اهتمامي:\nالاسم: ${name}\nالجوال: +${cc}${phone}\nالدورة: ${course}\nالوقت المناسب: ${period}`,
      `Hello, I would like to register my interest:\nName: ${name}\nMobile: +${cc}${phone}\nCourse: ${course}\nPreferred time: ${period}`);
    open(waLink(msg), '_blank', 'noopener');
    $('#reg-ok').hidden = false;
  });

  /* ---------- questions ---------- */
  const FAQ = [
    ['هل لازم يكون عندي أساس في الإنجليزي؟', 'Do I need any English before I join?', 'لا، فيه دورات تبدأ من التأسيس. تواصل معنا على الواتساب ونساعدك تختار الدورة المناسبة.', 'No. Some courses start from the very basics. Message us on WhatsApp and we will help you choose.'],
    ['متى تبدأ الدفعات الجديدة؟', 'When do new groups start?', 'تلقى أقرب المواعيد في قسم الدورات القادمة، أو اسألنا على الواتساب.', 'The nearest dates are in the upcoming intakes section, or ask us on WhatsApp.'],
    ['فيه دوام صباحي ومسائي؟', 'Are there morning and evening classes?', 'نعم، أغلب الدورات لها دفعة صباحية ودفعة مسائية، فتختار الوقت اللي يناسبك.', 'Yes. Most courses run a morning and an evening group, so you can pick what suits you.'],
    ['كم الرسوم وكيف أدفع؟', 'What are the fees and how do I pay?', 'الرسوم تختلف حسب الدورة. أرسل لنا على الواتساب ونرسل لك الرسوم الحالية وطريقة الدفع.', 'Fees depend on the course. Message us on WhatsApp and we will send current fees and how to pay.'],
    ['هل أحصل على شهادة؟', 'Will I get a certificate?', 'نعم، بعد إكمال الدورة تحصل على شهادة برقم خاص، وأي جهة تقدر تتحقق منها من قسم «تحقق من شهادة».', 'Yes. You receive a numbered certificate, and anyone can verify it in the certificate check section.']
  ];
  function renderFaq() {
    $('#faq-list').innerHTML = FAQ.map(([qa, qe, aa, ae], i) => `<details${i === 0 ? ' open' : ''}><summary>${t(qa, qe)}<svg class="ic"><use href="#i-plus"/></svg></summary><p>${t(aa, ae)}</p></details>`).join('');
  }

  /* ---------- WhatsApp shortcuts ---------- */
  function wireWa() {
    const MSG = {
      booking: t('السلام عليكم، أبي أحجز مقعد في إحدى دوراتكم.', 'Hello, I would like to book a seat in one of your courses.'),
      hello: t('السلام عليكم، أبي أستفسر عن دورات المعهد.', 'Hello, I would like to ask about your courses.')
    };
    $$('[data-wa]').forEach(a => { a.href = waLink(MSG[a.dataset.wa]); });
    $$('.wa-num').forEach(s => { s.textContent = '+' + WA.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4'); });
  }

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* ---------- type it in English: letters fly from the keyboard onto the line ----------
     A key can be tapped (the letter flies up by itself) or dragged and dropped on the board. Two modes:
     "your name" (written naturally: capital first letter, the rest small) and a word challenge with points.
     The real keyboard works too while this section is on screen. */
  const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const WORDS = [
    ['cat', 'قطة', 'cat'], ['sun', 'شمس', 'sun'], ['car', 'سيارة', 'car'], ['book', 'كتاب', 'book-open'], ['fish', 'سمكة', 'fish'],
    ['tree', 'شجرة', 'tree'], ['bird', 'عصفور', 'bird'], ['star', 'نجمة', 'star'], ['heart', 'قلب', 'heart'], ['house', 'بيت', 'house'],
    ['plane', 'طيارة', 'airplane'], ['pencil', 'قلم رصاص', 'pencil-simple'], ['student', 'طالب', 'student'], ['keyboard', 'كيبورد', 'keyboard']
  ];
  const ty = { mode: 'name', name: '', done: false, word: null, filled: [], points: 0, order: [] };
  const tyBoard = $('#ty-board'), line = $('#ty-line'), kb = $('#kb');
  const nice = s => s.replace(/(^|\s)([a-z])/g, (m, a, b) => a + b.toUpperCase()); // Yousef Ali
  let tyVisible = false;
  new IntersectionObserver(([e]) => { tyVisible = e.isIntersecting; }, { threshold: .3 }).observe($('#typer'));

  function renderKeyboard() {
    const special = ty.mode === 'name'
      ? `<button class="key wide" type="button" data-k="back" aria-label="مسح"><svg class="ic"><use href="#i-backspace"/></svg></button><button class="key space" type="button" data-k=" " aria-label="space"></button><button class="key wide go" type="button" data-k="done">${t('تم', 'Done')}</button>`
      : `<button class="key wide" type="button" data-k="back" aria-label="مسح"><svg class="ic"><use href="#i-backspace"/></svg></button>`;
    kb.innerHTML = ROWS.map(r => `<div class="kb-row">${[...r].map(c => `<button class="key" type="button" data-k="${c}">${c}</button>`).join('')}</div>`).join('') + `<div class="kb-row">${special}</div>`;
  }
  function nextWord() {
    if (!ty.order.length) ty.order = WORDS.map((_, i) => i).sort(() => Math.random() - .5);
    ty.word = WORDS[ty.order.pop()]; ty.filled = []; renderBoard();
  }
  function renderBoard() {
    $$('.ty-tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.mode === ty.mode));
    $('#ty-score').hidden = ty.mode === 'name';
    kb.hidden = ty.mode === 'memory' || ty.mode === 'order';
    if (ty.mode === 'memory') return renderMemory();
    if (ty.mode === 'order') return renderOrder();
    $('#ty-points').textContent = ty.points;
    const res = $('#ty-result'), acts = $('#ty-acts'), prompt = $('#ty-prompt');
    if (ty.mode === 'name') {
      prompt.innerHTML = '';
      if (ty.done) {
        line.innerHTML = '';
        res.innerHTML = `<div class="hello">Hello, <mark>${esc(nice(ty.name.trim()))}</mark>!</div>
          <p>${t('أول خطوة في الإنجليزي إنك تكتب اسمك. الخطوة الجاية عندنا.', 'Writing your name is the first step in English. The next one is with us.')}</p>
          <a class="link" href="#quiz"><span>${t('تحدّ نفسك', 'Challenge yourself')}</span><svg class="ic"><use href="#i-arrow-left"/></svg></a>`;
        acts.innerHTML = `<button class="btn btn-ghost" type="button" data-ty="again"><svg class="ic"><use href="#i-arrow-clockwise"/></svg>${t('اكتب اسم ثاني', 'Write another name')}</button>
          <button class="btn btn-brand" type="button" data-ty="game"><svg class="ic"><use href="#i-trophy"/></svg>${t('جرّب تحدي الكلمات', 'Try the word challenge')}</button>`;
        return;
      }
      res.innerHTML = '';
      const shown = nice(ty.name);
      // letters grouped per word, so a name only wraps between words, never inside one
      line.innerHTML = shown ? shown.split(' ').map((w, i, all) => `<span class="word">${[...w].map(c => `<span class="ch">${esc(c)}</span>`).join('')}${i === all.length - 1 ? '<span class="caret"></span>' : ''}</span>`).join('<span class="ch sp">&nbsp;</span>')
        : `<span class="ty-hint">${t('اكتب اسمك هنا…', 'Your name goes here…')}</span><span class="caret"></span>`;
      acts.innerHTML = '';
    } else {
      const [w, ar, icon] = ty.word;
      prompt.innerHTML = `<span class="pic"><svg class="ic"><use href="#i-${icon}"/></svg></span><span>${t('اكتب بالإنجليزي:', 'Write in English:')} <b>${ar}</b></span>`;
      line.innerHTML = [...w].map((c, i) => ty.filled[i] ? `<span class="ch good">${c}</span>` : '<span class="ch empty">_</span>').join('');
      res.innerHTML = '';
      acts.innerHTML = `<button class="btn btn-ghost" type="button" data-ty="hint"><svg class="ic"><use href="#i-lightbulb"/></svg>${t('ساعدني بحرف', 'Give me a letter')}</button>
        <button class="btn btn-ghost" type="button" data-ty="skip"><svg class="ic"><use href="#i-arrow-clockwise"/></svg>${t('كلمة ثانية', 'Another word')}</button>`;
    }
  }
  function renderTyper() { renderKeyboard(); if (ty.mode === 'game' && !ty.word) nextWord(); else if (ty.mode === 'memory' && !mem.cards.length) newMemory(); else if (ty.mode === 'order' && !ord.s) newOrder(); else renderBoard(); }
  /* ---------- memory cards: flip two, match an English word with its Arabic meaning ---------- */
  const PAIRS = [['book', 'كتاب'], ['teacher', 'معلّم'], ['school', 'مدرسة'], ['friend', 'صديق'], ['water', 'ماء'], ['happy', 'سعيد'], ['door', 'باب'], ['week', 'أسبوع'], ['city', 'مدينة'], ['work', 'عمل']];
  const mem = { cards: [], open: [], moves: 0, lock: false };
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function newMemory() {
    const six = shuffle([...PAIRS]).slice(0, 6);
    mem.cards = shuffle(six.flatMap(([en, ar], i) => [{ id: i, txt: en, ltr: true }, { id: i, txt: ar, ltr: false }])).map(c => ({ ...c, done: false }));
    mem.open = []; mem.moves = 0; mem.lock = false; renderBoard();
  }
  function renderMemory() {
    $('#ty-points').textContent = ty.points;
    const left = mem.cards.filter(c => !c.done).length;
    $('#ty-prompt').innerHTML = `<span>${t('اقلب بطاقتين وطابق الكلمة بمعناها', 'Flip two cards and match each word with its meaning')} · ${t('محاولات', 'moves')}: <b>${mem.moves}</b></span>`;
    line.innerHTML = `<div class="mem">${mem.cards.map((c, i) => `<button class="mcard${c.done ? ' done' : ''}${mem.open.includes(i) ? ' open' : ''}" type="button" data-m="${i}" aria-label="${t('بطاقة', 'card')} ${i + 1}"><span class="back">?</span><span class="face" dir="${c.ltr ? 'ltr' : 'rtl'}">${c.txt}</span></button>`).join('')}</div>`;
    $('#ty-result').innerHTML = left ? '' : `<p><b>${t('ممتاز! طابقت كل البطاقات', 'Great! You matched them all')}</b> ${t(`في ${mem.moves} ${mem.moves >= 3 && mem.moves <= 10 ? 'محاولات' : 'محاولة'}`, `in ${mem.moves} moves`)}</p>`;
    $('#ty-acts').innerHTML = `<button class="btn btn-ghost" type="button" data-ty="mem-new"><svg class="ic"><use href="#i-arrow-clockwise"/></svg>${t('بطاقات جديدة', 'New cards')}</button>`;
  }
  line.addEventListener('click', e => {
    const b = e.target.closest('[data-m]'); if (!b || ty.mode !== 'memory' || mem.lock) return;
    const i = +b.dataset.m, c = mem.cards[i];
    if (c.done || mem.open.includes(i)) return;
    mem.open.push(i); b.classList.add('open');
    if (mem.open.length < 2) return;
    mem.moves++; mem.lock = true;
    const [a, z] = mem.open.map(k => mem.cards[k]);
    if (a.id === z.id) {
      a.done = z.done = true; mem.open = []; mem.lock = false; ty.points += 10;
      setTimeout(() => { renderMemory(); if (mem.cards.every(c => c.done)) sparks(line); }, 350);
    } else {
      mem.open.forEach(k => $(`[data-m="${k}"]`, line).classList.add('miss'));
      setTimeout(() => { mem.open = []; mem.lock = false; renderMemory(); }, 900);
    }
  });

  /* ---------- build the sentence: tap the words in the right order ---------- */
  const SENTS = [
    ['I am a new student', 'أنا طالب جديد'], ['She likes her English class', 'هي تحب حصة الإنجليزي'], ['We study every evening', 'نحن ندرس كل مساء'],
    ['Where is the library', 'وين المكتبة؟'], ['My brother works in Aden', 'أخوي يشتغل في عدن'], ['The course starts on Saturday', 'الدورة تبدأ يوم السبت'],
    ['Can you help me please', 'ممكن تساعدني لو سمحت؟'], ['I want to learn English', 'أبي أتعلم الإنجليزي']
  ];
  const ord = { s: null, bank: [], answer: [], order: [], solved: false };
  function newOrder() {
    if (!ord.order.length) ord.order = shuffle(SENTS.map((_, i) => i));
    ord.s = SENTS[ord.order.pop()];
    const words = ord.s[0].split(' ');
    do { ord.bank = shuffle(words.map((w, i) => ({ w, i }))); } while (ord.bank.every((x, k) => x.i === k));
    ord.answer = []; ord.solved = false; renderBoard();
  }
  function renderOrder() {
    $('#ty-points').textContent = ty.points;
    $('#ty-prompt').innerHTML = `<span>${t('رتّب الكلمات عشان تقول:', 'Put the words in order to say:')} <b>${ord.s[1]}</b></span>`;
    line.innerHTML = `<div class="sb"><div class="sb-answer${ord.solved ? ' good' : ''}" id="sb-answer">${ord.answer.map((x, k) => `<button class="chipw" type="button" data-a="${k}">${x.w}</button>`).join('')}</div>
      <div class="sb-bank">${ord.bank.map((x, k) => `<button class="chipw" type="button" data-b="${k}">${x.w}</button>`).join('')}</div></div>`;
    $('#ty-result').innerHTML = ord.solved ? `<p><b>${t('صح!', 'Correct!')}</b> ${ord.s[0]}${/^(where|can)/i.test(ord.s[0]) ? '?' : '.'}</p>` : '';
    $('#ty-acts').innerHTML = `<button class="btn btn-ghost" type="button" data-ty="ord-new"><svg class="ic"><use href="#i-arrow-clockwise"/></svg>${t('جملة ثانية', 'Another sentence')}</button>`;
  }
  // a word chip glides from where it was to where it goes (bank ↔ answer line)
  function moveChip(from, text, after) {
    const r = from.getBoundingClientRect(); after();
    if (reduce) return;
    const target = [...line.querySelectorAll('.chipw')].find(c => c.textContent === text && c !== from && !c.dataset.seen);
    if (!target) return;
    const t2 = target.getBoundingClientRect();
    target.animate([{ transform: `translate(${r.left - t2.left}px, ${r.top - t2.top}px)` }, { transform: 'none' }], { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
  line.addEventListener('click', e => {
    if (ty.mode !== 'order' || ord.solved) return;
    const b = e.target.closest('[data-b]'), a = e.target.closest('[data-a]');
    if (b) {
      const x = ord.bank[+b.dataset.b];
      moveChip(b, x.w, () => { ord.bank.splice(+b.dataset.b, 1); ord.answer.push(x); renderOrder(); });
      if (!ord.bank.length) {
        const ok = ord.answer.map(x => x.w).join(' ') === ord.s[0];
        const box = $('#sb-answer');
        if (ok) { ord.solved = true; ty.points += 15; renderOrder(); sparks(line); setTimeout(() => { if (ty.mode === 'order' && ord.solved) newOrder(); }, 1800); }
        else { box.classList.add('bad'); setTimeout(() => { ord.bank = shuffle([...ord.answer]); ord.answer = []; if (ty.mode === 'order') renderOrder(); }, 900); }
      }
    } else if (a) {
      const x = ord.answer[+a.dataset.a];
      moveChip(a, x.w, () => { ord.answer.splice(+a.dataset.a, 1); ord.bank.push(x); renderOrder(); });
    }
  });
  $('#ty-acts').addEventListener('click', e => {
    const a = e.target.closest('[data-ty]'); if (!a) return;
    if (a.dataset.ty === 'mem-new') newMemory();
    if (a.dataset.ty === 'ord-new') newOrder();
  });


  // a letter tile flies from a point on screen to a target box, with a small arc, then calls back
  function fly(c, from, toEl, done) {
    if (reduce || !toEl) return done();
    const to = toEl.getBoundingClientRect(), f = document.createElement('span');
    f.className = 'flyer'; f.textContent = c; document.body.appendChild(f);
    const w = f.offsetWidth, h = f.offsetHeight, x0 = from.x - w / 2, y0 = from.y - h / 2, x1 = to.left + to.width / 2 - w / 2, y1 = to.top + to.height / 2 - h / 2;
    const lift = Math.min(90, Math.abs(y1 - y0) * .35 + 30);
    f.animate([
      { transform: `translate(${x0}px, ${y0}px) scale(1) rotate(0deg)` },
      { transform: `translate(${(x0 + x1) / 2}px, ${Math.min(y0, y1) - lift}px) scale(1.15) rotate(${x1 > x0 ? 12 : -12}deg)`, offset: .55 },
      { transform: `translate(${x1}px, ${y1}px) scale(.82) rotate(0deg)` }
    ], { duration: 460, easing: 'cubic-bezier(.3,.7,.3,1)' }).onfinish = () => { f.remove(); done(); };
  }
  function sparks(el) {
    if (reduce) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    ['a', 'b', 'c', '+', '★', 'e'].forEach((s, i) => {
      const p = document.createElement('span'); p.className = 'spark'; p.textContent = s; document.body.appendChild(p);
      const ang = i / 6 * Math.PI * 2, d = 60 + Math.random() * 40;
      p.animate([{ transform: `translate(${cx}px, ${cy}px) scale(.6)`, opacity: 1 }, { transform: `translate(${cx + Math.cos(ang) * d}px, ${cy + Math.sin(ang) * d}px) scale(1.2)`, opacity: 0 }],
        { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => p.remove();
    });
  }

  // one letter (or command) arriving from a point on screen
  function press(k, from) {
    if (ty.mode === 'name') {
      if (ty.done) return;
      if (k === 'back') { ty.name = ty.name.slice(0, -1); return renderBoard(); }
      if (k === 'done') { if (ty.name.trim().length < 2) return shakeLine(); ty.done = true; renderBoard(); sparks($('.hello')); clearTimeout(ty.auto); ty.auto = setTimeout(() => { if (ty.mode === 'name' && ty.done) { ty.mode = 'game'; renderTyper(); } }, 3200); return; }
      if (k === ' ' && (!ty.name || ty.name.endsWith(' '))) return;
      if (ty.name.length >= 16) return shakeLine();
      ty.name += k; renderBoard();
      const chars = $$('.ch', line), last = chars[chars.length - 1];
      if (k === ' ') return;
      last.classList.add('wait');
      fly(nice(ty.name).slice(-1), from, last, () => { last.classList.remove('wait'); last.classList.add('land'); });
      return;
    }
    // word challenge
    const [w] = ty.word, i = ty.filled.length;
    if (k === 'back') { ty.filled.pop(); return renderBoard(); }
    if (k.length !== 1 || k === ' ') return;
    const slot = $$('.ch', line)[i]; if (!slot) return;
    fly(k, from, slot, () => {
      if (k === w[i]) {
        ty.filled.push(true); renderBoard();
        const s = $$('.ch', line)[i]; s.classList.add('land');
        if (ty.filled.length === w.length) win();
      } else {
        slot.textContent = k; slot.className = 'ch bad';
        setTimeout(() => { if (ty.mode === 'game') renderBoard(); }, 450);
      }
    });
  }
  function win() {
    ty.points += ty.word[0].length * 10; $('#ty-points').textContent = ty.points;
    const sc = $('#ty-score'); sc.classList.remove('pop'); void sc.offsetWidth; sc.classList.add('pop');
    $('#ty-result').innerHTML = `<p><b>${t('ممتاز!', 'Great!')}</b> ${ty.word[0]} = ${ty.word[1]}</p>`;
    sparks(line);
    setTimeout(() => { if (ty.mode === 'game') nextWord(); }, 1500);
  }
  const shakeLine = () => { line.classList.remove('shake'); void line.offsetWidth; line.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'none' }], { duration: 300 }); };

  // keys: a short press is a tap; moving the finger picks the letter up and it follows until dropped
  kb.addEventListener('pointerdown', e => {
    const key = e.target.closest('.key'); if (!key) return;
    e.preventDefault(); key.setPointerCapture(e.pointerId); key.classList.add('down');
    const k = key.dataset.k, sx = e.clientX, sy = e.clientY; let ghost = null;
    const move = ev => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8 && k.length === 1 && k !== ' ') {
        ghost = document.createElement('span'); ghost.className = 'flyer'; ghost.textContent = ty.mode === 'name' && (!ty.name || ty.name.endsWith(' ')) ? k.toUpperCase() : k; document.body.appendChild(ghost);
      }
      if (ghost) {
        ghost.style.transform = `translate(${ev.clientX - ghost.offsetWidth / 2}px, ${ev.clientY - ghost.offsetHeight / 2}px) rotate(-6deg) scale(1.1)`;
        const r = tyBoard.getBoundingClientRect(); tyBoard.classList.toggle('over', ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom);
      }
    };
    const up = ev => {
      key.removeEventListener('pointermove', move); key.removeEventListener('pointerup', up); key.removeEventListener('pointercancel', up);
      key.classList.remove('down');
      const over = tyBoard.classList.contains('over'); tyBoard.classList.remove('over');
      if (!ghost) return press(k, { x: sx, y: sy });
      const at = { x: ev.clientX, y: ev.clientY }; ghost.remove();
      if (over) return press(k, at);
      // dropped somewhere else: the letter goes back to its key
      if (reduce) return;
      const back = document.createElement('span'); back.className = 'flyer'; back.textContent = k; document.body.appendChild(back);
      const kr = key.getBoundingClientRect();
      back.animate([{ transform: `translate(${at.x - 26}px, ${at.y - 27}px)` }, { transform: `translate(${kr.left + kr.width / 2 - 26}px, ${kr.top + kr.height / 2 - 27}px) scale(.8)`, opacity: .2 }], { duration: 320, easing: 'ease-in' }).onfinish = () => back.remove();
    };
    key.addEventListener('pointermove', move); key.addEventListener('pointerup', up); key.addEventListener('pointercancel', up);
  });
  // a key focused with Tab and pressed with Enter/Space (no pointer involved) types too
  kb.addEventListener('click', e => {
    const key = e.target.closest('.key'); if (!key || e.detail !== 0) return;
    const r = key.getBoundingClientRect(); press(key.dataset.k, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  });
  // the computer keyboard types too, while the section is on screen and no form field is in use
  addEventListener('keydown', e => {
    if (!tyVisible || e.ctrlKey || e.metaKey || e.altKey || /input|select|textarea/i.test(document.activeElement.tagName)) return;
    let k = e.key.toLowerCase();
    if (k === 'backspace') k = 'back'; else if (k === 'enter') k = 'done'; else if (!/^[a-z ]$/.test(k)) return;
    if (k === ' ' && ty.mode === 'game') return;
    e.preventDefault();
    const key = $(`.key[data-k="${k === ' ' ? ' ' : k}"]`, kb);
    const r = key ? key.getBoundingClientRect() : tyBoard.getBoundingClientRect();
    if (key) { key.classList.add('down'); setTimeout(() => key.classList.remove('down'), 110); }
    press(k, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  });
  $('.ty-tabs').addEventListener('click', e => {
    const b = e.target.closest('[data-mode]'); if (!b || b.dataset.mode === ty.mode) return;
    clearTimeout(ty.auto); ty.mode = b.dataset.mode; renderTyper();
  });
  $('#ty-acts').addEventListener('click', e => {
    const a = e.target.closest('[data-ty]'); if (!a) return;
    if (a.dataset.ty === 'again') { ty.name = ''; ty.done = false; renderBoard(); }
    if (a.dataset.ty === 'game') { ty.mode = 'game'; renderTyper(); }
    if (a.dataset.ty === 'skip') nextWord();
    if (a.dataset.ty === 'hint' && ty.word) {
      const i = ty.filled.length, slot = $$('.ch', line)[i]; if (!slot) return;
      const r = slot.getBoundingClientRect(); press(ty.word[0][i], { x: r.left + r.width / 2, y: r.top - 60 });
      ty.points = Math.max(0, ty.points - 5);
    }
  });

  $('#year').textContent = new Date().getFullYear();
  applyLang();
})();
