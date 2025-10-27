import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatProviderProps {
    children: ReactNode;
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
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [step, setStep] = useState<number>(0);
    const [convidados, setConvidados] = useState<string>("");
    const [confirmed, setConfirmed] = useState<boolean | null>(null);
    const [confirmedChopp, setConfirmedChopp] = useState<boolean>(false);

    const loadedDate = new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

console.log(loadedDate);
    return (
        <ChatContext.Provider value={{
            loadedDate,
            step, setStep,
            convidados, setConvidados,
            confirmed, setConfirmed,
            confirmedChopp, setConfirmedChopp
        }}>
            {children}
        </ChatContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat deve ser usado dentro de ChatProvider");
    return context;
};