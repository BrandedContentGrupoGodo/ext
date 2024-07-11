document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    AOS.init();

    let player;
    const maxRetries = 5;
    let retries = 0;

    function loadYouTubeAPI() {
        return new Promise((resolve, reject) => {
            if (window.YT && window.YT.Player) {
                resolve();
            } else {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                tag.onload = () => resolve();
                tag.onerror = () => reject();
            }
        });
    }

    function initializePlayer() {
        console.log('Initializing YouTube Player');
        if (window.YT && window.YT.Player) {
            player = new YT.Player('youtubePlayer', {
                height: '100%',
                width: '100%',
                videoId: '9i-a-Wh5UpE?si=f9HBKFYoB40IbjTv', // Aquí se coloca el ID de tu video
                events: {
                    'onReady': onPlayerReady
                }
            });
        } else {
            if (retries < maxRetries) {
                retries++;
                console.log(`Retrying YouTube Player initialization (${retries}/${maxRetries})`);
                setTimeout(initializePlayer, 1000);
            } else {
                console.error('Failed to initialize YouTube Player after multiple attempts');
            }
        }
    }

    function onPlayerReady(event) {
        console.log('YouTube Player is ready');
        const previewImg = document.getElementById('previewImg');
        const videoPopup = document.getElementById('videoPopup');
        const closePopup = document.getElementById('closePopup');

        if (previewImg) {
            previewImg.addEventListener('click', () => {
                console.log('Preview image clicked');
                videoPopup.style.display = 'flex';
                player.playVideo();
            });
        } else {
            console.error('previewImg element not found');
        }

        if (closePopup) {
            closePopup.addEventListener('click', closeVideoPopup);
        } else {
            console.error('closePopup element not found');
        }

        if (videoPopup) {
            videoPopup.addEventListener('click', (event) => {
                if (event.target === videoPopup) {
                    closeVideoPopup();
                }
            });
        } else {
            console.error('videoPopup element not found');
        }
    }

    function closeVideoPopup() {
        console.log('Closing video popup');
        const videoPopup = document.getElementById('videoPopup');
        videoPopup.style.display = 'none';
        player.stopVideo();
    }

    loadYouTubeAPI().then(initializePlayer).catch(error => {
        console.error('Failed to load YouTube API:', error);
    });

    // Audio play/pause functionality
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audioElement = document.getElementById('audioElement');

    if (playPauseBtn && audioElement) {
        playPauseBtn.addEventListener('change', function() {
            if (this.checked) {
                console.log('Playing audio');
                audioElement.play();
            } else {
                console.log('Pausing audio');
                audioElement.pause();
            }
        });

        audioElement.addEventListener('ended', function() {
            console.log('Audio ended');
            playPauseBtn.checked = false;
        });
    } else {
        console.error('playPauseBtn or audioElement not found');
    }
});
