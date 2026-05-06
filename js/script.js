const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const speed = document.getElementById("speed");
const playlistUI = document.getElementById("playlist");
const cover = document.getElementById("cover");

let songs = [
    { name: "洛春赋", artist: "云汐", src: "mp3/music0.mp3", cover: "img/record0.jpg", video: "mp4/video0.mp4" },
    { name: "歌曲2", artist: "歌手2", src: "mp3/music1.mp3", cover: "img/record1.jpg", video: "mp4/video1.mp4" },
    { name: "歌曲3", artist: "歌手3", src: "mp3/music2.mp3", cover: "img/record2.jpg", video: "mp4/video2.mp4" },
    { name: "歌曲4", artist: "歌手4", src: "mp3/music3.mp3", cover: "img/record3.jpg", video: "mp4/video3.mp4" },
];

let index = 0;
let rotating = false;

function loadSong(i) {
    let song = songs[i];
    audio.src = song.src;
    document.getElementById("title").innerText = song.name;
    document.getElementById("artist").innerText = song.artist;
    cover.src = song.cover;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
        startRotate();
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        stopRotate();
    }
}

function prev() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    startRotate();
}

function next() {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    startRotate();
}

audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    current.innerText = format(audio.currentTime);
    duration.innerText = format(audio.duration);
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

speed.addEventListener("change", () => {
    audio.playbackRate = speed.value;
});

function format(time) {
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0"+s : s}`;
}

// 播放列表
songs.forEach((song, i) => {
    let li = document.createElement("li");
    li.innerText = song.name;
    li.onclick = () => {
        index = i;
        loadSong(i);
        audio.play();
        startRotate();
    };
    playlistUI.appendChild(li);
});

// 唱片旋转
let angle = 0;
let rotateInterval;
function startRotate() {
    if (rotating) return;
    rotating = true;
    rotateInterval = setInterval(() => {
        angle += 1;
        cover.style.transform = `rotate(${angle}deg)`;
    }, 30);
}
function stopRotate() {
    rotating = false;
    clearInterval(rotateInterval);
}

// 初始化
loadSong(index);
audio.volume = 0.5;