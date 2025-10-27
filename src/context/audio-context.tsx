import React, { createContext, useContext, useRef, useState } from "react";

interface AudioContextProps {
    isPlaying: boolean;
    togglePlayPause: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null!);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((error) => {
                console.error("Erro ao tentar reproduzir o áudio:", error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlayPause, audioRef }}>
            {children}
            {/* Elemento de áudio global */}
            <audio ref={audioRef} src="/audios/caminho-escolhido.mp3" />
        </AudioContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio deve ser usado dentro de um AudioProvider");
    }
    return context;
};