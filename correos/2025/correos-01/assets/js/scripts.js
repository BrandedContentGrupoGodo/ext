document.addEventListener("DOMContentLoaded", () => {
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
