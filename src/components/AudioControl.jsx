import { useRef, useEffect } from "react";
import { MdOutlineMusicNote, MdMusicOff } from "react-icons/md";
import useAppStore from "../store/useAppStore";

export const AudioControl = () => {
  const audioRef = useRef(new Audio("/audio/medieval_town_music.mp3"));
  const { isPlayingAudio, toggleAudio } = useAppStore();

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlayingAudio) {
      audio.loop = true;
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlayingAudio]);

  return (
    <button
      className={`bg-white text-black p-2 rounded absolute right-3 top-3 z-50 ${
        !isPlayingAudio
          ? "opacity-100"
          : "opacity-50 hover:opacity-100 shadow-lg"
      }`}
      onClick={toggleAudio}
    >
      {!isPlayingAudio ? (
        // mic off
        <MdMusicOff className="text-lg" />
      ) : (
        // mic on
        <MdOutlineMusicNote className="text-lg" />
      )}
    </button>
  );
};
