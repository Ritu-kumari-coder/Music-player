
const cover = document.querySelector(".cover img");
const audio = document.getElementById("audio");

const playBtn = document.querySelector(".play-button");

const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");

const titleEl = document.querySelector(".title");
const authorEl = document.querySelector(".author");
const currTime = document.querySelector(".curr");
const totalTime = document.querySelector(".total-duration");

const progressBar = document.querySelector(".progress-bar");
const progressFilled = document.querySelector(".progress-filled");

// 🎵 Playlist
const songs = [
{
    cover: "resources/cover-2.jpg",
    src: "resources/forest-lullaby-110624.mp3",
    title: "Forest Lullaby",
    author: "Lesfm"
},
{
    cover: "resources/cover-1.jpg",
    src: "resources/lost-in-city-lights-145038.mp3",
    title: "Lost in City Lights",
    author: "Cosmo Sheldrake"
}
];

const playSvg = `<img src="resources/Play_fill.svg" alt="">`
const pauseSvg = `<svg xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      fill="white" 
      class="bi bi-pause-fill" 
      viewBox="0 0 16 16"> 
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
    </svg>`

let songIndex = 0;
let isPlaying = false;

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = pauseSvg;
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = playSvg;
}

// Initial load
loadSong(songIndex);

// Play / Pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Previous song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Auto play next when song ends
audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Load song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    cover.src = song.cover;
    titleEl.textContent = song.title;
    authorEl.textContent = song.author;
    currTime.textContent = "0:00";
    totalTime.textContent = "0:00";

    // Update duration
    audio.addEventListener("loadedmetadata", () => {
      totalTime.textContent = formatTime(audio.duration);
    });
}

// Update progress while playing
audio.addEventListener("timeupdate", () => {
  if(!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progressFilled.style.width = percent + "%";
  currTime.textContent = formatTime(audio.currentTime);
});

// Click to seek
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


