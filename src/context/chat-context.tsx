import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getGuests } from "../services/services";

interface ChatProviderProps {
    children: ReactNode;
}

interface Guest {
    id: number;
    nome: string;
    telefone: string;
    message: string;
    presenca: boolean;
    bebidaAlcoolica: boolean;
    step: number;
}

interface ChatContextProps {
    loadedDate: string;
    step: number;
    setStep: (step: number) => void;
    convidados: string;
    setConvidados: (value: string) => void;
    confirmed: boolean | null;
    setConfirmed: (value: boolean | null) => void;
    confirmedChopp: boolean;
    setConfirmedChopp: (value: boolean) => void;
    currentGuest: Guest | null;
    setCurrrentGuest: (guest: Guest | null) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [step, setStep] = useState<number>(0);
    const [convidados, setConvidados] = useState<string>("");
    const [confirmed, setConfirmed] = useState<boolean | null>(null);
    const [confirmedChopp, setConfirmedChopp] = useState<boolean>(false);
    const [currentGuest, setCurrrentGuest] = useState<Guest | null>(null);

    const loadedDate = new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    useEffect(() => {
        const fetchGuests = async () => {
            const guests: Guest[] = await getGuests();
            const guestName = window.location.pathname.replace("/", "");
            const filtrado = guests.find((g) => g.nome === guestName);
            setCurrrentGuest(filtrado || null);
        };

        fetchGuests();
    }, []);

    useEffect(() => {
        if (currentGuest) {
            setStep(currentGuest.step);
            setConfirmed(currentGuest.presenca);
            setConfirmedChopp(currentGuest.bebidaAlcoolica);
        }
    }, [currentGuest]);

    return (
        <ChatContext.Provider
            value={{
                loadedDate,
                step,
                setStep,
                convidados,
                setConvidados,
                confirmed,
                setConfirmed,
                confirmedChopp,
                setConfirmedChopp,
                currentGuest,
                setCurrrentGuest,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat deve ser usado dentro de ChatProvider");
    return context;
}