import { useEffect, useState, useRef } from "react";
import { WindowMsn } from "../components/window-msn";
import { WindowNotification } from "../components/window-notitication";
import { WindowTintemo } from "../components/window-trintemo";
import { confirmation, notConfirmation, getGuests } from "../services/services"; // Importa notConfirmation
import { useChat } from "../context/chat-context";
import Countdown from "react-countdown";
import { FaCheck } from "react-icons/fa6";

type Guest = { nome: string };

export const Main = () => {
    const [showInvitation, setShowInvitation] = useState(false);
    const [playNotificationSound, setPlayNotificationSound] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [guest, setGuest] = useState<Guest[]>([]);
    const { currentGuest, setConfirmed, setCurrrentGuest } = useChat(); // Adiciona setConfirmed e setCurrrentGuest do contexto

    const step = currentGuest?.step ?? 0;

    useEffect(() => {
        if (step >= 3) {
            setShowNotification(true);
        } else if (showInvitation && !showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showInvitation, step, showNotification]);

    useEffect(() => {
        if (audioRef.current && step < 3) {
            if (playNotificationSound && showNotification && !showMessage) {
                audioRef.current.play().catch((error) => {
                    console.error("Erro ao tentar reproduzir o áudio:", error);
                });
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [showNotification, showMessage, playNotificationSound, step]);

    const openMessageWindow = () => {
        setShowMessage(true);
        setPlayNotificationSound(false);
    };

    useEffect(() => {
        const fetchGuests = async () => {
            const guests = await getGuests();
            setGuest(guests);
        };

        fetchGuests();
    }, []);

    const filtrado = guest?.filter((g: { nome: string }) => g.nome === window.location.pathname.replace("/", ""));

    const handleCancelPresence = async () => {
        if (currentGuest?.nome) {
            const result = await notConfirmation(currentGuest.nome); // Chama a função para cancelar a presença
            if (result) {
                setConfirmed(false); // Atualiza o estado no contexto
                setCurrrentGuest({ ...currentGuest, presenca: false }); // Atualiza o estado local de currentGuest
            } else {
                alert("Erro ao cancelar a presença.");
            }
        }
    };

    const handleConfirmPresence = async () => {
        if (currentGuest?.nome) {
            const result = await confirmation(currentGuest.nome); // Chama a função para confirmar a presença
            if (result) {
                setConfirmed(true); // Atualiza o estado no contexto
                setCurrrentGuest({ ...currentGuest, presenca: true }); // Atualiza o estado local de currentGuest
            } else {
                alert("Erro ao confirmar a presença.");
            }
        }
    };

    return (
        (filtrado && filtrado.length > 0) ? (
            <main className="min-h-screen w-full relative px-3 pb-8 pt-14 flex flex-col md:gap-10 items-center justify-center grid-background">
                {!showInvitation && step < 3 ? (
                    <div className="">
                        <img src="/images/mao-rock.png" alt="papel" className="absolute w-30 -left-40" />
                        <img src="/images/aspas.png" alt="papel" className="absolute w-15 -right-40" />
                        <WindowTintemo open={() => setShowInvitation(true)} />
                        <img src="/images/papel.png" alt="papel" className="absolute -right-20 -bottom-45" />
                        <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
                    </div>
                ) : (
                    <>
                        {showMessage && <WindowMsn close={() => setShowMessage(false)} />}
                        <div className="md:flex relative pt-28 md:pt-38 lg:pt-24">
                            <img src="/images/trint.png" alt="trin" className="w-40 md:scale-140" />
                            <img src="/images/emo.png" alt="emo" className="w-40 md:scale-140 md:ml-28" />
                            <img src="/images/mao-rock.png" alt="papel" className="absolute w-30 -left-40" />
                            <img src="/images/aspas.png" alt="papel" className="absolute w-15 -right-40" />
                        </div>
                        <img src="/images/foto-home.png" alt="home" className="w-80 px-2 md:scale-140" />
                        {showNotification && !showMessage && (
                            <WindowNotification openNotification={openMessageWindow} />
                        )}
                        <img src="/images/papel.png" alt="papel" className="absolute -right-20 -bottom-45" />
                        <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
                        <audio ref={audioRef} src="/audios/notificacao.mp3" />
                        {currentGuest?.presenca === null || currentGuest?.presenca === false ? (
                            <div className="text-black text-center">
                                <h2 className="rocket-font text-center bg-white px-3 py-2 border border-gray-600" style={{ fontSize: "23px" }}>Confirmar até dia 10 de Novembro</h2>
                                <h2 className="rocket-font shadow text-center" style={{ fontSize: "27px" }}>Faltam:</h2>
                                <Countdown
                                    date={new Date(2025, 10, 10, 23, 59, 0)}
                                    renderer={({ days, hours, minutes, seconds }) => (
                                        <span className="text-white px-2 py-1 rocket-font bg-black">{days}d {hours}h {minutes}m {seconds}s</span>
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="text-black text-center">
                                <span className="text-white px-4 block py-2 rocket-font mb-2 bg-black"><FaCheck className="inline" /> confirmado</span>
                                <span className="text-black px-4 py-2 block rocket-font">Faltam</span>
                                <Countdown
                                    date={new Date(2025, 12, 13, 16, 0, 0)}
                                    renderer={({ days, hours, minutes, seconds }) => (
                                        <span className="text-black px-2 py-1 whitespace-nowrap rocket-font pt-3">{days}d {hours}h {minutes}m {seconds}s</span>
                                    )}
                                />
                            </div>
                        )}
                        {currentGuest?.presenca ? (
                            <button
                                onClick={handleCancelPresence}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                            >
                                Cancelar Presença
                            </button>
                        ) : (
                            <button
                                onClick={handleConfirmPresence}
                                className="bg-green-700 text-white px-4 py-2 rounded-md mt-4"
                            >
                                Confirmar Presença
                            </button>
                        )}
                    </>
                )}


            </main>
        ) : (
            <main className="min-h-screen w-full relative px-3 py-8 flex flex-col md:gap-18 items-center justify-center grid-background">
                
            </main>
        )
    );
};