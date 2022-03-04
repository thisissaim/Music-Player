const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong(){
    //add the play btn..if its playing and we need to stop click and it switches to paused button likewise
musicContainer.classList.add('play')
playBtn.querySelector('i.fas').classList.remove('fa-play')
playBtn.querySelector('i.fas').classList.add('fa-pause')

audio.play();//animation embedded
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}
//Event listeners
playBtn.addEventListener("click" , () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

//Next and prev btns->event listeners

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length - 1; 
    }
    loadSong(songs[songIndex])
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1)
    {
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong();
}

prevBtn.addEventListener("click" , prevSong)
nextBtn.addEventListener("click" , nextSong)

//Audio bar
function updateProgress(e){
  const { duration , currentTime} = e.target;
  const progressPercent = (currentTime / duration)*100;
  progress.style.width = `${progressPercent}%`;

}

audio.addEventListener('timeupdate' , updateProgress);//api->called cont when song plays

//jump to specific time in bar

function setProgress(e){
    const width = this.clientWidth;//time
    const ClickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (ClickX/width)*duration;
    
}
progressContainer.addEventListener('click' , setProgress)

// autoplay next song when one finishes

audio.addEventListener('ended' , nextSong);
