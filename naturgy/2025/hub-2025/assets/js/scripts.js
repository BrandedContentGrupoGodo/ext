document.addEventListener("DOMContentLoaded", () => {
  // --- Social carousel ---
  const track = document.querySelector('.social-carousel__track');
  function getSlides(){ return track ? Array.from(track.children) : []; }
  const prevBtn = document.querySelector('.social-btn--prev');
  const nextBtn = document.querySelector('.social-btn--next');
  const pagination = document.querySelector('.social-carousel__pagination');
  let index = 0;
  let visibleSlides = 1;

  function measureVisible(){
    // Coincide con CSS: 66.666% (1.5 slides) en tablets, 50% (2 slides) en desktop
    if (window.matchMedia('(min-width: 1200px)').matches) {
      visibleSlides = 2;
    } else if (window.matchMedia('(min-width: 900px)').matches) {
      visibleSlides = 1.5;
    } else {
      visibleSlides = 1;
    }
    maybeRebuildLayout();
  }

  function update() {
    const slides = getSlides();
    if(!track || slides.length === 0) return;
    const step = 100 / visibleSlides; // ej: 1.5 visibles => paso 66.666%
    const offset = -index * step;
    track.style.transform = `translateX(${offset}%)`;
    updateBullets();
  }
  function goNext(){
    const slides = getSlides();
    if(slides.length === 0) return;
    const maxIndex = Math.max(0, Math.ceil(slides.length - visibleSlides));
    index = index + 1;
    if(index > maxIndex) index = 0;
    update();
    renderAround(index);
  }
  function goPrev(){
    const slides = getSlides();
    if(slides.length === 0) return;
    const maxIndex = Math.max(0, Math.ceil(slides.length - visibleSlides));
    index = index - 1;
    if(index < 0) index = maxIndex;
    update();
    renderAround(index);
  }
  if(prevBtn) prevBtn.addEventListener('click', goPrev);
  if(nextBtn) nextBtn.addEventListener('click', goNext);
  measureVisible();
  update();
  window.addEventListener('resize', () => { measureVisible(); update(); });
  
  // Lazy render de embeds (solo visibles y el siguiente)
  function ensureSDK(srcContains, src){
    if(document.querySelector(`script[src*="${srcContains}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }

  function renderEmbed(container){
    if(!container || container.dataset.rendered) return;
    if(container.classList.contains('embed--tiktok')){
      const url = container.getAttribute('data-tiktok-url');
      const match = url && url.match(/video\/(\d+)/);
      const videoId = match ? match[1] : null;
      if(videoId){
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.tiktok.com/embed/v2/${videoId}`;
        iframe.title = 'TikTok video';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.frameBorder = '0';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.style.width = '100%';
        container.innerHTML = '';
        container.appendChild(iframe);
      }
    } else if(container.classList.contains('embed--instagram')){
      const permalink = container.getAttribute('data-instgrm-permalink');
      container.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14"></blockquote>`;
      ensureSDK('www.instagram.com/embed.js','https://www.instagram.com/embed.js');
    }
    container.dataset.rendered = '1';
  }

  function renderAround(currentIndex){
    const slideEls = getSlides();
    const toRender = new Set();
    toRender.add(currentIndex);
    if(slideEls[currentIndex+1]) toRender.add(currentIndex+1);
    if(visibleSlides > 1 && slideEls[currentIndex+2]) toRender.add(currentIndex+2);
    for(const i of toRender){
      const embeds = slideEls[i].querySelectorAll('.embed');
      embeds.forEach(renderEmbed);
    }
    // sincroniza alturas tras un pequeño delay para permitir el render de IG
    setTimeout(syncTikTokHeightToInstagram, 300);
  }

  // Primer render
  renderAround(0);

  // Observer para cargar cuando el viewport del carrusel entra en pantalla
  const viewport = document.querySelector('.social-carousel__viewport');
  if(viewport && 'IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          renderAround(index);
        }
      });
    }, { root: null, threshold: 0.1 });
    io.observe(viewport);
  } else {
    // Fallback
    renderAround(0);
  }

  // Paginación (bullets)
  function buildBullets(){}
  function updateBullets(){}

  // Arrastre táctil
  let startX = 0; let isDragging = false;
  function onStart(e){ isDragging = true; startX = e.touches ? e.touches[0].clientX : e.clientX; }
  function onMove(e){ if(!isDragging) return; }
  function onEnd(e){
    if(!isDragging) return; isDragging = false;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - startX;
    const threshold = 40;
    if(dx > threshold) { goPrev(); }
    else if(dx < -threshold) { goNext(); }
  }
  if(viewport){
    viewport.addEventListener('mousedown', onStart);
    viewport.addEventListener('mousemove', onMove);
    viewport.addEventListener('mouseup', onEnd);
    viewport.addEventListener('mouseleave', onEnd);
    viewport.addEventListener('touchstart', onStart, {passive:true});
    viewport.addEventListener('touchmove', onMove, {passive:true});
    viewport.addEventListener('touchend', onEnd);
  }

  // Re-procesar embeds si los SDKs exponen API global
  function reprocessEmbeds(){
    if(window.tiktok) { /* no-op, SDK procesa automáticamente */ }
    if(window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process){
      window.instgrm.Embeds.process();
    }
    setTimeout(syncTikTokHeightToInstagram, 300);
  }
  document.addEventListener('click', reprocessEmbeds, {capture: true});

  // --- Carga SDKs para embeds ---
  // TikTok
  if(!document.querySelector('script[src*="tiktok.com/embed.js"]')){
    const s = document.createElement('script');
    s.src = 'https://www.tiktok.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }
  // Instagram
  if(!document.querySelector('script[src*="www.instagram.com/embed.js"]')){
    const s2 = document.createElement('script');
    s2.src = 'https://www.instagram.com/embed.js';
    s2.async = true;
    document.body.appendChild(s2);
  }

  // --- Rebuild layout según breakpoint ---
  function splitToSingleEmbeds(){
    if(!track || track.dataset.mobileMode === '1') return;
    const currentSlides = getSlides();
    const embeds = [];
    currentSlides.forEach(slide => {
      slide.querySelectorAll('.embed').forEach(e => embeds.push(e));
    });
    // limpiar track
    track.innerHTML = '';
    // crear un slide por embed
    embeds.forEach(e => {
      const slide = document.createElement('div');
      slide.className = 'social-slide';
      const pair = document.createElement('div');
      pair.className = 'embed-pair';
      pair.appendChild(e);
      slide.appendChild(pair);
      track.appendChild(slide);
    });
    track.dataset.mobileMode = '1';
    index = 0; update(); renderAround(0);
  }
  function groupToPairs(){
    if(!track || track.dataset.mobileMode !== '1') return;
    const currentSlides = getSlides();
    const embeds = [];
    currentSlides.forEach(slide => {
      const e = slide.querySelector('.embed');
      if(e) embeds.push(e);
    });
    track.innerHTML = '';
    for(let i=0;i<embeds.length;i+=2){
      const slide = document.createElement('div');
      slide.className = 'social-slide';
      const pair = document.createElement('div');
      pair.className = 'embed-pair';
      pair.appendChild(embeds[i]);
      if(embeds[i+1]) pair.appendChild(embeds[i+1]);
      slide.appendChild(pair);
      track.appendChild(slide);
    }
    delete track.dataset.mobileMode;
    index = 0; update(); renderAround(0);
  }
  function maybeRebuildLayout(){
    const isMobile = !window.matchMedia('(min-width: 900px)').matches;
    if(isMobile) splitToSingleEmbeds(); else groupToPairs();
  }

  // Igualar altura de TikTok a la de Instagram
  function syncTikTokHeightToInstagram(){
    const sampleIG = document.querySelector('.embed--instagram');
    if(!sampleIG) return;
    const h = sampleIG.clientHeight;
    if(!h || h < 50) return; // ignora alturas no válidas
    document.querySelectorAll('.embed--tiktok iframe').forEach(iframe => {
      iframe.style.height = h + 'px';
    });
  }
  window.addEventListener('resize', () => setTimeout(syncTikTokHeightToInstagram, 150));
  // intento inicial por si IG ya renderizó
  setTimeout(syncTikTokHeightToInstagram, 600);

  const placeholder = document.querySelector('.video-placeholder');
  if(!placeholder) return;
  const videoId = placeholder.dataset.videoId;

  function createIframe() {
    const parent = placeholder.parentElement;
    if(parent.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.title = 'Vídeo: Tarjeta Correos Prepago';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
    parent.innerHTML = '';
    parent.appendChild(iframe);
  }

  placeholder.addEventListener('click', createIframe);
  placeholder.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      createIframe();
    }
  });
});

// Carrusel de acciones sostenibles
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.actions-carousel__track');
  if(!track) return;
  const slides = () => Array.from(track.children);
  const prev = document.querySelector('.actions-btn--prev');
  const next = document.querySelector('.actions-btn--next');
  let index = 0;
  let visible = 1;

  function measure(){
    if (window.matchMedia('(min-width: 1200px)').matches) visible = 4; else visible = 1;
  }
  function update(){
    // Cuando hay gap entre columnas, calcular el ancho real de una columna
    const cols = visible;
    const total = track.scrollWidth; // ancho total del grid
    const one = total / slides().length; // ancho aproximado de una columna
    track.style.transform = `translateX(${-(index * one)}px)`;
  }
  function goNext(){
    const maxIndex = Math.max(0, slides().length - visible);
    index = (index + 1 > maxIndex) ? 0 : index + 1;
    update();
  }
  function goPrev(){
    const maxIndex = Math.max(0, slides().length - visible);
    index = (index - 1 < 0) ? maxIndex : index - 1;
    update();
  }
  if(prev) prev.addEventListener('click', goPrev);
  if(next) next.addEventListener('click', goNext);
  measure(); update();
  window.addEventListener('resize', () => { measure(); update(); });

  // Swipe táctil
  const viewport = document.querySelector('.actions-carousel__viewport');
  if(viewport){
    let startX = 0; let dragging = false;
    function onStart(e){ dragging = true; startX = e.touches ? e.touches[0].clientX : e.clientX; }
    function onEnd(e){ if(!dragging) return; dragging = false; const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX; const dx = endX - startX; const th = 40; if(dx > th) goPrev(); else if(dx < -th) goNext(); }
    viewport.addEventListener('mousedown', onStart);
    viewport.addEventListener('mouseup', onEnd);
    viewport.addEventListener('mouseleave', onEnd);
    viewport.addEventListener('touchstart', onStart, {passive:true});
    viewport.addEventListener('touchend', onEnd);
  }
});
