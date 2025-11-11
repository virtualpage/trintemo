import { useEffect, useState, useRef } from "react";
import { WindowMsn } from "../components/window-msn";
import { WindowNotification } from "../components/window-notitication";
import { WindowTintemo } from "../components/window-trintemo";
import { getGuests } from "../services/services";
import { useChat } from "../context/chat-context";;
import { FaCheck } from "react-icons/fa6";

type Guest = { slug: string };

export const Main = () => {
    const [showInvitation, setShowInvitation] = useState(false);
    const [playNotificationSound, setPlayNotificationSound] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [guest, setGuest] = useState<Guest[]>([]);
    const { currentGuest } = useChat();
    const step = currentGuest?.step ?? 0;

    useEffect(() => {
        if (step >= 3) {
            setShowNotification(true);
        } else if (showInvitation && !showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(true);
            }, 100);

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

    const filtrado = guest?.filter((g: { slug: string }) => g.slug === window.location.pathname.replace("/", ""));
    return (
        (filtrado && filtrado.length > 0) ? (
            <main className="min-h-screen w-full relative px-3 pb-8 pt-2 md:pt-8 flex flex-col md:gap-10 items-center justify-center grid-background">
                {!showInvitation && step < 3 ? (
                    <div className="">
                        <img src="/images/mao-rock.png" alt="papel" className="absolute w-30 -left-40" />
                        <img src="/images/aspas.png" alt="papel" className="absolute w-15 -right-40" />
                        <WindowTintemo open={() => setShowInvitation(true)} />
                        <img src="/images/papel.png" alt="papel" className="absolute -right-20 -bottom-45" />
                        <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center justify-center md:gap-6">
                        {showMessage && (currentGuest?.slug !== "rosa-e-gi" && currentGuest?.slug !== "karen") && <WindowMsn close={() => setShowMessage(false)} />}
                        <div className="md:flex relative pt-38 md:pt-38 lg:pt-24">
                            <img src="/images/trint.png" alt="trin" className="w-40 md:scale-140" />
                            <img src="/images/emo.png" alt="emo" className="w-40 md:scale-140 md:ml-8" />
                            <img src="/images/aspas.png" alt="papel" className="hidden md:block absolute w-15 top-28 lg:top-14 -right-14" />
                        </div>
                        <div className="relative">
                            <img src="/images/foto-home.png" alt="home" className="w-80 px-2 md:scale-140 translate-x-2" />
                            <img src="/images/mao-rock.png" alt="papel" className="absolute w-30 z-0 md:-translate-y-2 scale-70 md:scale-100 -translate-y-10 -right-1 md:-right-10.5 rotate-25" />
                        </div>
                        {showNotification && !showMessage && (currentGuest?.slug !== "rosa-e-gi" && currentGuest?.slug !== "karen") && (
                            <WindowNotification openNotification={openMessageWindow} />
                        )}
                        <img src="/images/papel.png" alt="papel" className="absolute -right-20 -bottom-45" />
                        <img src="/images/papel.png" alt="papel" className="absolute -left-20 -top-45 rotate-180" />
                        <audio ref={audioRef} src="/audios/notificacao.mp3" />
                        {(currentGuest?.slug === "rosa-e-gi" || currentGuest?.slug === "karen") ? (
                            <div className="text-black text-center">
                                {currentGuest?.slug !== "rosa-e-gi" && currentGuest?.slug !== "karen" ? (
                                    <span className="text-white px-4 block py-2 rocket-font mb-2 bg-black">
                                        <FaCheck className="inline" /> confirmado
                                    </span>
                                ) : (
                                    <span className="text-white px-4 block py-2 rocket-font mb-2 bg-black pr-10 mr-4">Convite expirado
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="text-black text-center z-99 mt-12">
                                {currentGuest?.presenca === true ? (
                                    <span className="text-white px-4 block py-2 rocket-font mb-2 bg-black">
                                        <FaCheck className="inline" /> confirmado
                                    </span>
                                ) : (
                                    <>
                                        <h2 className="rocket-font text-center bg-white px-3 py-2 border border-gray-600 z-99" style={{ fontSize: "23px" }}>
                                            Dia 13 de Dezembro ás 16h
                                        </h2>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
        ) : (
            <main className="min-h-screen w-full relative px-3 py-8 flex flex-col md:gap-18 items-center justify-center grid-background">

            </main>
        )
    );
};
