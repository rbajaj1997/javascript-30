const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type="range"]');

progressBar.style['flex-basis'] = '0%';

toggle.addEventListener('click', togglePlayer);
video.addEventListener('click', togglePlayer);
video.addEventListener('play', changeIcon);
video.addEventListener('pause', changeIcon);

skipButtons.forEach(btn => {
    btn.addEventListener('click', skipVideo);
});

ranges.forEach(range => {
    range.addEventListener('click', changeRange);
    range.addEventListener('mousemove', changeRange);
});

video.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', updateTime);


function changeIcon() {
    if (video.paused) {
        toggle.innerHTML = '►';
    } else {
        toggle.innerHTML = '❚ ❚';
    }
}

function togglePlayer() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function changeRange() {
    video[this.name] = this.value;
}

function updateProgress() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style['flex-basis'] = `${percentage}%`;
}

function updateTime(e) {
    const newDuration = (e.offsetX / this.offsetWidth) * video.duration;
    video.currentTime = parseFloat(newDuration);
}