import { useEffect, useState, useRef } from "react";
import { WindowMsn } from "./window-msn";
import { WindowNotification } from "./window-notitication";
import { WindowTintemo } from "./window-trintemo";

export const Main = () => {
    const [showInvitation, setShowInvitation] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null); // Referência para o áudio

    useEffect(() => {
        if (showInvitation) {
            const timer = setTimeout(() => {
                setShowNotification(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showInvitation]); // Adiciona showInvitation como dependência

    // Toca ou pausa a música dependendo do estado da notificação
    useEffect(() => {
        if (audioRef.current) {
            if (showNotification && !showMessage) {
                audioRef.current.play().catch((error) => {
                    console.error("Erro ao tentar reproduzir o áudio:", error);
                }); // Toca a música
            } else {
                audioRef.current.pause(); // Pausa a música
                audioRef.current.currentTime = 0; // Reinicia a música
            }
        }
    }, [showNotification, showMessage]);

    return (
        <main className="min-h-screen w-full relative px-3 py-8 flex flex-col md:gap-18 items-center justify-center grid-background">
            {!showInvitation ? (
                <>

                    <img src="/images/mao-rock.png" alt="papel" className="absolute w-30 -left-40" />
                    <img src="/images/aspas.png" alt="papel" className="absolute w-15 -right-40" />
                    <WindowTintemo open={() => setShowInvitation(true)} />
                    <img src="/images/papel.png" alt="papel" className="absolute -right-20 -bottom-45" />
                    <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
                </>
            ) : (
                <>
                    {showMessage && <WindowMsn />}
                    <div className="md:flex relative">
                        <img src="/images/trint.png" alt="trin" className="w-40 md:scale-180" />
                        <img src="/images/emo.png" alt="emo" className="w-40 md:scale-180" />
                        <img src="/images/mao-rock.png" alt="papel" className="absolute w-30 -left-40" />
                        <img src="/images/aspas.png" alt="papel" className="absolute w-15 -right-40" />
                    </div>
                    <img src="/images/foto-home.png" alt="home" className="w-80 px-2 md:scale-180" />
                    {showNotification && !showMessage && (
                        <WindowNotification openNotification={() => setShowMessage(true)} />
                    )}
                    <img src="/images/papel.png" alt="papel" className="absolute -right-20 -bottom-45" />
                    <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
                    {/* Elemento de áudio */}
                    <audio ref={audioRef} src="/audios/notificacao.mp3" />
                </>
            )}
        </main>
    );
};