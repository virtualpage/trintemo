import { IoIosPlay, IoMdArrowDropdown } from "react-icons/io";
import { PiMusicNotesFill } from "react-icons/pi";
import { useState, useRef } from "react";
import { IoPauseSharp } from "react-icons/io5";

export const ProfileComponent = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    console.log(isPlaying)

    return (
        <div className="flex flex-col justify-between pb-2">
            <div className="flex pr-4 pl-6 md:relative">
                <div className="relative w-30 h-30 mx-2">
                    <div className="absolute -left-5 top-6 flex flex-col items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center bg-[#d1d1d1] rounded-md border border-[#525B60]">
                            <IoMdArrowDropdown className="text-black" />
                        </div>
                        <img src="/images/webcam.png" alt="webcam" className="w-4" />
                    </div>
                    <img src="/images/border-profile.png" alt="border" className="w-full h-full" />
                    <img
                        src="/images/perfil-gabi-henrique.png"
                        alt="gabi-henrique"
                        className="absolute scale-[0.8] rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
                <div className="mt-2 z-50 md:absolute md:-right-25">
                    <h4>Gabi e Henrique</h4>
                    <p className="flex gap-1 items-center">
                        <PiMusicNotesFill />
                        Fresno
                        <span
                            className="cursor-pointer rounded-sm border border-[#525B60] ml-2 px-2"
                            onClick={handlePlayPause}
                        >
                            {!isPlaying ? <IoIosPlay /> : <IoPauseSharp />}
                        </span>
                    </p>
                </div>
            </div>
            <div className="pr-4 pl-6 hidden md:flex">
                <div className="relative w-30 h-30 mx-2">
                    <div className="absolute -left-5 top-6 flex flex-col items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center bg-[#d1d1d1] rounded-md border border-[#525B60]">
                            <IoMdArrowDropdown className="text-black" />
                        </div>
                        <img src="/images/webcam.png" alt="webcam" className="w-4" />
                    </div>
                    <img src="/images/border-profile.png" alt="border" className="w-full h-full" />
                </div>
            </div>
            <audio ref={audioRef} src="/audios/eu-sei.mp3" />
        </div>
    );
};