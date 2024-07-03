document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    let player;

    // Esta función se llama cuando la API está lista
    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player('youtubePlayer', {
            height: '100%',
            width: '100%',
            videoId: 'jQJOuoT2gbQ', // Aquí se coloca el ID de tu video
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        const previewImg = document.getElementById('previewImg');
        const videoPopup = document.getElementById('videoPopup');
        const closePopup = document.getElementById('closePopup');

        previewImg.addEventListener('click', () => {
            videoPopup.style.display = 'flex';
            player.playVideo();
        });

        closePopup.addEventListener('click', closeVideoPopup);
        videoPopup.addEventListener('click', (event) => {
            if (event.target === videoPopup) {
                closeVideoPopup();
            }
        });
    }

    function closeVideoPopup() {
        const videoPopup = document.getElementById('videoPopup');
        videoPopup.style.display = 'none';
        player.stopVideo();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audioElement = document.getElementById('audioElement');

    playPauseBtn.addEventListener('change', function() {
        if (this.checked) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    });

    audioElement.addEventListener('ended', function() {
        playPauseBtn.checked = false;
    });
});
