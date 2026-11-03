(function () {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const header = $('.site-header');
  const menu = $('#main-menu');
  const menuButton = $('.menu-toggle');
  const backdrop = $('.menu-backdrop');
  const mobile = window.matchMedia('(max-width: 900px)');
  let menuOpen = false;
  let previousFocus = null;
  const focusable = root => $$('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]', root).filter(el => !el.hidden && el.getClientRects().length);
  function trap(event, root) {
    if (event.key !== 'Tab') return;
    const items = focusable(root);
    if (!items.length) { event.preventDefault(); return; }
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  function setMenu(open, restore = true) {
    if (!menu || !menuButton) return;
    menuOpen = open && mobile.matches;
    menu.classList.toggle('is-open', menuOpen);
    menu.inert = mobile.matches && !menuOpen;
    menuButton.setAttribute('aria-expanded', String(menuOpen));
    backdrop.hidden = !menuOpen;
    document.body.classList.toggle('menu-open', menuOpen);
    $$('main,.site-footer').forEach(el => { el.inert = menuOpen; });
    if (menuOpen) { menu.setAttribute('role', 'dialog'); menu.setAttribute('aria-modal', 'true'); menu.setAttribute('aria-label', '主要導覽'); $('.menu-close', menu).focus(); }
    else { menu.removeAttribute('role'); menu.removeAttribute('aria-modal'); menu.removeAttribute('aria-label'); if (restore && mobile.matches) menuButton.focus(); }
  }
  if (menu && menuButton) {
    menuButton.addEventListener('click', () => setMenu(!menuOpen));
    $('.menu-close', menu).addEventListener('click', () => setMenu(false));
    backdrop.addEventListener('click', () => setMenu(false));
    $$('a', menu).forEach(link => link.addEventListener('click', () => {
      // Let the anchor's native navigation run before making the drawer inert.
      window.requestAnimationFrame(() => setMenu(false, false));
    }));
    mobile.addEventListener('change', () => setMenu(false, false));
    setMenu(false, false);
  }
  if (header) {
    const updateHeader = () => header.classList.toggle('is-compact', window.scrollY > 40);
    window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader();
  }
  /* Preserve old homepage deep links. */
  const legacy = { gallery: 'projects', services: 'projects', awards: 'awards', benefits: 'benefits', activities: 'activities', news: 'employees' };
  const target = legacy[window.location.hash.slice(1)];
  if (target && document.body.dataset.page === 'home') { window.location.replace('./pages/' + target + '.html'); return; }
  /* One accessible full-image viewer for photos, galleries and awards. */
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal'; modal.id = 'lightbox';
  modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-labelledby', 'lightbox-title');
  modal.innerHTML = '<div class="lightbox-container"><button class="lightbox-close" type="button" aria-label="關閉圖片檢視">×</button><div class="lightbox-img-wrap"><img id="lightbox-img" alt=""></div><div class="lightbox-info"><div class="lightbox-title" id="lightbox-title"></div><p class="lightbox-desc" id="lightbox-desc"></p></div></div>';
  document.body.append(modal);
  function openImage(src, title, desc) {
    previousFocus = document.activeElement;
    $('#lightbox-img').src = src; $('#lightbox-img').alt = title;
    $('#lightbox-title').textContent = title; $('#lightbox-desc').textContent = desc || '';
    $('#lightbox-desc').hidden = !desc;
    modal.classList.add('is-active'); document.body.classList.add('menu-open');
    $$('main,.site-footer,.site-header').forEach(el => { el.inert = true; });
    $('.lightbox-close', modal).focus();
  }
  function closeImage() {
    modal.classList.remove('is-active'); document.body.classList.remove('menu-open');
    $$('main,.site-footer,.site-header').forEach(el => { el.inert = false; });
    $('#lightbox-img').removeAttribute('src');
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  }
  $('.lightbox-close', modal).addEventListener('click', closeImage);
  modal.addEventListener('click', event => { if (event.target === modal) closeImage(); });
  document.addEventListener('keydown', event => {
    if (modal.classList.contains('is-active')) { if (event.key === 'Escape') closeImage(); else trap(event, modal); }
    else if (menuOpen) { if (event.key === 'Escape') setMenu(false); else trap(event, menu); }
  });
  document.addEventListener('click', event => {
    const award = event.target.closest('.award-card-image');
    if (award) { event.preventDefault(); openImage(award.dataset.full, award.dataset.title, award.dataset.desc); return; }
    const link = event.target.closest('.record-grid a,.project-album-stage a,.activity-entry a,.album-photo a,.project-lead a');
    if (!link) return;
    const image = $('img', link);
    if (!image || !/\.(jpe?g|png|webp)(\?.*)?$/i.test(link.href)) return;
    event.preventDefault();
    const full = link.closest('.album-photo') ? image.src : link.href;
    const figure = link.closest('figure');
    const caption = figure && $('figcaption', figure);
    openImage(full, image.alt, caption ? caption.textContent : '');
  });
  /* Award filters also hide empty year groups, retaining chronological order. */
  const filters = $('.award-filters');
  if (filters) {
    const cards = $$('[data-award-category]');
    const status = $('.award-filter-status');
    $$('button', filters).forEach(button => button.addEventListener('click', () => {
      $$('button', filters).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      cards.forEach(card => { card.hidden = button.dataset.awardFilter !== 'all' && card.dataset.awardCategory !== button.dataset.awardFilter; });
      $$('.award-year-group').forEach(group => { group.hidden = !$$('.award-card', group).some(card => !card.hidden); });
      status.textContent = button.textContent + '：顯示' + cards.filter(card => !card.hidden).length + '筆獎項影像';
    }));
    filters.hidden = false; status.hidden = false; status.textContent = '全部：顯示' + cards.length + '筆獎項影像';
  }
  /* Progressive gallery: all source photos remain available when JavaScript is off. */
  $$('.gallery-source').forEach(source => {
    const photos = $$('figure', source).map(figure => ({ thumb: $('img', figure).getAttribute('src'), full: $('a', figure).getAttribute('href'), alt: $('img', figure).alt, caption: $('figcaption', figure).textContent }));
    if (!photos.length) return;
    const gallery = document.createElement('div'); gallery.className = 'project-album';
    gallery.innerHTML = '<figure class="project-album-stage"><a href=""><img alt="" width="1600" height="1000"></a><figcaption class="project-album-caption" aria-live="polite"></figcaption></figure><div class="project-thumbnails" role="group" aria-label="工程照片縮圖"></div>';
    const rail = $('.project-thumbnails', gallery);
    function selectPhoto(index) {
      const photo = photos[index];
      $('.project-album-stage a', gallery).href = photo.full;
      $('.project-album-stage img', gallery).src = photo.thumb;
      $('.project-album-stage img', gallery).alt = photo.alt;
      $('.project-album-caption', gallery).textContent = photo.caption + '（' + (index + 1) + ' / ' + photos.length + '）';
      $$('button', rail).forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    }
    photos.forEach((photo, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', '查看工程影像 ' + (index + 1));
      const img = document.createElement('img'); img.src = photo.thumb; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; button.append(img);
      button.addEventListener('click', () => selectPhoto(index));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? photos.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + photos.length) % photos.length;
        selectPhoto(next); rail.children[next].focus();
      });
      rail.append(button);
    });
    source.before(gallery); selectPhoto(0); source.classList.add('is-enhanced'); gallery.classList.add('is-ready');
  });
  /* Employee tabs: normal sections without JS, arrow-key navigation with JS. */
  const tabs = $$('.message-tabs [role="tab"]');
  if (tabs.length) {
    const panels = $$('.employee-panel');
    function activate(index, focus = false) {
      tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; panels[i].hidden = i !== index; });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); activate(event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true); } });
    });
    $$('[data-employee-target]').forEach(button => button.addEventListener('click', () => { activate(Number(button.dataset.employeeTarget), true); $('.message-tabs').scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }));
    $('.message-tabs').hidden = false; $('.employee-entry-grid').hidden = false; $('.employee-content-grid').classList.add('tabs-ready'); activate(0);
  }
  /* Status reports validation or navigation only; it never claims delivery. */
  $$('form').forEach(form => {
    const status = $('.form-status', form);
    if (!status) return;
    form.addEventListener('invalid', () => { status.textContent = '請檢查必填欄位、資料格式與同意事項，再重新送出。'; }, true);
    form.addEventListener('input', () => { if (status.textContent) status.textContent = ''; });
    form.addEventListener('submit', event => {
      if (location.protocol === 'file:') { event.preventDefault(); status.textContent = '本機預覽無法送出表單，請使用線上網站。'; return; }
      if (event.defaultPrevented || !form.checkValidity()) { status.textContent = '請檢查欄位與附件格式，再重新送出。'; return; }
      status.textContent = '即將前往 FormSubmit 驗證／確認頁面；寄送與收件狀態請依後續頁面及收件結果確認。';
    });
  });
})();
