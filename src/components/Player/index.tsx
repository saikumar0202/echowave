import React, { useEffect, useRef, useState } from 'react';
import './styles.scss'; // This is where you will write your CSS


interface Track {
  src: string;
  albumArt: string;
  trackTitle: string;
  bandName: string;
  duration: string;
}

const tracks: Track[] = [
  {
    src: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
    albumArt: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
    trackTitle: "Track 1",
    bandName: "Band 1",
    duration: "3:09"
  },
  {
    src: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
    albumArt: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
    trackTitle: "Track 2",
    bandName: "Band 2",
    duration: "5:29"
  },
  {
    src: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
    albumArt: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
    trackTitle: "Track 3",
    bandName: "Band 3",
    duration: "3:29"
  },
  {
    src: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
    albumArt: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
    trackTitle: "Track 4",
    bandName: "Band 4",
    duration: "3:27"
  },
];

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio(tracks[currentTrackIndex].src));
  const sliderRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (sliderRef.current) {
        sliderRef.current.max = audio.duration.toString();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    audioRef.current.src = tracks[currentTrackIndex].src;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
    audioRef.current.volume = volume;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);

  };
  useEffect(() => {
    const currentPercent = (currentTime / audioRef.current.duration) * 100;
    const seekIndicator = document.getElementById("seekIndicator");
    if (seekIndicator) {
      seekIndicator.style.width = `${currentPercent}%`;
    }
  }, [currentTime]);
  useEffect(() => {
    const currentPercent = volume * 100;
    const volumeIndicator = document.getElementById("volumeIndicator");
    if (volumeIndicator) {
      volumeIndicator.style.width = `${currentPercent}%`;
    }
  }, [volume]);

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="now-playing player-section">
      <h2 className="now-playing__title">Now playing</h2>
      <div className="now-playing__album-art">
        {/*<div className='now-playing__album-image'>*/}
          <img
            src="https://c.saavncdn.com/351/Believers-English-2021-20210503232242-500x500.jpg"
            alt="Album Art"
          />
        {/*</div>*/}
        <div className="now-playing__info">
          <i className="fa-solid fa-plus"></i>
          <div className='now-playing__info-wrapper'>
            <h3 className="now-playing__song-title">Money Machine</h3>
            <p className="now-playing__artist-name">1000 Gecs</p>
          </div>
          <button id="likeBtn" className={`now-playing__info-like ${isLiked ? "liked" : ""}`} onClick={toggleLike}>
            {isLiked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
          </button>
        </div>
      </div>
      <div className="now-playing__controls">
        <div className="now-playing__time">
          <input type="range" min="0" max="100" ref={sliderRef}
                 value={currentTime}
                 onChange={handleSeek}/>
          <div id="bufferingIndicator" className="buffering-indicator"></div>
          <div id="seekIndicator" className="seek-indicator"></div>
          <div id="currentTime">{formatTime(currentTime)}</div>
          <div id="trackTime">{tracks[currentTrackIndex].duration}</div>
        </div>
        <div className="now-playing__actions">
          <button className="control-button control-button--shuffle">
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button className="control-button" onClick={handlePreviousTrack}>
            <i className="fa-solid fa-backward"></i>
          </button>
          <button className="control-button control-button--play" onClick={togglePlayPause}>
            {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
          </button>
          <button className="control-button" onClick={handleNextTrack}>
            <i className="fa-sharp fa-solid fa-forward"></i>
          </button>
          <button className="control-button control-button--repeat">
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>
        <div className="now-playing__volume">
          <input type="range" min="0"  max="1" step="0.01"  ref={volumeRef}
                 value={volume}
                 onChange={handleVolumeChange}/>
          <div id="volumeIndicator" className="volume-indicator"></div>
        </div>
      </div>
      <div className="now-playing__device">
        <p>AirPods Pro (Dave)</p>
      </div>
    </div>
  );
};
