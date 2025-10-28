import { useParams } from "react-router-dom";
import { useChat } from "../context/chat-context";
import { confirmation, drink, message, notConfirmation, notDrink } from "../services/services";

export const Chat = () => {
    const {
        loadedDate,
        step, setStep,
        convidados, setConvidados,
        confirmed, setConfirmed,
        confirmedChopp, setConfirmedChopp
    } = useChat();

    const { nome } = useParams()

    return (
        <div className="w-full flex flex-col justify-end px-6 pb-8 pt-20 overflow-y-scroll max-h-[200px]">
            <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
            <p className="ml-4">Ooi, {nome} tu vem pra nossa festa?</p>
            <p className="ml-4">Vai ser dia 13 de dezembro às 16:00 em Eldorado </p>
            {confirmed == false && (
                <>
                    <p className="text-[#6f6f6f]">Você diz:</p>
                    <p className="ml-4">Não</p>
                    <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                    <p className="ml-4">Então ta bom!</p>
                </>
            )}
            {step > 0 && confirmed && (
                confirmed ? (
                    <>
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Sim!</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">Tu vai beber chopp?</p>
                    </>
                ) : (
                    <>
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Não</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">Beleza</p>
                        <p className="ml-4">A gente te aguarda lá</p>
                    </>
                )
            )}
            {step > 1 && confirmed && (
                confirmedChopp ? (
                    <>
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Sim!</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">E quem mais vaivir junto?</p>
                    </>
                ) : (
                    <>
                        <p className="text-[#6f6f6f]">Você diz:</p>
                        <p className="ml-4">Não</p>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">E quem mais vai vir junto?</p>
                    </>
                )
            )}
            {step > 2 && confirmed && (
                <>
                    <p className="text-[#6f6f6f]">Você diz:</p>
                    <p className="ml-4">{convidados}</p>
                    <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                    <p className="ml-4">Combinado, a gente te aguarda lá</p>
                </>
            )}
            {/* {step > 3 && confirmed && (
                    <>
                    <p className="text-[#6f6f6f]">Você diz:</p>
                    <p className="ml-4">{convidados}</p>
                    <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                    <p className="ml-4">Beleza, a gente te aguarda lá</p>
                    </>
            )} */}
            {step == 0 && (
                <div className="bg-white mt-1 flex items-center h-9 py-1 px-3 rounded-lg border border-[#909090]">
                    <button
                        className="bg-[#3BB2EA] px-3 rounded-md mr-2 cursor-pointer"
                        onClick={() => {
                            if (nome) confirmation(nome)
                            setConfirmed(true)
                            setStep(1)
                        }}
                    >
                        Sim!
                    </button>
                    <button
                        className="bg-[#999999] px-3 rounded-md cursor-pointer"
                        onClick={() => {
                            if (nome) notConfirmation(nome)
                            setConfirmed(false)
                            setStep(1)
                        }}
                    >
                        Não
                    </button>
                </div>
            )}
            {step == 1 && confirmed && (
                <div className="bg-white mt-1 flex items-center h-9 py-1 px-3 rounded-lg border border-[#909090]">
                    <button
                        className="bg-[#3BB2EA] px-3 rounded-md mr-2 cursor-pointer" onClick={() => {
                            if (nome) drink(nome)
                            setConfirmedChopp(true)
                            setStep(2)
                        }}
                    >
                        Sim! 🍺
                    </button>
                    <button
                        className="bg-[#999999] px-3 rounded-md cursor-pointer"
                        onClick={() => {
                            if (nome) notDrink(nome)
                            setConfirmedChopp(false)
                            setStep(2)
                        }}
                    >
                        Não
                    </button>
                </div>
            )}
            {step == 2 && confirmed && (
                <div className="bg-white mt-1 flex justify-center h-9 py-1 px-3 rounded-lg border border-[#909090]">
                    <input
                        type="text"
                        className="w-full h-full"
                        value={convidados}
                        onChange={(e) => setConvidados(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (nome) message(nome, convidados)
                            setStep(3);
                        }}
                        className="bg-blue-400 px-3 rounded-sm cursor-pointer"
                    >
                        Enviar
                    </button>
                </div>
            )}
            <p className="text-[12px] text-center text-[#6f6f6f]">última mensagem recebida em {loadedDate}</p>
        </div>
    );
};