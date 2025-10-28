import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../context/chat-context";
import { confirmation, drink, message, notConfirmation, notDrink } from "../services/services";
import { GrEdit } from "react-icons/gr";

export const Chat = () => {
    const {
        loadedDate,
        step, setStep,
        convidados, setConvidados,
        confirmed, setConfirmed,
        confirmedChopp, setConfirmedChopp
    } = useChat();

    const { nome } = useParams()
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição

    return (
        <div className="w-full flex min-h-145 md:min-h-140 flex-col justify-between px-6 pb-1 md:pt-25 overflow-y-scroll max-h-[200px]">
            <div className="overflow-y-scroll overflow-x-hidden mb-2">
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
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsEditing(!isEditing)}>
                                <GrEdit />
                            </button>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full h-full wrap-break-word px-2 py-1 rounded border"
                                    value={convidados}
                                    onChange={(e) => setConvidados(e.target.value)}
                                />
                            ) : (
                                <p className="ml-4">{convidados || "Nenhum convidado informado"}</p>
                            )}
                            {isEditing && (
                                <button
                                    onClick={() => {
                                        if (nome) message(nome, convidados);
                                        setStep(3);
                                        setIsEditing(false); // Sai do modo de edição após enviar
                                    }}
                                    className="bg-blue-500 text-white px-4 py-1 rounded"
                                >
                                    Enviar
                                </button>
                            )}
                        </div>
                        <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                        <p className="ml-4">Combinado, a gente te aguarda lá</p>
                    </>
                )}
            </div>
            {/* {step > 3 && confirmed && (
                    <>
                    <p className="text-[#6f6f6f]">Você diz:</p>
                    <p className="ml-4">{convidados}</p>
                    <p className="text-[#6f6f6f]">Gabi e Henrique dizem:</p>
                    <p className="ml-4">Beleza, a gente te aguarda lá</p>
                    </>
            )} */}
            <div>
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
                {step == 3 && (
                    <div className="bg-white mt-1 flex flex-col sm:flex-row justify-between items-center h-25 sm:h-9 py-1 px-3 rounded-lg border border-[#909090]">
                        <div className="flex flex-col sm:flex-row items-center">
                            <p className="bg-[#3BB2EA] px-2 rounded-sm">✅ Presença confirmada</p>
                            <p className="pl-1 text-[13px]">Cancelar</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center">
                            <p className="bg-[#3BB2EA] px-2 rounded-sm">🥤 Sem bebida alcoólica</p>
                            <p className="pl-1 text-[13px]">Cancelar</p>
                        </div>
                    </div>
                )}
                <p className="text-[12px] text-center text-[#6f6f6f]">última mensagem recebida em {loadedDate}</p>
            </div>
        </div>
    );
};